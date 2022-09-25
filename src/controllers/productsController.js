const path = require('path');

const productsController = {
    verProducto: (req, res) => {
        res.render('product');
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