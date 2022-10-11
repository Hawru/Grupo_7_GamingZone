const path = require('path');
const gameVersionModel = require('./base');

gameVersionModel.setFilePath(path.join(__dirname, '/../data/versiones_de_juegos.json'));

module.exports = gameVersionModel;
