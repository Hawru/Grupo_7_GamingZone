const express = require('express');
const path = require('path');
const app = express();
const methodOverride = require('method-override')
const PORT = process.env.PORT || 3000

//Carpeta Public
app.use(express.static('./public'));

//Template engine

app.set('views',  path.join(__dirname, './views'));
app.set('view engine', 'ejs');

//Port
app.listen(PORT, () => console.log('server corriendo en puerto 3000'));

//Routes
app.use('/', require('./routes/index.routes'));

//Configuro methodOverride
app.use(methodOverride('_method'));

app.use(function(req, res, next) {
    res.status(404).render('404');
  });