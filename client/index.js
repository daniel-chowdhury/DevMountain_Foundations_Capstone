let goalpost_velocity = 0.25
// ----------------------------------------------------------------------------------------------------------
class Ball {
constructor(ball_element) {
    this.ball_element = ball_element
}

update() {
    this.x += 0.25
}

reset() {
    this.x = 10
    this.y = 50
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
class Goalpost {
    constructor(goalpost_element) {
        this.goalpost_element = goalpost_element
    }

    update() {
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
// ----------------------------------------------------------------------------------------------------------
let ball = new Ball(document.getElementById("ball"))
let goalpost = new Goalpost(document.getElementById("goalpost"))



function update_ball(time) {
    let ball_rect = ball.rect()
    let goalpost_rect = goalpost.rect()
    if ((goalpost_rect.left > ball_rect.right
        || (goalpost_rect.bottom < ball_rect.top || goalpost_rect.top > ball_rect.bottom))
        && ball_rect.right < window.innerWidth) {
        ball.update()
        window.requestAnimationFrame(update_ball)
    } else {
        ball.reset()
    }
    
}



function update_goalpost(time) {

    goalpost.update()
    window.requestAnimationFrame(update_goalpost)
}

window.requestAnimationFrame(update_goalpost)

document.getElementById("launch_button").addEventListener("click", (event) => {
    event.preventDefault()
    if (ball.x < 12) {
    window.requestAnimationFrame(update_ball)
    }
})

let input = document.querySelector("input")
let form = document.querySelector("form")
form.addEventListener("submit", (event) => {
    event.preventDefault()
    let text = input.value
    text = Number(text)
    ball.y = text
})