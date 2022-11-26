const Sequelize = require('sequelize');
let configs = require('../config/config.js');
let initModels = require('./init-models.js');

// traemos los datos dependiendo el entorno que seleccionemos
let configDb = configs[configs.environment];
console.log(configDb)
// iniciamos la conexión con la base de datos
const sequelize = new Sequelize(configDb.database, configDb.username, configDb.password, {
  host: configDb.host,
  port: configDb.port,
  dialect: configDb.dialect
});

sequelize.authenticate().then(() => {
  console.log('Connection to database has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to database:', err);
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
