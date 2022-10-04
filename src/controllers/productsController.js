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
        let images = [];
        let primary_image_id = null;

        if (req.file) {
            let time = new Date;
            let id = time.getTime();

            images.push({
                id: id,
                src: '/products/' + req.file.filename,
            });

            primary_image_id = id;
        }

        GameListModel.create({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            price_d: req.body.price_d || 0,
            discount: req.body.discount || 0,
            versions: [],
            release_date: req.body.release_date || null,
            primary_image_id: primary_image_id,
            requirements: [],
            scores: [],
            plataforms: [],
            images: images,
        });

        res.redirect('/products/list');
    },
    almacenarProducto1: (req, res) => {
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
        //
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