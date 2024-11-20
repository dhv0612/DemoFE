import React, { useEffect, useState } from 'react';
import AppRoutes from '../routers/Route';
import Loader from '../components/Loader/Loader';
import { jwtDecode } from 'jwt-decode'; // Sửa đổi ở đây
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getCustomers = async () => axios.get(`${API_URL}/customers`);
export const addCustomer = async (data) => axios.post(`${API_URL}/customers`, data);
export const updateCustomer = async (id, data) => axios.put(`${API_URL}/customers/${id}`, data);
export const deleteCustomer = async (id) => axios.delete(`${API_URL}/customers/${id}`);

const App = () => {
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
            const decoded = jwtDecode(savedToken);
            setUsername(decoded.name);
        }
        setLoading(false);
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div>
            <AppRoutes setToken={setToken} username={username} />
        </div>
    );
};

export default App;
