import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../../utils';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
       
        const token = localStorage.getItem('token');
        
       
        const response = await fetch(`${SERVER_URL}/user`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUser(data.profile);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('Failed to load profile');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Profile of ${user.name}`,
          text: `Check out ${user.name}'s profile!`,
          url: window.location.href,
        })
        .then(() => console.log('Profile shared successfully!'))
        .catch((error) => console.log('Error sharing the profile:', error));
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  };

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user data available</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#001f3f] via-[#001f3f] to-[#001f3f] bg-[length:400%_400%] animate-gradientShift">
      {/* Profile Picture */}
      <div className="relative">
        {user.profilePhoto ? (
          <img
            src={user.profilePhoto}
            alt="Profile"
            className="rounded-full h-24 w-24 object-cover border border-black"
          />
        ) : (
          <div className="bg-gray-200 rounded-full h-24 w-24 flex items-center justify-center text-black text-3xl border border-black">
            <span>{user.name.charAt(0)}</span>
          </div>
        )}
      </div>

      {/* User Info */}
      <h2 className="mt-4 text-2xl font-bold text-white">{user.name}</h2>
      <span className="text-xl font-semibold text-white">
        {user.following.toLocaleString()} following
      </span>

      {/* Action Buttons */}
      <div className="mt-4 flex space-x-4">
        <button
          onClick={handleShare}
          className="bg-gray-200 text-black text-sm font-semibold py-2 px-4 rounded-full border border-gray-300 hover:bg-gray-300"
        >
          + share
        </button>
        <button
          onClick={handleEditProfile}
          className="bg-gray-200 text-black text-sm font-semibold py-2 px-4 rounded-full border border-gray-300 hover:bg-gray-300"
        >
          + edit profile
        </button>
      </div>

      {/* Additional Profile Details */}
      <div className="mt-6 text-white text-center">
        <p className="text-lg font-medium">Location: {user.location || 'Nairobi, Kenya'}</p>
        <p className="text-lg font-medium">Bio: {user.bio || 'Passionate traveler and photographer'}</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href={user.facebook || '#'} className="text-blue-400 hover:text-blue-600">
            <i className="fab fa-facebook"></i> Facebook
          </a>
          <a href={user.twitter || '#'} className="text-blue-400 hover:text-blue-600">
            <i className="fab fa-twitter"></i> Twitter
          </a>
          <a href={user.instagram || '#'} className="text-blue-400 hover:text-blue-600">
            <i className="fab fa-instagram"></i> Instagram
          </a>
        </div>
      </div>

      {/* Created and Saved */}
      <div className="mt-6 flex justify-around w-full max-w-xs">
        <div className="text-xl font-bold text-white">created</div>
        <div className="text-xl font-bold text-white">saved</div>
      </div>
    </div>
  );
};

export default Profile;
