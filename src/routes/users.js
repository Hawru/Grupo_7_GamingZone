const usersController = require('../controllers/usersController');
const express = require('express');
const router = express.Router();
const multer = require('multer');

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
router.get('/register', usersController.register);
router.post('/register',  uploadProfileImage.single('profile_image'), usersController.userRegister);
router.get('/login', usersController.login);
router.post('/login', usersController.userLogin);

module.exports = router;