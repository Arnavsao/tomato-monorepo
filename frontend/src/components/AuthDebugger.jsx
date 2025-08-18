import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext.jsx';
import { useUser } from '@clerk/clerk-react';

const AuthDebugger = () => {
    const { user, isSignedIn } = useUser();
    const { testAuth, userProfile, cartItems, authAttempted } = useContext(StoreContext);

    const handleTestAuth = async () => {
        console.log('🧪 Testing authentication...');
        const result = await testAuth();
        console.log('🧪 Test result:', result);
    };

    return (
        <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border max-w-sm z-50">
            <h3 className="font-bold text-sm mb-2">🔐 Auth Debugger</h3>
            <div className="text-xs space-y-1">
                <div>Status: {isSignedIn ? '✅ Signed In' : '❌ Not Signed In'}</div>
                {user && <div>User ID: {user.id}</div>}
                {userProfile && <div>Profile: ✅ Loaded</div>}
                <div>Cart Items: {Object.keys(cartItems).length}</div>
                <div>Auth Attempted: {authAttempted ? '✅ Yes' : '❌ No'}</div>
            </div>
            <button 
                onClick={handleTestAuth}
                className="mt-2 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
            >
                Test Auth
            </button>
        </div>
    );
};

export default AuthDebugger;
