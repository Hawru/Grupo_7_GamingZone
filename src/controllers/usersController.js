const path = require('path');

const usersController = {
    userRegister: (req, res) => {
        res.render('register');
    },
    userLogin: (req, res) => {
        res.render('login');
    },
};

module.exports = usersController;