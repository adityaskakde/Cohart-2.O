 const userModel = require("../models/user.model")
 const bcrypt = require("bcryptjs")
 const jwt = require ('jsonwebtoken')
 
 
 async function loginController(req ,res){

    const{ email, username , password, bio, profileImage} = req.body


    const user = await userModel.findOne({
        $or:[
            {
                username: username

            },
            {
                email: email
            }
            ]
    })
    if(!user){
        return res.status(409).json({
            message:"User Not found"
        })
    }

    const isPasswordValid = await bcrypt.compare(password,user.password)
    
    if(!isPasswordValid){
        return res.status(401).json({
             message:"password invalid"

        })  
    }

    const token = jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET,{expiresIn:"1d"}
    )
    res.cookie("token",token,{
        httpOnly:true
    })
    res.status(200)
    .json({
        message:"User logged in successfully. ",
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImage:user.profileImage

        }
    })
}

async function registerController(req ,res){
    const{ email, username , password, bio, profileImage} = req.body

    

    const isUserAlreadyExsits = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if (isUserAlreadyExsits){
        return res.status(409).json({
           message: isUserAlreadyExsits.email === email 
        ? "Email already exists" 
        : "Username already exists"
        })
    }

    const hash = await bcrypt.hash(password,10)

    const user = await userModel.create({
        username,
        email,
        bio,
        profileImage,
        password:hash

    })    
    /**
     * - user ka data hona chaiye
     * - data unique hona chaiye
     */
    
    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET,
    {expiresIn:"1d"}
)
res.cookie("token",token)

res.status(201).json({
    message:"User Register Sucessfully",

    user:{
        email:user.email,
        username:user.username,
        bio:user.bio,
        profileImage:user.profileImage


    }



})
}


module.exports ={
    registerController,
    loginController
}

