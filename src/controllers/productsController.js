const path = require('path');
const GameListModel = require('../database/models/gameListModel');

const productsController = {
    verProducto: (req, res) => {
        let game = GameListModel.findById(req.params.id);

        if (game) {
            res.render('product', {
                game: game,
            });
        } else {
            res.render('404');
        }
    },
    crearProducto: (req, res) => {
        res.render('products/createProduct');
    },
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
    listaProducto: (req, res) => {
        let games = GameListModel.getAll().map(game => GameListModel.getResume(game.id));
        res.render('products/listProduct', {
            game: games,
        });
    },
    detalleProducto: (req, res) => {
        let game = GameListModel.findById(req.params.id);
        res.render('products/detailsProduct', {
            game: game,
        });
    },
};

module.exports = productsController;