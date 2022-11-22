let { initModels } = require('../database/models1/index.js');

module.exports = {
    /**
     * creamos los requerimiento basicos de un producto
     * @param  {[int]} productId
     * @return null
     */
    async createDefaultRequirement(productId) {
        let models = await initModels();

        let requirementTypes = await models.requirement_types.findAll();

        let productRequirement = requirementTypes.map(req => {
            return {
                product_id: productId,
                requirement_id: req.dataValues.id,
                value: 0,
            }
        });

        models.product_requirement.bulkCreate(productRequirement);
    }
}
