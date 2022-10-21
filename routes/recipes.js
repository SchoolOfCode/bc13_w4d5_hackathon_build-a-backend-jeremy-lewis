const express = require("express");
const recipesRouter = express.Router();
const { v4: uuidv4 } = require("uuid");
// Write your router code here!
const {
    getRecipes,
    getRecipeByID,
    createRecipe,
    updateRecipeByID,
    deleteRecipeByID,
} = require("../models/recipes");


recipesRouter.get("/", (req, res) => {
  console.log("hi")
    res.send("hi")
})

recipesRouter.get('/api/recipes', async (req, res) => {
    
    let response = await getRecipes()
     res.json(response)
})

recipesRouter.get('/api/recipes/:id', async (req, res) => {

    let id = req.params.id
    let response = await getRecipeByID(id)
    res.json(response)
})

recipesRouter.post('/api/recipes', async (req, res) => {

    
    let response = await getRecipes()
    let title = req.body.title
    let instructions = req.body.instructions
    let ingredients = req.body.ingredients
    let image = req.body.image
    let returnObject = {
        id: uuidv4(),
        title: title,
        ingredients: ingredients,
        instructions: instructions,
        image: image
    }
    response.push(returnObject)
    let reply = await createRecipe(response)
    console.log(reply)
    res.json(returnObject)

   
})


module.exports = recipesRouter;
