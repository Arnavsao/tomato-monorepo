import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Configure Cloudinary with credentials from environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Create Cloudinary storage for multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'tomato-food-items', // Folder name in Cloudinary
        allowed_formats: ['jpg', 'jpeg', 'png'],
        transformation: [{ width: 800, height: 800, crop: 'limit' }] // Optional: resize images
    }
});

// Helper function to delete image from Cloudinary
const deleteFromCloudinary = async (imageUrl) => {
    try {
        // Extract public_id from Cloudinary URL
        // URL format: https://res.cloudinary.com/{cloud_name}/image/upload/v{version}/{folder}/{public_id}.{format}
        const urlParts = imageUrl.split('/');
        const fileWithExtension = urlParts[urlParts.length - 1];
        const publicId = `tomato-food-items/${fileWithExtension.split('.')[0]}`;

        const result = await cloudinary.uploader.destroy(publicId);
        console.log('Cloudinary deletion result:', result);
        return result;
    } catch (error) {
        console.error('Error deleting from Cloudinary:', error);
        throw error;
    }
};

export { cloudinary, storage, deleteFromCloudinary };
