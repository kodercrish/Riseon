import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../../api/auth';
import ROUTES from '../../../constants/urls';

export const useSignup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await signup({ username, email, password });
      alert(res.message); // success
      navigate({ pathname: ROUTES.DASHBOARD });
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Signup failed');
    }
  };

  return {
    username,
    email,
    password,
    error,
    setUsername,
    setEmail,
    setPassword,
    handleSignup,
  };
};
