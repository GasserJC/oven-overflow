const PORT = process.env.PORT
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const Recipes = require('./recipes.js')

app.get('/byName/:food', async (req, res) => {
    delete _items
    delete response
    _items = await Recipes.FindFoodByName(req.params['food'])
    response = await Recipes.JSONIFY(_items);
    res.status(200).send(response);
});

app.get('/byDetail/:food', async (req, res) => {
    delete _items
    delete response
    _items = await Recipes.FindExactFoodByName(req.params['food'])
    response = await Recipes.JSONIFY(_items);
    res.status(200).send(response);
});

app.put('/byPantry', jsonParser, async (req, res) => {
    pantry = req.body;
    console.log(req.body)
    if(pantry["ingredients"] != ""){
        try{
            ingredients = req.body;
            for( i = 0; i < pantry["ingredients"].length; i++){
                pantry["ingredients"][i] = pantry["ingredients"][i].toLowerCase()
            }
            _items = Recipes.FindFoodByPantry(pantry["ingredients"]);
            response = {
                results: _items
            }
            res.status(200).send(response);
        } catch {
            res.status(200).send("{}");
        }
    }
    else{
        res.status(200).send("{}");
    }
});
 
app.get('/*',  (req, res) => {
  res.status(404).send("Error 404: Not Found");
});

const port = process.env.PORT || 6969;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});