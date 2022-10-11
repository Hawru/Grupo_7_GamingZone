const path = require('path');
const requirementTypeModel = require('./base');

requirementTypeModel.setFilePath(path.join(__dirname, '/../data/tipos_de_requerimientos.json'));

module.exports = requirementTypeModel;
