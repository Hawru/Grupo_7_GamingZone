let moment = require('moment');
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
    },

    async getResume(productId) {
        let models = await initModels();

        let product = await models.products.findByPk(productId, { include: ['product_images', 'product_scores', 'product_versions']});

        if (!product) {
            return null;
        }

        let primary_image = product.product_images.filter(img => img.id == product.primary_image_id)[0] || null;

        let isNew = moment(product.release_date).isAfter(moment().subtract(2, 'weeks')) && moment(product.release_date).isBefore(moment());

        let comingSoon = moment(product.release_date).isAfter(moment());

        let scoreAvg = (product.product_scores.reduce((sum, score) => sum + score.value, 0) / product.product_scores.length) || 0;

        let scores = product.product_scores.map(async score => {
            let sc = await models.score_types.findByPk(score.id) || {};

            return {
                ...sc,
                score_value: score.value,
            };
        });

        let versions = product.product_versions.map(async v => {
            //return models.version_types.findByPk(v);
        })
        .filter(v => v);

        return {}
    },
}
