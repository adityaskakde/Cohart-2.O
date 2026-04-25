import { body,validationResult } from "express-validator";



function validationRequest(req, res, next) {
    const errors = validationResult(req);

    if 
    (!errors.isEmpty()) {
        return res.status(400).json({ 
            message: "Validation error",errors: errors.array()});
    }
    next();
}

export const createProductValidation = [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("priceAmount").notEmpty().withMessage("Price amount is required")
    .isNumeric().withMessage("Price amount must be a number"), 

    validationRequest
]