# Clerk Authentication Setup

## Step 1: Create Clerk Account
1. Go to [clerk.com](https://clerk.com)
2. Sign up for a free account
3. Create a new application

## Step 2: Configure Google OAuth
1. In your Clerk dashboard, go to "User & Authentication" → "Social Connections"
2. Enable Google OAuth
3. Add your Google OAuth credentials (Client ID and Secret)
4. Set authorized redirect URIs

## Step 3: Get Your Publishable Key
1. In Clerk dashboard, go to "API Keys"
2. Copy your "Publishable Key"

## Step 4: Set Environment Variables
Create a `.env` file in the frontend directory:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here
```

## Step 5: Configure Redirect URLs
In Clerk dashboard, add these redirect URLs:
- `http://localhost:5173/*` (for development)
- `https://yourdomain.com/*` (for production)

## Features
- ✅ Google OAuth authentication
- ✅ Automatic profile picture from Google
- ✅ Secure session management
- ✅ Built-in user management 