const path = require('path');
const fs = require('fs');
const GameListModel = require('../database/models/gameListModel');
const juegosFilePath = path.join(__dirname, '../database/data/lista_de_juegos.json');
const juegos = JSON.parse(fs.readFileSync(juegosFilePath, 'utf-8'));

const productsController = {
    verProducto: (req, res) => {
        let game = GameListModel.findById(req.params.id);

        if (game) {
            res.render('products/detailProduct', {
                game: game,
            });
        } else {
            res.render('404');
        }
    },
    // Form de crear producto
    crearProducto: (req, res) => {
        res.render('products/createProduct');
    },
     // Acción de crear producto
    almacenarProducto: (req, res) => {
        let datos = req.body;
		let idNuevoJuego = (juegos[juegos.length-1].id)+1;

		let nuevoJuego ={
			"id": idNuevoJuego,
			"name": datos.name,
			"price": parseInt(datos.price),
			"discount": parseInt(datos.discount),
            "requirements_01": datos.requirements_id1,
			"requirements_02": datos.requirements_id2,
			"description": datos.description,
			"image": req.file.filename
		};

		juegos.push(nuevoJuego);
		fs.writeFileSync(juegosFilePath,JSON.stringify(juegos, null, " "),'utf-8');
		res.redirect('/');
    },   
    // Form de actualizar producto
    actualizarProducto: (req, res) => {
        let game = GameListModel.findById(req.params.id);

        if (game) {
            res.render('products/updateProduct', {
                game: game,
            });
        } else {
            res.render('404');
        }
    },
    // Acción de actualizar producto
    guardarProducto: (req, res) => {
        let datos = req.body;
		let idNuevoProducto = (products[products.length-1].id)+1;

		let nuevoProducto ={
			"id": idNuevoProducto,
			"title": datos.name,
			"price": parseInt(datos.price),
			"discount": parseInt(datos.discount),
			"requirements_id1": datos.category,
            "requirements_id2": datos.category,
            "requirements_id3": datos.category,
            "requirements_id4": datos.category,
			"desciption": datos.description,
			"image": req.file.filename
		};

		products.push(nuevoProducto);
		fs.writeFileSync(productsFilePath,JSON.stringify(products, null, " "),'utf-8');

		res.redirect('/');
    },
    // Acción de eliminar producto
    eliminarProducto: (req, res) => {
        // Aca va la función para eliminar un producto
    },
    listaProducto: (req, res) => {
        let game = GameListModel.getAll().map(game => GameListModel.getResume(game.id));
        if (game) {
            res.render('products/listProduct', {
                game: game,
            });
        } else {
            res.render('404');
        }
    },
};

module.exports = productsController;