const express = require("express");
const app = express();
const PORT = 3000;
const router = require('./routes/recipes.js')


app.use(express.static("public"));
app.use(router)
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
