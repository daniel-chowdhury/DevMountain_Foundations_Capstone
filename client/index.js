
let goalkeeper_velocity = 0.15

let playground = document.querySelector(".ball_div")
let playground_rect = playground.getBoundingClientRect()

let scorecard = document.querySelector(".score")
// ----------------------------------------------------------------------------------------------------------
class Ball {
constructor(ball_element) {
    this.ball_element = ball_element
}

update() {
    this.x += 0.25
}

reset() {
    this.x = 2
    this.y = 38
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
            axios.put("/update-score")
            .then(res => {
                scorecard.innerHTML = res.data
            }).catch(err => {
                console.log(err)
            })
        }
        ball.reset()
    }
    
}



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

let input = document.querySelector("input")
let form = document.querySelector("form")
form.addEventListener("submit", (event) => {
    event.preventDefault()
    let text = input.value
    text = Number(text)
    ball.y = text
})

axios.get("/score")
.then(res => {
scorecard.innerHTML = res.data
})
.catch(error => console.log(error))