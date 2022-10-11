const path = require('path');
const plataformModel = require('./base');

plataformModel.setFilePath(path.join(__dirname, '/../data/plataformas.json'));

module.exports = plataformModel;
