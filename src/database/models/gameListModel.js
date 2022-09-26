const fs = require('fs');
const path = require('path');
const base = require('./base');
const { v4: uuidv4 } = require('uuid');

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
};

module.exports = newBase;
