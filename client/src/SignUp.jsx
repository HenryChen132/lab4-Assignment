// client/src/SignUp.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './controlled.css';
import { useAuth } from './AuthContext';
import { API_BASE } from './apiBase';

export default function SignUp() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setUser(data);
      setSuccess('Sign up successful!');
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="home">
      <div className="overlay-box">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <button type="submit">Create Account</button>
        </form>

        {error && (
          <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>
        )}
        {success && (
          <p style={{ color: 'lightgreen', marginTop: '10px' }}>{success}</p>
        )}
      </div>
      <footer style={{ textAlign: 'center', color: 'lightblue' }}>
        Copyright © 2025 Haoxuan Chen
      </footer>
    </div>
  );
}
