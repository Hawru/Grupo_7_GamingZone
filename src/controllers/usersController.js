const path = require('path');

const usersController = {
    userRegister: (req, res) => {
        res.render('users/register');
    },
    userLogin: (req, res) => {
        res.render('users/login');
    },
};

module.exports = usersController;