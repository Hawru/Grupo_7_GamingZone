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
        res.render('products/updateProduct');
    },
    listaProducto: (req, res) => {
        res.render('products/listProduct');
    },
};

module.exports = productsController;