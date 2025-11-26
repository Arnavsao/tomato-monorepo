# 🚀 Landing Page Setup Guide

## Overview

A landing page has been added to the customer app (`https://tomato-monorepo.vercel.app/`) that provides evaluators with easy access to both the customer app and admin panel.

## 📍 Location

The landing page is shown at the **root URL** (`/`) of the customer app:
- **URL**: `https://tomato-monorepo.vercel.app/`

## ✨ Features

1. **Welcome Screen**: Clean, branded landing page with TOMATO logo
2. **Two Options**:
   - **Continue as Customer** → Navigates to `/home` (customer app)
   - **Sign in as Admin** → Opens admin panel in new tab
3. **Evaluator-Friendly**: Clear instructions for accessing admin panel

## 🔧 Configuration

### Admin Panel URL

The landing page uses an environment variable to determine the admin panel URL:

**Environment Variable**: `VITE_ADMIN_URL`

**Default Value**: `https://tomato-monorepo-admin.vercel.app`

### Setting Up in Vercel

1. Go to your **Vercel Dashboard**
2. Select your **frontend project**
3. Navigate to **Settings** → **Environment Variables**
4. Add the following variable:

```env
VITE_ADMIN_URL=https://your-admin-panel-url.vercel.app
```

**Important**: 
- Replace `https://your-admin-panel-url.vercel.app` with your actual admin panel URL
- If your admin panel is deployed separately, use that URL
- If it's on the same domain, you can use a relative path like `/admin`

5. **Redeploy** your frontend application after adding the variable

## 📁 Files Created

1. **`frontend/src/pages/Landing/Landing.jsx`**
   - Landing page component
   - Handles navigation and admin panel link

2. **`frontend/src/pages/Landing/Landing.css`**
   - Responsive styling
   - Matches TOMATO brand design

3. **`frontend/src/App.jsx`** (Updated)
   - Added landing page route at `/`
   - Updated customer routes to `/home`

## 🎯 User Flow

### For Evaluators:
1. Visit `https://tomato-monorepo.vercel.app/`
2. See landing page with two options
3. Click **"Sign in as Admin"** → Admin panel opens in new tab
4. Or click **"Continue as Customer"** → Customer app loads

### For Regular Users:
1. Visit `https://tomato-monorepo.vercel.app/`
2. Click **"Continue as Customer"** → Customer app loads
3. Can also directly visit `/home` to skip landing page

## 🔄 Routing Changes

- **`/`** → Landing page (NEW)
- **`/home`** → Customer home page (was previously `/`)
- All other routes remain the same (`/cart`, `/order`, etc.)

## 📱 Responsive Design

The landing page is fully responsive:
- **Mobile**: Optimized layout with smaller buttons
- **Tablet**: Medium-sized layout
- **Desktop**: Full-width centered design

## ✅ Testing Checklist

- [ ] Landing page displays at root URL (`/`)
- [ ] "Continue as Customer" button navigates to `/home`
- [ ] "Sign in as Admin" button opens admin panel in new tab
- [ ] Admin panel URL is correct (check `VITE_ADMIN_URL`)
- [ ] Landing page is responsive on mobile devices
- [ ] Logo displays correctly
- [ ] All styling matches TOMATO brand

## 🐛 Troubleshooting

### Admin Panel Link Not Working

1. **Check Environment Variable**:
   - Verify `VITE_ADMIN_URL` is set in Vercel
   - Ensure it's set for **Production** environment
   - Redeploy after adding/updating

2. **Verify Admin URL**:
   - Test the admin URL directly in browser
   - Ensure admin panel is deployed and accessible

3. **Check Console**:
   - Open browser console (F12)
   - Look for any errors when clicking "Sign in as Admin"

### Landing Page Not Showing

1. **Check Route**:
   - Ensure you're visiting root URL (`/`)
   - Not `/home` or other routes

2. **Verify Build**:
   - Check Vercel build logs
   - Ensure `Landing.jsx` is included in build

3. **Clear Cache**:
   - Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
   - Clear browser cache

## 📝 Notes

- The landing page is designed specifically for evaluators to easily access the admin panel
- Regular users can still access the customer app directly via `/home`
- The admin panel opens in a new tab to preserve the customer app session
- All existing routes continue to work as before

## 🎨 Customization

To customize the landing page:

1. **Update Text**: Edit `Landing.jsx` to change welcome message
2. **Change Colors**: Modify CSS variables in `Landing.css`
3. **Add Features**: Add more buttons or information as needed

---

**Created**: Landing page implementation for evaluator access
**Last Updated**: Current date

