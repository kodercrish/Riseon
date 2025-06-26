import { useSignup } from '../hooks/useSignup';

const SignupForm = () => {
    const { username, email, password, error, setUsername, setEmail, setPassword, handleSignup } = useSignup();

    return (
        <form onSubmit={handleSignup} className="max-w-sm mx-auto mt-20 space-y-4">
            <h1 className="text-2xl font-bold text-center">Sign Up</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border rounded"
                required
            />
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
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
                Sign Up
            </button>
        </form>
    );
};

export default SignupForm;