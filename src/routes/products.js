const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

//routes
router.get('/create', productsController.crearProducto)
router.get('/list', productsController.listaProducto)
router.get('/:id', productsController.verProducto);
router.get('/:id/update', productsController.actualizarProducto)
router.get('/detail/:id', productsController.detalleProducto)

module.exports = router;