const path = require('path')

let score = 0

module.exports = {
    get_homepage: (req,res) => {
        res.sendFile(path.join(__dirname, '../client/index.html'));
    },

    get_CSS: (req,res) => {
        res.sendFile(path.join(__dirname, '../client/style.css'));
    },

    get_javascript: (req,res) => {
        res.sendFile(path.join(__dirname, '../client/index.js'));
    },

    get_score: (req, res) => {
        res.status(200).send(`The score is:  ${score}`)
    },

    update_score: (req, res) => {
        score++
        res.status(200).send(`The score is:  ${score}`)
    }
}


