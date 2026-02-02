import { cloudinary } from './config/cloudinary.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

console.log('🧪 Testing Cloudinary Configuration...\n');

// Test 1: Check environment variables
console.log('1️⃣ Checking environment variables:');
console.log(`   CLOUDINARY_CLOUD_NAME: ${process.env.CLOUDINARY_CLOUD_NAME ? '✅ Set' : '❌ Not set'}`);
console.log(`   CLOUDINARY_API_KEY: ${process.env.CLOUDINARY_API_KEY ? '✅ Set' : '❌ Not set'}`);
console.log(`   CLOUDINARY_API_SECRET: ${process.env.CLOUDINARY_API_SECRET ? '✅ Set' : '❌ Not set'}`);
console.log('');

// Test 2: Test Cloudinary connection
console.log('2️⃣ Testing Cloudinary connection...');
cloudinary.api.ping()
    .then(result => {
        console.log('   ✅ Successfully connected to Cloudinary!');
        console.log('   Response:', result);
        console.log('');

        // Test 3: Get account details
        console.log('3️⃣ Fetching account details...');
        return cloudinary.api.usage();
    })
    .then(usage => {
        console.log('   ✅ Account details retrieved:');
        console.log(`   Cloud Name: ${process.env.CLOUDINARY_CLOUD_NAME}`);
        console.log(`   Storage Used: ${(usage.storage.usage / 1024 / 1024).toFixed(2)} MB`);
        console.log(`   Bandwidth Used: ${(usage.bandwidth.usage / 1024 / 1024).toFixed(2)} MB`);
        console.log(`   Resources: ${usage.resources}`);
        console.log('');
        console.log('✅ All tests passed! Cloudinary is configured correctly.');
        console.log('');
        console.log('📝 Next steps:');
        console.log('   1. Start your backend server: npm run dev');
        console.log('   2. Upload a food item through the admin portal');
        console.log('   3. Check that the image URL starts with: https://res.cloudinary.com/');
    })
    .catch(error => {
        console.error('   ❌ Error testing Cloudinary:', error.message);
        console.log('');
        console.log('🔧 Troubleshooting:');
        console.log('   - Verify your credentials in backend/.env');
        console.log('   - Check your Cloudinary dashboard: https://cloudinary.com/console');
        console.log('   - Ensure your API key and secret are correct');
    });
