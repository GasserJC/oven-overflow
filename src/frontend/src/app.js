const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios')

app.use( express.static( "public" ) );
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//API Connections
const RECIPE_API = process.env.RECIPE_API
const RECIPE_URI = `http://${RECIPE_API}`
const LOGIN_API = process.env.LOGIN_API
const LOGIN_URI = `http://${LOGIN_API}`


app.get('/', (req, res) => {
    res.render('index.ejs')
});

app.get('/Pantry', (req, res) => {
  res.render('pantry.ejs')
});

app.get('/Grocery', (req, res) => {
  res.render('grocery.ejs')
});

app.get('/Recipes', (req, res) => {
  res.render('recipes.ejs')
});

app.get('/login', (req, res) => {
  res.render('login.ejs')
});

app.get('/signup', (req, res) => {
  res.render('signup.ejs')
});

app.get('/LoginUsername', async (req, res) =>{
  URI = LOGIN_URI + '/login/jacobG/password'
  axios.get(URI)
    .then(response => {
      res.status(200).send("Response: " + JSON.stringify(response.data) + " ADDY: " + LOGIN_URI)
  }).catch(error => {
    res.status(200).send("ERROR: " + error + " ADDY: " + RECIPE_URI)
  })
})


app.get('*', (req, res) => {
  res.render('Error.ejs')
});

// starts an http server on the $PORT environment variable
const PORT = process.env.PORT || 5555;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

module.exports = app
