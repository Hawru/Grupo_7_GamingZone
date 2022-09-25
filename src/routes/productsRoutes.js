const express = require('express');
const productsRouter = express.Router();
const productsController = require('../controllers/productsController');

//routes
productsRouter.get('/', productsController.verProducto);
productsRouter.get('/create', productsController.crearProducto)

module.exports = productsRouter;