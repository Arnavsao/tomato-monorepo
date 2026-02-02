import mongoose from 'mongoose';
import { cloudinary } from './config/cloudinary.js';
import foodModel from './models/foodModel.js';
import dotenv from 'dotenv';

dotenv.config();

console.log('🔄 Updating MongoDB with Cloudinary URLs...\n');

// Mapping of food numbers to their Cloudinary URLs
const foodImageMap = {
    14: "https://res.cloudinary.com/dygnijvpf/image/upload/v1770012347/tomato-food-items/food_14.png",
    15: "https://res.cloudinary.com/dygnijvpf/image/upload/v1770012350/tomato-food-items/food_15.png",
    16: "https://res.cloudinary.com/dygnijvpf/image/upload/v1770012351/tomato-food-items/food_16.png",
    17: "https://res.cloudinary.com/dygnijvpf/image/upload/v1770012352/tomato-food-items/food_17.png",
    18: "https://res.cloudinary.com/dygnijvpf/image/upload/v1770012354/tomato-food-items/food_18.png",
    19: "https://res.cloudinary.com/dygnijvpf/image/upload/v1770012355/tomato-food-items/food_19.png",
    20: "https://res.cloudinary.com/dygnijvpf/image/upload/v1770012356/tomato-food-items/food_20.png",
    21: "https://res.cloudinary.com/dygnijvpf/image/upload/v1770012358/tomato-food-items/food_21.png",
    22: "https://res.cloudinary.com/dygnijvpf/image/upload/v1770012359/tomato-food-items/food_22.png",
    23: "https://res.cloudinary.com/dygnijvpf/image/upload/v1770012360/tomato-food-items/food_23.png",
    24: "https://res.cloudinary.com/dygnijvpf/image/upload/v1770012361/tomato-food-items/food_24.png",
    25: "https://res.cloudinary.com/dygnijvpf/image/upload/v1770012363/tomato-food-items/food_25.png",
    26: "https://res.cloudinary.com/dygnijvpf/image/upload/v1770012364/tomato-food-items/food_26.png",
    27: "https://res.cloudinary.com/dygnijvpf/image/upload/v1770012368/tomato-food-items/food_27.png",
    28: "https://res.cloudinary.com/dygnijvpf/image/upload/v1770012373/tomato-food-items/food_28.png",
    29: "https://res.cloudinary.com/dygnijvpf/image/upload/v1770012374/tomato-food-items/food_29.png",
    30: "https://res.cloudinary.com/dygnijvpf/image/upload/v1770012375/tomato-food-items/food_30.png",
    31: "https://res.cloudinary.com/dygnijvpf/image/upload/v1770012376/tomato-food-items/food_31.png",
    32: "https://res.cloudinary.com/dygnijvpf/image/upload/v1770012378/tomato-food-items/food_32.png",
    1: "https://res.cloudinary.com/dygnijvpf/image/upload/v1770012726/tomato-food-items/1738404693672-food_1.png"
};

async function updateAllRecords() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        const foods = await foodModel.find({});
        let updated = 0;
        let skipped = 0;
        let deleted = 0;

        console.log('🔄 Processing food items...\n');

        for (const food of foods) {
            // Skip if already has Cloudinary URL
            if (food.image && food.image.includes('cloudinary.com')) {
                console.log(`⏭️  ${food.name} - Already has Cloudinary URL`);
                skipped++;
                continue;
            }

            // Extract food number from image filename
            const match = food.image.match(/food_(\d+)\.png/);
            const foodNum = match ? parseInt(match[1]) : null;

            if (foodNum && foodImageMap[foodNum]) {
                // Update with Cloudinary URL
                food.image = foodImageMap[foodNum];
                await food.save();
                console.log(`✅ ${food.name} → ${foodImageMap[foodNum]}`);
                updated++;
            } else {
                // No matching image - delete this item
                await foodModel.findByIdAndDelete(food._id);
                console.log(`🗑️  ${food.name} - Deleted (no matching image)`);
                deleted++;
            }
        }

        console.log('\n📊 Update Summary:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`✅ Updated: ${updated}`);
        console.log(`⏭️  Already had Cloudinary: ${skipped}`);
        console.log(`🗑️  Deleted (no image): ${deleted}`);
        console.log(`📦 Remaining items: ${await foodModel.countDocuments()}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        console.log('🎉 All done! All remaining items now use Cloudinary URLs.');

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await mongoose.connection.close();
        console.log('\n👋 Database connection closed');
    }
}

updateAllRecords();
