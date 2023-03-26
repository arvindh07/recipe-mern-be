import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/login",async (req,res) => {
    const {username,password} = req.body;
    const user = await UserModel.findOne({username});

    if(!user){
        return res.json({message:"User doesnt exist"})
    }
    const isValidPassword = await bcrypt.compare(password,user.password);
    if(!isValidPassword){
        return res.json({message:"User or Password credentials incorrect"})
    }

    const token = jwt.sign({id:user._id},"SECRET");
    res.status(200).json({
        token,
        id:user._id
    })
})

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (user) {
        return res.status(500).json({
            message: "User name already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
        username,
        password: hashedPassword
    })

    res.status(200).json({
        message: "user added successfully"
    })
})

export { router as userRouter };