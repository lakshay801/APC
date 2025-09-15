import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, UserPlus } from "lucide-react"; // icons

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', { username, email, password });
      navigate('/login');
    } catch (err) {
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6"
      >
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Account ✨
        </h2>
        <p className="text-sm text-center text-gray-500">
          Join BarterBuddy today
        </p>

        {/* Username */}
        <div className="flex items-center border rounded-xl p-3 shadow-sm focus-within:ring-2 focus-within:ring-green-400">
          <User size={18} className="text-gray-400 mr-2" />
          <input
            className="w-full outline-none text-gray-700 placeholder-gray-400"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <div className="flex items-center border rounded-xl p-3 shadow-sm focus-within:ring-2 focus-within:ring-green-400">
          <Mail size={18} className="text-gray-400 mr-2" />
          <input
            type="email"
            className="w-full outline-none text-gray-700 placeholder-gray-400"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="flex items-center border rounded-xl p-3 shadow-sm focus-within:ring-2 focus-within:ring-green-400">
          <Lock size={18} className="text-gray-400 mr-2" />
          <input
            type="password"
            className="w-full outline-none text-gray-700 placeholder-gray-400"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold shadow hover:scale-[1.02] transition-transform"
        >
          <UserPlus size={18}/> Signup
        </button>

        {/* Login redirect */}
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-green-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
