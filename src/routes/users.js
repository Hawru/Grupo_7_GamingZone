const usersController = require('../controllers/usersController');
const path = require('path');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { body }  = require('express-validator');

//Configuración Multer
const storageProfileImage = multer.diskStorage({
    destination: function(req, file, cb) {       // request, archivo y callback que almacena archivo en destino
       cb(null, path.join(__dirname,'../../public/images/users'));    // Ruta donde almacenamos el archivo
    },
    filename: function(req, file, cb) {          // request, archivo y callback que almacena archivo en destino
     let imageName = Date.now() + path.extname(file.originalname);   // milisegundos y extensión de archivo original
       cb(null, imageName);         
    }
});

const uploadProfileImage = multer({ storage: storageProfileImage });

//Validacion Formulares
let validacionRegistro = [
    body('username').notEmpty().withMessage('Campo obligatorio'),
    body('email').notEmpty().withMessage('Campo obligatorio').isEmail().withMessage('Ingresa un correo válido'),
    body('password').notEmpty().withMessage('Campo obligatorio').isLength({min:5, max:10}).withMessage('La contraseña debe contener entre 5 y 10 caractéres.'),
]

//routes
router.get('/register', usersController.register);
router.post('/register',  validacionRegistro, uploadProfileImage.single('profile_image'), usersController.userRegister);
router.get('/login', usersController.login);
router.post('/login', usersController.userLogin);

module.exports = router;