// Signup.jsx
import React, { useState } from 'react';
import './signup.css'; // Import CSS file for styling

const Signup = ({ onClose}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const localapi = 'http://localhost:3000/user/signup';
  const remoteapi = 'https://geekspeaks.onrender.com/user/signup';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(remoteapi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });
      if (!response.ok) {
        throw new Error('Failed to sign up');
      }
      const userData = await response.json();
      console.log('User signed up:', userData);
      localStorage.setItem('user', JSON.stringify(userData));
      // Close the modal after successful signup
      onClose();
    } catch (error) {
      console.error('Error signing up:', error.message);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <div className="Smodal-background">
      <div className="Smodal">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder='your display name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder='your email ID'
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder='create a password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className='Sbtnbox'>
          <button className="Sclose-button" onClick={onClose}>Close</button>
          <button className='SbuttonS' type="submit">Sign Up</button>
          </div>
          
        </form>
        
      </div>
    </div>
  );
};

export default Signup;
