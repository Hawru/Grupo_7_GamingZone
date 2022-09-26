const path = require('path');
const fs = require('fs');

const base = {
    path: null,

    fileContent: null,

    setFilePath(path) {
        this.path = path;
    },

    getContents(sync = false) {
        if (!this.fileContent || sync) {
            this.fileContent = this.getFileContents() || [];
        }

        return this.fileContent;
    },

    getFileContents() {
        if (fs.existsSync(this.path)) {
            return JSON.parse(fs.readFileSync(this.path, 'utf8'));
        }

        return null;
    },

    getAll() {
        return this.getContents();
    },

    findById(id) {
        return this.getContents().filter(c => c.id == id)[0] || null;
    },

    findByName(name) {
        return this.getContents().filter(c => {
            return (c.name + "").toLowerCase() == (name + "").toLowerCase();
        })[0] || null;
    },
}

module.exports = base;
