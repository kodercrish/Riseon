import SignupForm from "../components/SignupForm";
import AuthLayout from "../../../layouts/AuthLayout";

const SignupPage = () => {
  return (
    <AuthLayout>  {/* Can add a custom title and subtitle here if needed */}
      <SignupForm />
    </AuthLayout>
  );
};

export default SignupPage;
