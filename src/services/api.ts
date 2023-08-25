import axios from "axios";

const api = axios.create({
    baseURL: "https://turno-test-1f1add29f800.herokuapp.com/api"
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
});

export const useApiLogin = () => ({
    validateToken: async (token: string) => {
        const response = await api.post('/auth/me', { token });
        return response.data;
    },
    signin: async (email: string, password: string) => {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    },
    logout: async (token: string) => {
        await api.post('/auth/logout', { token });
        return true;
    },
    me: async (token: string) => {
        const response = await api.post('/auth/me', { token });
        return response.data;
    }
});

export default api;