const express = require('express');
const productsRouter = express.Router();
const productsController = require('../controllers/productsController');

//routes
productsRouter.get('/create', productsController.crearProducto)
productsRouter.get('/list', productsController.listaProducto)
productsRouter.get('/:id', productsController.verProducto);
productsRouter.get('/:id/update', productsController.actualizarProducto)

module.exports = productsRouter;