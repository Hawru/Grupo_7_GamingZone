const path = require('path');
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
        let game = GameListModel.getAll().map(game => GameListModel.getResume(game.id));
        console.log(game)
        if (game) {
            res.render('products/listProduct', {
                game: game,
            });
        } else {
            res.render('404');
        }
    },
};

module.exports = productsController;