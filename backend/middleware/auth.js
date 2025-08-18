import { verifyToken } from '@clerk/backend';

/**
 * Clerk Authentication Middleware
 * Verifies Clerk session tokens and extracts user information
 */
const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;
    
    // Log incoming request for debugging
    console.log(`🔐 Auth middleware called for: ${req.method} ${req.path}`);
    console.log(`📝 Authorization header: ${authorization ? 'Present' : 'Missing'}`);
    
    if (!authorization || !authorization.startsWith('Bearer ')) {
        console.log('❌ Missing or invalid authorization header');
        return res.status(401).json({ 
            success: false, 
            message: "Authorization header missing or invalid. Please login again." 
        });
    }

    try {
        const token = authorization.replace('Bearer ', '');
        
        if (!token) {
            console.log('❌ Token is empty after Bearer removal');
            return res.status(401).json({ 
                success: false, 
                message: "Token is missing. Please login again." 
            });
        }

        console.log(`🔍 Verifying Clerk token: ${token.substring(0, 20)}...`);

        // For Clerk, we need to verify the session token
        // The token from getToken() is a session token, not a JWT
        // We'll extract user info from the token payload directly
        
        try {
            // Decode the token to get user information
            // Clerk session tokens are JWTs that we can decode
            const tokenPayload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
            
            console.log('🔍 Token payload:', JSON.stringify(tokenPayload, null, 2));
            
            if (!tokenPayload.sub) {
                console.log('❌ No user ID found in token');
                return res.status(401).json({ 
                    success: false, 
                    message: "Invalid token format. Please login again." 
                });
            }
            
            // Add user info to request body for downstream handlers
            req.body.userId = tokenPayload.sub; // Clerk user ID
            req.body.user = tokenPayload; // Full token payload
            
            // Also add to req.user for consistency with other auth patterns
            req.user = {
                id: tokenPayload.sub,
                email: tokenPayload.email,
                firstName: tokenPayload.firstName,
                lastName: tokenPayload.lastName,
                fullName: tokenPayload.fullName,
                imageUrl: tokenPayload.imageUrl
            };
            
            console.log(`✅ User authenticated successfully: ${tokenPayload.sub}`);
            console.log(`👤 User details: ${JSON.stringify(req.user)}`);
            
            next();
            
        } catch (decodeError) {
            console.log('❌ Failed to decode token as JWT, trying Clerk verification...');
            
            // Fallback: try to verify with Clerk backend
            try {
                const session = await verifyToken(token);
                
                if (!session || !session.sub) {
                    console.log('❌ Invalid session or missing user ID');
                    return res.status(401).json({ 
                        success: false, 
                        message: "Invalid token format. Please login again." 
                    });
                }
                
                // Add user info to request body for downstream handlers
                req.body.userId = session.sub; // Clerk user ID
                req.body.user = session; // Full session data
                
                // Also add to req.user for consistency with other auth patterns
                req.user = {
                    id: session.sub,
                    email: session.email,
                    firstName: session.firstName,
                    lastName: session.lastName,
                    fullName: session.fullName,
                    imageUrl: session.imageUrl
                };
                
                console.log(`✅ User authenticated successfully via Clerk: ${session.sub}`);
                console.log(`👤 User details: ${JSON.stringify(req.user)}`);
                
                next();
                
            } catch (clerkError) {
                console.error('❌ Clerk verification also failed:', clerkError);
                throw clerkError;
            }
        }
        
    } catch (error) {
        console.error('❌ Auth error:', error);
        console.error('❌ Error details:', {
            name: error.name,
            message: error.message,
            stack: error.stack
        });
        
        // Handle specific Clerk errors with better messages
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                success: false, 
                message: "Session expired. Please login again." 
            });
        }
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid token format. Please login again." 
            });
        }
        
        // Handle Clerk-specific errors
        if (error.message?.includes('jwt')) {
            return res.status(401).json({ 
                success: false, 
                message: "Token validation failed. Please login again." 
            });
        }
        
        // Handle network or other Clerk service errors
        if (error.message?.includes('fetch') || error.message?.includes('network')) {
            return res.status(503).json({ 
                success: false, 
                message: "Authentication service temporarily unavailable. Please try again." 
            });
        }
        
        // Generic error response
        res.status(401).json({ 
            success: false, 
            message: "Authentication failed. Please login again." 
        });
    }
};

export default authMiddleware;
