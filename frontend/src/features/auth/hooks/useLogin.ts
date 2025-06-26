import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../api/auth';
import ROUTES from '../../../constants/urls';

export const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await login({ email, password });
      alert(res.message);
      navigate({ pathname: ROUTES.DASHBOARD });;
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login failed');
    }
  };

  return {
    email,
    password,
    error,
    setEmail,
    setPassword,
    handleLogin,
  };
};
