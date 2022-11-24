const usersController = require('../controllers/usersController');
const path = require('path');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const authLogMiddleWare = require('../middleWares/authLogMiddleWare');
const authGuestMiddleWare = require('../middleWares/authGuestMiddleWare');

//Validacion Formulares
const validacionRegistro = require('../middleWares/registerMiddleware.js');

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

//routes
router.get(
    '/register',
    authGuestMiddleWare,
    usersController.register
);

router.post(
    '/register',
    uploadProfileImage.single('profile_image'),
    validacionRegistro,
    usersController.userRegister
);

router.get(
    '/login',
    authGuestMiddleWare,
    usersController.login
);

router.post(
    '/login',
    usersController.userLogin
);

router.get(
    '/profile',
    authLogMiddleWare,
    usersController.profile
);

router.get(
    '/logout',
    usersController.logout
);

module.exports = router;