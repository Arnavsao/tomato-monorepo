import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import './ProfileSettings.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const ProfileSettings = ({ setShowProfileSettings }) => {
  const { userProfile, updateUserProfile } = useContext(StoreContext);
  const [profilePicture, setProfilePicture] = useState(userProfile?.profilePicture || '');
  const [name, setName] = useState(userProfile?.name || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await updateUserProfile({
      name: name || userProfile?.name,
      profilePicture: profilePicture || userProfile?.profilePicture
    });
    
    setLoading(false);
    
    if (result.success) {
      alert('Profile updated successfully!');
      setShowProfileSettings(false);
    } else {
      alert(result.error || 'Failed to update profile');
    }
  };

  return (
    <div className='profile-settings-overlay'>
      <div className='profile-settings-container'>
        <div className="profile-settings-header">
          <h2>Profile Settings</h2>
          <img 
            onClick={() => setShowProfileSettings(false)} 
            src={assets.cross_icon} 
            alt="Close" 
          />
        </div>
        
        <form onSubmit={handleSubmit} className="profile-settings-form">
          <div className="current-profile">
            <img 
              src={profilePicture || userProfile?.profilePicture || assets.profile_icon} 
              alt="Profile" 
              className="profile-preview"
            />
          </div>
          
          <div className="profile-settings-inputs">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="url"
              placeholder="Profile picture URL (optional)"
              value={profilePicture}
              onChange={(e) => setProfilePicture(e.target.value)}
            />
            <p className="help-text">
              Enter a URL to your profile picture (e.g., from Google, Facebook, or any image hosting service)
            </p>
          </div>
          
          <button type='submit' disabled={loading}>
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

ProfileSettings.propTypes = {
  setShowProfileSettings: PropTypes.func.isRequired
};

export default ProfileSettings; 