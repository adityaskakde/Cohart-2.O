import { body, validationResult } from "express-validator";

// middleware
export function validate(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    next();
}

// validations
export const registerValidation = [
    body('username')
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 3, max: 30 })
        .withMessage('Username must be between 3 and 30 characters')
        .trim(),

    body('email')
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage('Please provide a valid email')
        .trim(),

    body('password')
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
];