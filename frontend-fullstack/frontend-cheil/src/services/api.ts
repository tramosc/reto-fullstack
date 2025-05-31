import axios from 'axios';

// Instancia de Axios
const api = axios.create({
  baseURL: 'http://localhost:3000', // Asegúrate que apunte a tu backend NestJS
});

// Interceptor para incluir token JWT en cada petición
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
