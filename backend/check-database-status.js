import mongoose from 'mongoose';
import foodModel from './models/foodModel.js';
import dotenv from 'dotenv';

dotenv.config();

console.log('📊 Checking database status...\n');

async function checkDatabaseStatus() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const foods = await foodModel.find({}).sort({ _id: 1 });

        let withCloudinary = 0;
        let withoutCloudinary = 0;
        const itemsWithoutImages = [];

        console.log('📋 Food Items Status:\n');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        foods.forEach((food, index) => {
            const hasCloudinary = food.image && food.image.includes('cloudinary.com');
            const status = hasCloudinary ? '✅' : '❌';
            const imagePreview = hasCloudinary
                ? food.image.substring(0, 70) + '...'
                : food.image;

            console.log(`${status} ${(index + 1).toString().padStart(2, '0')}. ${food.name.padEnd(25)} | ${imagePreview}`);

            if (hasCloudinary) {
                withCloudinary++;
            } else {
                withoutCloudinary++;
                itemsWithoutImages.push({
                    name: food.name,
                    image: food.image,
                    id: food._id
                });
            }
        });

        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        console.log('📊 Summary:');
        console.log(`✅ Items with Cloudinary URLs: ${withCloudinary}`);
        console.log(`❌ Items without Cloudinary URLs: ${withoutCloudinary}`);
        console.log(`📦 Total items: ${foods.length}\n`);

        if (itemsWithoutImages.length > 0) {
            console.log('⚠️  Items missing Cloudinary URLs:');
            itemsWithoutImages.forEach((item, i) => {
                console.log(`   ${i + 1}. ${item.name} - ${item.image}`);
            });
            console.log('\n💡 These items need images uploaded through the admin portal or deleted from database.\n');
        } else {
            console.log('🎉 All items are using Cloudinary URLs!\n');
        }

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await mongoose.connection.close();
    }
}

checkDatabaseStatus();
