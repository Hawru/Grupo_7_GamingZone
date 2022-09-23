const path = require('path');

const productsController = {
    verProducto: (req, res) => {
        res.render('product');
    },
};

module.exports = productsController;