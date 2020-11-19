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

app.put('/byPantry', jsonParser, async (req, res) => {
    delete _items
    delete response
    delete ingredients
    ingredients = req.body;
    if(ingredients["ingredients"] != ""){
    try{
        ingredients = req.body;
        _items = await Recipes.FindFoodByPantry(ingredients["ingredients"]);
        response = await Recipes.JSONIFY(_items);
        if(response == "{ }"){
            response = "{}"
        }
        res.status(200).send(response);
    }
    catch{
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