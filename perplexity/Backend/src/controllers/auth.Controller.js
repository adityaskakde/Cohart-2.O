
import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken"
import { validationResult } from "express-validator"
import { sendEmail } from "../services/mail.service.js"




export async function register(req, res) {

     const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }

    
    const { username , email, password} = req.body


    const isUserAlreadyExists = await userModel.findOne({
        $or:[ {email},{username}]
    })
    if (isUserAlreadyExists) {
        return res.status(400).json({
            message:"User with this email or username already exists",
            success:false,
            err:"User already exists"
        })
    }

    const user= await userModel.create({username, email, password})
    delete user._doc.password;


    const emailVerificationToken=jwt.sign({
        email:user.email,
    },process.env.JWT_SECRET,  
    { expiresIn: "1h" })

  try {
  await sendEmail({
    to: email,
    subject: "welcome to perplexity",
     html: `
                <p>Hi ${username},</p>
                <p>Thank you for registering at <strong>Perplexity</strong>. We're excited to have you on board!</p>
                <p> Please very your email address by clicking the link below:</p>
                <a href="http://localhost:3000/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
                <p> If you did not create an account,please ignore this email.</p>
                <p>Best regard,<br> The Perplexity Team</p>         
        `
  });
} catch (err) {
  console.log("MAIL ERROR:", err);
}
    return res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
})
    
}
export async function VerifyEmail(req, res){
    try {
        const { token } = req.query;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Token missing"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findOne({ email: decoded.email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid token"
            });
        }

        if (user.verified) {
    return res.send(`
        <h1>Email Already Verified</h1>
        <p>Your account is already verified.</p>
        <a href="http://localhost:3000/login">Go to Login</a>
    `);
}

        user.verified = true;
        await user.save();

        res.send(`
            <h1>Email Verified Successfully </h1>
            <p>Your email has been verified. You can now log in.</p>
            <a href="http://localhost:3000/login">Go to Login</a>
        `);

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
}

export async function login(req, res){
    const {email, password} =req.body
    const user = await userModel.findOne({ email })

    if (!user){
        return res.status(400).json({
            message:"Invalid email or username",
            sucess:false,
            err:"User not found"
        })
    }

    const isPasswordMatche = await user.comparePassword( password )

    if(!isPasswordMatche){
        return res.status(400).json({
             message:"Invalid email or username",
             success:false,
             err:"Incorrect password"
        })

    }
    if(!user.verified){
         return res.status(400).json({
             message:" Please verify your email before logging in",
             success:false,
             err:"Email not verified"
        })
        
    }
    const token = jwt.sign({
        id:user._id,
        username:user.username
    }, process.env.JWT_SECRET,{expiresIn:"7d"})

    res.cookie("token",token)
    res.status(200).json({
        message:"Login succesfully.",
        success:true,
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

export async function getMe(req, res) {
    try {
        const userId = req.user.id;

        const user = await userModel.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
                err: "User not found"
            });
        }

        res.status(200).json({
            message: "User details fetched successfully",
            success: true,
            user
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            success: false,
            error: error.message
        });
    }
}

/**
 * @route POST /auth/resend-verification
 * @desc Resend email verification link
 * @access Public
 * @body { email }
 */


export async function resendVerification(req, res){
    try {
        const {email} = req.body
        const user = await userModel.findOne({email})

        if(!user){
            return res.status(404).json({
                message:"User not found",
                sucess:false
            })
        }
        if(user.verified){
            return res.status(400).json({
                success:false,
                message:"Email already verified"
            })
        }

        const token = jwt.sign(
            {email: user.email},
            process.env.JWT_SECRET,{expiresIn:"1h"}
        )

        await sendEmail({
            to:email,
            subject:"Resend Verification Email",
            html:
            ` <p>Click below to verify your email:</p>
               <a href="http://localhost:3000/auth/verify-email?token=${token}">
                    Verify Email
                </a>
            `
        })
        res.status(200).json({
            success:true,
            message:"Verification email resent Succesfully"
        })



    } catch (err) {
        res.status(500).json({
            success:true,
            message:err.message
        })
    }
}