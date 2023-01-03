const express = require('express');
const router = express.Router();

router.use('/', require('./main'))
router.use('/products', require('./products'))
router.use('/users', require('./users'))

router.use('/api', require('./Api/index.routes.js'));

module.exports = router;