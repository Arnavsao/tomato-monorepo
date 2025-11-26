import { verifyToken } from '@clerk/backend';

/**
 * Authentication Middleware
 * Verifies Clerk JWT tokens and adds user info to request
 * 
 * The token from frontend getToken() is a JWT that needs to be verified
 */
const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;
    
    if (!authorization || !authorization.startsWith('Bearer ')) {
        console.log('❌ Missing or invalid authorization header');
        return res.status(401).json({ 
            success: false, 
            message: "Not Authorized. Please login again." 
        });
    }

    // Check if Clerk secret key is configured
    if (!process.env.CLERK_SECRET_KEY) {
        console.error('❌ CLERK_SECRET_KEY not configured in environment variables');
        return res.status(500).json({ 
            success: false, 
            message: "Server configuration error. Please contact support." 
        });
    }

    try {
        const token = authorization.replace('Bearer ', '');
        console.log('🔍 Verifying token, length:', token.length);
        console.log('🔑 CLERK_SECRET_KEY exists:', !!process.env.CLERK_SECRET_KEY);
        
        // Verify JWT token - verifyToken uses CLERK_SECRET_KEY from environment
        // The token from getToken() is a JWT session token
        const session = await verifyToken(token, {
            secretKey: process.env.CLERK_SECRET_KEY
        });
        
        console.log('✅ Token verified, session keys:', Object.keys(session || {}));
        console.log('✅ Session sub:', session?.sub);
        
        if (!session || !session.sub) {
            console.log('❌ Invalid session: missing user ID (sub)');
            return res.status(401).json({ 
                success: false, 
                message: "Invalid session. Please login again." 
            });
        }
        
        // Add user info to request body
        req.body.userId = session.sub; // Clerk user ID
        req.body.user = session; // Full session data
        
        console.log('✅ Authentication successful for user:', session.sub);
        next();
    } catch (error) {
        console.error('❌ Clerk auth error:', error.message || error);
        console.error('Error type:', error.constructor.name);
        console.error('Error details:', {
            message: error.message,
            status: error.status,
            errors: error.errors,
            name: error.name
        });
        res.status(401).json({ 
            success: false, 
            message: "Invalid session. Please login again.",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export default authMiddleware;
