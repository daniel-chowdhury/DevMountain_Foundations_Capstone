const path = require('path')

module.exports = {
    get_homepage: (req,res) => {
        res.sendFile(path.join(__dirname, '../client/index.html'));
    },

    get_CSS: (req,res) => {
        res.sendFile(path.join(__dirname, '../client/style.css'));
    },

    get_javascript: (req,res) => {
        res.sendFile(path.join(__dirname, '../client/index.js'));
    }
}


