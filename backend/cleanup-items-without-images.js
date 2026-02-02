import mongoose from 'mongoose';
import foodModel from './models/foodModel.js';
import dotenv from 'dotenv';

dotenv.config();

console.log('🗑️  Cleaning up food items without Cloudinary images...\n');

async function cleanupDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        // Find all items without Cloudinary URLs
        const itemsToDelete = await foodModel.find({
            image: { $not: /cloudinary\.com/ }
        });

        console.log(`Found ${itemsToDelete.length} items without Cloudinary URLs:\n`);

        itemsToDelete.forEach((item, index) => {
            console.log(`${index + 1}. ${item.name} (${item.image})`);
        });

        console.log('\n⚠️  WARNING: This will permanently delete these items from the database!');
        console.log('Press Ctrl+C to cancel, or wait 5 seconds to proceed...\n');

        // Wait 5 seconds
        await new Promise(resolve => setTimeout(resolve, 5000));

        console.log('🗑️  Deleting items...\n');

        let deleted = 0;
        for (const item of itemsToDelete) {
            await foodModel.findByIdAndDelete(item._id);
            console.log(`✅ Deleted: ${item.name}`);
            deleted++;
        }

        console.log(`\n📊 Cleanup Summary:`);
        console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
        console.log(`🗑️  Deleted: ${deleted} items`);
        console.log(`✅ Remaining: ${await foodModel.countDocuments()} items`);
        console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

        console.log('🎉 Cleanup complete!');
        console.log('💡 All remaining items now use Cloudinary URLs\n');

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await mongoose.connection.close();
    }
}

cleanupDatabase();
