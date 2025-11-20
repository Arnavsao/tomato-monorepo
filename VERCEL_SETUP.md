# 🚀 Vercel Deployment Setup Guide

This guide will help you configure your TOMATO project for deployment on Vercel.

## 📋 Prerequisites

- Vercel account (sign up at [vercel.com](https://vercel.com))
- GitHub repository with your code
- Clerk account for authentication
- Backend deployed (e.g., on Render)

## 🔧 Frontend Deployment on Vercel

### Step 1: Connect Your Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository
4. Select the `frontend` folder as the root directory

### Step 2: Configure Build Settings

Vercel should auto-detect Vite, but verify these settings:

- **Framework Preset**: Vite
- **Root Directory**: `frontend` (if deploying from monorepo)
- **Build Command**: `npm run build` (or `cd frontend && npm run build`)
- **Output Directory**: `dist`
- **Install Command**: `npm install` (or `cd frontend && npm install`)

### Step 3: Set Environment Variables

**CRITICAL**: You must set these environment variables in Vercel:

1. Go to your project → **Settings** → **Environment Variables**

2. Add the following variables:

#### Required Variables

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_live_your_clerk_publishable_key_here
```

**Where to get it:**
- Go to [Clerk Dashboard](https://dashboard.clerk.com)
- Select your application
- Go to "API Keys"
- Copy the "Publishable key" (use `pk_live_...` for production, `pk_test_...` for testing)

#### Backend URL

```env
VITE_BACKEND_URL=https://your-backend-url.onrender.com
```

Replace with your actual backend URL (e.g., `https://tomato-backend-weqp.onrender.com`)

#### Optional: Payment Gateway

```env
VITE_RAZORPAY_KEY_ID=rzp_live_your_key_id
```

**Important Notes:**
- ✅ All Vite environment variables **MUST** be prefixed with `VITE_`
- ✅ Set variables for **Production**, **Preview**, and **Development** environments
- ✅ After adding variables, you **MUST redeploy** for changes to take effect

### Step 4: Deploy

1. Click **Deploy** button
2. Wait for build to complete
3. Your app will be live at `https://your-project.vercel.app`

### Step 5: Verify Deployment

After deployment, check:

1. ✅ App loads without errors
2. ✅ Authentication works (Clerk login)
3. ✅ API calls work (check browser console for backend connection)
4. ✅ No "Missing Publishable Key" error

## 🔧 Admin Panel Deployment on Vercel

Follow the same steps as Frontend, but:

### Configuration

- **Root Directory**: `admin`
- **Build Command**: `npm run build` (or `cd admin && npm run build`)
- **Output Directory**: `dist`

### Environment Variables

Only one required variable:

```env
VITE_BACKEND_URL=https://your-backend-url.onrender.com
```

## 🐛 Troubleshooting

### Error: "Missing Publishable Key"

**Problem**: `VITE_CLERK_PUBLISHABLE_KEY` is not set or not accessible.

**Solution**:
1. Go to Vercel → Your Project → Settings → Environment Variables
2. Verify `VITE_CLERK_PUBLISHABLE_KEY` is set
3. Check that it's enabled for **Production** environment
4. **Redeploy** your application (Vercel doesn't rebuild automatically when you add env vars)

**To redeploy:**
- Go to Deployments tab
- Click the three dots on latest deployment
- Click "Redeploy"

### Environment Variables Not Working

**Common Issues:**

1. **Missing `VITE_` prefix**: Vite only exposes variables prefixed with `VITE_`
2. **Not redeployed**: After adding env vars, you must redeploy
3. **Wrong environment**: Make sure variables are set for the correct environment (Production/Preview/Development)

**Debug Steps:**

1. Check Vercel build logs for environment variable injection
2. Add temporary logging in your code:
   ```javascript
   console.log('Env check:', import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ? 'Set' : 'Missing')
   ```
3. Verify variable names match exactly (case-sensitive)

### Backend Connection Issues

**Problem**: Frontend can't connect to backend.

**Solution**:
1. Verify `VITE_BACKEND_URL` is set correctly in Vercel
2. Check backend CORS settings allow your Vercel domain
3. Verify backend is running and accessible
4. Check browser console for CORS errors

### Build Fails

**Common Causes:**

1. **Missing dependencies**: Ensure `package.json` has all required packages
2. **Node version**: Vercel uses Node 18.x by default (check if compatible)
3. **Build command**: Verify build command is correct

**Solution**:
- Check Vercel build logs for specific errors
- Test build locally: `npm run build`
- Verify `package.json` scripts are correct

## 📝 Environment Variables Checklist

### Frontend (Vercel)

- [ ] `VITE_CLERK_PUBLISHABLE_KEY` - Clerk publishable key (required)
- [ ] `VITE_BACKEND_URL` - Backend API URL (required)
- [ ] `VITE_RAZORPAY_KEY_ID` - Payment gateway key (optional)

### Admin (Vercel)

- [ ] `VITE_BACKEND_URL` - Backend API URL (required)

### Backend (Render/Heroku)

- [ ] `MONGODB_URI` - MongoDB connection string (required)
- [ ] `CLERK_SECRET_KEY` - Clerk secret key (required)
- [ ] `NODE_ENV` - Set to `production` (usually auto-set)
- [ ] `PORT` - Server port (usually auto-set)
- [ ] `ALLOWED_ORIGINS` - CORS origins including Vercel URLs (required)

## 🔄 Updating Environment Variables

1. Go to Vercel → Project → Settings → Environment Variables
2. Edit or add variables
3. **Important**: Click "Redeploy" or trigger a new deployment
4. Vercel will rebuild with new variables

## 📚 Additional Resources

- [Vercel Environment Variables Docs](https://vercel.com/docs/concepts/projects/environment-variables)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Clerk Documentation](https://clerk.com/docs)
- [Vercel Deployment Guide](https://vercel.com/docs/deployments/overview)

## ✅ Quick Checklist

Before deploying:

- [ ] All environment variables set in Vercel
- [ ] Variables prefixed with `VITE_` for frontend/admin
- [ ] Backend URL matches your deployed backend
- [ ] Clerk keys are production keys (`pk_live_...`)
- [ ] CORS configured on backend to allow Vercel domain
- [ ] Build works locally (`npm run build`)
- [ ] Ready to redeploy after setting variables

