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
  expires_in: number;
}

export const authService = {
  async login({ email, password }: LoginData): Promise<string> {
    try {
      const { data } = await api.post<ApiResponse<LoginResponseData>>('/login', { email, password });
      
      if (data.error) {
        throw new Error(data.error);
      }

      // Primeiro salva o token
      const expiresAt = Date.now() + (data.data.expires_in * 1000);
      localStorage.setItem('rika-token', data.data.token);
      localStorage.setItem('rika-token-expires', expiresAt.toString());

      // Depois verifica se o usuário está validado
      const isValid = await this.checkUserValidation();
      if (!isValid) {
        await this.requestEmailValidation(email);
        localStorage.removeItem('rika-token');
        localStorage.removeItem('rika-token-expires');
        throw new Error('Conta não verificada. Verifique seu email.');
      }
      
      return data.data.token;
    } catch (error: any) {
      if (error.response?.data?.error === 'Conta não verificada. Verifique seu email.') {
        window.location.href = '/verify-account';
      }
      throw error;
    }
  },

  async register(data: RegisterData): Promise<void> {
    const response = await api.post<ApiResponse<void>>('/register', data);
    
    if (response.data.error) {
      throw new Error(response.data.error);
    }
  },

  logout() {
    localStorage.removeItem('rika-token');
    localStorage.removeItem('rika-token-expires');
  },

  isTokenValid(): boolean {
    const token = localStorage.getItem('rika-token');
    const expiresAt = localStorage.getItem('rika-token-expires');

    if (!token || !expiresAt)  {
      localStorage.removeItem('rika-token');
      localStorage.removeItem('rika-token-expires');
      return false;
    }
  

    return Date.now() < parseInt(expiresAt);
  },

  async checkUserValidation(): Promise<boolean> {
    try {
      const response = await api.get<ApiResponse<{ user_valid: boolean }>>('/me');
      return response.data.data?.user_valid || false;
    } catch (error) {
      return false;
    }
  },

  async requestEmailValidation(email: string): Promise<void> {
    const response = await api.post<ApiResponse<void>>('/validate-attempt', { email });
    
    if (response.data.error) {
      throw new Error(response.data.error);
    }
  },
}; 