import React from 'react';
import './Login.css'; // Import CSS file

const Login = () => {
  const handleLogin = () => {
    window.location.href = 'https://music-web-orcin.vercel.app/api/v1/user/auth/loginGoogle';
  };

  return (
    <div className="login-container">
      <h2>Login with Google</h2>
      <button className="login-button" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
