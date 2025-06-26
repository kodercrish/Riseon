import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import ENDPOINTS from '../constants/endpoints';

interface AuthContextType {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const login = () => setIsLoggedIn(true);

    const logout = async () => {
        try {
            await api.post(ENDPOINTS.AUTH.LOGOUT); // backend should clear cookie
            setIsLoggedIn(false);
            navigate(ENDPOINTS.AUTH.LOGIN);
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    // Optional: auto-check if user is logged in
    useEffect(() => {
        const checkAuth = async () => {
            try {
                await api.get(ENDPOINTS.USER.FETCH); // or any protected route
                setIsLoggedIn(true);
            } catch {
                setIsLoggedIn(false);
            }
        };
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};