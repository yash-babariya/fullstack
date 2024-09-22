import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../styles/AuthForm.scss';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        if (!username) {
            toast.error('Username required');
            return false;
        }
        if (username && !/^\w{3,20}$/.test(username)) {
            toast.error('Invalid username');
            return false;
        }
        if (!email) {
            toast.error('Email required');
            return false;
        }
        if (email && !/\S+@\S+\.\S+/.test(email)) {
            toast.error('Invalid email');
            return false;
        }
        if (!password) {
            toast.error('Password required');
            return false;
        }
        if (password && !/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password)) {
            toast.error('Create a strong password');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await axios.post(`${API_BASE_URL}/auth/signup`, { username, email, password });
                toast.success('Signup successful! Please login.');
                navigate('/login');
            } catch (error) {
                console.error('Signup error:', error);
                toast.error(error.response?.data?.message || 'Signup failed. Please try again.');
            }
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
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
                <button type="submit">Sign Up</button>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    );
};

export default Signup;