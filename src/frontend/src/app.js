const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios')

app.use( express.static( "public" ) );
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//API Connections
const RECIPE_API = process.env.RECIPE_API
const RECIPE_URI = `http://${RECIPE_API}/`
const LOGIN_API = process.env.LOGIN_API
const LOGIN_URI = `http://${LOGIN_API}/`


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
  console.log(req)
  username = req.query.username
  password = req.query.password
  URI = LOGIN_URI + 'login/' + username + '/' + password
  console.log(URI)
  axios.get(URI)
    .then(response => {
      if(JSON.stringify(response.data) != "{}"){
        res.render('index.ejs')
      } else {
        res.render('login.ejs')
      }
  }).catch( () => {
    res.render('Error.ejs')
  })
})

app.get('/SignUpUser', async (req, res) =>{
  console.log(req)
  username = req.query.usr
  password = req.query.pwd
  email = req.query.eml
  URI = LOGIN_URI + 'newlogin/'+ username + '/' + password + '/' + email 
  console.log(URI)
  axios.get(URI)
    .then(response => {
      if(JSON.stringify(response.data) != "{}"){
        res.render('login.ejs')
      } else {
        res.render('signup.ejs')
      }
  }).catch( () => {
    res.render('Error.ejs')
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
