const express = require('express');
const router = express.Router();

router.use('/', require('./mainRoutes'))
router.use('/products', require('./productsRoutes'))
router.use('/users', require('./usersRoutes'))

module.exports = router;