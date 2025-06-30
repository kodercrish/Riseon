import LoginForm from '../components/LoginForm';
import AuthLayout from '../../../layouts/AuthLayout';

const LoginPage = () => {
  return (
    <AuthLayout>  {/* Can add a custom title and subtitle here if needed */}
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;