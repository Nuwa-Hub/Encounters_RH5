import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode"; // Import jwt-decode library

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending data")
      const response = await axios.post('http://localhost:5000/auth/signin', { email: username, password });
  
      console.log(response.data);
  
      if (response.status === 200) {
        console.log('Login successful');
        setError('');
        
        // Extract token from response
        const { token } = response.data;
  
        // Decode the token
        const decodedToken = jwtDecode(token);
  
        // Save decoded token to localStorage
        localStorage.setItem('token', JSON.stringify(decodedToken));
  
        // Redirect the user to the dashboard or any other page
      } else {
        setError(response.data.message || 'Failed to login');
      }
    } catch (error) {
      console.log('Error:', error.message);
      setError('An error occurred while logging in');
    }
  };
  

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form style={{ textAlign: 'center', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }} onSubmit={handleLogin}>
        <h2>Login</h2>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ padding: '5px', marginRight: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '5px', marginRight: '10px' }}
          />
        </div>
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        <button type="submit" style={{ padding: '5px 10px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
