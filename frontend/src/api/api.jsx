import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5353/api';

// Your API functions her

export const getHello = async () => {
    try {
        const response = await axios.get(`${API_URL}/hello`);
        return response.data;
    } catch (error) {
        console.error('Error fetching hello:', error);
        throw error;
    }
};