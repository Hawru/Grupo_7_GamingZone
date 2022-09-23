const express = require('express');
const path = require('path');
const app = express();

//Carpeta Public
app.use(express.static('./public'));

//Template engine
app.set('views',  path.join(__dirname, './views'));
app.set('view engine', 'ejs');

//Port
app.listen(3004, () => console.log('server corriendo en puerto 3004'));

//Routes
app.use('/', require('./routes/index.routes'));