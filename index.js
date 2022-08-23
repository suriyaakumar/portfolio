const path = require('path')
const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use('/public', express.static(path.join(__dirname, '/public')))

app.get('/', (req, res) => {
  res.render('home.ejs')
})

app.listen(3000, () => console.log('Server spin up!'))
