/**
 * ProtectedRoute Component
 * 
 * Protects admin routes by requiring Clerk authentication.
 * Redirects unauthenticated users to the login page.
 */
import { useAuth } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ProtectedRoute.css';

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth();

  // Show loading while checking authentication
  if (!isLoaded) {
    return (
      <div className="protected-route-loading">
        Loading...
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  // Render protected content
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;

