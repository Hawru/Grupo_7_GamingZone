const path = require('path');
const fs = require('fs');
const usersFilePath = path.join(__dirname, '../database/data/usuarios.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const usersController = {
    register: (req, res) => {
        res.render('users/register');
    },
    userRegister: (req, res) => {
        const errors = validationResult(req);
        if(errors.isEmpty()){
            let userData = req.body;
            if(users == []){
                idNewUser = 1;
            }else{
                idNewUser = (users[users.length-1].id)+1;
            };
            let profile_image = "users/" + req.file.filename;
            let passwordHash = bcrypt.hashSync(req.body.password, 10);
    
            let newUser ={
                "id": idNewUser,
                "username": userData.username,
                "email": userData.email,
                "password": passwordHash,
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
        let data = req.body;
        let user = users.filter(u => u.username == data.usernamelog);
        if(user != false) {       
            if(bcrypt.compareSync(data.passwordlog, user[0].password)) {
                delete user[0].password;
                console.log(user[0])
                req.session.user = user[0]
                return res.redirect('/')
            } 
        } 

        res.render('users/login', { msg: 'Usuario o contraseña incorrecta'});
    },

    profile: (req, res) => {
        let profileuser = req.session.user;
        res.render('users/profile', {profile: profileuser})
    }

};

module.exports = usersController;