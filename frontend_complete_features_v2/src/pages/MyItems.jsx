import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function MyItems() {
  const [items, setItems] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.username) return;

    axios
      .get('/api/projects/mine')
      .then((r) => setItems(r.data))
      .catch(() => {});
  }, [user]);

  const del = async (id) => {
    if (!window.confirm('Are you sure?')) return;

    try {
      await axios.delete(`/api/projects/${id}`);
      setItems(items.filter((i) => i.id !== id));
    } catch (e) {
      alert('Delete failed');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">My Items</h2>
        <Link
          to="/listings/new"
          className="bg-black text-white px-3 py-1 rounded"
        >
          Add New
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((i) => (
          <div key={i.id} className="bg-white p-4 rounded shadow">
            {i.imageUrl && (
              <img
                src={i.imageUrl}
                className="w-full h-40 object-cover rounded mb-2"
                alt=""
              />
            )}

            <h3 className="font-bold">{i.title}</h3>
            <p className="text-sm text-gray-600">{i.description}</p>

            <div className="mt-2 flex gap-2">
              <Link to={`/listings/${i.id}`} className="text-blue-600">
                View
              </Link>
              <Link to={`/listings/${i.id}/edit`} className="text-gray-700">
                Edit
              </Link>
              <button
                onClick={() => del(i.id)}
                className="bg-red-600 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
