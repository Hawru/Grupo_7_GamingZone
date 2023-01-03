const express = require('express');
const router = express.Router();
const usersRoutes = require('./users.js');
const productsRoutes = require('./products.js');

router.use('/users', usersRoutes)
router.use('/products', productsRoutes)

module.exports = router;
