const indexController = require('../controllers/mainController');
const express = require('express');
const mainRoutes = express.Router();

//routes
mainRoutes.get('/', indexController.home);
mainRoutes.get('/cart', indexController.cart);

module.exports = mainRoutes;