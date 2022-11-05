const path = require('path');
const fs = require('fs');
const usersFilePath = path.join(__dirname, '../database/data/usuarios.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const { validationResult } = require('express-validator');

const usersController = {
    register: (req, res) => {
        res.render('users/register');
    },
    userRegister: (req, res) => {
        const errors = validationResult(req);
        if(errors.isEmpty()){
            let userData = req.body;
            let idNewUser = (users[users.length-1].id)+1;
            let profile_image = "users/" + req.file.filename;
    
            let newUser ={
                "id": idNewUser,
                "username": userData.username,
                "email": userData.email,
                "password": userData.password,
                "profile_image": profile_image
            };    
            users.push(newUser);
            fs.writeFileSync(usersFilePath,JSON.stringify(users, null, " "),'utf-8');
            res.redirect('/');
        } else {
            res.render('users/register', { errors: errors.array(), old: req.body});
        }
    },
    login: (req, res) => {
        res.render('users/login');
    },
    userLogin: (req, res) => {
        //Funcion para loguear el usuario
    },

};

module.exports = usersController;