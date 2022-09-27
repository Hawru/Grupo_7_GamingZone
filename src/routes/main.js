const indexController = require('../controllers/mainController');
const express = require('express');
const router = express.Router();

//routes
router.get('/', indexController.home);
router.get('/cart', indexController.cart);

module.exports = router;