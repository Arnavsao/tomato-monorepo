import foodModel from "../models/foodModel.js";
import { deleteFromCloudinary } from "../config/cloudinary.js";

// Add food item
const addFood = async (req, res) => {
    console.log("Uploaded File:", req.file);  // Check the file object
    console.log("Request Body:", req.body);   // Check the body data

    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // Cloudinary automatically uploads and provides the URL in req.file.path
    let image_url = req.file.path; // This is the Cloudinary URL

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_url, // Store the full Cloudinary URL
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food Added", imageUrl: image_url });
    } catch (error) {
        console.log("Error Saving Food:", error);  // Log error if saving fails
        res.status(500).json({ success: false, message: "Error Adding Food" });
    }
};

//add food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching foods", error: error.message });
    }
};

const removeFood = async (req, res) => {
    try {
        console.log("Request Body:", req.body); // Log incoming request body

        const food = await foodModel.findById(req.body.id);
        if (!food) {
            console.log("Food item not found for ID:", req.body.id);
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        console.log("Food to be deleted:", food); // Log the food document

        // Delete the image from Cloudinary if it's a Cloudinary URL
        if (food.image && food.image.includes('cloudinary.com')) {
            try {
                await deleteFromCloudinary(food.image);
                console.log("Image deleted from Cloudinary:", food.image);
            } catch (error) {
                console.error("Error deleting image from Cloudinary:", error);
                // Continue with database deletion even if Cloudinary deletion fails
            }
        } else {
            console.log("Image is not a Cloudinary URL, skipping cloud deletion");
        }

        // Remove the food item from the database
        await foodModel.findByIdAndDelete(req.body.id);

        res.json({ success: true, message: "Food Removed" });
    } catch (error) {
        console.error("Error in removeFood function:", error);
        res.status(500).json({ success: false, message: "Error", error: error.message });
    }
};

export { addFood, listFood, removeFood };