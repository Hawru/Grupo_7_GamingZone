const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
let models = require('../database/models1/index.js');

const usersController = {
    register: (req, res) => {
        res.render('users/register');
    },
    userRegister: (req, res) => {
        const errors = validationResult(req);
        if(errors.isEmpty()){
            let profile_image = "users/" + req.file.filename;

            let passwordHash = bcrypt.hashSync(req.body.password, 10);

            let newUser = {
                username: req.body.username,
                email: req.body.email,
                password: passwordHash,
                profile_image_path: profile_image
            };

            models.initModels().then(models => {
                models.users
                    .create(newUser)
                    .then(user => {
                        req.session.user = user
                        res.redirect('/');
                    })
                    .catch(e => {
                        console.error(e);
                    });
            });

        } else {
            res.render('users/register', { errors: errors.array(), old: req.body});
        }
    },
    login: (req, res) => {
        if (req.session.user) {
            res.render('users/profile');
        } else {
            res.render('users/login');
        }
    },
    userLogin: (req, res) => {
        models.initModels().then(models => {
            models.users
                .findOne({
                    where: {
                        username: req.body.usernamelog,
                    }
                })
                .then(user => {
                    if (user) {
                        if(bcrypt.compareSync(req.body.passwordlog, user.password)) {
                            delete user.password;
                            req.session.user = user
                            res.redirect('/')
                        } 
                    } else {
                        res.render('users/login', { msg: 'Usuario o contraseña incorrecta'});
                    }
                })
                .catch(e => {
                    console.error(e);
                });
        });
    },

    profile: (req, res) => {
        let profileuser = req.session.user;
        res.render('users/profile', {profile: profileuser})
    }

};

module.exports = usersController;
