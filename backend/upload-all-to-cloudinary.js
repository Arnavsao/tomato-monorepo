import mongoose from 'mongoose';
import { cloudinary } from './config/cloudinary.js';
import foodModel from './models/foodModel.js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

console.log('🔄 Uploading ALL images to Cloudinary...\n');

async function uploadAllImages() {
    try {
        // Connect to MongoDB
        console.log('📡 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        // Get all files in uploads folder
        const uploadsDir = 'uploads';
        const allFiles = fs.readdirSync(uploadsDir)
            .filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'));

        console.log(`📁 Found ${allFiles.length} image files in uploads folder\n`);

        let uploaded = 0;
        let skipped = 0;

        console.log('🚀 Uploading images to Cloudinary...\n');

        for (const file of allFiles) {
            const localFilePath = path.join(uploadsDir, file);

            // Skip .DS_Store and non-image files
            if (file === '.DS_Store') continue;

            try {
                console.log(`📤 Uploading: ${file}`);

                // Upload to Cloudinary
                const result = await cloudinary.uploader.upload(localFilePath, {
                    folder: 'tomato-food-items',
                    public_id: file.split('.')[0], // Use filename without extension as public_id
                    resource_type: 'image',
                    overwrite: true // Overwrite if already exists
                });

                console.log(`   ✅ URL: ${result.secure_url}`);
                uploaded++;
            } catch (uploadError) {
                console.error(`   ❌ Error: ${uploadError.message}`);
                skipped++;
            }
        }

        console.log('\n📊 Upload Summary:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`✅ Successfully uploaded: ${uploaded}`);
        console.log(`❌ Failed: ${skipped}`);
        console.log(`📦 Total files: ${allFiles.length}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        // Now update MongoDB records
        console.log('💾 Updating MongoDB records...\n');

        const foods = await foodModel.find({});
        let updated = 0;
        let alreadyCloudinary = 0;

        for (const food of foods) {
            if (food.image && food.image.includes('cloudinary.com')) {
                alreadyCloudinary++;
                continue;
            }

            // Try to find matching Cloudinary image
            const filename = food.image.split('.')[0]; // Get filename without extension

            try {
                // Search for the image in Cloudinary
                const searchResult = await cloudinary.api.resources({
                    type: 'upload',
                    prefix: `tomato-food-items/${filename}`,
                    max_results: 1
                });

                if (searchResult.resources && searchResult.resources.length > 0) {
                    const cloudinaryUrl = searchResult.resources[0].secure_url;
                    food.image = cloudinaryUrl;
                    await food.save();
                    console.log(`✅ Updated ${food.name}: ${cloudinaryUrl}`);
                    updated++;
                } else {
                    console.log(`⚠️  No Cloudinary image found for ${food.name} (${food.image})`);
                }
            } catch (error) {
                console.log(`⚠️  Could not update ${food.name}: ${error.message}`);
            }
        }

        console.log('\n📊 Database Update Summary:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`✅ Updated to Cloudinary URLs: ${updated}`);
        console.log(`⏭️  Already using Cloudinary: ${alreadyCloudinary}`);
        console.log(`📦 Total food items: ${foods.length}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        console.log('🎉 All done! Check your Cloudinary dashboard:');
        console.log('   https://cloudinary.com/console/c-a6f0e3f3e8b4c8e9d0a1b2c3d4e5f6/media_library/folders/tomato-food-items\n');

    } catch (error) {
        console.error('❌ Process failed:', error);
    } finally {
        await mongoose.connection.close();
        console.log('👋 Database connection closed');
    }
}

uploadAllImages();
