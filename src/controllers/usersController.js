const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
let { initModels } = require('../database/models1/index.js');

const usersController = {
    register: (req, res) => {
        res.render('users/register');
    },
    userRegister: async (req, res) => {
        const errors = validationResult(req);
        if(errors.isEmpty()) {
            let models = await initModels();

            let profile_image = "users/" + req.file.filename;

            let passwordHash = bcrypt.hashSync(req.body.password, 10);

            let newUserData = {
                username: req.body.username,
                email: req.body.email,
                password: passwordHash,
                profile_path: profile_image,
            };

            let newUser = await models
                .users
                .create(newUserData)

            req.session.user = newUser;
            res.redirect('/users/profile');
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
    userLogin: async (req, res) => {
        let models = await initModels()
        let user = await models.users
            .findOne({
                where: {
                    username: req.body.usernamelog,
                }
            });

        if (user) {
            let tmp = await bcrypt.compare(req.body.passwordlog, user.password);

            if(tmp) {
                delete user.password;
                req.session.user = user
                res.redirect('/')
            } else {
                res.render('users/login', { msg: 'Usuario o contraseña incorrecta'});
            }
        } else {
            res.render('users/login', { msg: 'Usuario o contraseña incorrecta'});
        }
    },

    profile: (req, res) => {
        let profileuser = req.session.user;
        res.render('users/profile', {profile: profileuser})
    }

};

module.exports = usersController;
