import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, MessageCircle, Package, PlusCircle } from "lucide-react"; // optional icons

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link 
          to="/listings" 
          className="text-2xl font-extrabold tracking-wide text-white hover:scale-105 transition-transform"
        >
          BarterBuddy
        </Link>

        {/* Navigation Links */}
        <div className="space-x-6 flex items-center text-white font-medium">
          <Link to="/listings" className="hover:text-yellow-200 transition-colors">
            Listings
          </Link>

          {user ? (
            <>
              <Link 
                to="/listings/new" 
                className="flex items-center gap-1 hover:text-yellow-200 transition-colors"
              >
                <PlusCircle size={18}/> New
              </Link>
              <Link 
                to="/my/items" 
                className="flex items-center gap-1 hover:text-yellow-200 transition-colors"
              >
                <Package size={18}/> My Items
              </Link>
              <Link 
                to="/my/chats" 
                className="flex items-center gap-1 hover:text-yellow-200 transition-colors"
              >
                <MessageCircle size={18}/> My Chats
              </Link>

              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                👋 Hi, {user.username}
              </span>

              <button
                onClick={logout}
                className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow transition"
              >
                <LogOut size={18}/> Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="hover:text-yellow-200 transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="bg-white text-purple-600 px-3 py-1 rounded-lg font-semibold hover:bg-yellow-200 transition"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
