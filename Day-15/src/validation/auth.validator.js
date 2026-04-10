  import { body,validationResult } from "express-validator"
  

  const validate =(req, res ,next)=>{
            const errors = validationResult(req)

            if (errors.isEmpty()) {
                return next()
                
            }
            res.status(400).json({
                errors:errors.array()
            })
        }


        export const registerValidation =[
 
        body("username").isString().withMessage("username should be string"),
        body("email").isEmail().withMessage("email should valid email address"),
        body("password").isLength({min:6,max:15}).withMessage("password should be between 6 and 15 charaters long"),
        validate
       
    ]
    




