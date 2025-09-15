import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Listings from './pages/Listings';
import ListingDetail from './pages/ListingDetail';
import NewListing from './pages/NewListing';
import EditListing from './pages/EditListing';
import MyItems from './pages/MyItems';
import MyChats from './pages/MyChats';
import ChatRoom from './pages/ChatRoom';
import { useAuth } from './context/AuthContext';

export default function App() {
  const { user } = useAuth();

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listings/:id" element={<ListingDetail />} />

          {/* Protected Routes */}
          <Route
            path="/listings/new"
            element={user ? <NewListing /> : <Navigate to="/login" />}
          />
          <Route
            path="/listings/:id/edit"
            element={user ? <EditListing /> : <Navigate to="/login" />}    
          />
          <Route
            path="/my/items"
            element={user ? <MyItems /> : <Navigate to="/login" />}
          />
          <Route
            path="/my/chats"
            element={user ? <MyChats /> : <Navigate to="/login" />}
          />
          <Route
            path="/chat/:projectId"
            element={user ? <ChatRoom /> : <Navigate to="/login" />}
          />

          {/* Default Redirect */}
          <Route path="*" element={<Navigate to="/listings" />} />
        </Routes>
      </div>
    </div>
  );
}
