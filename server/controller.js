const path = require('path')

let score = 0

let ball_angle = 0

let speed = 0.25

let array = [0, 36, 78]
let i = 0

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
        res.status(200).send(`${score}`)
    },

    update_score: (req, res) => {
        if (req.body.bounce_condition === true) {
        score = score + 4
        } else {
            score++
        }
        let random = i
        while (random === i) {
            random = Math.floor(Math.random()*3)
        }
        i = random
        let send_array = [score, array[i]]
        // console.log("hello world")
        res.status(200).send(send_array)
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
    },

    get_speed: (req, res) => {
        res.send(`${speed}`)
    },

    update_speed: (req, res) => {
        if (speed === 0.50) {
            if (req.params.speed === "plus") {
                speed = speed + 0.25
            } else if (req.params.speed === "minus") {
                speed = speed - 0.25
            }
        } else if (speed === 0.75) {
            if (req.params.speed === "minus") {
                speed = speed - 0.25
            }
        } else if (speed === 0.25) {
            if (req.params.speed === "plus") {
                speed = speed + 0.25
            }
        }
        res.status(200).send(`${speed}`)
    },

    get_goalpost: (req, res) => {
        res.status(200).send(`${array[i]}`)
    },

    reset: (req, res) => {
        score = 0
        ball_angle = 0
        speed = 0.25
        i = 0
        let send_array = [score, ball_angle, speed, array[i]]
        res.status(200).send(send_array)
    }

}


