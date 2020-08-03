const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const app = express()

const MONGO_URL = process.env.MONGODB_URI || 'mongodb://mongo:27017/url_shortner';

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
  if (err) console.log(`Error ocurred while connecting to DB! - ${MONGO_URL}`);
  else console.log('Database connection established successfully');
});

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
  const shortUrls = await ShortUrl.find()
  res.render('index', { shortUrls: shortUrls })
})

app.post('/shortUrls', async (req, res) => {
  await ShortUrl.create({ full: req.body.fullUrl })

  res.redirect('/')
})

app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
  if (shortUrl == null) return res.sendStatus(404)

  shortUrl.clicks += 1
  shortUrl.save()

  res.redirect(shortUrl.full)
})

app.listen(process.env.PORT || 8080, () => { console.log('Web application started...') });
