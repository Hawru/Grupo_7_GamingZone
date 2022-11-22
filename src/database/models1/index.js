const Sequelize = require('sequelize');
let configs = require('../config/config.js');
let initModels = require('./init-models.js');

// traemos los datos dependiendo el entorno que seleccionemos
let configDb = configs[configs.environment];

// iniciamos la conexión con la base de datos
const sequelize = new Sequelize(configDb.database, configDb.username, configDb.password, {
  host: configDb.host,
  port: configDb.port,
  dialect: configDb.dialect
});

// exportamos una funcion que retorna promesa para poder tomar la instancia limpia desde donde lo llamemos
function initModelsPromise() {
  return new Promise((resolve, reject) => {
    sequelize
      .authenticate()
      .then(() => resolve(initModels(sequelize)))
      .catch(e => reject(e))
  })
}

module.exports = {
  initModels: initModelsPromise,
  sequelize: sequelize,
}
