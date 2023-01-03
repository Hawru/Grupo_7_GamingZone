const express = require('express');
const router = express.Router();
const productsController = require('../../controllers/Api/ProductsController.js');
const middleware = require('../../middleWares/RequireIdMiddleware.js');

router.get(
    '/',
    productsController.getAll
);

router.get(
    '/:id',
    middleware,
    productsController.getOne
);

module.exports = router;
