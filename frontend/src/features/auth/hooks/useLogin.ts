import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../api/auth';
import ROUTES from '../../../constants/urls';

export const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const res = await login({ email, password });
      alert(res.message);
      navigate({ pathname: ROUTES.DASHBOARD });
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToSignup = () => {
    navigate({ pathname: ROUTES.SIGNUP });
  };

  return {
    email,
    password,
    error,
    isLoading,
    showPassword,
    setEmail,
    setPassword,
    setShowPassword,
    handleLogin,
    navigateToSignup
  };
};
