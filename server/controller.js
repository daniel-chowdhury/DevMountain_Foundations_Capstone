const path = require('path')

let score = 5

// let angles = [75, 70, 65, 60, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5, 0, -5, -10, -15, -20, -25, -30, -35, -45, -50, -55, -60, -65, -70, -75]

let ball_angle = 0

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
    }, 

    get_angle: (req, res) => {
        res.send(`${ball_angle}`)
    },

    update_angle: (req, res) => {
        if (ball_angle <= 70 && ball_angle >= -70) {
            if (req.params.angle === "plus") {
                ball_angle = ball_angle + 5
            } else if (req.params.angle === "minus") {
                ball_angle = ball_angle - 5
            }
        } else if (ball_angle === 75) {
            if (req.params.angle === "minus") {
                ball_angle = ball_angle - 5
            }
        } else if (ball_angle === -75) {
            if (req.params.angle === "plus") {
                ball_angle = ball_angle + 5
            }
        }
        res.status(200).send(`${ball_angle}`)
    }
}


