import React, { useEffect, useState } from 'react';
import AppRoutes from '../routers/Route';
import Loader from '../components/Loader/Loader';
import { jwtDecode } from 'jwt-decode'; // Sửa đổi ở đây

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
