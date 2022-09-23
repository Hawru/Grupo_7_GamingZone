const usersController = require('../controllers/usersController');
const express = require('express');
const usersRouter = express.Router();

//routes
usersRouter.get('/register', usersController.userRegister);
usersRouter.get('/login', usersController.userLogin);

module.exports = usersRouter;