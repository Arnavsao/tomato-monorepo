# 🚀 TOMATO Project Deployment Guide

## 📁 Environment Files Structure

```
TOMATO/
├── backend/
│   ├── .env                    # Local development
│   └── .env.production.template # Production template
├── admin/
│   ├── .env                    # Local development
│   └── .env.production.template # Production template
└── frontend/
    ├── .env                    # Local development
    └── .env.production.template # Production template
```

## 🏠 Local Development Setup

### 1. Backend
```bash
cd backend
npm install
npm run dev
```
- Server runs on `http://localhost:4000`
- Uses local MongoDB connection
- CORS allows localhost origins

### 2. Admin Panel
```bash
cd admin
npm install
npm run dev
```
- Runs on `http://localhost:3000` (or next available port)
- Connects to local backend at `http://localhost:4000`

### 3. Frontend (Customer App)
```bash
cd frontend
npm install
npm run dev
```
- Runs on `http://localhost:5173` (or next available port)
- Connects to local backend at `http://localhost:4000`

## 🌐 Production Deployment

### Backend (Render/Heroku/AWS)

1. **Set Environment Variables:**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
   CLERK_SECRET_KEY=sk_live_your_clerk_secret_key_here
   NODE_ENV=production
   PORT=8000
   ALLOWED_ORIGINS=https://your-frontend.com,https://your-admin.com
   ```

2. **Deploy:**
   - Connect your GitHub repo
   - Build command: `npm install`
   - Start command: `npm start`
   - Render will auto-assign PORT

### Admin Panel (Vercel/Netlify)

1. **Set Environment Variables:**
   ```env
   VITE_BACKEND_URL=https://your-backend-url.onrender.com
   VITE_NODE_ENV=production
   ```

2. **Deploy:**
   - Connect your GitHub repo
   - Build command: `npm run build`
   - Output directory: `dist`

### Frontend (Vercel/Netlify)

1. **Set Environment Variables:**
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=pk_live_your_clerk_publishable_key_here
   VITE_NODE_ENV=production
   ```

2. **Deploy:**
   - Connect your GitHub repo
   - Build command: `npm run build`
   - Output directory: `dist`

## 🔄 Switching Between Environments

### Local → Production
1. Copy `.env.production.template` to `.env.production`
2. Update values with your production URLs/keys
3. Restart the development server

### Production → Local
1. Ensure `.env` files have localhost URLs
2. Restart development servers

## 📋 Environment Variables Checklist

### Backend
- [ ] `MONGODB_URI` - MongoDB connection string
- [ ] `CLERK_SECRET_KEY` - Clerk backend secret key
- [ ] `NODE_ENV` - Environment (development/production)
- [ ] `PORT` - Server port (auto-assigned on Render)
- [ ] `ALLOWED_ORIGINS` - CORS allowed origins
- [ ] `RAZORPAY_KEY_ID` - Optional payment gateway
- [ ] `RAZORPAY_KEY_SECRET` - Optional payment gateway

### Admin
- [ ] `VITE_BACKEND_URL` - Backend API URL
- [ ] `VITE_NODE_ENV` - Environment indicator

### Frontend
- [ ] `VITE_CLERK_PUBLISHABLE_KEY` - Clerk frontend key
- [ ] `VITE_NODE_ENV` - Environment indicator

## 🚨 Important Notes

1. **Never commit `.env` files** - they're in `.gitignore`
2. **Images are stored locally** - on Render, files are ephemeral
3. **Use production Clerk keys** for live deployment
4. **CORS origins** must match your actual frontend/admin URLs
5. **MongoDB Atlas** recommended for production database

## 🔧 Troubleshooting

### CORS Issues
- Check `ALLOWED_ORIGINS` in backend `.env`
- Ensure frontend/admin URLs are included

### Database Connection

#### MongoDB Atlas IP Whitelist Issue (Common on Render/Heroku)

**Error:** `Could not connect to any servers in your MongoDB Atlas cluster. One common reason is that you're trying to access the database from an IP that isn't whitelisted.`

**Solution:**

1. **Go to MongoDB Atlas Dashboard:**
   - Log in at https://cloud.mongodb.com
   - Select your cluster
   - Navigate to **Security** → **Network Access**

2. **Add IP Address:**
   - Click **"Add IP Address"**
   - Choose one of these options:
     - **Option A (Recommended for Production):** Click **"Allow Access from Anywhere"**
       - This adds `0.0.0.0/0` to your whitelist
       - Allows connections from any IP address
       - ⚠️ **Security Note:** Only use this if your database has strong authentication
     - **Option B (More Secure):** Add Render's specific IP addresses
       - Render uses dynamic IPs, so this requires periodic updates
       - Less practical for production deployments

3. **Wait for Propagation:**
   - MongoDB Atlas changes can take 1-2 minutes to propagate
   - Wait before redeploying

4. **Verify Connection String:**
   - Ensure `MONGODB_URI` is set correctly in Render environment variables
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`
   - Make sure username/password are URL-encoded if they contain special characters

5. **Check Database User Permissions:**
   - Go to **Security** → **Database Access**
   - Ensure your database user has proper permissions
   - For production, use a user with read/write access to your database

6. **Verify Cluster Status:**
   - Check that your MongoDB Atlas cluster is running (not paused)
   - Free tier clusters pause after inactivity
   - Resume if necessary

**Quick Fix Checklist:**
- [ ] MongoDB Atlas Network Access allows `0.0.0.0/0` or Render IPs
- [ ] `MONGODB_URI` is set in Render environment variables
- [ ] Database user has correct permissions
- [ ] Cluster is running (not paused)
- [ ] Waited 1-2 minutes after IP whitelist changes
- [ ] Redeployed application after changes

**Additional Troubleshooting:**
- Verify `MONGODB_URI` format is correct
- Check MongoDB Atlas cluster logs for connection attempts
- Ensure connection string includes database name
- Test connection string locally before deploying

### Clerk Authentication
- Use test keys for development
- Use live keys for production
- Verify redirect URLs in Clerk dashboard

## 📚 Quick Commands

```bash
# Start all services locally
cd backend && npm run dev &
cd admin && npm run dev &
cd frontend && npm run dev &

# Check environment
echo $NODE_ENV
echo $VITE_BACKEND_URL

# Test backend
curl http://localhost:4000/
```
