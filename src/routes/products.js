const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

//routes
router.get('/list', productsController.listaProducto)
router.get('/:id', productsController.verProducto);
router.get('/create', productsController.crearProducto)
router.post('/create', productsController.almacenarProducto)
router.get('/:id/update', productsController.actualizarProducto)
router.put('/:id/update', productsController.guardarProducto)

module.exports = router;