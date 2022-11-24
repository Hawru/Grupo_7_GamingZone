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
            let product = await models.products.findByPk(req.params.id);

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

            let name = (req.body.title).toLowerCase().replace(/\s/g, '');
            let releaseDate = moment().format(); 

            let product = await models.products.create({
                name: name,
                title: req.body.title,
                description: req.body.description,
                price: parseInt(req.body.price),
                discount: parseInt(req.body.discount),
                release_date : releaseDate
            });

            // si se envia una imagen la agregamos
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

            await productService.createDefaultRequirement(product.dataValues.id);

            // confirmamos los cambios
            await t.commit();
        } catch (e) {
            // si algo fallo borramos los cambios de la DB
            await t.rollback();
            throw e;
        }

        /*let images = [];
        let primary_image_id = null;

        if (req.file) {
            let time = new Date;
            let id = time.getTime();

            images.push({
                id: id,
                src: 'products/' + req.file.filename,
            });

            primary_image_id = id;
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

        let plataforms = req.body.plataforms;

        if (typeof plataforms != "object") {
            plataforms = plataforms.split("");
        }

        plataforms = plataforms.map(b => parseInt(b));

        let release_date = moment().format('YYYY-MM-DD');

        let versions = [1, 2];

        GameListModel.create({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            price_d: req.body.price_d || 0,
            discount: req.body.discount || 0,
            versions: versions,
            release_date: release_date,
            primary_image_id: primary_image_id,
            requirements: requirements,
            scores: [],
            plataforms: plataforms,
            images: images,
        }, (list) => {
            res.render('products/successProduct');
        });
        */
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
        let models = await initModels();

        try {
            let products = await models.products.findAll();

            res.render('products/listProduct', {
                game: products,
            });

        } catch(e) {
            res.render('404');
        };
    },
};

module.exports = productsController;