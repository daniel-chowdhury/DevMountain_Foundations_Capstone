let goalpost_velocity = 0.25

class Ball {
constructor(ball_element) {
    this.ball_element = ball_element
}

update(time_delta) {
    this.x += 0.25
}

reset() {

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

class Goalpost {
    constructor(goalpost_element) {
        this.goalpost_element = goalpost_element
    }

    update(time_delta) {
        this.location += goalpost_velocity 
        let rect = this.rect()
        if (rect.bottom >= window.innerHeight || rect.top <= 0) {
            goalpost_velocity = goalpost_velocity*-1
        }
    }

    get location() {
        return parseFloat(getComputedStyle(this.goalpost_element).getPropertyValue("--location"))
    }

    set location(value) {
        this.goalpost_element.style.setProperty("--location", value)
    }


    rect() {
        return this.goalpost_element.getBoundingClientRect()
    }
    
}

let ball = new Ball(document.getElementById("ball"))
let goalpost = new Goalpost(document.getElementById("goalpost"))


let last_time
function update_ball(time) {
    let last_time
    if (last_time !== null) {
        let delta_time = time - last_time
        ball.update(delta_time)
    }
    last_time = time
    window.requestAnimationFrame(update_ball)
}

let last_time2

function update_goalpost(time) {
    console.log("matrix")
    if (last_time2 !== null) {
        let delta_time = time - last_time2
        goalpost.update(delta_time)
    }
    last_time2 = time
    window.requestAnimationFrame(update_goalpost)
}

window.requestAnimationFrame(update_goalpost)

document.getElementById("launch_button").addEventListener("click", (event) => {
    event.preventDefault()
    window.requestAnimationFrame(update_ball)
})

let input = document.querySelector("input")
let form = document.querySelector("form")
form.addEventListener("submit", (event) => {
    event.preventDefault()
    let text = input.value
    text = Number(text)
    ball.y = text
})