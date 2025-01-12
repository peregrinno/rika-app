import api from './api';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  phone: string;
  email: string;
  password: string;
}

interface ApiResponse<T> {
  data?: T;
  error?: string;
  api_version: string;
  timestamp: string;
  status: number;
}

interface LoginResponseData {
  token: string;
}

export const authService = {
  async login({ email, password }: LoginData): Promise<string> {
    const { data } = await api.post<ApiResponse<LoginResponseData>>('/login', { email, password });
    
    if (data.error || !data.data?.token) {
      throw new Error(data.error || 'Erro ao fazer login');
    }
    
    return data.data.token;
  },

  async register(data: RegisterData): Promise<void> {
    const response = await api.post<ApiResponse<void>>('/register', data);
    
    if (response.data.error) {
      throw new Error(response.data.error);
    }
  }
}; 