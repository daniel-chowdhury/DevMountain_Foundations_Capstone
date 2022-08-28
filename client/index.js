
let angle_radian = 0

let goalkeeper_velocity = 0.15
let ball_velocity_x = 0.25
let ball_velocity_y = 0.25

let playground = document.querySelector(".ball_div")
let playground_rect = playground.getBoundingClientRect()

let scorecard = document.querySelector(".score")
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
    }
}

reset() {
    this.x = 2
    this.y = 38
    ball_velocity_y = 0.25
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
let ball = new Ball(document.getElementById("ball"))
let goalkeeper = new Goalkeeper(document.getElementById("goalkeeper"))


// ----------------------------------------------------------------------------------------------------------
function update_ball(time) {
    let ball_rect = ball.rect()
    let goalkeeper_rect = goalkeeper.rect()
    if ((goalkeeper_rect.left > ball_rect.right
        || (goalkeeper_rect.bottom < ball_rect.top || goalkeeper_rect.top > ball_rect.bottom))
        && ball_rect.right < window.innerWidth) {
        ball.update()
        
        window.requestAnimationFrame(update_ball)
    } else {
        if (ball_rect.right >= window.innerWidth) {
            axios.put("/update-score").then(res => {
                scorecard.innerHTML = res.data
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
    if (ball.x < 12) {
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

