import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../components/forms/FormInput';
import Layout from '../../components/layout/Layout';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    // Simulate login logic
    if (email === 'admin@shikkha360.com' && password === '123456') {
      // You can set auth context or token here
      navigate('/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Login to Shikkha360</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@shikkha360.com"
            required
            error={!email && error ? error : ''}
          />

          <FormInput
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            error={!password && error ? error : ''}
          />

          {error && email && password && (
            <div className="text-sm text-red-500">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;