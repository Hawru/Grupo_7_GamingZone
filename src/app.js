require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();
const methodOverride = require('method-override');
const PORT = process.env.PORT || 3000
const session = require('express-session');
const cors = require('cors')
//Carpeta Public
app.use(express.static('./public'));
app.use(cors());
//Template engine
app.set('views',  path.join(__dirname, './views'));
app.set('view engine', 'ejs');

//Port
app.listen(PORT, () => console.log('server corriendo en puerto 3000'));

//Configuro methodOverride
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'a Secret',
    resave: false,
    saveUninitialized: true,
  }, ))

app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});

//Routes
app.use('/', require('./routes/index.routes'));

app.use(function(req, res, next) {
    res.status(404).render('404');
});

app.use(function(err, req, res, next) {
    res.status(500).render('500');
});
