import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles, LogIn } from 'lucide-react';
import { useSignup } from '../hooks/useSignup';

const SignupForm = () => {
  const {
    username,
    email,
    password,
    fullName,
    error,
    isLoading,
    showPassword,
    setUsername,
    setEmail,
    setPassword,
    setShowPassword,
    setFullName,
    handleSignup,
    navigateToLogin
  } = useSignup();

  return (
    <>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Your Account</h2>
        <p className="text-gray-600">Start your journey of personal growth</p>
      </div>

      <form onSubmit={handleSignup} className="space-y-6">
        {/* Username Field */}
        <div className="space-y-2">
          <label htmlFor="username" className="block text-sm font-semibold text-gray-700">
            Username
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 outline-none transition-all duration-300 text-gray-800 placeholder-gray-500"
              placeholder="Choose a username"
              required
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 outline-none transition-all duration-300 text-gray-800 placeholder-gray-500"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 outline-none transition-all duration-300 text-gray-800 placeholder-gray-500"
              placeholder="Create a strong password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Full Name Field */}
        <div className="spac-y-2">
          <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 outline-none transition-all duration-300 text-gray-800 placeholder-gray-500"
              placeholder="Enter your full name"
              required
            />
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="flex items-start space-x-2 text-sm">
          <input
            type="checkbox"
            id="terms"
            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 focus:ring-2 mt-0.5"
            required
          />
          <label htmlFor="terms" className="text-gray-600 cursor-pointer">
            I agree to the{' '}
            <a href="#" className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200">
              Privacy Policy
            </a>
          </label>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Signup Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Creating Account...</span>
            </>
          ) : (
            <>
              <span>Create Account</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">or</span>
        </div>
      </div>

      {/* Login Link */}
      <div className="text-center">
        <p className="text-gray-600 mb-4">Already have an account?</p>
        <button type="button" onClick={navigateToLogin} className="w-full bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold py-4 px-6 rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-300 flex items-center justify-center space-x-2 group">
          <LogIn className="w-5 h-5 text-purple-500 group-hover:text-purple-600 transition-colors duration-200" />
          <span>Sign In to Your Account</span>
          <Sparkles className="w-5 h-5 text-purple-500 group-hover:text-purple-600 transition-colors duration-200" />
        </button>
      </div>
    </>
  );
};

export default SignupForm;
