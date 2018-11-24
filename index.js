const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

app.get('/', (req, res) => {
  res.render('main')
})

app.post('/check', (req, res) => {
  const { age } = req.body

  if (age >= 18) {
    return res.redirect(`major?age=${age}`)
  }
  return res.redirect(`minor?age=${age}`)
})

const check = (req, res, next) => {
  console.log(req.query.age)
  if (!req.query.age) {
    return res.redirect('/')
  }
  return next()
}

app.get('/major', check, (req, res) => {
  res.render('major', { age: req.query.age })
})

app.get('/minor', check, (req, res) => {
  res.render('minor', { age: req.query.age })
})

app.listen(3000, () => {
  console.log('Server started on port 3000')
})
