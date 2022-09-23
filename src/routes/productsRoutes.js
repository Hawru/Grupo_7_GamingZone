const express = require('express');
const productsRouter = express.Router();
const productsController = require('../controllers/productsController');

//routes
productsRouter.get('/product', productsController.verProducto);

module.exports = productsRouter;