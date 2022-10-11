const path = require('path');
const scoreTypeModel = require('./base');

scoreTypeModel.setFilePath(path.join(__dirname, '/../data/tipos_de_puntuacion.json'));

module.exports = scoreTypeModel;
