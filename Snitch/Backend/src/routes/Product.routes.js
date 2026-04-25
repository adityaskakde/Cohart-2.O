import express from "express";
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import { createProduct , getSellerProducts} from "../controllers/Product.controller.js";
import multer from "multer";
import { createProductValidation } from "../validator/product.validation.js";


const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
})



const router = express.Router();

// Create a new product

/**
 * @route POST /api/products
 * @desc Create a new product
 * @access Private (Seller only)
 */
router.post("/",authenticateSeller ,upload.array('images',7), createProductValidation,createProduct)

// Get all products

/**
 * @route GET /api/products
 * @desc Get all products of the auhenticated seller
 * @access Public
 */
router.get("/seller",authenticateSeller, getSellerProducts)

export default router;