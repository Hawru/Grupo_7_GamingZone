const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/Api/UsersController.js');
const middleware = require('../../middleWares/RequireIdMiddleware.js');

router.get(
    '/',
    usersController.getAll
);

router.get(
    '/:id',
    middleware,
    usersController.getOne
);

module.exports = router;
