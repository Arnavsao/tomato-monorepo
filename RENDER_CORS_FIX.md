# 🚨 URGENT: Fix CORS Error in Render

## The Problem

You're getting this error:
```
Access to XMLHttpRequest at 'https://tomato-monorepo.onrender.com/api/food/list' 
from origin 'https://tomato-food-delivery-frontend.vercel.app' 
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present
```

**This means:** Your backend on Render is **blocking** requests from your Vercel frontend because it's not in the allowed origins list.

---

## ✅ Solution: Add Frontend URL to Render Environment Variables

### Step-by-Step Instructions:

#### 1. Go to Render Dashboard
- Visit: https://dashboard.render.com
- Sign in to your account
- Click on your backend service (tomato-monorepo)

#### 2. Navigate to Environment Tab
- Click on **"Environment"** tab in the left sidebar
- You'll see a list of environment variables

#### 3. Add or Update ALLOWED_ORIGINS

**Option A: If ALLOWED_ORIGINS doesn't exist:**
1. Click **"Add Environment Variable"** button
2. **Key**: `ALLOWED_ORIGINS`
3. **Value**: `https://tomato-food-delivery-frontend.vercel.app`
4. Click **"Save Changes"**

**Option B: If ALLOWED_ORIGINS already exists:**
1. Find `ALLOWED_ORIGINS` in the list
2. Click **"Edit"** (pencil icon)
3. Add your frontend URL:
   ```
   https://tomato-food-delivery-frontend.vercel.app
   ```
   - If there are other URLs, separate with commas (no spaces):
   ```
   https://tomato-food-delivery-frontend.vercel.app,https://your-admin-url.vercel.app
   ```
4. Click **"Save Changes"**

#### 4. Important Format Rules:
- ✅ **NO trailing slashes**: `https://tomato-food-delivery-frontend.vercel.app` (correct)
- ❌ **NO trailing slashes**: `https://tomato-food-delivery-frontend.vercel.app/` (wrong)
- ✅ **Comma-separated** for multiple URLs: `url1,url2,url3`
- ❌ **NO spaces** after commas

#### 5. Wait for Redeploy
- Render will **automatically redeploy** after saving environment variables
- Wait 2-3 minutes for deployment to complete
- Check the **"Logs"** tab to see deployment progress

#### 6. Verify It Works
- Go to your frontend: https://tomato-food-delivery-frontend.vercel.app
- Open browser console (F12)
- Check if CORS errors are gone
- Try loading food items - should work now!

---

## 🔍 How to Verify It's Fixed

### Check Backend Logs:
1. Go to Render → Your Service → **"Logs"** tab
2. Look for startup messages
3. You should see:
   ```
   🌐 CORS Configuration:
      Environment: production
      Allowed Origins: https://tomato-food-delivery-frontend.vercel.app
   ```

### Test in Browser:
1. Open your frontend
2. Open browser console (F12)
3. Should see **NO CORS errors**
4. API requests should succeed

---

## 📸 Visual Guide

### Render Environment Variables Screen:
```
┌─────────────────────────────────────────┐
│ Environment Variables                   │
├─────────────────────────────────────────┤
│ Key              │ Value                │
├─────────────────────────────────────────┤
│ MONGODB_URI      │ mongodb+srv://...    │
│ CLERK_SECRET_KEY │ sk_live_...          │
│ NODE_ENV         │ production           │
│ ALLOWED_ORIGINS  │ [Edit] ← Click here  │
└─────────────────────────────────────────┘
```

### When Editing ALLOWED_ORIGINS:
```
┌──────────────────────────────────────────────┐
│ Edit Environment Variable                    │
├──────────────────────────────────────────────┤
│ Key: ALLOWED_ORIGINS                        │
│                                              │
│ Value:                                       │
│ ┌────────────────────────────────────────┐  │
│ │ https://tomato-food-delivery-          │  │
│ │   frontend.vercel.app                  │  │
│ └────────────────────────────────────────┘  │
│                                              │
│ [Cancel]  [Save Changes] ← Click this      │
└──────────────────────────────────────────────┘
```

---

## 🐛 Troubleshooting

### Issue: Still Getting CORS Errors After Update

**Check 1: Verify Variable Name**
- Make sure it's exactly: `ALLOWED_ORIGINS` (all caps, underscore)
- Not: `ALLOWED_ORIGIN` or `allowed_origins`

**Check 2: Verify URL Format**
- No trailing slash: `https://tomato-food-delivery-frontend.vercel.app`
- No `http://` - must be `https://`
- Exact match with your Vercel URL

**Check 3: Check Backend Logs**
- Go to Render → Logs
- Look for: `❌ CORS blocked origin: ...`
- Should show your frontend URL in the error
- Verify it matches what you set in `ALLOWED_ORIGINS`

**Check 4: Wait for Redeploy**
- Environment variable changes trigger auto-redeploy
- Wait 2-3 minutes after saving
- Check Logs tab to see deployment status

**Check 5: Clear Browser Cache**
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Or clear browser cache completely

---

## 📋 Complete Example

If you have both frontend and admin panel deployed:

```
ALLOWED_ORIGINS=https://tomato-food-delivery-frontend.vercel.app,https://tomato-admin.vercel.app
```

**Important:** 
- No spaces
- Comma-separated
- No trailing slashes
- Exact URLs from Vercel

---

## ✅ Quick Checklist

- [ ] Logged into Render dashboard
- [ ] Navigated to backend service
- [ ] Opened Environment tab
- [ ] Added/updated `ALLOWED_ORIGINS`
- [ ] Value: `https://tomato-food-delivery-frontend.vercel.app` (no trailing slash)
- [ ] Saved changes
- [ ] Waited for redeploy (2-3 minutes)
- [ ] Checked backend logs for confirmation
- [ ] Tested frontend - no CORS errors

---

## 🎯 Expected Result

After fixing:
- ✅ No CORS errors in browser console
- ✅ API requests succeed
- ✅ Food list loads
- ✅ User authentication works
- ✅ Cart operations work
- ✅ Orders can be placed

---

**Once you've added `ALLOWED_ORIGINS` in Render and it redeploys, the CORS errors will be gone!** 🎉

