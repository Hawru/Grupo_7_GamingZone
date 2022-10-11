const path = require('path');
const users = require('./base');

users.setFilePath(path.join(__dirname, '/../data/usuarios.json'));

module.exports = users;
