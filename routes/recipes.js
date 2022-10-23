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


// recipesRouter.get("/", (req, res) => {
//   console.log("hi")
//     res.send("hi")
// })

//Retrieve all recipes
recipesRouter.get('/api/recipes', async (req, res) => {
    
    const response = await getRecipes()
    if(response) {
      res.json({success: true, payload: response })
    } else {
      res.json({success: false})
    }
    
   
})

//Retrieve a recipe by id
recipesRouter.get('/api/recipes/:id', async (req, res) => {
  const id = req.params.id
  const response = await getRecipeByID(id)
  if(response) {
    res.json({success: true, payload: response })
  } else {
    res.json({success: false})
  }
    
})
//Post a new recipe
recipesRouter.post('/api/recipes', async (req, res) => {
    const newRecipes = req.body
    const response = await createRecipe(newRecipes)
    if(response) {
      res.json({success: true, payload: response })
    } else {
      res.json({success: false})
    } 
  
})

//Update an existing recipe by id
recipesRouter.patch('/api/recipes/:id', async (req, res) => {
    const id = req.params.id
    const newRecipes = req.body
    
    const updatedRecipe = await updateRecipeByID(id, newRecipes)
    if(updatedRecipe) {
      res.json({success: true, payload: updatedRecipe})
    } else {
      res.json({success: false})
    }   
  })

  //Delet a recipe by id
recipesRouter.delete("/api/recipes/:id", async (req, res) => {
    const id = req.params.id
    const response = await deleteRecipeByID(id)
    if(response) {
      res.json({success: true, payload: response })
    } else {
      res.json({success: false})
    }
    
    
  }) 

module.exports = recipesRouter;
