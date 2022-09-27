const fs = require('fs');
const path = require('path');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');
const base = require('./base');
const gameVersionModel = require('./gameVersionModel');
const plataformModel = require('./plataformModel');
const requirementTypeModel = require('./requirementTypeModel');
const scoreTypeModel = require('./scoreTypeModel');

base.setFilePath(path.join(__dirname, '/../data/lista_de_juegos.json'));

const newBase = {
    ...base,

    saveData() {
        fs.writeFileSync(this.path, JSON.stringify(this.getContents()));
    },

    setContents(data) {
        this.fileContent = data;
    },

    save(game) {
        let list = this.getAll();

        game = {
            ...game,

            id: uuidv4(),
        };

        list.push(game);

        this.setContents(list);

        this.saveData();

        return game;
    },

    getAll() {
        return this.getContents().map(game => this.getResume(game.id));
    },

    findById(id) {
        return this.getResume(id);
    },

    getResume(id) {
        let game = base.findById(id);

        if (!game) {
            return null;
        }

        let primaryImage = game.images.filter(i => i.id == game.primary_image_id)[0] || {};

        let isNew = moment(game.release_date).isAfter(moment().subtract(2, 'weeks')) && moment(game.release_date).isBefore(moment());

        let comingSoon = moment(game.release_date).isAfter(moment());

        let scoreAvg = (game.scores.reduce((sum, score) => sum + score.value, 0) / game.scores.length) || 0;

        let scores = game.scores.map(score => {
            let sc = scoreTypeModel.findById(score.id) || {};

            return {
                ...sc,
                score_value: score.value,
            };
        });

        let versions = game.versions.map(v => {
            return gameVersionModel.findById(v);
        })
        .filter(v => v);

        let plataforms = game.plataforms.map(v => {
            return plataformModel.findById(v);
        })
        .filter(v => v);

        let requirements = game.requirements.map(req => {
            let rq = requirementTypeModel.findById(req.id) || {};

            return {
                ...rq,
                requirement_value: req.value,
            };
        });

        return {
            ...game,
            pretty_price: (game.price + 0).toFixed(2).replace('.', ','),
            pretty_price_d: (game.price_d + 0).toFixed(2).replace('.', ','),
            pretty_discount: (game.discount + 0).toFixed(2).replace('.', ',') + "%",
            primary_image_src: primaryImage.src || '',
            release_date: game.release_date,
            is_new: isNew,
            coming_soon: comingSoon,
            score_avg: scoreAvg,
            versions: versions,
            plataforms: plataforms,
            scores: scores,
            requirements: requirements,
        };
    },
};

module.exports = { ...newBase };