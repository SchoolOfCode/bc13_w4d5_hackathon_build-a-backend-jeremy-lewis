const { match } = require("node:assert");
const fs = require("node:fs/promises");
const path = require("node:path");
const { receiveMessageOnPort } = require("node:worker_threads");
const { v4: uuidv4 } = require("uuid");
const filePath = path.resolve(process.cwd(), "data", "recipes.json");

// GET ALL RECIPES
async function getRecipes() {
  let recipes = await fs.readFile(filePath)
  let result = JSON.parse(recipes)
  return result
}

const myRecipe = {title: "apple pie",
     ingredients: ["flour", "sugar", "apple"],
      instructions: "mixed all ingredients and put them in an oven for 40 minutes"}

async function main(){
      
  // console.log(await createRecipe(myRecipe))
  // console.log(await getRecipeByID("cb9f1f27-6312-4a28-a6e0-c6487bd63eda"))
  // console.log(await updateRecipeByID("1a095a20-4b4f-4b1a-8287-1d0cd4ff1788", {title: "creamed tea"}))
  // console.log(await deleteRecipeByID("1a095a20-4b4f-4b1a-8287-1d0cd4ff1788"))
  // console.log(await getRecipes())
}

main()

// GET A RECIPE BY ID
async function getRecipeByID(id) {
  const existingRecipes = await getRecipes()
   
  return existingRecipes.filter(recipe => recipe.id === id)[0]

}

// CREATE A RECIPE
async function createRecipe(newRecipe) {
  let recipes = await getRecipes()
  let addedRecipe = {id: uuidv4(), ...newRecipe}
  recipes.push(addedRecipe)
  await fs.writeFile(filePath, JSON.stringify(recipes))

  return addedRecipe
    
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


async function deleteRecipeByID(id) {
  const recipes = await getRecipes()
  const matchedRecipe = await getRecipeByID(id)
  const newRecipes = recipes.filter(recipe => recipe.id !== id)
  await fs.writeFile(filePath, JSON.stringify(newRecipes))
  return   matchedRecipe
 
}
module.exports = {
  getRecipes,
  getRecipeByID,
  createRecipe,
  updateRecipeByID,
  deleteRecipeByID,
}
