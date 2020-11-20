const PORT = process.env.PORT
const express = require('express');
const app = express();
const Pantry = requure('./pantry.js')


app.get('/AddItem/:title/:notes/:key/:usr', async (req, res) => {
  title = req.params["title"]
  notes = req.params["notes"]
  key = req.params["key"]
  usr = req.params["usr"]
  if(await Pantry.ValidKey(key, usr)){
    if(await Pantry.AddItem(title, notes, key)){
      res.status(200).send("{'message':'Successfully Added Item'}")
    } else {
      res.status(200).send(`{'message':'Failed to add ${title}, try again later.'}`)
    }
  } else {
    res.status(200).send(`{'message':'Failed to add ${title}, User Pantry Not Found.'}`)
  }
});

app.get('/GetItem/:title/:key/:usr', async (req, res) => {
  title = req.params["title"]
  key = req.params["key"]
  usr = req.params["usr"]
  if(await Pantry.ValidKey(key, usr)){
      response = await Pantry.GetItem(title, key)
      res.status(200).send(response)
    } else {
      res.status(200).send(`{'message':'Failed to Get ${title}, try again later.'}`)
    }
});

app.get('/GetItemList/:key/:usr', async (req, res) => {
  key = req.params["key"]
  usr = req.params["usr"]
  if(await Pantry.ValidKey(key, usr)){
      response = await Pantry.GetItemList(title, key)
      res.status(200).send(response)
    } else {
      res.status(200).send(`{'message':'Failed to Get Pantry, Try Again Later.'}`)
    }
});

app.get('/DeleteItem/:title/:key/:usr', async (req, res) => {
  title = req.params["title"]
  key = req.params["key"]
  usr = req.params["usr"]
  if(await Pantry.ValidKey(key, usr)){
      response = await Pantry.DeleteItem(title, key)
      res.status(200).send(response)
    } else {
      res.status(200).send(`{'message':'Failed to delete ${title}, Try Again Later.'}`)
    }
});

app.get('/*',  (req, res) => {
  res.status(404).send("Error 404: Not Found");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});