const express = require("express");
const recipesRouter = express.Router();
// Write your router code here!
const {
    getRecipes,
    getRecipeByID,
    createRecipe,
    updateRecipeByID,
    deleteRecipeByID,
} = require("../models/recipes");

recipesRouter.get("/", (req, res) => {
  
    res.send("hi")
})

recipesRouter.get('/api/recipes', async (req, res) => {
    res.json = await getRecipes()
  })




module.exports = recipesRouter;
