
let angle_radian = 0

let goalkeeper_velocity = 0.15
let ball_velocity_x = 0.25
let ball_velocity_y = 0.25

let playground = document.querySelector(".ball_div")
let playground_rect = playground.getBoundingClientRect()

let scorecard = document.querySelector(".score")

let bounce_condition = false
// ----------------------------------------------------------------------------------------------------------
class Ball {
constructor(ball_element) {
    this.ball_element = ball_element
}

update() {
    this.x += ball_velocity_x*(Math.cos(angle_radian))
    this.y -= ball_velocity_y*(Math.sin(angle_radian))
    let rect = this.rect()
    if (rect.top <= playground_rect.top || rect.bottom >= playground_rect.bottom ) {
        ball_velocity_y = ball_velocity_y*-1
        bounce_condition = true
    }
}

reset() {
    this.x = 1
    this.y = 32
    ball_velocity_y = 0.25
    bounce_condition = false
}

get x() {
    return parseFloat(getComputedStyle(this.ball_element).getPropertyValue("--x"))
}

set x(value) {
    this.ball_element.style.setProperty("--x", value)
}

get y() {
    return parseFloat(getComputedStyle(this.ball_element).getPropertyValue("--y"))
}

set y(value) {
    this.ball_element.style.setProperty("--y", value)
}

rect() {
    return this.ball_element.getBoundingClientRect()
}

}
// ----------------------------------------------------------------------------------------------------------
class Goalkeeper {
    constructor(goalkeeper_element) {
        this.goalkeeper_element = goalkeeper_element
    }

    update() {
        this.location -= goalkeeper_velocity 
        let rect = this.rect()
        if (rect.top <= playground_rect.top || rect.bottom >= playground_rect.bottom ) {
            goalkeeper_velocity = goalkeeper_velocity*-1
        }
    }

    get location() {
        return parseFloat(getComputedStyle(this.goalkeeper_element).getPropertyValue("--location"))
    }

    set location(value) {
        this.goalkeeper_element.style.setProperty("--location", value)
    }


    rect() {
        return this.goalkeeper_element.getBoundingClientRect()
    }
    
}
// ----------------------------------------------------------------------------------------------------------
class Goalpost {
    constructor(goalpost_element) {
        this.goalpost_element = goalpost_element
    }

    update() {
        let array = [0, 40, 78]
        let current_location = this.location
        let index = array.indexOf(current_location)
        let random = index
        while (random === index) {
            random = Math.floor(Math.random()*3)
        }
        this.location = array[random]
    }

    get location() {
        return parseInt(getComputedStyle(this.goalpost_element).getPropertyValue("--location"))
    }

    set location(value) {
        this.goalpost_element.style.setProperty("--location", value)
    }


    rect() {
        return this.goalpost_element.getBoundingClientRect()
    }
    
}
// ----------------------------------------------------------------------------------------------------------

let ball = new Ball(document.getElementById("ball"))
let goalkeeper = new Goalkeeper(document.getElementById("goalkeeper"))
let goalpost = new Goalpost(document.getElementById("goalpost"))


// ----------------------------------------------------------------------------------------------------------
function update_ball(time) {
    let ball_rect = ball.rect()
    let goalkeeper_rect = goalkeeper.rect()
    let goalpost_rect = goalpost.rect()
    if (((goalkeeper_rect.left > ball_rect.right || goalkeeper_rect.right < ball_rect.left)
        || (goalkeeper_rect.bottom < ball_rect.top || goalkeeper_rect.top > ball_rect.bottom))
        && ball_rect.right < window.innerWidth
        && (goalpost_rect.left > ball_rect.right
            || (goalpost_rect.bottom < ball_rect.top || goalpost_rect.top > ball_rect.bottom))) {
        ball.update()
        // console.log(goalkeeper_rect.left + " goalkeeper " + goalkeeper_rect.right + " " + goalkeeper_rect.top + " " + goalkeeper_rect.bottom)
        // console.log(ball_rect.left + " ball " + ball_rect.right + " " + ball_rect.top + " " + ball_rect.bottom)
        window.requestAnimationFrame(update_ball)
    } else {
        if ((goalpost_rect.left <= ball_rect.right) && (goalpost_rect.bottom >= ball_rect.top && goalpost_rect.top <= ball_rect.bottom)) {
            let send_obj = {bounce_condition}
            axios.put("/update-score", send_obj).then(res => {
                scorecard.innerHTML = res.data
                goalpost.update()
            }).catch(err => console.log(err))
        }
        ball.reset()
    }
    
}
// ----------------------------------------------------------------------------------------------------------


function update_goalkeeper(time) {

    goalkeeper.update()
    window.requestAnimationFrame(update_goalkeeper)
}

window.requestAnimationFrame(update_goalkeeper)

document.getElementById("launch_button").addEventListener("click", (event) => {
    event.preventDefault()
    if (ball.x < 2) {
    window.requestAnimationFrame(update_ball)
    }
})
// ----------------------------------------------------------------------------------------------------------

axios.get("/score").then(res => {
scorecard.innerHTML = res.data
}).catch(error => console.log(error))
// ----------------------------------------------------------------------------------------------------------
let angle_stat = document.getElementById("angle_p")
document.getElementById("angle_up_btn").addEventListener("click", update_angle)
document.getElementById("angle_down_btn").addEventListener("click", update_angle)

function update_angle(event) {
    let angle_button = event.target
    let send = ""
    if (angle_button.innerHTML === "+") {
        send = "plus"
    } else {
        send = "minus"
    }
    axios.put(`/${send}`).then(res => {
        let angle = parseInt(res.data)
        angle_stat.innerHTML = `Launch angle is:  ${angle}`
        angle_radian = angle*(Math.PI/180)
    }).catch(error => console.log(error))
}

axios.get('/angle').then(res => {
    let angle = parseInt(res.data)
    angle_stat.innerHTML = `Launch angle is:  ${angle}`
    angle_radian = angle*(Math.PI/180)
}).catch(error => console.log(error))

