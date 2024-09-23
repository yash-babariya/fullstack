import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../styles/AuthForm.scss';

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Auth utility functions (unchanged)
const setToken = (token) => {
  localStorage.setItem('token', token);
};


// API utility with interceptors
const api = axios.create({
  baseURL: API_BASE_URL,
});


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email) {
      toast.error('Email is required');
      return false;
    }
    if (!password) {
      toast.error('Password is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await api.post('/auth/login', { email, password });
        setToken(response.data.token);
        toast.success('Login successful!');
        navigate('/');
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <p>Don't have an account? <Link to="/signup">Signup</Link></p>
      </form>
    </div>
  );
};

export default Login;