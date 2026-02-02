import mongoose from 'mongoose';
import { cloudinary } from './config/cloudinary.js';
import foodModel from './models/foodModel.js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables
dotenv.config();

console.log('🔄 Starting smart image migration to Cloudinary...\n');

// Helper function to extract food number from filename
function extractFoodNumber(filename) {
    const match = filename.match(/food_(\d+)\.png/);
    return match ? parseInt(match[1]) : null;
}

async function smartMigrateImages() {
    try {
        // Connect to MongoDB
        console.log('📡 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        // Get all files in uploads folder
        const uploadsDir = 'uploads';
        const files = fs.readdirSync(uploadsDir).filter(f => f.includes('food_') && f.endsWith('.png'));

        console.log(`📁 Found ${files.length} food images in uploads folder\n`);

        // Create a map of food number to filename
        const foodNumberToFile = {};
        files.forEach(file => {
            const foodNum = extractFoodNumber(file);
            if (foodNum) {
                foodNumberToFile[foodNum] = file;
            }
        });

        console.log('📋 Available food images:');
        Object.keys(foodNumberToFile).sort((a, b) => a - b).forEach(num => {
            console.log(`   food_${num}: ${foodNumberToFile[num]}`);
        });
        console.log('');

        // Get all food items from database
        const foods = await foodModel.find({}).sort({ _id: 1 });
        console.log(`📊 Found ${foods.length} food items in database\n`);

        let migrated = 0;
        let skipped = 0;
        let notFound = 0;

        console.log('🚀 Starting migration...\n');

        for (const food of foods) {
            console.log(`🍽️  ${food.name}`);

            // Skip if already a Cloudinary URL
            if (food.image && food.image.includes('cloudinary.com')) {
                console.log('   ⏭️  Already using Cloudinary\n');
                skipped++;
                continue;
            }

            // Try to extract food number from current image name
            const currentFoodNum = extractFoodNumber(food.image);

            if (!currentFoodNum || !foodNumberToFile[currentFoodNum]) {
                console.log(`   ⚠️  No matching file found (looking for food_${currentFoodNum})\n`);
                notFound++;
                continue;
            }

            const matchingFile = foodNumberToFile[currentFoodNum];
            const localFilePath = path.join(uploadsDir, matchingFile);

            try {
                console.log(`   📤 Uploading: ${matchingFile}`);
                const result = await cloudinary.uploader.upload(localFilePath, {
                    folder: 'tomato-food-items',
                    public_id: `food_${currentFoodNum}`,
                    resource_type: 'image'
                });

                console.log(`   ✅ Cloudinary URL: ${result.secure_url}`);

                // Update MongoDB
                food.image = result.secure_url;
                await food.save();
                console.log(`   💾 Database updated\n`);

                migrated++;
            } catch (uploadError) {
                console.error(`   ❌ Upload error: ${uploadError.message}\n`);
            }
        }

        console.log('\n📊 Migration Summary:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`✅ Successfully migrated: ${migrated}`);
        console.log(`⏭️  Already on Cloudinary: ${skipped}`);
        console.log(`⚠️  No matching file: ${notFound}`);
        console.log(`📦 Total items: ${foods.length}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        if (migrated > 0) {
            console.log('🎉 Migration completed successfully!');
            console.log('💡 Next steps:');
            console.log('   1. Test the website to verify images are showing');
            console.log('   2. Deploy to production with Cloudinary env vars');
            console.log('   3. Optionally delete local uploads/ folder\n');
        }

    } catch (error) {
        console.error('❌ Migration failed:', error);
    } finally {
        await mongoose.connection.close();
        console.log('👋 Database connection closed');
    }
}

// Run the migration
smartMigrateImages();
