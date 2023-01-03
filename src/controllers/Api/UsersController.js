let service = require('../../services/users.js');

module.exports = {
    getAll: async (req, res) => {
        let users = await service.getAll();

        let tmp = {
            count: users.length,
            users: users
        };

        res.send(tmp);
    },

    getOne: async (req, res) => {
        let users = await service.findById(req.params.id);

        if (users) {
            res.send(users);
        } else {
            res.status(404);
            res.send({});
        }
    },
}