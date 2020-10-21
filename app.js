const { error } = require('console');
const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Register the location for handlebars partials here:

app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials');

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then(responseDB =>{
    res.render('beers', {responseDB});
  })
  .catch(error => console.log(error))
});

app.get('/random', (req, res) => {
  punkAPI.getRandom()
  .then(responseDB =>{
    res.render('randomBeers', {responseDB});
  })
  .catch(error => console.log(error))
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
