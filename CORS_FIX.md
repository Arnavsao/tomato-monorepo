# 🔧 CORS and Double Slash Fix

## Issues Fixed

1. **Double Slash in URLs** (`//api/user/profile`)
2. **CORS Errors** - Frontend origin not allowed

## Changes Made

### Frontend Changes

1. **`frontend/src/config/api.js`**
   - Added URL normalization to prevent double slashes
   - `buildApiUrl()` now handles trailing slashes properly

2. **`frontend/src/context/StoreContext.jsx`**
   - Normalizes `API_BASE_URL` to remove trailing slashes

3. **`frontend/src/pages/PlaceOrder/PlaceOrder.jsx`**
   - Fixed to use `API_BASE_URL` instead of relative URL

### Backend Changes

1. **`backend/server.js`**
   - Enhanced CORS configuration
   - Normalizes origins for comparison
   - Better error logging
   - More permissive in development mode

## 🔧 Required Action: Update Render Environment Variables

You **MUST** add your frontend URL to `ALLOWED_ORIGINS` in Render:

### Step 1: Go to Render Dashboard

1. Navigate to your backend service on Render
2. Go to **Environment** tab
3. Find or create `ALLOWED_ORIGINS` variable

### Step 2: Set ALLOWED_ORIGINS

Add your frontend URL (and admin URL if deployed):

```env
ALLOWED_ORIGINS=https://tomato-food-delivery-frontend.vercel.app,https://your-admin-url.vercel.app
```

**Important:**
- No spaces after commas
- No trailing slashes
- Include both frontend and admin URLs if both are deployed
- Separate multiple URLs with commas

### Step 3: Redeploy

After updating environment variables:
1. Render will automatically redeploy
2. Wait for deployment to complete
3. Test your frontend again

## ✅ Verification

After deploying, test these endpoints:

1. **Health Check**:
   ```
   https://tomato-monorepo.onrender.com/api/health
   ```

2. **Food List** (should work without CORS error):
   ```
   https://tomato-monorepo.onrender.com/api/food/list
   ```

3. **Check Browser Console**:
   - No more double slashes (`//api/...`)
   - No more CORS errors
   - Requests should succeed

## 🐛 If Issues Persist

### Check 1: Verify Environment Variable
- Go to Render → Environment tab
- Verify `ALLOWED_ORIGINS` is set correctly
- No trailing slashes in URLs

### Check 2: Check Backend Logs
- Go to Render → Logs
- Look for CORS messages
- Should see allowed origins listed

### Check 3: Verify Frontend Environment Variable
- In Vercel, check `VITE_BACKEND_URL`
- Should be: `https://tomato-monorepo.onrender.com`
- **NO trailing slash**

### Check 4: Clear Browser Cache
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Or clear browser cache completely

## 📝 Summary

**Frontend Fixes:**
- ✅ URL normalization prevents double slashes
- ✅ All API calls use proper base URL

**Backend Fixes:**
- ✅ Enhanced CORS with better error handling
- ✅ Normalizes origins for comparison
- ✅ More permissive in development

**Action Required:**
- ⚠️ **Add frontend URL to `ALLOWED_ORIGINS` in Render**
- ⚠️ **Redeploy backend after updating environment variables**

---

After updating `ALLOWED_ORIGINS` and redeploying, all CORS errors should be resolved! 🎉

