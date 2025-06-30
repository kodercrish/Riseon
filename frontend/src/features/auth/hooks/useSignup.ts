import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../../api/auth';
import ROUTES from '../../../constants/urls';

export const useSignup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const res = await signup({ username, email, password });
      alert(res.message); // success
      navigate({ pathname: ROUTES.DASHBOARD });
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToLogin = () => {
    navigate({ pathname: ROUTES.LOGIN });
  };

  return {
    username,
    email,
    password,
    error,
    isLoading,
    showPassword,
    setUsername,
    setEmail,
    setPassword,
    setShowPassword,
    handleSignup,
    navigateToLogin
  };
};
