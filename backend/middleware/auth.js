import { verifyToken } from '@clerk/backend';

const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;
    
    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ 
            success: false, 
            message: "Authorization header missing or invalid. Please login again." 
        });
    }

    try {
        const token = authorization.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: "Token is missing. Please login again." 
            });
        }

        // Verify the token with Clerk
        const session = await verifyToken(token);
        
        if (!session || !session.sub) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid token format. Please login again." 
            });
        }
        
        // Add user info to request body
        req.body.userId = session.sub; // Clerk user ID
        req.body.user = session; // Full session data
        
        console.log(`✅ User authenticated: ${session.sub}`);
        next();
    } catch (error) {
        console.error('❌ Clerk auth error:', error);
        
        // Handle specific Clerk errors
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                success: false, 
                message: "Session expired. Please login again." 
            });
        }
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid token. Please login again." 
            });
        }
        
        if (error.message?.includes('jwt')) {
            return res.status(401).json({ 
                success: false, 
                message: "Token validation failed. Please login again." 
            });
        }
        
        res.status(401).json({ 
            success: false, 
            message: "Authentication failed. Please login again." 
        });
    }
};

export default authMiddleware;
