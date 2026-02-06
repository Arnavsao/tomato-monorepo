import express from "express";
import multer from "multer";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import { storage } from "../config/cloudinary.js";

const foodRouter = express.Router();

// File upload middleware with Cloudinary storage and validation
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
    },
    fileFilter: (req, file, cb) => {
        // Validate file type
        const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type. Only JPEG, JPG, and PNG are allowed."));
        }
    },
});

// Route for adding food - supports both file upload and direct URL
foodRouter.post("/add", upload.single("image"), addFood);

// Handle GET requests to /add (common mistake - should be POST)
foodRouter.get("/add", (req, res) => {
    res.status(405).json({
        success: false,
        message: "Method not allowed. Use POST to add food items.",
        hint: "This endpoint accepts both multipart/form-data (file upload) and application/json (Cloudinary URL)"
    });
});

foodRouter.get("/list", listFood)
foodRouter.post("/remove", removeFood)


export default foodRouter;