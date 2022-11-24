const { body }  = require('express-validator');
let { initModels } = require('../database/models1/index.js');

module.exports = [
    body('username')
        .notEmpty()
        .withMessage('Ingrese un nombre de usuario')
        .custom(async (value) => {
            let models = await initModels();

            let user = await models.users.findOne({
                where: {
                    username: value,
                }
            });

            if (user) {
                return Promise.reject('El nombre de usuario ya existe');
            }
        }),
    body('email')
        .notEmpty()
        .withMessage('Campo obligatorio')
        .isEmail()
        .withMessage('Ingresa un correo válido')
        .custom(async (value) => {
            let models = await initModels();

            let user = await models.users.findOne({
                where: {
                    email: value,
                }
            });

            if (user) {
                return Promise.reject('El email ya existe');
            }
        }),
    body('password')
        .notEmpty()
        .withMessage('Campo obligatorio')
        .isLength({min:5, max:10})
        .withMessage('La contraseña debe contener entre 5 y 10 caractéres.'),
];
