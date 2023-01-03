let moment = require('moment');
let { initModels } = require('../database/models1/index.js');
const { Op } = require("sequelize");

module.exports = {
    async getAll() {
        let models = await initModels();

        return await models.users.findAll({
            attributes: {
                exclude: ['password']
            }
        });
    },

    async findById(id) {
        let models = await initModels();

        let user = await models.users.findOne({
            where: {
                id: id
            },
            attributes: {exclude: ['password']},
        });

        return user;
    },
}
