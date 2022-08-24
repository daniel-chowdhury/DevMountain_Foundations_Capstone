const express = require('express')
const app = express()

const {get_homepage, get_CSS, get_javascript} = require('./controller.js')


app.use(express.json())
app.use(express.static('client'))

app.get('/', get_homepage);

app.get('/css', get_CSS);

  
app.get('/js', get_javascript);


  
const port = process.env.PORT || 4005

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

