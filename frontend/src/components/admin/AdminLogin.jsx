import React, { useState } from 'react';
import axios from 'axios';
import logo from '../../assests/logo.png'
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5001/api/adminRegistration/login', { email, password });
      setLoading(false);
      localStorage.setItem('token', response.data.accessToken);
      navigate('/admin/dashboard');
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f6f6f4]">
      <div className="text-center mb-6">
        <img src={logo} alt="Chatvia Logo" className="mx-auto mb-4" />
        <h2 className="text-2xl font-semibold">Admin Sign in</h2>
        <p className="text-gray-600 mt-5">Sign in to continue with Attica Chat Portal.</p>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input 
              type="email"
              id="email"
              className="block w-full mt-2 p-2 border border-gray-300 rounded"
              placeholder="Enter your Email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="block w-full mt-2 p-2 border border-gray-300 rounded"
              placeholder="********"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-purple-500 text-white p-2 rounded hover:bg-[#7269ef]"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <div className="text-center mt-6 text-gray-600 text-sm">
          <p>© 2024 attica. Crafted with <span className="text-red-500">❤</span> by attica gold</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;


