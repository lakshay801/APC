import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ListingDetail() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/projects/${id}`)
      .then((r) => setP(r.data))
      .catch(() => {});
  }, [id]);

  const startChat = () => {
    if (!user?.username) {
      alert('You must be logged in to chat');
      navigate('/login');
      return;
    }
    navigate(`/chat/${id}`);
  };

  if (!p) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white p-6 rounded shadow">
      {p.imageUrl && (
        <img
          src={p.imageUrl}
          className="w-full h-64 object-cover rounded mb-4"
          alt=""
        />
      )}

      <h1 className="text-2xl font-bold">{p.title}</h1>

      <p className="text-gray-700 mt-2">{p.description}</p>

      <p className="italic mt-2">
        Wants to trade with: <strong>{p.desiredItem || '—'}</strong>
      </p>

      <p className="italic mt-1">Category: {p.category || '—'}</p>

      <p className="italic mt-1">Owner: {p.owner}</p>

      <div className="mt-4 flex gap-2">
        <button
          onClick={startChat}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Chat with Owner
        </button>
      </div>
    </div>
  );
}
