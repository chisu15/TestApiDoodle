import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css'; // Import CSS file
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://music-web-orcin.vercel.app/api/v1/user/profile', { withCredentials: true })
      .then(response => {
        console.log('Profile response:', response); // Log the response
        setUser(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
        setError('Error fetching user profile');
      });
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('https://music-web-orcin.vercel.app/api/v1/user/logout', {}, {
        withCredentials: true
      });
      navigate('/login'); // Redirect to login page or any other page
    } catch (error) {
      console.error('Error during logout:', error);
      setError('Error during logout');
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <img src={user.picture} alt="User Avatar" className="user-avatar" />
      <p><strong>Name:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
};

export default Profile;
