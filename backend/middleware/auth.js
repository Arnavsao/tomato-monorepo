import { verifyToken } from '@clerk/backend';

const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;
    
    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ 
            success: false, 
            message: "Not Authorized. Please login again." 
        });
    }

    try {
        const token = authorization.replace('Bearer ', '');
        const session = await verifyToken(token);
        
        // Add user info to request body
        req.body.userId = session.sub; // Clerk user ID
        req.body.user = session; // Full session data
        
        next();
    } catch (error) {
        console.log('Clerk auth error:', error);
        res.status(401).json({ 
            success: false, 
            message: "Invalid session. Please login again." 
        });
    }
};

export default authMiddleware;
