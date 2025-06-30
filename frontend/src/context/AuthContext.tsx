import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import ENDPOINTS from '../constants/endpoints';
import ROUTES from '../constants/urls';

interface AuthContextType {
    isLoggedIn: boolean;
    isLoading: boolean;
    login: () => void;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const login = () => setIsLoggedIn(true);

    const logout = async () => {
        try {
            await api.post(ENDPOINTS.AUTH.LOGOUT); // backend should clear cookie
            setIsLoggedIn(false);
            navigate(ROUTES.LOGIN);
        } catch (err) {
            console.error('Logout failed:', err);
            setIsLoggedIn(false);
            navigate(ROUTES.LOGIN);
        }
    };

    // Optional: auto-check if user is logged in
    useEffect(() => {
        const checkAuth = async () => {
            try {
                // await api.get(ENDPOINTS.USER.FETCH); // or any protected route
                // store the user info returned by the server in local storage
                const response = await api.get(ENDPOINTS.AUTH.FETCH);
                const data = response.data;
                localStorage.setItem('user', JSON.stringify(data));

                setIsLoggedIn(true);
            } catch {
                setIsLoggedIn(false);
            } finally {
                setIsLoading(false);
            }
        };
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};