const path = require('path');
const base = require('./base');

base.setFilePath(path.join(__dirname, '/../data/versiones_de_juegos.json'));

module.exports = { ...base };
