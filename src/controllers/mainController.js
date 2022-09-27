const GameListModel = require('../database/models/gameListModel');

const mainController = {
    home: (req, res) => {
        let games = GameListModel.getAll().map(game => GameListModel.getResume(game.id));

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