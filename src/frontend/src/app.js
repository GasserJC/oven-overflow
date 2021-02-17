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
const PANTRY_API = process.env.PANTRY_API
const PANTRY_URI = `http://${PANTRY_API}/`

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

app.get('/pantry', (req, res) => {
  try{
    if(!req.session.login){
      req.session.login = 'Log In'
    }
    ejsData = {
      name: req.session.login
    }
    if(req.session.login == 'Log In'){
      res.render('login.ejs', ejsData)
    } else {
      URI = PANTRY_URI + 'GetPantry/'+ req.session.login
      axios.get(URI)
      .then(response => {
          ejsData = {
            name: req.session.login,
            ingredients: response.data.ingredients
          }
          res.render('pantry.ejs', ejsData)
      }).catch( (err) => {
        ejsData = {
          name: req.session.login || 'Log In',
        }
        res.status(200).send("Error", ejsData)
      })
    }
  } catch {
    if(!req.session.login){
      req.session.login = 'Log In'
    }
    ejsData = {
      name: req.session.login
    }
    res.render('Error.ejs', ejsData)
  }
});

app.get('/AddIngredient', (req,res) => {
  try{
    ingr = req.query.title
    if (!req.session.login){
      req.session.login = 'Log In'
      ejsData = {
        name: req.session.login
      }
      if(req.session.login == 'Log In'){
        res.render('login.ejs', ejsData)
      }
    } else {
      if(ingr == '' || ingr.length == 0){
        ingr = 'empty'
      }
      URI = `${PANTRY_URI}AddItem/${ingr}/${req.session.login}`
      axios.get(URI)
      .then(response => {
          console.log(response.data)
          URI = `${PANTRY_URI}GetPantry/${req.session.login}`
          console.log(URI)
          axios.get(URI)
          .then(response => {
            console.log(response.data.ingredients)
              ejsData = {
                name: req.session.login,
                ingredients: response.data.ingredients
              }
              console.log(response.data.ingredients)
              res.render('pantry.ejs', ejsData)
          }).catch( (err) => {
            ejsData = {
              name: req.session.login || 'Log In',
            } 
            res.send(err)
          }) 
        }).catch((err) => {
        ejsData = {
          name: req.session.login || 'Log In',
        }
        res.status(200).send("Error.ejs", ejsData)
      }) 
    }
  } catch {
    if(!req.session.login){
      req.session.login = 'Log In'
    }
    ejsData = {
      name: req.session.login
    }
    res.render('Error.ejs', ejsData)
  }
});

app.get('/RemoveIngredient', (req,res) => {
  try{
    ingr = req.query.title
    if(!req.session.login){
      req.session.login = 'Log In'
    }
    ejsData = {
      name: req.session.login
    }
    if(req.session.login == 'Log In'){
      res.render('login.ejs', ejsData)
    } else {
      URI = `${PANTRY_URI}RemoveItem/${ingr}/${req.session.login}`
      axios.get(URI)
      .then(response => {
          console.log(response.data)
          URI = `${PANTRY_URI}GetPantry/${req.session.login}`
          console.log(URI)
          axios.get(URI)
          .then(response => {
            console.log(response.data.ingredients)
              ejsData = {
                name: req.session.login,
                ingredients: response.data.ingredients
              }
              console.log(response.data.ingredients)
              res.render('pantry.ejs', ejsData)
          }).catch( (err) => {
            ejsData = {
              name: req.session.login || 'Log In',
            } 
            res.send(err)
          }) 
        }).catch((err) => {
        ejsData = {
          name: req.session.login || 'Log In',
        }
        res.status(200).send("Error.ejs", ejsData)
      }) 
    }
  } catch {
    if(!req.session.login){
      req.session.login = 'Log In'
    }
    ejsData = {
      name: req.session.login
    }
    res.render('Error.ejs', ejsData)
  }
});

app.get('/RecipePantryList', (req, res) => {
  try{
    if(!req.session.login || req.session.login == 'Log In'){
      req.session.login = 'Log In'
      ejsData = {
        name: req.session.login
      }
      res.render('login.ejs', ejsData)
    } else {
      // add expected result code here
      URI = `${PANTRY_URI}GetPantry/${req.session.login}`
      console.log(URI)
      axios.get(URI)
      .then(response => {
        URI = `${RECIPE_URI}byPantry`
        pantry = {
          ingredients: response.data.ingredients
        }
        if(response.data.ingredients.length != 0){
        axios.put(URI, pantry)
        .then(response => {
          //call the recipeList page
          ejsData = {
            name: req.session.login,
            results: response.data.results
          }
          res.render("userRecipeList.ejs", ejsData)
        }).catch( (err) => {
          //error for recipe list
          res.send(err)
          ejsData = {
            name: req.session.login || 'Log In',
          } 
          //res.render("Error.ejs", ejsData)
        })
      } else {
        ejsData = {
          name: req.session.login || 'Log In',
          message: "Your Pantry Is Empty."
        } 
        res.render("DisplayMessage.ejs", ejsData)
      }
      }).catch( (err) => {
        ejsData = {
          name: req.session.login || 'Log In',
        } 
        res.render("Error.ejs", ejsData)
      })
      
    }
  }
  catch{ 
    if(!req.session.login){
      req.session.login = 'Log In'
    }
    ejsData = {
      name: req.session.login
    }
    res.render('index.ejs', ejsData)
  }
});

app.get('/Recipes', (req, res) => {
  try{
    if(!req.session.login){
      req.session.login = 'Log In'
    }
    ejsData = {
      name: req.session.login
    }
    res.render('recipes.ejs', ejsData)
  }
  catch{
    if(!req.session.login){
      req.session.login = 'Log In'
    }
    ejsData = {
      name: req.session.login
    }
    res.render('index.ejs', ejsData)
  }
});

