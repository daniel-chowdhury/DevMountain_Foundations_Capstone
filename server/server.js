const express = require('express')
const app = express()

const {get_homepage, get_CSS, get_javascript, get_score, update_score, get_angle, update_angle} = require('./controller.js')


app.use(express.json())
app.use(express.static('client'))

app.get('/', get_homepage);

app.get('/css', get_CSS);

  
app.get('/js', get_javascript);

app.get('/score', get_score);

app.put('/update-score', update_score)

app.get('/angle', get_angle)

app.put('/:angle', update_angle)




  
const port = process.env.PORT || 4005

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

