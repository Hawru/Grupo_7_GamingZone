let service = require('../../services/products.js');

module.exports = {
    getAll: async (req, res) => {
        let products = await service.getAll();

        let tmp = {
            count: products.length,
            products: products
        };

        res.send(tmp);
    },

    getOne: async (req, res) => {
        let product = await service.getResume(req.params.id);

        if (product) {
            res.send(product);
        } else {
            res.status(404);
            res.send({});
        }
    },
}