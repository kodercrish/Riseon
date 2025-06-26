import { useLogin } from '../hooks/useLogin';

const LoginForm = () => {
  const { email, password, error, setEmail, setPassword, handleLogin } = useLogin();

  return (
    <form onSubmit={handleLogin} className="max-w-sm w-full space-y-4 p-6 border rounded shadow bg-white">
      <h1 className="text-2xl font-bold text-center">Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
        Login
      </button>
    </form>
  );
};

export default LoginForm;