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
    
    const response = await getRecipes()
    
    const data = {success: true, payload: response }
     res.json(data)
})

recipesRouter.get('/api/recipes/:id', async (req, res) => {

    let id = req.params.id
    let response = await getRecipeByID(id)
    res.json(response)
})

recipesRouter.post('/api/recipes', async (req, res) => {
    const newRecipes = req.body
    const response = await createRecipe(newRecipes)
    const data = {success: true, payload: response }
    res.json(data)
  
})

recipesRouter.patch('/api/recipes/:id', async (req, res) => {
    const id = req.params.id
    const newRecipes = req.body
    
    const response = await updateRecipeByID(id, newRecipes)
    const data = {success: true, payload: response }
    res.json(data)
  })

  recipesRouter.delete("/api/recipes/:id", async (req, res) => {
    let id = req.params.id
    
    const response = await deleteRecipeByID(id)
    const data = {success: true, payload: response }
    res.json(data)
    
  }) 

module.exports = recipesRouter;
