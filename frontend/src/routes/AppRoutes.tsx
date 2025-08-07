import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import LoginPage from '../features/auth/pages/LoginPage';
import SignupPage from '../features/auth/pages/SignupPage';
import ROUTES from '../constants/urls';
import Dashboard from '../features/dashboard/pages/Dashboard';
import PlansCalendar from '../features/calendar/pages/PlansCalendar';
import Diary from '../features/diary/pages/Diary';
import Resolutions from '../features/resolutions/pages/Resolutions';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.DASHBOARD} />} />

      {/* Public Routes */}
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.SIGNUP} element={<SignupPage />} />

      {/* Protected Routes */}
      <Route
        path={ROUTES.DASHBOARD}
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.PLANS}
        element={
          <ProtectedRoute>
            <PlansCalendar />
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.DIARY}
        element={
          <ProtectedRoute>
            <Diary />
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.RESOLUTIONS}
        element={
          <ProtectedRoute>
            <Resolutions />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<div className="text-center mt-20 text-xl">404 - Page Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;