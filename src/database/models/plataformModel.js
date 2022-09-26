const path = require('path');
const base = require('./base');

base.setFilePath(path.join(__dirname, '/../data/plataformas.json'));

module.exports = base;
