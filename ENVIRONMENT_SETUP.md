# 🔧 Environment Configuration Guide

This document explains how the environment configuration works across all three parts of the TOMATO project (Backend, Frontend, and Admin Panel).

## ✨ Key Features

- **Zero Configuration for Local Development**: Works out of the box with sensible defaults
- **Production Ready**: Automatically detects production environment and uses appropriate settings
- **Environment Variable Override**: Can override any setting via environment variables
- **No Code Changes Required**: Same code works in both local and production environments

## 📁 File Structure

```
TOMATO/
├── backend/
│   ├── .env.example          # Template showing all available variables
│   └── .env                   # Your local environment file (not committed)
├── frontend/
│   ├── .env.example           # Template showing all available variables
│   └── .env.local             # Your local environment file (not committed)
└── admin/
    ├── .env.example           # Template showing all available variables
    └── .env.local             # Your local environment file (not committed)
```

## 🏠 Local Development

### Backend

**No `.env` file needed!** The backend will:
- Default to port `10000`
- Use `development` mode
- Allow CORS from common localhost ports
- Require `MONGODB_URI` to be set (either in `.env` or environment)

**To customize**, create `backend/.env`:
```bash
cp backend/.env.example backend/.env
# Edit backend/.env with your values
```

**Required for local development:**
- `MONGODB_URI` - MongoDB connection string

**Optional:**
- `PORT` - Server port (defaults to 10000)
- `NODE_ENV` - Environment (defaults to development)
- `ALLOWED_ORIGINS` - CORS origins (defaults to localhost ports)
- `CLERK_SECRET_KEY` - Clerk authentication key
- `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` - Payment gateway (optional)

### Frontend

**No `.env` file needed!** The frontend will:
- Auto-detect development mode (`npm run dev`)
- Default backend URL to `http://localhost:10000`
- Require `VITE_CLERK_PUBLISHABLE_KEY` (set in `.env.local` or environment)

**To customize**, create `frontend/.env.local`:
```bash
cp frontend/.env.example frontend/.env.local
# Edit frontend/.env.local with your values
```

**Required for local development:**
- `VITE_CLERK_PUBLISHABLE_KEY` - Clerk publishable key

**Optional:**
- `VITE_BACKEND_URL` - Backend URL (defaults to http://localhost:10000)
- `VITE_RAZORPAY_KEY_ID` - Payment gateway key (optional)

### Admin Panel

**No `.env` file needed!** The admin panel will:
- Default backend URL to `http://localhost:10000`

**To customize**, create `admin/.env.local`:
```bash
cp admin/.env.example admin/.env.local
# Edit admin/.env.local with your values
```

**Optional:**
- `VITE_BACKEND_URL` - Backend URL (defaults to http://localhost:10000)

## 🌐 Production Deployment

### How It Works

The code automatically detects production environment:

1. **Backend**: Checks `NODE_ENV` environment variable (set to `production` by hosting platforms)
2. **Frontend/Admin**: Vite sets `import.meta.env.DEV` to `false` in production builds

### Backend Deployment (Render, Heroku, AWS, etc.)

Set these environment variables in your hosting platform:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tomato
NODE_ENV=production
PORT=10000  # Usually auto-set by platform
CLERK_SECRET_KEY=sk_live_your_clerk_secret_key_here
ALLOWED_ORIGINS=https://your-frontend.com,https://your-admin.com
RAZORPAY_KEY_ID=rzp_live_your_key_id  # Optional
RAZORPAY_KEY_SECRET=your_live_secret_key  # Optional
BACKEND_URL=https://your-backend-url.onrender.com
```

**Note**: Most platforms automatically set `NODE_ENV=production` and `PORT`.

### Frontend Deployment (Vercel, Netlify, etc.)

Set these environment variables in your hosting platform:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_live_your_clerk_publishable_key_here
VITE_BACKEND_URL=https://your-backend-url.onrender.com
VITE_RAZORPAY_KEY_ID=rzp_live_your_key_id  # Optional
```

**Important**: Vite environment variables must be prefixed with `VITE_` to be accessible in the browser.

### Admin Panel Deployment (Vercel, Netlify, etc.)

Set these environment variables in your hosting platform:

```env
VITE_BACKEND_URL=https://your-backend-url.onrender.com
```

## 🔄 Environment Detection Logic

### Backend (`backend/server.js`)

```javascript
// Detects environment from NODE_ENV
const nodeEnv = process.env.NODE_ENV || 'development';

// Uses PORT from environment or defaults to 10000
const port = process.env.PORT || 10000;

// Uses ALLOWED_ORIGINS or defaults to localhost ports
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
  : ['http://localhost:3000', 'http://localhost:5173', ...];
```

### Frontend (`frontend/src/config/environment.js`)

```javascript
// Vite automatically sets import.meta.env.DEV
const isDevelopment = import.meta.env.DEV; // true in dev, false in production

// Priority: VITE_BACKEND_URL > environment default
const backendUrl = import.meta.env.VITE_BACKEND_URL || 
                   (isDevelopment ? 'http://localhost:10000' : 'https://production-url.com');
```

### Admin (`admin/src/App.jsx`)

```javascript
// Simple: Use VITE_BACKEND_URL or default to localhost
const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:10000";
```

## 📋 Quick Start Checklist

### Local Development

- [ ] Backend: Set `MONGODB_URI` in `backend/.env` (or environment)
- [ ] Frontend: Set `VITE_CLERK_PUBLISHABLE_KEY` in `frontend/.env.local` (or environment)
- [ ] Admin: No setup needed (uses localhost:10000 by default)

### Production Deployment

- [ ] Backend: Set all required environment variables in hosting platform
- [ ] Frontend: Set `VITE_CLERK_PUBLISHABLE_KEY` and `VITE_BACKEND_URL` in hosting platform
- [ ] Admin: Set `VITE_BACKEND_URL` in hosting platform

## 🚨 Important Notes

1. **Never commit `.env` files** - They're in `.gitignore`
2. **Use `.env.example` files** - These are templates showing what variables are available
3. **Vite Variables** - Must be prefixed with `VITE_` to be accessible in browser code
4. **Environment Variables** - Set in hosting platform dashboard, not in code
5. **CORS Origins** - Must match your actual frontend/admin URLs in production
6. **MongoDB Atlas** - Recommended for production database

## 🔍 Troubleshooting

### Backend won't start locally
- Check if `MONGODB_URI` is set
- Verify MongoDB is running (if using local MongoDB)
- Check port 10000 is available

### Frontend can't connect to backend
- Verify backend is running on the expected port
- Check `VITE_BACKEND_URL` matches backend URL
- In production, ensure CORS allows your frontend URL

### Admin can't connect to backend
- Verify backend is running
- Check `VITE_BACKEND_URL` matches backend URL
- In production, ensure CORS allows your admin URL

### Production build uses wrong backend URL
- Verify `VITE_BACKEND_URL` is set in hosting platform
- Rebuild after setting environment variables
- Check that variables are prefixed with `VITE_` for Vite projects

## 📚 Additional Resources

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Node.js Environment Variables](https://nodejs.org/en/learn/command-line/how-to-read-environment-variables-from-nodejs)
- [Render Environment Variables](https://render.com/docs/environment-variables)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

