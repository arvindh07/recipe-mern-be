import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import { userRouter } from "./routes/users.js";
import { recipeRouter } from "./routes/recipes.js";

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
dotenv.config({path:"../.env"});

// routes
app.use("/auth",userRouter);
app.use("/recipe",recipeRouter)

// endpoints
app.get("/",(req,res) => {
    res.send("<h1>Helloooo...");
})

// mongodb connection
mongoose.connect(`mongodb+srv://arvindh:${process.env.MONGODB_PASSWORD}@recipes.lgygdda.mongodb.net/recipes?retryWrites=true&w=majority`,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

// server
app.listen(3001,() => {
    console.log("server is running");
})