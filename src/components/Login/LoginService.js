import axios from 'axios';

const API_URL = 'http://localhost:8000/api/login';

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(API_URL, {
            email,
            password,
        });

        // Giả sử server trả về token trong response.data.token
        return response.data.token;
    } catch (error) {
        console.error("Login failed", error);
        throw error;
    }
};
