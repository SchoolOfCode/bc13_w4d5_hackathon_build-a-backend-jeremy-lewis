const { match } = require("node:assert");
const fs = require("node:fs/promises");
const path = require("node:path");
const { receiveMessageOnPort } = require("node:worker_threads");
const { v4: uuidv4 } = require("uuid");
const filePath = path.resolve(process.cwd(), "data", "recipes.json");


// Test Data and a function to test all aync functions

const myRecipe = {title: "apple pie",
     ingredients: ["flour", "sugar", "apple"],
    instructions: "mixed all ingredients and put them in an oven for 40 minutes"
    }

async function main(){
      
  // console.log(await createRecipe(myRecipe))
  // console.log(await getRecipeByID("80ae09e0-194b-4223-aee8-ce3f869f6989"))
  // console.log(await updateRecipeByID("6870866e-2421-41ff-a1c9-5e5b74217dd5", {title: "spicy apple pie"}))
  console.log(await deleteRecipeByID("80ae09e0-194b-4223-aee8-ce3f869f6989"))
  // console.log(await getRecipes())
}

main()


// GET ALL RECIPES
async function getRecipes() {
  const recipes = await fs.readFile(filePath)
  const result = JSON.parse(recipes)
  if(Array.isArray(result)) {
    return result
  }
    return null
}


// GET A RECIPE BY ID
async function getRecipeByID(id) {
  const recipes = await getRecipes()
  if(Array.isArray(recipes)) {
    return recipes.filter(recipe => recipe.id === id)[0]
  }
  return null
}

// CREATE A RECIPE
async function createRecipe(newRecipe) {
  const recipes = await getRecipes()
  const addedRecipe = {id: uuidv4(), ...newRecipe}
  if(Array.isArray(recipes)) {
    recipes.push(addedRecipe)
    await fs.writeFile(filePath, JSON.stringify(recipes))
    return addedRecipe
  }    
}

// UPDATE A RECIPE BY ID
async function updateRecipeByID(id, updatedRecipe) {
  const recipes = await getRecipes()
  const matchedRecipe = await getRecipeByID(id)
  const updatedRC = []

  if(matchedRecipe) {
    const newRecipes = recipes.map(recipe => {
      if(recipe.id === id) {
        updatedRC.push({...recipe, ...updatedRecipe}) //first destructure  the recipe that matched the id, 
        //then destructure the updatedRecipe, the properties in the latter will overwrite that of the former
        return {...recipe, ...updatedRecipe} 
      } else {
        return recipe
      }
    })
    await fs.writeFile(filePath, JSON.stringify(newRecipes))
    return updatedRC[0]
  } 
   
  return null
}
// Delete a recipe by id
async function deleteRecipeByID(id) {
  const recipes = await getRecipes()
  const matchedRecipe = await getRecipeByID(id)
  
  if(matchedRecipe) {
    const recipesRemained = recipes.filter(recipe => recipe.id !== id)
    await fs.writeFile(filePath, JSON.stringify(recipesRemained))
    return   matchedRecipe
  } 
  return null
  
 
}
module.exports = {
  getRecipes,
  getRecipeByID,
  createRecipe,
  updateRecipeByID,
  deleteRecipeByID,
}
