import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';
import { Search, MessageCircle, Eye } from 'lucide-react'; // icons

const CATEGORIES = ['Electronics', 'Books', 'Music', 'Clothing', 'Home', 'Sports'];

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');

  const fetch = () => {
    const params = {};
    if (q) params.q = q;
    if (category) params.category = category;

    axios
      .get('/api/projects/search', { params })
      .then((r) => setListings(r.data))
      .catch(() => {});
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="mt-8 px-4">
      {/* Search + Filters */}
      <div className="max-w-5xl mx-auto mb-6 flex flex-col md:flex-row gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="🔍 Search listings..."
          className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <button
          onClick={fetch}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-3 rounded-xl shadow hover:scale-105 transition-transform"
        >
          <Search size={18}/> Search
        </button>
      </div>

      {/* Listings Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((l) => (
          <div
            key={l.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-100"
          >
            {/* Image */}
            {l.imageUrl && (
              <img
                src={l.imageUrl}
                className="w-full h-44 object-cover"
                alt={l.title}
              />
            )}

            {/* Content */}
            <div className="p-4">
              <h3 className="font-bold text-lg text-gray-800 truncate">{l.title}</h3>

              <p className="text-sm text-gray-600 line-clamp-3 mt-1">
                {l.description}
              </p>

              <div className="mt-3 text-xs text-gray-500">
                Wants:{' '}
                <span className="font-medium text-gray-700">
                  {l.desiredItem || '—'}
                </span>
              </div>

              <div className="mt-1 text-xs text-gray-500">
                Category: {l.category || '—'}
              </div>

              {/* Actions */}
              <div className="mt-4 flex justify-between items-center">
                <Link
                  to={`/listings/${l.id}`}
                  className="flex items-center gap-1 text-indigo-600 hover:underline text-sm"
                >
                  <Eye size={16}/> View
                </Link>
                <Link
                  to={`/chat/${l.id}`}
                  className="flex items-center gap-1 text-gray-700 hover:underline text-sm"
                >
                  <MessageCircle size={16}/> Chat
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* No results */}
        {listings.length === 0 && (
          <p className="col-span-full text-center text-gray-500 italic">
            No listings found. Try searching or changing filters.
          </p>
        )}
      </div>
    </div>
  );
}
