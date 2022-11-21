const path = require('path');
const moment = require('moment');
const fs = require('fs');
const GameListModel = require('../database/models/gameListModel');

const productsController = {
    verProducto: (req, res) => {
        models.initModels().then(models => {
            models.products
                .findByPk(req.params.id)
                .then(game => {
                    res.render('products/detailProduct', {game: game,})  
                })
                .catch(e => {
                    res.render('404');
                });
        });
    },
    // Form de crear producto
    crearProducto: (req, res) => {
        res.render('products/createProduct');
    },
     // Acción de crear producto
    almacenarProducto: (req, res) => {
        let images = [];
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
    listaProducto: (req, res) => {
        models.initModels().then(models => {
            models.products
                .findAll()
                .then(game => {
                    res.render('products/listProduct', {game: game});
                })
                .catch(e => {
                    res.render('404');
                });
        });
    },
};

module.exports = productsController;