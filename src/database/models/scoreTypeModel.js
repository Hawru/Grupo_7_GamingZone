const path = require('path');
const base = require('./base');

base.setFilePath(path.join(__dirname, '/../data/tipos_de_puntuacion.json'));

module.exports = base;
