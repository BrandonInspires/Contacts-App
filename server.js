const express = require('express')
const bodyParser = require('body-parser')
const database = require('./database')
const app = express()

require('ejs')
app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  database.getContacts((error, contacts) => {
    if (error) {
      res.status(500).render('error', {
        error: error,
      })
    } else {
      res.render('index', {
        contacts: contacts,
      })
    }
  })
})

app.use((req, resp) => {
  res.status(404).render('not_found')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})
