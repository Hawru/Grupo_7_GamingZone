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
    // Form de crear producto
    crearProducto: (req, res) => {
        res.render('products/createProduct');
    },
     // Acción de crear producto
    almacenarProducto: (req, res) => {
        // Aca va la función para guardar los nuevos datos del producto
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
        // Aca va la función para guardar los nuevos datos del producto
    },
    // Acción de eliminar producto
    eliminarProducto: (req, res) => {
        // Aca va la función para eliminar un producto
    },
    listaProducto: (req, res) => {
        let game = GameListModel.getAll().map(game => GameListModel.getResume(game.id));
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