app.get('/login', (req, res) => {
  try{
    req.session.login = 'Log In'
    ejsData = {
      name: req.session.login
    }
    res.render('login.ejs', ejsData)
  }catch{
    if(!req.session.login){
      req.session.login = 'Log In'
    }
    ejsData = {
      name: req.session.login
    }
    res.render('Error.ejs', ejsData)
  }
});

app.get('/signup', (req, res) => {
  try{
    if(!req.session.login){
      req.session.login = 'Log In'
    }
    ejsData = {
      name: req.session.login
    }
    res.render('signup.ejs', ejsData)
  } catch {
    if(!req.session.login){
      req.session.login = 'Log In'
    }
    ejsData = {
      name: req.session.login
    }
    res.render('Error.ejs', ejsData)
  }
});

app.get('/LoginUsername', async (req, res) =>{
  try{
  if(!req.session.login){
    req.session.login = 'Log In'
  }
  console.log(req)
  username = req.query.username
  password = req.query.password
  URI = LOGIN_URI + 'x812nka8hjsa10/login/' + username + '/' + password
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
        if(!req.session.login){
          req.session.login = 'Log In'
        }
        ejsData = {
          name: req.session.login
        }
        res.render('login.ejs', ejsData)
      }
  }).catch( () => {
    if(!req.session.login){
      req.session.login = 'Log In'
    }
    ejsData = {
      name: req.session.login
    }
    res.render('Error.ejs', ejsData)
  })
  }catch{
    if(!req.session.login){
      req.session.login = 'Log In'
    }
    ejsData = {
      name: req.session.login
    }
    res.render('Error.ejs', ejsData)
}


})

app.get('/SignUpUser', async (req, res) =>{
  try{
  if(!req.session.login){
    req.session.login = 'Log In'
  }
  username = req.query.usr
  password = req.query.pwd
  email = req.query.eml
  URI = LOGIN_URI + 'newlogin/'+ username + '/' + password + '/' + email 
  req.session.login = 'Log In'
  ejsData = {
    name: req.session.login
  }
  axios.get(URI)
    .then(response => {
      if(JSON.stringify(response.data) != "{}"){
        res.render('login.ejs', ejsData)
      } else {
        res.render('signup.ejs', ejsData)
      }
  }).catch( () => {
    res.render('Error.ejs', ejsData)
  })
  } catch {
    if(!req.session.login){
      req.session.login = 'Log In'
    }
    ejsData = {
      name: req.session.login
    }
    res.render('Error.ejs', ejsData)
  }
})

app.get('/RecipeList', async (req, res) =>{
  try{
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
        ejsData = {
          recipes: response.data,
          name: req.session.login
        } 
        res.render("recipeList.ejs", ejsData)
      } else {
        viewData = {
          message: "Sorry, we could not find any matching foods!"
        }
        res.render('DisplayMessage.ejs', viewData)
      }
      
  }).catch( (error) => {
    res.status(200).send(error)//('Error.ejs')
  })    
  } catch{
    if(!req.session.login){
      req.session.login = 'Log In'
    }
    ejsData = {
      name: req.session.login
    }
    res.render('Error.ejs', ejsData)
  }
})

app.get('/RecipeDetails/:title', async (req, res) =>{
  try{
  if(!req.session.login){
    req.session.login = 'Log In'
  }
  title = req.params['title'] 
  URI = RECIPE_URI + 'byDetail/'+ title
  axios.get(URI)
    .then(response => {
      if(JSON.stringify(response.data) != "{}"){
        //res.status(200).send(response.data.results[0])
        ejsData = {
          name: req.session.login,
          recipe: response.data.results[0]
        }
        res.render('recipe.ejs', ejsData)
      } else {
        ejsData = {
          name: req.session.login,
          message: "Sorry, we could not find get the recipe data!",
        }
        res.render('DisplayMessage.ejs', ejsData)
      }
  }).catch( (error) => {
    res.status(200).send(error)//('Error.ejs')
  })
  } catch {
    if(!req.session.login){
      req.session.login = 'Log In'
    }
    ejsData = {
      name: req.session.login
    }
    res.render('Error.ejs', ejsData)
  }
})


app.get('/create', (req, res) => {
  try{
    if(!req.session.login){
      req.session.login = 'Log In'
    }
    ejsData = {
      name: req.session.login
    }
    if(req.session.login == 'Log In'){
      res.render('login.ejs', ejsData)
    } else {
      ejsData = {
        name: req.session.login,
        message: "This Feature will be coming in the Future"
      }
      res.render('DisplayMessage.ejs', ejsData)
    }
  } catch {
    if(!req.session.login){
      req.session.login = 'Log In'
    }
    ejsData = {
      name: req.session.login
    }
    res.render('Error.ejs', ejsData)
  }
});

app.get('/qa', (req, res) => {
  try{
    if(!req.session.login){
      req.session.login = 'Log In'
    }
    ejsData = {
      name: req.session.login
    }
    if(req.session.login == 'Log In'){
      res.render('login.ejs', ejsData)
    } else {
      ejsData = {
        name: req.session.login,
        message: "This Feature will be coming in the Future"
      }
      res.render('DisplayMessage.ejs', ejsData)
      } 
    }catch {
    if(!req.session.login){
      req.session.login = 'Log In'
    }
    ejsData = {
      name: req.session.login
    }
    res.render('Error.ejs', ejsData) 
  }
});


app.get('*', (req, res) => {
  if(!req.session.login){
    req.session.login = 'Log In'
  }
  ejsData = {
    name: req.session.login
  }
  res.render('Error.ejs', ejsData)
});

// starts an http server on the $PORT environment variable
const PORT = process.env.PORT || 5555;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

module.exports = app
