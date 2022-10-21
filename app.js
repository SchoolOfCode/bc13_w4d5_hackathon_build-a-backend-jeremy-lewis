const express = require("express");
const app = express();
const PORT = 3000;
const recipesRouter = require('./routes/recipes.js')

var morgan = require('morgan')

app.use(morgan('dev'))

app.use(express.json());

app.use(express.static("public"));



app.use(recipesRouter)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
