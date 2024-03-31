// Login.jsx
import React, { useState } from 'react';
import './login.css'; // Import CSS file for styling

const Login = ({ onClose }) => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const localapi = 'http://localhost:3000/user/login';
  const remoteapi = 'https://geekspeaks.onrender.com/user/login';

  const handleLogin = async () => {
    try {
      const response = await fetch(remoteapi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) {
        throw new Error('Failed to login');
      }
      const userData = await response.json();
      console.log('User data:', userData);
      localStorage.setItem('user', JSON.stringify(userData));
      // Close the modal after successful login
      onClose();
    } catch (error) {
      console.error('Error logging in:', error.message);
      alert('User Not Found.');
      onClose();
    }
  };

  

  return (
    <div className="Lmodal-background">
      <div className="Lmodal">
        <h2>Login</h2>
        <form>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            placeholder='enter your email ID'
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder='enter your password'
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            required
          />

          <div className='Lbtnbox'>
          <button className="Lclose-button" onClick={onClose}>Close</button>
          <button className='LbuttonL' type="button" onClick={handleLogin}>Login</button>
          
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default Login;
