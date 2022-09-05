const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, '/public')));

app.get('/home', (req,res) =>{
    res.sendFile((path.join(__dirname, '/views/home.html')));
});

app.get('/cart', (req,res) =>{
    res.sendFile((path.join(__dirname, '/views/cart.html')));
});

app.get('/login', (req,res) =>{
    res.sendFile((path.join(__dirname, '/views/login.html')));
});

app.get('/product', (req,res) =>{
    res.sendFile((path.join(__dirname, '/views/product.html')));
});

app.get('/register', (req,res) =>{
    res.sendFile((path.join(__dirname, '/views/register.html')));
});

app.listen(PORT, function() {
    console.log("Servidor corriendo")
});