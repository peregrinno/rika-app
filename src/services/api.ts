import axios from 'axios';
import { getStorageItem } from '../utils/storage';

// Criando a instância do axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

// Configurando o interceptor
api.interceptors.request.use((config: any) => {
  const token = getStorageItem('rika-token');
  
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}); 


export default api;