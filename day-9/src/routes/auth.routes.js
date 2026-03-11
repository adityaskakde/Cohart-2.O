const  express  = require("express")
const userModel = require("../models/user.model")
const jwt = require ("jsonwebtoken")
const authRoutes = express.Router()
const crypto = require("crypto")

authRoutes.post("/register",async(req, res)=>{
    const {email, name , password} = req.body

    const isUserAlreadyExsists = await userModel.findOne({ email })
     
    if(isUserAlreadyExsists){
        return res.status(409).json({
            message:"User already exists with this email address"
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex")

    const user = await userModel.create({
        email, password:hash, name
    })

    const  token = jwt.sign(
        {
            id:user._id,
            email:user.email
        },
        process.env.JWT_SECRET
    )


    res.cookie("jwt_token",token)

    res.status(201).json({
        message:"use registered",
        user,
        token
    })

})




authRoutes.post("/login",async(req, res) =>{
    const{email,password} =req.body
    const user = await userModel.findOne({email})
    
    if(!user){
        return res.status(404).json({
            messdage:"User not found with this email address"
        })
    }

    const isPasswordMartched = user.password === crypto.createHash("md5").update(password).digest("hex")

    if(!isPasswordMartched){
        return res.status(401).json({
            message:"invaild password"
        })
    }

    const token = jwt.sign({
        id:user._id,
    },
    process.env.JWT_SECRET)
    res.cookie("jwt_token",token)

    res.status(200).json({
        message:"user logged in successfully",
        user,
        token
    })

})


module.exports = authRoutes