import api from './axios';
import ENDPOINTS from '../constants/endpoints';

interface LoginRequest {
    email: string;
    password: string;
}

interface SignupRequest {
    username: string;
    email: string;
    password: string;
    fullName: string;
}

interface AuthResponse {
    message: string;
}

export const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(ENDPOINTS.AUTH.LOGIN, credentials);
    return response.data;
};

export const signup = async (data: SignupRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(ENDPOINTS.AUTH.SIGNUP, data);
    return response.data;
};

export const logout = async () => {
    await api.post(ENDPOINTS.AUTH.LOGOUT);
};
