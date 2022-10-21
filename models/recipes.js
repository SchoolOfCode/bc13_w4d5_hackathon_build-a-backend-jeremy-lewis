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
  // await getRecipes()
  //console.log(await getRecipeByID("4c848d48-b81e-4d6f-b45d-7b3090f4f8ef"))
  // let returns = await createRecipe({id: "1", 
  // title: "toast",
  //  ingredients: "bread", 
  //  instructions: "put in toaster", 
  //  image: "https://natashaskitchen.com/wp-content/uploads/2019/04/Best-Burger-4-500x375.jpg"})
  //  console.log(returns)
   //console.log(await updateRecipeByID("1", {title: "toast"}))
  // console.log(await deleteRecipeByID("1"))
}
//main()
// GET A RECIPE BY ID
async function getRecipeByID(id) {
  let recipes = await fs.readFile(filePath)
  let result = JSON.parse(recipes)
  for(let i = 0; i<result.length; i++) {
    if(id === result[i].id) {
      let data = result[i]
      return data
    }
  }
  return null 

}

// CREATE A RECIPE
async function createRecipe(newRecipe) {
  let recipes = await getRecipes()
  // let newId = uuidv4()
  // newRecipe.id = newId
  recipes.push(newRecipe)
  await fs.writeFile(filePath, JSON.stringify(recipes))

  return newRecipe
    
}

// UPDATE A RECIPE BY ID
async function updateRecipeByID(id, updatedRecipe) {
  let objKey1 =  Object.keys(updatedRecipe)
  let objValue = updatedRecipe[objKey1]
  let objKey = objKey1[0]


  let recipes = await getRecipes()
  for (let i = 0; i<recipes.length; i++) {
    if(id === recipes[i].id) {
      switch(objKey) {
        case "title":
          recipes[i].title = objValue
          break
        case "ingredients":
          recipes[i].ingredients = objValue
          break
        case "instructions":
          recipes[i].instructions = objValue
          break
      }

      await fs.writeFile(filePath, JSON.stringify(recipes))
      return recipes[i]
    }
  }

  return null;

}

// DELETE A RECIPE BY ID
async function deleteRecipeByID(id) {
  let recipes = await getRecipes()
  let remainingRecipes = []
  let deletedRecipe = ""
  
  for (let i = 0; i < recipes.length; i++){
    if (recipes[i].id !== id){
      
        remainingRecipes.push(recipes[i])
    }
    else if (recipes[i].id === id){
      deletedRecipe = recipes[i]
    }
  }
 
  await fs.writeFile(filePath, JSON.stringify(remainingRecipes))
  return deletedRecipe
}

module.exports = {
  getRecipes,
  getRecipeByID,
  createRecipe,
  updateRecipeByID,
  deleteRecipeByID,
};
