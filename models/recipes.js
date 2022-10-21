const fs = require("node:fs/promises");
const path = require("node:path");
const { v4: uuidv4 } = require("uuid");
const filePath = path.resolve(process.cwd(), "data", "recipes.json");

// GET ALL RECIPES
async function getRecipes() {
  let recipes = await fs.readFile(filePath)
  let result = JSON.parse(recipes)
  return result
}

async function main(){
  await getRecipes()

}
main()
// GET A RECIPE BY ID
async function getRecipeByID(id) {}

// CREATE A RECIPE
async function createRecipe(newRecipe) {}

// UPDATE A RECIPE BY ID
async function updateRecipeByID(id, updatedRecipe) {}

// DELETE A RECIPE BY ID
async function deleteRecipeByID(id) {}
console.log("hello")
module.exports = {
  getRecipes,
  getRecipeByID,
  createRecipe,
  updateRecipeByID,
  deleteRecipeByID,
};
