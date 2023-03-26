import express from "express";
import { verifyToken } from "../middleware/index.js";
import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";

const router = express.Router();

// get all recipes
router.get("/", async (req, res) => {
    try {
        const recipes = await RecipeModel.find({});
        res.json(recipes);
    } catch (error) {
        console.log(error);
    }
})

// post a recipe
router.post("/", verifyToken,async (req, res) => {
    try {
        const newRecipe = await RecipeModel.create(req.body);
        res.json(newRecipe);
    } catch (error) {
        console.log(error);
    }
})

// save a recipe
router.put("/", verifyToken,async (req, res) => {
    try {
        const {userId, recipeId} = req.body;
        const recipe = await RecipeModel.findById(recipeId);
        const user = await UserModel.findById(userId);
        user.savedRecipes.push(recipe);
        await user.save();
        res.json({savedRecipes :user.savedRecipes});
    } catch (error) {
        console.log(error);
    }
})

// get all saved recipes (just id)
router.get("/saved-recipes/:userId",async(req,res) => {
    try {
        const {userId} = req.params;
        // console.log("user -> ",userId);
        const currentUser = await UserModel.findById(userId);
        res.json({savedRecipes: currentUser?.savedRecipes});
    } catch (error) {
        console.log(error);
    }
})

router.get("/saved-recipes/user/:userId",async(req,res) => {
    try {
        const {userId} = req.params;
        const user = await UserModel.findById(userId);
        const savedRecipes = await RecipeModel.find({
            _id: { $in: user.savedRecipes},
        })
        res.json({savedRecipes: savedRecipes})
    } catch (error) {
        console.log(error);
    }
})

export { router as recipeRouter };