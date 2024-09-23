import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.scss';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const Home = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API_BASE_URL}/auth/user`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUserData(response.data);
            } catch (error) {
                localStorage.removeItem('token');
                window.location.reload();
                toast.error('Session expired. Please login again.');
                navigate('/login');
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
        toast.success('Logout successful!');
        navigate('/login');
    };

    return (
        <div className="home-container">
            {userData ? (
                <div className="details">
                    <h1>Welcome, {userData.username}!</h1>
                    <p>Email: {userData.email}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div className="details">
                    <h1>Loading...</h1>
                    <button onClick={() => navigate('/login')}>Login</button>
                </div>
            )}
        </div>
    );
};

export default Home;