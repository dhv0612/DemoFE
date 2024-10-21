import React, { useEffect, useState } from 'react';
import AppRoutes from './routers/Route';
import Loader from './components/Loader/Loader';
import { jwtDecode } from 'jwt-decode';

const App = () => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      const tokenParts = savedToken.split('.');
      if (tokenParts.length === 3) {
        try {
          const decoded = jwtDecode(savedToken);
          setUsername(decoded.name);
        } catch (error) {
          console.error('Token không hợp lệ:', error);
          localStorage.removeItem('token');
          setToken(null);
        }
      } else {
        console.error('Token không hợp lệ hoặc thiếu:', savedToken);
        localStorage.removeItem('token');
        setToken(null);
      }
      setToken(savedToken);
    } else {
      setToken(null);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
      <div>
        <AppRoutes token={token} setToken={setToken} username={username} />
      </div>
  );
};

export default App;
