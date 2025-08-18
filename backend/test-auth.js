/**
 * Test Authentication Flow
 * This script helps test the authentication endpoints
 */

import axios from 'axios';

const BASE_URL = 'http://localhost:4000';

// Test functions
const testEndpoints = async () => {
    console.log('🧪 Testing Authentication Endpoints...\n');

    try {
        // Test 1: Health check
        console.log('1️⃣ Testing health endpoint...');
        const healthResponse = await axios.get(`${BASE_URL}/health`);
        console.log('✅ Health check passed:', healthResponse.data);
    } catch (error) {
        console.log('❌ Health check failed:', error.message);
    }

    try {
        // Test 2: Test without auth header
        console.log('\n2️⃣ Testing protected endpoint without auth...');
        const noAuthResponse = await axios.get(`${BASE_URL}/api/user/profile`);
        console.log('❌ This should have failed with 401');
    } catch (error) {
        if (error.response?.status === 401) {
            console.log('✅ Correctly rejected unauthorized request');
        } else {
            console.log('❌ Unexpected error:', error.message);
        }
    }

    try {
        // Test 3: Test with invalid auth header
        console.log('\n3️⃣ Testing with invalid auth header...');
        const invalidAuthResponse = await axios.get(`${BASE_URL}/api/user/profile`, {
            headers: { authorization: 'Bearer invalid-token' }
        });
        console.log('❌ This should have failed with 401');
    } catch (error) {
        if (error.response?.status === 401) {
            console.log('✅ Correctly rejected invalid token');
        } else {
            console.log('❌ Unexpected error:', error.message);
        }
    }

    console.log('\n🎯 Authentication tests completed!');
    console.log('\n📝 To test with real Clerk tokens:');
    console.log('1. Login to your frontend app');
    console.log('2. Check browser console for the JWT token');
    console.log('3. Use that token in the Authorization header');
    console.log('4. Test the protected endpoints');
};

// Run tests
testEndpoints().catch(console.error);
