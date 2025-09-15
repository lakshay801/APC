import { useState } from 'react';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Lock, User, LogIn } from "lucide-react"; // icons

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { username, password });
      if (res.data.token) {
        login(res.data.token);
        navigate('/listings');
      }
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6"
      >
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Welcome Back 👋
        </h2>
        <p className="text-sm text-center text-gray-500">
          Login to continue
        </p>

        {/* Username */}
        <div className="flex items-center border rounded-xl p-3 shadow-sm focus-within:ring-2 focus-within:ring-indigo-400">
          <User size={18} className="text-gray-400 mr-2" />
          <input
            className="w-full outline-none text-gray-700 placeholder-gray-400"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="flex items-center border rounded-xl p-3 shadow-sm focus-within:ring-2 focus-within:ring-indigo-400">
          <Lock size={18} className="text-gray-400 mr-2" />
          <input
            type="password"
            className="w-full outline-none text-gray-700 placeholder-gray-400"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-semibold shadow hover:scale-[1.02] transition-transform"
        >
          <LogIn size={18}/> Login
        </button>

        {/* Signup redirect */}
        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <a href="/signup" className="text-indigo-600 hover:underline">
            Signup
          </a>
        </p>
      </form>
    </div>
  );
}
