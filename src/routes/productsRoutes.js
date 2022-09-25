const express = require('express');
const productsRouter = express.Router();
const productsController = require('../controllers/productsController');

//routes
productsRouter.get('/', productsController.verProducto);
productsRouter.get('/create', productsController.crearProducto)
productsRouter.get('/update', productsController.actualizarProducto)
productsRouter.get('/list', productsController.listaProducto)

module.exports = productsRouter;