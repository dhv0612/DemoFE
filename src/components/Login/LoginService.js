import axios from 'axios';
import { API_ROUTES } from '../../api';

const API_URL = process.env.REACT_APP_API_URL;

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}${API_ROUTES.LOGIN}`, {
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
