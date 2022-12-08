const moment = require('moment');
const GameListModel = require('../database/models/gameListModel');

let {
    initModels,
    sequelize,
} = require('../database/models1/index.js');

let productService = require('../services/products.js');

const productsController = {
    verProducto: async (req, res) => {
        let models = await initModels();

        try {
            let product = await productService.getResume(req.params.id);

            res.render('products/detailProduct', {
                game: product,
            });
        } catch(e) {
            res.render('404');
        };
    },
    // Form de crear producto
    crearProducto: (req, res) => {
        res.render('products/createProduct');
    },
     // Acción de crear producto
    almacenarProducto: async (req, res) => {
        // iniciamos la transaccion
        let t = await sequelize.transaction();

        let models = await initModels();

        try {
            /* Informacion enviada por el usuario */
            let requirements = [req.body.placa, req.body.procesador, req.body.ram, req.body.almacenamiento];
            let plataforms = req.body.plataforms
            let name = (req.body.title).toLowerCase().replace(/\s/g, '');
            let releaseDate = moment().format(); 

            /* Creacion del producto */
            let product = await models.products.create({
                name: name,
                title: req.body.title,
                description: req.body.description,
                price: parseInt(req.body.price),
                discount: parseInt(req.body.discount),
                release_date : releaseDate
            });

            // Si se envia una imagen la agregamos
            if (req.file) {
                let image = await models.product_images.create({
                    name: name,
                    path: "products/" + req.file.filename,
                    product_id: product.dataValues.id
                });

                await product.update({
                    primary_image_id: image.dataValues.id
                });
            }

            /* Creacion de los requerimientos*/
            let makeRequirement = await productService.createDefaultRequirement(product.dataValues.id);
            for (const [i, v] of makeRequirement.entries()) {
                v.value = requirements[i] || 0
            }
            await models.product_requirement.bulkCreate(makeRequirement);

            /* Creacion de las plataformas */
            let makePlataforms = []
            if (typeof plataforms == 'object') {
                plataforms = plataforms.map(b => parseInt(b));
                for (const i of plataforms) { 
                    makePlataforms.push({product_id: product.dataValues.id, plataform_type_id: i})
                }
            } else{
                plataforms = parseInt(plataforms)
                makePlataforms.push({product_id: product.dataValues.id, plataform_type_id: plataforms})
            }
            await models.product_plataform.bulkCreate(makePlataforms);

            /* Creacion de los scores por default */
            await productService.createDefaultScores(product.dataValues.id);
            
            /* Creacion version por default(Standard)  Hasta cambiar la funcionalidad*/
            /*
            let version = {
                product_id: product.dataValues.id,
                version_id: 1,
            }
            await models.product_version.create(version)
            */
            // confirmamos los cambios
            await t.commit();
            res.redirect('../home')
        } catch (e) {
            // si algo fallo borramos los cambios de la DB
            await t.rollback();
            throw e;
        }

    },
    // Form de actualizar producto
    actualizarProducto: (req, res) => {
        let game = GameListModel.findById(req.params.id);

        if (game) {
            res.render('products/updateProduct', {
                game: game,
            });
        } else {
            res.render('404');
        }
    },
    // Acción de actualizar producto
    guardarProducto: (req, res) => {
        let game = GameListModel.findById(req.params.id);

        if (req.file) {
            let time = new Date;
            let id = time.getTime();

            game.images.push({
                id: id,
                src: 'products/' + req.file.filename,
            });

            game.primary_image_id = id;
        }

        let requirements = [];

        requirements.push({
            id: 1,
            value: req.body.placa,
        });

        requirements.push({
            id: 2,
            value: req.body.procesador,
        });

        requirements.push({
            id: 3,
            value: req.body.ram,
        });

        requirements.push({
            id: 4,
            value: req.body.almacenamiento,
        });

        game.requirements = requirements;

        let plataforms = req.body.plataforms;

        if (typeof plataforms != "object") {
            plataforms = plataforms.split("");
        }

        game.plataforms = plataforms.map(b => parseInt(b));

        game.title = req.body.title || game.title;
        game.description = req.body.description || game.description;
        game.price = req.body.price || game.price;
        game.price_d = req.body.price_d || game.price_d;
        game.discount = req.body.discount || game.discount;

        GameListModel.update(req.params.id, game, (list) => {
            res.render('products/successProduct');
        });
    },
    // Acción de eliminar producto
    eliminarProducto: (req, res) => {
        let game = GameListModel.findById(req.params.id);

        if (game) {
            GameListModel.delete(req.params.id, () => {
                res.render('products/deleteProduct');
            });
        } else {
            res.render('404');
        }
    },
    listaProducto: async (req, res) => {
        try {
            let products = await productService.getAll();
            res.render('products/listProduct', {
                game: products,
            });
        } catch(e) {
            res.render('404');
        };
    },
};

module.exports = productsController;