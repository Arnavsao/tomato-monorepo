/**
 * Landing Page Component
 * 
 * Welcome page shown at the root URL that provides options to:
 * - Continue as Customer (navigate to customer app)
 * - Sign in as Admin (link to admin panel)
 * 
 * This page is designed for evaluators to easily access the admin panel.
 */
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();

  // Get admin panel URL from environment variable or use default
  const adminUrl = import.meta.env.VITE_ADMIN_URL || 'https://tomato-monorepo.vercel.app/login';

  const handleCustomerClick = () => {
    navigate('/home');
  };

  const handleAdminClick = () => {
    // Navigate to admin login page
    window.location.href = adminUrl;
  };

  return (
    <div className="landing-container">
      <div className="landing-content">
        {/* Logo */}
        <div className="landing-logo-wrapper">
          <img 
            src={assets.logo} 
            alt="TOMATO Logo" 
            className="landing-logo"
          />
        </div>

        {/* Welcome Message */}
        <div className="landing-welcome">
          <h1 className="landing-title">Welcome to TOMATO</h1>
          <p className="landing-subtitle">
            Your favorite food delivery platform
          </p>
        </div>

        {/* Action Buttons */}
        <div className="landing-actions">
          <button 
            onClick={handleCustomerClick}
            className="landing-btn landing-btn-primary"
          >
            <span className="landing-btn-icon">🛒</span>
            Continue as Customer
          </button>
          
          <button 
            onClick={handleAdminClick}
            className="landing-btn landing-btn-secondary"
          >
            <span className="landing-btn-icon">👤</span>
            Sign in as Admin
          </button>
        </div>

        {/* Info Text */}
        <p className="landing-info">
          Evaluators: Click "Sign in as Admin" to access the admin panel
        </p>
      </div>
    </div>
  );
};

export default Landing;

