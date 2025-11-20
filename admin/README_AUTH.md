# 🔐 Admin Panel Authentication Setup

The admin panel now requires Clerk authentication. Users must sign in before accessing any admin features.

## 🚀 Quick Setup

### Step 1: Create Environment File

Create `admin/.env.local` file:

```bash
cd admin
touch .env.local
```

### Step 2: Add Clerk Publishable Key

Edit `admin/.env.local` and add:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
VITE_BACKEND_URL=http://localhost:10000
```

**Get your Clerk key:**
1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Select your application
3. Go to **API Keys**
4. Copy the **Publishable key** (starts with `pk_test_...`)

**Important:** Use the **SAME Clerk application** as your frontend for consistent user management.

### Step 3: Run the Admin Panel

```bash
npm run dev
```

Visit `http://localhost:3000` - you'll be redirected to `/login` if not authenticated.

## 🔒 How It Works

1. **Unauthenticated users** → Redirected to `/login`
2. **After login** → Can access all admin pages (`/add`, `/list`, `/orders`)
3. **Navbar** → Shows user name, email, and logout button
4. **Logout** → Redirects back to login page

## 📁 Files Created

- `admin/src/main.jsx` - ClerkProvider setup
- `admin/src/components/ProtectedRoute.jsx` - Route protection
- `admin/src/pages/Login.jsx` - Login page
- `admin/src/pages/Login.css` - Login styles
- `admin/src/App.jsx` - Updated with protected routes
- `admin/src/components/Navbar/Navbar.jsx` - Updated with user info
- `admin/src/components/Navbar/Navbar.css` - Updated styles

## ✅ Features

- ✅ Complete authentication flow
- ✅ Protected routes (all admin pages)
- ✅ Login page with Clerk SignIn component
- ✅ User profile display in Navbar
- ✅ Logout functionality
- ✅ Responsive design

## 🌐 Production Deployment

Set these environment variables in your hosting platform:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_live_your_production_key
VITE_BACKEND_URL=https://your-backend-url.onrender.com
```

**Don't forget to redeploy after setting environment variables!**

