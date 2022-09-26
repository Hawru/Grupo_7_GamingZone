const moment = require('moment');
const path = require('path');
const GameListModel = require('../database/models/gameListModel');
const GameVersionModel = require('../database/models/gameVersionModel');
const PlataformModel = require('../database/models/plataformModel');
const RequirementTypeModel = require('../database/models/requirementTypeModel');
const ScoreTypeModel = require('../database/models/scoreTypeModel');

const mainController = {
    home: (req, res) => {
        let games = GameListModel.getAll().map(game => {
            let primaryImage = game.images.filter(i => i.id == game.primary_image_id)[0] || {};

            let isNew = moment(game.release_date).isAfter(moment().subtract(2, 'weeks')) && moment(game.release_date).isBefore(moment());

            let comingSoon = moment(game.release_date).isAfter(moment());

            let scoreAvg = (game.score.reduce((sum, score) => sum + score.value, 0) / game.score.length) || 0;

            return {
                id: game.id,
                title: game.title,
                description: game.description,
                price: (game.price + 0).toFixed(2).replace('.', ','),
                price_d: (game.price_d + 0).toFixed(2).replace('.', ','),
                discount: (game.discount + 0),
                primary_image_src: primaryImage.src || '',
                release_date: game.release_date,
                is_new: isNew,
                coming_soon: comingSoon,
                score_avg: scoreAvg,
            };
        });

        let news = games.filter(game => game.is_new);

        let comingSoon = games.filter(game => game.coming_soon);

        let offers = games.filter(game => game.discount != 0);

        let topSales = games.sort((a, b) => {
            if (a.score_avg < b.score_avg) {
                return -1;
            } else {
                if (a.score_avg > b.score_avg) {
                    return 1;
                } else {
                    return 0;
                }
            }
        });

console.log(topSales);
        res.render('home', {
            games: games,
            news: news,
            comingSoon: comingSoon,
            offers: offers,
            topSales: topSales,
        });
    },
    cart: (req, res) => {
        res.render('cart');
    },
};

module.exports = mainController;