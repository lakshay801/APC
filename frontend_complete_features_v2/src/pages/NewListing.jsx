import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FileText, Box, Image as ImageIcon, Tag, Eye, EyeOff } from "lucide-react"; // icons

const CATEGORIES = ['Electronics', 'Books', 'Music', 'Clothing', 'Home', 'Sports'];

export default function NewListing() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [desiredItem, setDesiredItem] = useState('');
  const [visibility, setVisibility] = useState('PRIVATE');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('Electronics');

  const navigate = useNavigate();
  const { user } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!user?.username) {
      alert('You must be logged in');
      return;
    }

    try {
      let imageUrl = null;
      if (image) {
        const formData = new FormData();
        formData.append('file', image);
        const uploadRes = await axios.post('/api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        imageUrl = uploadRes.data.url;
      }

      const res = await axios.post('/api/projects', {
        title,
        description,
        visibility,
        owner: user.username,
        imageUrl,
        category,
        desiredItem,
      });

      navigate(`/listings/${res.data.id}`);
    } catch (err) {
      alert('Failed to create listing');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 space-y-6"
      >
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create New Listing 🛒
        </h2>
        <p className="text-sm text-center text-gray-500">
          Share what you want to trade
        </p>  

        {/* Title input */}
        <div className="flex items-center border rounded-xl p-3 shadow-sm focus-within:ring-2 focus-within:ring-purple-400">
          <FileText size={18} className="text-gray-400 mr-2" />
          <input
            type="text"
            className="w-full outline-none text-gray-700 placeholder-gray-400"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div className="flex items-start border rounded-xl p-3 shadow-sm focus-within:ring-2 focus-within:ring-purple-400">
          <Box size={18} className="text-gray-400 mr-2 mt-1" />
          <textarea
            className="w-full outline-none text-gray-700 placeholder-gray-400 resize-none"
            rows={4}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />  
        </div>

        {/* Desired Item */}
        <div className="flex items-center border rounded-xl p-3 shadow-sm focus-within:ring-2 focus-within:ring-purple-400">
          <Tag size={18} className="text-gray-400 mr-2" />
          <input
            type="text"
            className="w-full outline-none text-gray-700 placeholder-gray-400"
            placeholder="Desired item for trade"
            value={desiredItem}
            onChange={(e) => setDesiredItem(e.target.value)}
          />
        </div>

        {/* Visibility */}
        <div className="flex gap-6 items-center text-gray-700">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="visibility"
              value="PUBLIC"
              checked={visibility === 'PUBLIC'}
              onChange={() => setVisibility('PUBLIC')}
              className="accent-purple-600"
            />
            <Eye size={16}/> Public
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="visibility"
              value="PRIVATE"
              checked={visibility === 'PRIVATE'}
              onChange={() => setVisibility('PRIVATE')}
              className="accent-purple-600"
            />
            <EyeOff size={16}/> Private
          </label>
        </div>
    
        {/* Category */}
        <div className="flex gap-2 items-center">
          <label className="text-sm text-gray-600">Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="flex-1 p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div className="flex items-center gap-3 border rounded-xl p-3 shadow-sm">
          <ImageIcon size={18} className="text-gray-400" />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="text-sm text-gray-600"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-xl font-semibold shadow hover:scale-[1.02] transition-transform"
        >
          Create Listing
        </button>
      </form>
    </div>
  );
}
