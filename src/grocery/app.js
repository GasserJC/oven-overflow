const PORT = process.env.PORT
const express = require('express');
const app = express();

app.get('/*',  (req, res) => {
  res.status(404).send("Error 404: Not Found");
});

const port = process.env.PORT || 6969;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});