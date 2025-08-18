import React from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';

const AuthDebugger = () => {
    const { getToken } = useAuth();
    const { user, isSignedIn, isLoaded } = useUser();

    const [token, setToken] = React.useState(null);
    const [tokenError, setTokenError] = React.useState(null);

    const checkToken = async () => {
        try {
            const token = await getToken();
            setToken(token);
            setTokenError(null);
        } catch (error) {
            setTokenError(error.message);
            setToken(null);
        }
    };

    React.useEffect(() => {
        if (isSignedIn) {
            checkToken();
        }
    }, [isSignedIn]);

    if (!isLoaded) {
        return <div>Loading Clerk...</div>;
    }

    return (
        <div style={{ 
            position: 'fixed', 
            top: '10px', 
            right: '10px', 
            background: '#f0f0f0', 
            padding: '10px', 
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '12px',
            maxWidth: '300px',
            zIndex: 1000
        }}>
            <h4>🔐 Auth Debugger</h4>
            <div><strong>Is Loaded:</strong> {isLoaded ? '✅' : '❌'}</div>
            <div><strong>Is Signed In:</strong> {isSignedIn ? '✅' : '❌'}</div>
            <div><strong>User ID:</strong> {user?.id || 'None'}</div>
            <div><strong>User Name:</strong> {user?.fullName || 'None'}</div>
            <div><strong>User Email:</strong> {user?.primaryEmailAddress?.emailAddress || 'None'}</div>
            <div><strong>Token:</strong> {token ? `${token.substring(0, 20)}...` : 'None'}</div>
            {tokenError && <div><strong>Token Error:</strong> {tokenError}</div>}
            <button onClick={checkToken} style={{ marginTop: '5px' }}>Refresh Token</button>
        </div>
    );
};

export default AuthDebugger;
