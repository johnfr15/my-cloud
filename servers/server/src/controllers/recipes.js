const service = require("../services/recipes");
const auth = require("../middleware/auth")



/***********************************|
|       MIDDLEWARE FUNCTION         |
|__________________________________*/
const isRecipe = async( req, res, next ) => {

    const recipes = await service.readRecipe();

    // Find the index of the recipe to delete
    const index = recipes.findIndex(( recipe ) => recipe.name === req.params.name || recipe.name === req.body.name );

    if (index === -1)
    {
        const err = new Error(`Recipe ${ req.body.name || req.params.name } not found.`)
        err.statusCode = 404
        next(err)
    }
    
    next()
}



/***********************************|
|               GET                 |
|__________________________________*/
const readRecipe = async (req, res, next) => {

    try {

        const data = await service.readRecipe()
        res.json( data );

    } catch (error) {

        next(error)

    }
};

const readRecipeByName = async (req, res, next) => {

    try {

        const data = await service.readRecipeByName( req.params.name )
        res.json( data );

    } catch (error) {

        next(error)

    }
};




/***********************************|
|               POST                |
|__________________________________*/
const createRecipe = async (req, res, next) => {

    try {
      
        const newRecipe = {
            ...req.body,
            healthLabels: [...req.body.healthLabels], 
            ingredients: [...req.body.ingredients], 
        };
    
        res.status(201).json({ data: await service.createRecipe(newRecipe) });

    } catch (error) {

        next(error)

    }
};




/***********************************|
|               PUT                 |
|__________________________________*/
const updateRecipe = async (req, res, next) => {

    try {

        const newRecipe = {
            ...req.body,
            healthLabels: [...req.body.healthLabels], 
            ingredients: [...req.body.ingredients], 
        };

        res.status(200).json({ data: await service.updateRecipe( newRecipe ) });

    } catch (error) {

        next(error)

    }
};




/***********************************|
|              DELETE               |
|__________________________________*/
const deleteRecipe = async (req, res, next) => {

    try {
      
        const name = req.body.name
        res.status(200).json({ data: await service.deleteRecipe( name ) });

    } catch (error) {

        next(error)

    }
};

module.exports = {
    readRecipe: [isRecipe, readRecipe],
    readRecipeByName: [isRecipe, readRecipeByName],
    createRecipe: [auth.authenticate(), createRecipe],
    updateRecipe: [auth.authenticate(), isRecipe, updateRecipe],
    deleteRecipe: [auth.authenticate(), isRecipe, deleteRecipe],
};