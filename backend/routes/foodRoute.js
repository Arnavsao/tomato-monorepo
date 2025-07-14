import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";

const foodRouter = express.Router();

// Ensure the 'uploads' directory exists or create it
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // Create 'uploads' directory
}

// Image Storage Engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads"); // Save uploaded files to the 'uploads' directory
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const sanitizedFilename = file.originalname.replace(/[^a-zA-Z0-9.-]/g, "_");
        cb(null, `${timestamp}-${sanitizedFilename}`); // Generate a unique filename
    },
});

// File upload middleware with validation
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

// Route for adding food with file upload
foodRouter.post("/add", upload.single("image"), (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "File upload failed." });
        }

        console.log("Uploaded File Info:", req.file); // Log uploaded file info
        console.log("Request Body:", req.body); // Log other form fields

        // Proceed to the addFood controller
        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}, addFood);

foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood)


export default foodRouter;