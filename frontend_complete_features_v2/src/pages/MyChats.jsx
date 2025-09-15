import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function MyChats() {
  const [threads, setThreads] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.username) return;

    axios
      .get(`/api/chats/user/${user.username}`)
      .then((r) => setThreads(r.data))
      .catch(() => {});
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4">My Chats</h2>

      <div className="space-y-2">
        {threads.map((t, idx) => (
          <div
            key={idx}
            className="bg-white p-3 rounded shadow flex justify-between items-center"
          >
            <div>
              <div className="font-medium">With: {t.otherUser}</div>
              <div className="text-sm text-gray-600">Last: {t.lastMessage}</div>
            </div>
            <div>
              <button
                onClick={() => navigate(`/chat/${t.projectId}`)}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Open
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
