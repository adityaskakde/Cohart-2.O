import {body,validationResult} from 'express-validator';

// Validation rules for registration

function validateRegister(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}


export const validsateRegisterUser = [
    body("email")
    .isEmail().withMessage("Invalid email format"),
    body("contactNumber")
    .notEmpty().withMessage("Contact number is required")
    .matches(/^\d{10}$/).withMessage("Contact number must be 10 digits"),
    body("password")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("fullName")
    .notEmpty().withMessage("Fullname is required")
    .isLength({ min: 3 }).withMessage("Full name must be at least 3 characters long"),
    body("isSeller")
    .toBoolean()
    .isBoolean().withMessage("isSeller must be a boolean value"),


    validateRegister
]


export const validateLoginUser = [
    body("email")
    .isEmail().withMessage("Invalid email format"),
    body("password")
    .notEmpty().withMessage("Password is required"),

validateRegister
]


