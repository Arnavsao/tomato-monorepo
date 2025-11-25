/**
 * API Testing Script
 * 
 * Run with: node test-api.js [base_url] [auth_token]
 * Example: node test-api.js http://localhost:8000 your_clerk_token
 * 
 * For production: node test-api.js https://tomato-monorepo.onrender.com your_clerk_token
 */

import axios from 'axios';

const BASE_URL = process.argv[2] || 'http://localhost:8000';
const AUTH_TOKEN = process.argv[3] || '';

// Colors for console output
const colors = {
  reset => `\x1b[32m${text}\x1b[0m`,
  error => `\x1b[31m${text}\x1b[0m`,
  info => `\x1b[36m${text}\x1b[0m`,
  warning => `\x1b[33m${text}\x1b[0m`
};

const log = {
  success: (msg) => console.log(colors.success(`✅ ${msg}`)),
  error: (msg) => console.log(colors.error(`❌ ${msg}`)),
  info: (msg) => console.log(colors.info(`ℹ️  ${msg}`)),
  warning: (msg) => console.log(colors.warning(`⚠️  ${msg}`))
};

// Helper function to make authenticated requests
const makeRequest = async (method, endpoint, data = null, headers = {}) => {
  const config = {
    method,
    url: `${BASE_URL}${endpoint}`,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  };

  if (AUTH_TOKEN) {
    config.headers['Authorization'] = `Bearer ${AUTH_TOKEN}`;
  }

  if (data) {
    config.data = data;
  }

  try {
    const response = await axios(config);
    return { success: true, data: response.data, status: response.status };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data || error.message,
      status: error.response?.status || 500
    };
  }
};

// Test functions
const tests = {
  // Health check (no auth required)
  async testHealth() {
    log.info('Testing Health Endpoint...');
    const result = await makeRequest('GET', '/api/health');
    if (result.success) {
      log.success(`Health check passed: ${JSON.stringify(result.data)}`);
      return true;
    } else {
      log.error(`Health check failed: ${result.error}`);
      return false;
    }
  },

  // Food APIs
  async testFoodList() {
    log.info('Testing Food List Endpoint...');
    const result = await makeRequest('GET', '/api/food/list');
    if (result.success && result.data.success) {
      log.success(`Food list retrieved: ${result.data.data?.length || 0} items`);
      return true;
    } else {
      log.error(`Food list failed: ${result.error}`);
      return false;
    }
  },

  async testFoodAdd() {
    if (!AUTH_TOKEN) {
      log.warning('Skipping food add test (no auth token)');
      return false;
    }
    log.info('Testing Food Add Endpoint...');
    log.warning('Note: This test requires a file upload. Use Postman/curl for full testing.');
    // This would require FormData and file upload, which is complex in Node.js
    // For now, we'll just test the endpoint exists
    const result = await makeRequest('GET', '/api/food/add');
    if (result.status === 405) {
      log.success('Food add endpoint exists (returns 405 for GET as expected)');
      return true;
    } else {
      log.error(`Unexpected response: ${result.status}`);
      return false;
    }
  },

  // User APIs
  async testUserCreate() {
    if (!AUTH_TOKEN) {
      log.warning('Skipping user create test (no auth token)');
      return false;
    }
    log.info('Testing User Create Endpoint...');
    const testData = {
      userId: `test_user_${Date.now()}`,
      name: 'Test User',
      email: 'test@example.com',
      profilePicture: ''
    };
    const result = await makeRequest('POST', '/api/user/create', testData);
    if (result.success) {
      log.success(`User created/retrieved: ${JSON.stringify(result.data)}`);
      return true;
    } else {
      log.error(`User create failed: ${result.error}`);
      return false;
    }
  },

  async testUserProfile() {
    if (!AUTH_TOKEN) {
      log.warning('Skipping user profile test (no auth token)');
      return false;
    }
    log.info('Testing User Profile Endpoint...');
    const result = await makeRequest('GET', '/api/user/profile');
    if (result.success) {
      log.success(`User profile retrieved: ${JSON.stringify(result.data)}`);
      return true;
    } else {
      log.error(`User profile failed: ${result.error}`);
      return false;
    }
  },

  // Cart APIs
  async testCartGet() {
    if (!AUTH_TOKEN) {
      log.warning('Skipping cart test (no auth token)');
      return false;
    }
    log.info('Testing Cart Get Endpoint...');
    const result = await makeRequest('POST', '/api/cart/get', {});
    if (result.success) {
      log.success(`Cart retrieved: ${JSON.stringify(result.data)}`);
      return true;
    } else {
      log.error(`Cart get failed: ${result.error}`);
      return false;
    }
  },

  // Order APIs
  async testRazorpayOrder() {
    if (!AUTH_TOKEN) {
      log.warning('Skipping Razorpay order test (no auth token)');
      return false;
    }
    log.info('Testing Razorpay Order Creation...');
    const testData = {
      amount: 100,
      currency: 'INR',
      receipt: `test_receipt_${Date.now()}`
    };
    const result = await makeRequest('POST', '/api/order/razorpay', testData);
    if (result.success && result.data.orderId) {
      log.success(`Razorpay order created: ${result.data.orderId}`);
      return true;
    } else {
      log.error(`Razorpay order creation failed: ${result.error}`);
      return false;
    }
  }
};

// Main test runner
async function runTests() {
  console.log('\n' + '='.repeat(50));
  console.log(`🧪 API Testing Script`);
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Auth Token: ${AUTH_TOKEN ? 'Provided' : 'Not provided (some tests will be skipped)'}`);
  console.log('='.repeat(50) + '\n');

  const results = {
    passed: 0,
    failed: 0,
    skipped: 0
  };

  // Run all tests
  const testResults = await Promise.all([
    tests.testHealth().catch(() => false),
    tests.testFoodList().catch(() => false),
    tests.testFoodAdd().catch(() => false),
    tests.testUserCreate().catch(() => false),
    tests.testUserProfile().catch(() => false),
    tests.testCartGet().catch(() => false),
    tests.testRazorpayOrder().catch(() => false)
  ]);

  // Count results
  testResults.forEach(result => {
    if (result === null) results.skipped++;
    else if (result) results.passed++;
    else results.failed++;
  });

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 Test Summary');
  console.log('='.repeat(50));
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`⏭️  Skipped: ${results.skipped}`);
  console.log('='.repeat(50) + '\n');

  if (results.failed > 0) {
    process.exit(1);
  }
}

// Run tests
runTests().catch(error => {
  log.error(`Test runner failed: ${error.message}`);
  process.exit(1);
});

