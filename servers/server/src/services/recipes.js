const fs = require("fs").promises;
const path = require("path");

const RECIPES_PATH = path.join(__dirname, "../../../db/recipes.json"); // Contruct the path to the recipes data



const readRecipe = async () => JSON.parse(await fs.readFile(RECIPES_PATH));
const readRecipeByName = async( recipeName ) => {

    const recipes = await readRecipe();

    // Find the index of the recipe to delete
    const index = recipes.findIndex(( recipe ) => recipe.name === recipeName);

    return recipes[index]
}


const createRecipe = async (recipe) => {
  
    const recipes = await readRecipe();
  
    recipe.id = recipes.length + 1; 
  
    recipes.push(recipe);

    const s_recipes = JSON.stringify(recipes, null, 2)
  
    await fs.writeFile(RECIPES_PATH, s_recipes);
  
    return recipe;
};



const updateRecipe = async( recipeToUpdate ) => {

    const recipes = await readRecipe();

    // Find the index of the recipe to update
    const index = recipes.findIndex((recipe) => recipe.name === recipeToUpdate.name);

    // Update the recipe
    recipes[index] = { ...recipes[index], ...recipeToUpdate };

    const s_recipes = JSON.stringify(recipes, null, 2)
    await fs.writeFile(RECIPES_PATH, s_recipes)

    return recipes[index]; // Return the updated recipe
}



const deleteRecipe = async( recipeName ) => {

    const recipes = await readRecipe();

    // Create a new array without the recipe to delete
    const updatedRecipes = recipes.filter((recipe) => recipe.name !== recipeName);

    const s_updatedRecipes = JSON.stringify(updatedRecipes, null, 2)
    await fs.writeFile(RECIPES_PATH, s_updatedRecipes)

    return true;
}

module.exports = {
    createRecipe,
    readRecipe,
    readRecipeByName,
    updateRecipe,
    deleteRecipe
};