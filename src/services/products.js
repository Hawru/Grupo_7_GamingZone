let moment = require('moment');
let { initModels } = require('../database/models1/index.js');
const { Op } = require("sequelize");


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

        return productRequirement
        //models.product_requirement.bulkCreate(productRequirement);
    },

    async createDefaultScores(productId) {
        let models = await initModels();
        let scoreTypes = await models.score_types.findAll();
        let productScore = scoreTypes.map(sco => {
            return {
                product_id: productId,
                score_type_id: sco.dataValues.id,
                value: 0,
            }
        });
 
        await models.product_score.bulkCreate(productScore);
    },

    async getAll() {
        let models = await initModels();

        let tmp = await models.products.findAll({
            where: {
                deleted_at: {
                    [Op.eq]: null
                }
            }
        });
        
        let games = []

        for (const i of tmp) {
            let tmp2 = await (this.getResume(i.dataValues.id || null))
            
            games.push(tmp2)
        }

        return games

    },

    async getResume(productId) {
        let models = await initModels();

        let product = await models.products.findByPk(productId, { include: ['product_images', 'product_scores', 'product_plataforms']});

        if (!product) {
            return null;
        }
        
        let primary_image = product.product_images.filter(img => img.id == product.primary_image_id)[0] || null;

        let scoresData = await models.product_score.findAll({ 
            include: 'score_type',
            where: {
                product_id: {
                  [Op.eq]: productId
                }
        }});

        let scores = []
        for (const i of scoresData) {
            let tmp = {
                score_value: i.dataValues.value,
                title: i.dataValues.score_type.dataValues.title,
            }
            scores.push(tmp);
        }

        let versions = [{ title: 'Standard'}]

        let plataformsData = await models.product_plataform.findAll({ 
            include: 'plataform_type',
            where: {
                product_id: {
                  [Op.eq]: productId
                }
        }});

        let plataforms = [];
        for (const i of plataformsData) {
            let tmp = {
                title: i.dataValues.plataform_type.dataValues.name,
                icon: i.dataValues.plataform_type.dataValues.icon,
            }
            plataforms.push(tmp)
        }

        let requirementsData = await models.product_requirement.findAll({ 
            include: 'requirement',
            where: {
                product_id: {
                  [Op.eq]: productId
                }
        }});

        let requirements = [];
        for (const i of requirementsData) {
            let tmp = {
                value: i.dataValues.value,
                title: i.dataValues.requirement.dataValues.title,
            }
            requirements.push(tmp)
        }

        let primary_image_src = primary_image.dataValues.path;
        let isNew = moment(product.release_date).isAfter(moment().subtract(2, 'weeks')) && moment(product.release_date).isBefore(moment());
        let comingSoon = moment(product.release_date).isAfter(moment());
        let scoreAvg = (product.product_scores.reduce((sum, score) => sum + score.value, 0) / product.product_scores.length) || 0;    
        
        //let versions = product.product_versions.map(async v => {
            //return models.version_types.findByPk(v);
        //})
        //.filter(v => v);
        
        let finalProduct = {
            id: product.dataValues.id,
            name: product.dataValues.name,
            title: product.dataValues.title,
            description: product.dataValues.description,
            price: product.dataValues.price,
            discount: product.dataValues.discount,
            release_date: product.dataValues.release_date,
            scores: scores,
            plataforms: plataforms,
            requirements: requirements,
            versions: versions,
            primary_image_src: primary_image_src,
            isNew: isNew,
            comingSoon: comingSoon,
            scoreAvg: scoreAvg,
        }

        return finalProduct
        
    },
}

