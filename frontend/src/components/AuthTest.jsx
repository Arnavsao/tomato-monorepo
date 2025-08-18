import React from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { StoreContext } from '../context/StoreContext.jsx';

const AuthTest = () => {
    const { getToken } = useAuth();
    const { user, isSignedIn, isLoaded } = useUser();
    const { createOrGetUser, userProfile, authAttempted } = React.useContext(StoreContext);

    const [testResult, setTestResult] = React.useState('');

    const runAuthTest = async () => {
        setTestResult('Running test...');
        
        try {
            if (!isSignedIn) {
                setTestResult('❌ User not signed in');
                return;
            }

            const token = await getToken();
            if (!token) {
                setTestResult('❌ No token available');
                return;
            }

            setTestResult('✅ Token obtained, testing user creation...');
            
            const result = await createOrGetUser();
            if (result) {
                setTestResult('✅ User creation successful');
            } else {
                setTestResult('❌ User creation failed');
            }
        } catch (error) {
            setTestResult(`❌ Test failed: ${error.message}`);
        }
    };

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ 
            position: 'fixed', 
            top: '10px', 
            left: '10px', 
            background: '#e8f5e8', 
            padding: '15px', 
            border: '1px solid #4caf50',
            borderRadius: '8px',
            fontSize: '14px',
            maxWidth: '350px',
            zIndex: 1000
        }}>
            <h4>🧪 Auth Test Panel</h4>
            <div><strong>Status:</strong> {isSignedIn ? '✅ Signed In' : '❌ Not Signed In'}</div>
            <div><strong>User ID:</strong> {user?.id || 'None'}</div>
            <div><strong>Auth Attempted:</strong> {authAttempted ? '✅' : '❌'}</div>
            <div><strong>User Profile:</strong> {userProfile ? '✅ Loaded' : '❌ Not Loaded'}</div>
            <div><strong>Test Result:</strong> {testResult}</div>
            <button 
                onClick={runAuthTest} 
                style={{ 
                    marginTop: '10px', 
                    padding: '8px 16px',
                    backgroundColor: '#4caf50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Run Auth Test
            </button>
        </div>
    );
};

export default AuthTest;
