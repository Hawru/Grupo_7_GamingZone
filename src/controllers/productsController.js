const path = require('path');
const fs = require('fs');
const GameListModel = require('../database/models/gameListModel');

const productsController = {
    verProducto: (req, res) => {
        let game = GameListModel.findById(req.params.id);

        if (game) {
            res.render('products/detailProduct', {
                game: game,
            });
        } else {
            res.render('404');
        }
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
                src: '/products/' + req.file.filename,
            });

            primary_image_id = id;
        }

        GameListModel.create({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            price_d: req.body.price_d || 0,
            discount: req.body.discount || 0,
            versions: [],
            release_date: req.body.release_date || null,
            primary_image_id: primary_image_id,
            requirements: [],
            scores: [],
            plataforms: [],
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
        //
    },
    // Acción de eliminar producto
    eliminarProducto: (req, res) => {
        // Aca va la función para eliminar un producto
    },
    listaProducto: (req, res) => {
        let game = GameListModel.getAll()
            .map(game => GameListModel.getResume(game.id || null))
            .filter(b => b);

        if (game.length) {
            res.render('products/listProduct', {
                game: game,
            });
        } else {
            res.render('404');
        }
    },
};

module.exports = productsController;