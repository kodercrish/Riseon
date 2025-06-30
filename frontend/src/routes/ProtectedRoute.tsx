import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { JSX } from 'react';
import ROUTES from '../constants/urls';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn, isLoading } = useAuth();

  if(isLoading) return <div>Loading...</div>;
  return isLoggedIn ? children : <Navigate to={ROUTES.LOGIN} />;
};

export default ProtectedRoute;