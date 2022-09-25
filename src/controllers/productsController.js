const path = require('path');

const productsController = {
    verProducto: (req, res) => {
        res.render('product');
    },
    crearProducto: (req, res) => {
        res.render('products/createProduct');
    },
};

module.exports = productsController;