# ✅ Testing Checklist for Vercel Deployment

Use this checklist to ensure everything is configured correctly for testing your deployed application.

## 🔑 Environment Variables Checklist

### Backend (Render/Heroku/etc.) ✅

- [x] `CLERK_SECRET_KEY` - ✅ You've updated this
- [ ] `MONGODB_URI` - MongoDB connection string
- [ ] `NODE_ENV` - Should be `production` (usually auto-set)
- [ ] `PORT` - Server port (usually auto-set by platform)
- [ ] `ALLOWED_ORIGINS` - **CRITICAL**: Must include your Vercel frontend URL
  - Example: `https://your-frontend.vercel.app,https://your-admin.vercel.app`
- [ ] `RAZORPAY_KEY_ID` - Optional, only if using payments
- [ ] `RAZORPAY_KEY_SECRET` - Optional, only if using payments

### Frontend (Vercel) ⚠️

- [ ] `VITE_CLERK_PUBLISHABLE_KEY` - **REQUIRED** - Different from secret key!
  - Get from [Clerk Dashboard](https://dashboard.clerk.com) → API Keys → Publishable Key
  - Use `pk_live_...` for production
- [ ] `VITE_BACKEND_URL` - **REQUIRED** - Your backend URL
  - Example: `https://tomato-backend-weqp.onrender.com`
- [ ] `VITE_RAZORPAY_KEY_ID` - Optional, only if using payments

### Admin Panel (Vercel) - If deploying

- [ ] `VITE_BACKEND_URL` - Your backend URL

## 📝 Step-by-Step Testing Guide

### Step 1: Verify Backend Configuration

1. **Check Backend CORS Settings**
   - Go to your backend hosting platform (Render/Heroku)
   - Find `ALLOWED_ORIGINS` environment variable
   - Make sure it includes your Vercel frontend URL:
     ```
     https://your-frontend.vercel.app,https://your-admin.vercel.app
     ```
   - If not set, add it and restart/redeploy backend

2. **Test Backend Health**
   - Visit: `https://your-backend-url.onrender.com/api/health`
   - Should return: `{"success": true, "status": "ok", ...}`
   - If not working, check backend logs

### Step 2: Configure Frontend on Vercel

1. **Go to Vercel Dashboard**
   - Navigate to your frontend project
   - Click **Settings** → **Environment Variables**

2. **Set Required Variables**

   **a) Clerk Publishable Key:**
   - Name: `VITE_CLERK_PUBLISHABLE_KEY`
   - Value: Your Clerk publishable key (from Clerk Dashboard)
   - Get it: [Clerk Dashboard](https://dashboard.clerk.com) → Your App → API Keys → Publishable Key
   - ⚠️ This is DIFFERENT from `CLERK_SECRET_KEY` (secret key is for backend only)
   - Use `pk_live_...` for production, `pk_test_...` for testing

   **b) Backend URL:**
   - Name: `VITE_BACKEND_URL`
   - Value: Your backend URL (e.g., `https://tomato-backend-weqp.onrender.com`)
   - Make sure it matches your actual backend URL

3. **Set Environment Scope**
   - For each variable, select:
     - ✅ Production
     - ✅ Preview (optional but recommended)
     - ✅ Development (optional)

4. **Save Variables**

### Step 3: Redeploy Frontend

**IMPORTANT**: After setting environment variables, you MUST redeploy!

1. Go to **Deployments** tab in Vercel
2. Click the **three dots (⋯)** on the latest deployment
3. Click **Redeploy**
4. Or push a new commit to trigger automatic deployment

### Step 4: Test Your Application

1. **Open Your Vercel URL**
   - Visit: `https://your-frontend.vercel.app`

2. **Check Browser Console**
   - Open Developer Tools (F12)
   - Go to Console tab
   - Look for:
     - ✅ No "Missing Publishable Key" error
     - ✅ Backend URL logged correctly
     - ✅ No CORS errors
     - ✅ No network errors

3. **Test Authentication**
   - Try to sign in/sign up
   - Verify Clerk authentication works
   - Check that user session is created

4. **Test API Calls**
   - Navigate through your app
   - Try actions that call the backend API
   - Check Network tab in DevTools for successful API calls
   - Verify no CORS errors

5. **Test Key Features**
   - [ ] User authentication (sign in/out)
   - [ ] Data loading from backend
   - [ ] Form submissions
   - [ ] Image uploads (if applicable)
   - [ ] Payment processing (if applicable)

## 🐛 Common Issues & Solutions

### Issue: "Missing Publishable Key" Error

**Cause**: `VITE_CLERK_PUBLISHABLE_KEY` not set in Vercel

**Solution**:
1. Go to Vercel → Settings → Environment Variables
2. Add `VITE_CLERK_PUBLISHABLE_KEY` with your Clerk publishable key
3. **Redeploy** (critical step!)

### Issue: CORS Errors

**Cause**: Backend `ALLOWED_ORIGINS` doesn't include Vercel URL

**Solution**:
1. Go to backend hosting platform
2. Update `ALLOWED_ORIGINS` to include:
   ```
   https://your-frontend.vercel.app
   ```
3. Restart/redeploy backend

### Issue: Backend Connection Failed

**Cause**: Wrong `VITE_BACKEND_URL` or backend not running

**Solution**:
1. Verify backend is running: `https://your-backend-url.onrender.com/api/health`
2. Check `VITE_BACKEND_URL` in Vercel matches backend URL
3. Redeploy frontend after updating

### Issue: Authentication Not Working

**Cause**: Clerk keys mismatch or wrong environment

**Solution**:
1. Verify `VITE_CLERK_PUBLISHABLE_KEY` matches your Clerk app
2. Verify `CLERK_SECRET_KEY` in backend matches same Clerk app
3. Check Clerk Dashboard → URLs → Frontend API URL matches Vercel URL

## 🔍 Verification Commands

### Check Backend Health
```bash
curl https://your-backend-url.onrender.com/api/health
```

Expected response:
```json
{
  "success": true,
  "status": "ok",
  "dbConnected": true,
  "env": "production"
}
```

### Check Frontend Environment (in browser console)
```javascript
console.log('Backend URL:', import.meta.env.VITE_BACKEND_URL)
console.log('Clerk Key:', import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ? 'Set' : 'Missing')
```

## 📋 Final Checklist Before Testing

- [ ] Backend deployed and accessible
- [ ] Backend `ALLOWED_ORIGINS` includes Vercel URL
- [ ] `CLERK_SECRET_KEY` set in backend (✅ Done)
- [ ] `VITE_CLERK_PUBLISHABLE_KEY` set in Vercel
- [ ] `VITE_BACKEND_URL` set in Vercel
- [ ] Frontend redeployed after setting variables
- [ ] Browser console shows no errors
- [ ] Authentication works
- [ ] API calls succeed

## 🎯 Quick Test Steps

1. ✅ Set `VITE_CLERK_PUBLISHABLE_KEY` in Vercel
2. ✅ Set `VITE_BACKEND_URL` in Vercel  
3. ✅ Update backend `ALLOWED_ORIGINS` with Vercel URL
4. ✅ Redeploy frontend
5. ✅ Test authentication
6. ✅ Test API calls
7. ✅ Verify all features work

## 📞 Need Help?

If you encounter issues:
1. Check browser console for specific error messages
2. Check Vercel build logs for build errors
3. Check backend logs for API errors
4. Verify all environment variables are set correctly
5. Ensure you've redeployed after setting variables

