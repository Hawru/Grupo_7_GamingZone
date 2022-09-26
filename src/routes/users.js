const usersController = require('../controllers/usersController');
const express = require('express');
const router = express.Router();

//routes
router.get('/register', usersController.userRegister);
router.get('/login', usersController.userLogin);

module.exports = router;