const path = require('path');

const usersController = {
    register: (req, res) => {
        res.render('users/register');
    },
    userRegister: (req, res) => {
        //Funcion para registrar el usuario
    },
    login: (req, res) => {
        res.render('users/login');
    },
    userLogin: (req, res) => {
        //Funcion para loguear el usuario
    },

};

module.exports = usersController;