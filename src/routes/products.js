const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const multer = require('multer');

//Configuración Multer
const multerDiskStorage = multer.diskStorage({
    destination: function(req, file, cb) {       // request, archivo y callback que almacena archivo en destino
       cb(null, path.join(__dirname,'../../public/images/products'));    // Ruta donde almacenamos el archivo
    },
    filename: function(req, file, cb) {          // request, archivo y callback que almacena archivo en destino
     let imageName = Date.now() + path.extname(file.originalname);   // milisegundos y extensión de archivo original
       cb(null, imageName);         
    }
});

const uploadFile = multer({ storage: multerDiskStorage });

//routes
router.get('/list', productsController.listaProducto)
router.get('/create', productsController.crearProducto)
router.post('/create', uploadFile.single('primary_image'), productsController.almacenarProducto)
router.get('/:id', productsController.verProducto);
router.delete('/:id', productsController.eliminarProducto)
router.get('/:id/update', productsController.actualizarProducto)
router.put('/:id/update', uploadFile.single('primary_image'), productsController.guardarProducto)

module.exports = router;