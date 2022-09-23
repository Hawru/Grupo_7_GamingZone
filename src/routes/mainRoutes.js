const indexController = require('../controllers/mainController');
const express = require('express');
const mainRoutes = express.Router();

//routes
mainRoutes.get('/', indexController.home);

module.exports = mainRoutes;