import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    // Simulate API call
    console.log('Sending password reset to:', email);
    setMessage('Password reset link sent to your email');
    setError('');
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-12">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full border px-3 py-2 rounded"
          />
          {error && <div className="text-sm text-red-500">{error}</div>}
          {message && <div className="text-sm text-green-600">{message}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;