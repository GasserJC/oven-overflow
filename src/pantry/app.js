const PORT = process.env.PORT
const express = require('express');
const app = express();
const Pantry = require('./pantry.js')

app.get('/AddItem/:ingredient/:user', async (req, res) => {
    ingredient = req.params["ingredient"]
    user = req.params["user"]
    await Pantry.AddItem(ingredient, user)
    res.status(200).send('{"message":"Success"}')
});

app.get('/RemoveItem/:ingredient/:user', async (req, res) => {
    ingredient = req.params["ingredient"]
    user = req.params["user"]
    await Pantry.DeleteItem(ingredient, user)
    res.status(200).send('{"message":"Success"}')
});

app.get('/GetPantry/:user', async (req, res) => {
    user = req.params["user"]
    usrPantry = await Pantry.GetPantry(user)
    sendPantry = {
        ingredients: usrPantry
    }
    res.status(200).send(sendPantry)
});

app.get('/*',  (req, res) => {
    res.status(404).send("Error 404: Not Found");
});

app.listen(PORT, () => {
});