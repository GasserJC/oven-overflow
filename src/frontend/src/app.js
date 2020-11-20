const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios')
const session = require('express-session');
const { isRegExp } = require('util');

app.use( express.static( "public" ) );
app.use(session ({
  secret: 'smart-grocer-secret',
  resave: false,
  saveUninitialized: true,
}))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//API Connections
const RECIPE_API = process.env.RECIPE_API
const RECIPE_URI = `http://${RECIPE_API}/`
const LOGIN_API = process.env.LOGIN_API
const LOGIN_URI = `http://${LOGIN_API}/`

app.get('/', (req, res) => {
    if(!req.session.login){
      req.session.login = 'Log In'
    }
    console.log(req.session.login)
    ejsData = {
      name: req.session.login
    }
    res.render('index.ejs', ejsData)
});

app.get('/Pantry', (req, res) => {
  if(!req.session.login){
    req.session.login = 'Log In'
  }
  ejsData = {
    name: req.session.login
  }
  if(req.session.login == 'Log In'){
    res.render('login.ejs', ejsData)
  } else {
    res.render('pantry.ejs', ejsData)
  }
});

app.get('/Grocery', (req, res) => {
  if(!req.session.login){
    req.session.login = 'Log In'
  }
  ejsData = {
    name: req.session.login
  }
  if(req.session.login == 'Log In'){
    res.render('login.ejs', ejsData)
  } else {
    res.render('grocery.ejs', ejsData)
  }
});

app.get('/meals', (req, res) => {
  if(!req.session.login){
    req.session.login = 'Log In'
  }
  ejsData = {
    name: req.session.login
  }
  if(req.session.login == 'Log In'){
    res.render('login.ejs', ejsData)
  } else {
    res.render('grocery.ejs', ejsData)
  }
});

app.get('/Recipes', (req, res) => {
  if(!req.session.login){
    req.session.login = 'Log In'
  }
  res.render('recipes.ejs')
});

app.get('/login', (req, res) => {
  req.session.login = 'Log In'
  res.render('login.ejs')
});

app.get('/signup', (req, res) => {
  if(!req.session.login){
    req.session.login = 'Log In'
  }
  res.render('signup.ejs')
});

app.get('/LoginUsername', async (req, res) =>{
  if(!req.session.login){
    req.session.login = 'Log In'
  }
  console.log(req)
  username = req.query.username
  password = req.query.password
  URI = LOGIN_URI + 'login/' + username + '/' + password
  console.log(URI)
  axios.get(URI)
    .then(response => {
      session.credentials = username
      if(JSON.stringify(response.data) != "{}"){
        req.session.login = username
        ejsData = {
          name: req.session.login
        }
        res.render('index.ejs', ejsData)
      } else {
        res.render('login.ejs')
      }
  }).catch( () => {
    res.render('Error.ejs')
  })
})

app.get('/SignUpUser', async (req, res) =>{
  if(!req.session.login){
    req.session.login = 'Log In'
  }
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

app.get('/RecipeList', async (req, res) =>{
  if(!req.session.login){
    req.session.login = 'Log In'
  }
  console.log(req)
  title = req.query.title
  URI = RECIPE_URI + 'byName/'+ title
  console.log(URI)
  axios.get(URI)
    .then(response => {
      if(JSON.stringify(response.data) != "{}"){
        for( i = 0; i < response.data.results.length; i++){
          for( j = 0; j < response.data.results.length; j++){
            if(i != j){
              if(response.data.results[i].title == response.data.results[j].title){
                response.data.results.splice(1,i)
              }
            }
          }
        }
        res.render('recipeList.ejs', response.data)
      } else {
        viewData = {
          message: "Sorry, we could not find any matching foods!"
        }
        res.render('DisplayMessage.ejs', viewData)
      }
      
  }).catch( (error) => {
    res.status(200).send(error)//('Error.ejs')
  })
})

app.get('/RecipeDetails/:title', async (req, res) =>{
  if(!req.session.login){
    req.session.login = 'Log In'
  }
  title = req.params['title'] 
  /*
    WARNING:  
    NEED TO UPDATE RECIPES SERVICE WITH AN EXPLICIT (NON CONTAINS SEARCH)
  */
  URI = RECIPE_URI + 'byDetail/'+ title
  axios.get(URI)
    .then(response => {
      if(JSON.stringify(response.data) != "{}"){
        //res.status(200).send(response.data.results[0])
        res.render('recipe.ejs', response.data.results[0])
      } else {
        viewData = {
          message: "Sorry, we could not find get the recipe data!",
        }
        res.render('DisplayMessage.ejs', viewData)
      }
      
  }).catch( (error) => {
    res.status(200).send(error)//('Error.ejs')
  })
})



app.get('*', (req, res) => {
  if(!req.session.login){
    req.session.login = 'Log In'
  }
  res.render('Error.ejs')
});

// starts an http server on the $PORT environment variable
const PORT = process.env.PORT || 5555;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

module.exports = app
