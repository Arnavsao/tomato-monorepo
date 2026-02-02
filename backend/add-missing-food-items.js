import mongoose from 'mongoose';
import { cloudinary } from './config/cloudinary.js';
import foodModel from './models/foodModel.js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

console.log('🔄 Adding missing food items...\n');

// Food item data for the missing items (food_2 through food_13)
const missingFoodItems = [
    { name: "Veg Salad", description: "A colorful bowl of fresh greens and seasonal vegetables for a clean, wholesome bite.", price: "18", category: "Salad", foodNum: 2 },
    { name: "Clover Salad", description: "A crisp blend of leafy greens and herbs with a zesty dressing.", price: "16", category: "Salad", foodNum: 3 },
    { name: "Chicken Salad", description: "Tender grilled chicken served with crunchy vegetables and a creamy house dressing.", price: "24", category: "Salad", foodNum: 4 },
    { name: "Lasagna Rolls", description: "Rolled pasta sheets filled with cheese and herbs, baked to perfection.", price: "14", category: "Rolls", foodNum: 5 },
    { name: "Peri Peri Rolls", description: "Spicy peri peri flavored rolls with a kick of heat.", price: "12", category: "Rolls", foodNum: 6 },
    { name: "Chicken Rolls", description: "Savory chicken wrapped in soft bread with fresh vegetables.", price: "12", category: "Rolls", foodNum: 7 },
    { name: "Veg Rolls", description: "Fresh vegetables wrapped in a soft tortilla with tangy sauce.", price: "10", category: "Rolls", foodNum: 8 },
    { name: "Ripple Ice Cream", description: "Creamy vanilla ice cream with chocolate ripple swirls.", price: "7", category: "Deserts", foodNum: 9 },
    { name: "Fruit Ice Cream", description: "Refreshing ice cream loaded with fresh fruit pieces.", price: "8", category: "Deserts", foodNum: 10 },
    { name: "Jar Ice Cream", description: "Delicious ice cream served in a convenient jar.", price: "9", category: "Deserts", foodNum: 11 },
    { name: "Vanilla Ice Cream", description: "Classic creamy vanilla ice cream.", price: "6", category: "Deserts", foodNum: 12 },
    { name: "Chicken Sandwich", description: "Grilled chicken sandwich with lettuce, tomato, and mayo.", price: "15", category: "Sandwich", foodNum: 13 }
];

async function addMissingItems() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        let uploaded = 0;
        let created = 0;
        let errors = 0;

        for (const item of missingFoodItems) {
            console.log(`\n🍽️  Processing: ${item.name} (food_${item.foodNum})`);

            // Find the image file in uploads folder
            const files = fs.readdirSync('uploads');
            const imageFile = files.find(f => f.includes(`food_${item.foodNum}.png`));

            if (!imageFile) {
                console.log(`   ⚠️  Image not found for food_${item.foodNum}`);
                errors++;
                continue;
            }

            const localFilePath = path.join('uploads', imageFile);

            try {
                // Upload to Cloudinary
                console.log(`   📤 Uploading to Cloudinary...`);
                const result = await cloudinary.uploader.upload(localFilePath, {
                    folder: 'tomato-food-items',
                    public_id: `food_${item.foodNum}`,
                    resource_type: 'image',
                    overwrite: true
                });

                console.log(`   ✅ Uploaded: ${result.secure_url}`);
                uploaded++;

                // Create food item in database
                const newFood = new foodModel({
                    name: item.name,
                    description: item.description,
                    price: item.price,
                    category: item.category,
                    image: result.secure_url
                });

                await newFood.save();
                console.log(`   💾 Created in database`);
                created++;

            } catch (error) {
                console.error(`   ❌ Error: ${error.message}`);
                errors++;
            }
        }

        console.log('\n\n📊 Summary:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`✅ Images uploaded: ${uploaded}`);
        console.log(`💾 Items created: ${created}`);
        console.log(`❌ Errors: ${errors}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        // Show final count
        const totalItems = await foodModel.countDocuments();
        console.log(`📦 Total food items in database: ${totalItems}\n`);

        console.log('🎉 All missing items added successfully!');

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await mongoose.connection.close();
        console.log('\n👋 Database connection closed');
    }
}

addMissingItems();
