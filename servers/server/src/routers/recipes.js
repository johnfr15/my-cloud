const express = require("express");
const router = express.Router();


const { readRecipe, createRecipe, updateRecipe, deleteRecipe, readRecipeByName } = require("../controllers/recipes");

router.get("/", readRecipe);
router.get("/:name", readRecipeByName);

router.post("/", createRecipe);

router.put("/", updateRecipe);

router.delete("/", deleteRecipe);

module.exports = router;