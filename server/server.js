const express = require('express')
const app = express()

const {get_homepage, get_CSS, get_javascript, get_score, update_score, get_angle, update_angle, get_speed, update_speed, get_goalpost, reset} = require('./controller.js')


app.use(express.json())
app.use(express.static('client'))

app.get('/', get_homepage);

app.get('/css', get_CSS);

app.get('/js', get_javascript);

app.get('/score', get_score);

app.put('/update-score', update_score)

app.get('/angle', get_angle)

app.put('/:angle', update_angle)

app.get('/speed', get_speed)

app.put('/speed/:speed', update_speed)

app.get('/goalpost', get_goalpost)

app.get('/reset', reset)

// app.put('/update-goalpost', update_goalpost)




  
const port = process.env.PORT || 4005

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

