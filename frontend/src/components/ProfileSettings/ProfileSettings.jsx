import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
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
    <div className='absolute z-10 w-full h-full bg-black/60 grid'>
      <div className='place-self-center w-[max(25vw,400px)] text-gray-600 bg-white flex flex-col gap-6 p-6 rounded-lg text-sm animate-fadeIn'>
        <div className="flex justify-center items-center relative text-black">
          <h2 className="m-0 absolute left-1/2 transform -translate-x-1/2">Profile Settings</h2>
          <button 
            onClick={() => setShowProfileSettings(false)} 
            className="absolute right-0 w-4 h-5 cursor-pointer"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex justify-center mb-5">
            <img 
              src={profilePicture || userProfile?.profilePicture || assets.profile_icon} 
              alt="Profile" 
              className="w-20 h-20 rounded-full object-cover border-3 border-gray-200 shadow-lg"
            />
          </div>
          
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="outline-none border border-gray-300 p-2.5 rounded"
            />
            <input
              type="url"
              placeholder="Profile picture URL (optional)"
              value={profilePicture}
              onChange={(e) => setProfilePicture(e.target.value)}
              className="outline-none border border-gray-300 p-2.5 rounded"
            />
            <p className="text-xs text-gray-500 m-0 leading-relaxed">
              Enter a URL to your profile picture (e.g., from Google, Facebook, or any image hosting service)
            </p>
          </div>
          
          <button 
            type='submit' 
            disabled={loading}
            className="border-none p-2.5 rounded text-white bg-tomato text-sm cursor-pointer hover:bg-tomato-dark disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
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