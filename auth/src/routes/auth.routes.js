const express = require('express')
const authRouter = express.Router()
const userModel = require("../models/user.model")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")




authRouter.post( "/register",async (req, res)=>{
    const {name ,email, password} = req.body

    const isUserExists = await userModel.findOne({ email })
    
    if(isUserExists){
        return res.status(409).json({
            message:"User already exists with this email"
        })
    }

    const user = await userModel.create({
        name,
        email,
        password: crypto.createHash("sha256").update(password).digest("hex")
    })

    const token = jwt.sign({
        id:user.id
        },
        process.env.jwt_SECRET,{expiresIn:"1h"})


        res.cookie("token",token)

        res.status(201).json({
            message:"User registered sucessfully",
            user:{
                name:user.name,
                email:user.email,
            }
        })


})

authRouter.get("/get-me",async(req,res)=>{
    const token = req.cookies.token

    const decoded = jwt.verify(token, process.env.jwt_SECRET,)
    
    const user = await userModel.findById(decoded.id)

    res.status(200).json(
        {
        message:"User fetch successfully",
        user:{
            name:user.name,
            email:user.email
        }
})


})

authRouter.post("/login",async(req,res)=>{
    const { email,password } =req.body

    const user = await userModel.findOne({ email})
    
    if(!user){
        return res.status(404).json({
            message:"User not found with this email"        })
    }
    const hash = crypto.createHash("sha256").update(password).digest('hex')
    
    const isPasswordValid = hash === user.password

    if(!isPasswordValid){
        return res.status(401).json({
            message:"Invalid PassWord"
        })
    }
    const token = jwt.sign({
        id:user._id,
    },
    process.env.jwt_SECRET,{expiresIn:"1h"})

    res.cookie("token",token)

    res.status(200).json({
        message:"User logged in  sucessfully",
        user:{
            name:user.name,
            email:user.email,
        }
    })
    

})

module.exports = authRouter
