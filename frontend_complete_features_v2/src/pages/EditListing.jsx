import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';

const CATEGORIES = ['Electronics', 'Books', 'Music', 'Clothing', 'Home', 'Sports'];

export default function EditListing() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState('PRIVATE');
  const [category, setCategory] = useState('Electronics');
  const [desiredItem, setDesiredItem] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/projects/${id}`)
      .then((r) => {
        const p = r.data;
        setTitle(p.title);
        setDescription(p.description);
        setVisibility(p.visibility);
        setCategory(p.category || 'Electronics');
        setDesiredItem(p.desiredItem || '');
        setImageUrl(p.imageUrl || null);
        setLoading(false);
      })
      .catch(() => {
        alert('Failed to load');
        navigate('/listings');
      });
  }, [id, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      let uploadedUrl = imageUrl;

      if (imageFile) {
        const fd = new FormData();
        fd.append('file', imageFile);

        const up = await axios.post('/api/upload', fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        uploadedUrl = up.data.url;
      }

      await axios.put(`/api/projects/${id}`, {
        title,
        description,
        visibility,
        category,
        desiredItem,
        imageUrl: uploadedUrl,
      });

      navigate(`/listings/${id}`);
    } catch (err) {
      alert('Update failed');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-lg mx-auto mt-8 bg-white p-6 rounded shadow space-y-4"
    >
      <h2 className="text-xl font-semibold">Edit Project</h2>

      <input
        className="w-full p-2 border rounded"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full p-2 border rounded"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        className="w-full p-2 border rounded"
        placeholder="Desired item"
        value={desiredItem}
        onChange={(e) => setDesiredItem(e.target.value)}
      />

      <div className="flex gap-4 items-center">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="vis"
            value="PUBLIC"
            checked={visibility === 'PUBLIC'}
            onChange={() => setVisibility('PUBLIC')}
          />
          Public
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="vis"
            value="PRIVATE"
            checked={visibility === 'PRIVATE'}
            onChange={() => setVisibility('PRIVATE')}
          />
          Private
        </label>
      </div>

      <div className="flex gap-2 items-center">
        <label className="text-sm">Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {imageUrl && (
        <img
          src={imageUrl}
          className="w-full h-40 object-cover rounded mb-2"
          alt="Preview"
        />
      )}

      <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />

      <button className="bg-black text-white px-4 py-2 rounded">Save</button>
    </form>
  );
}
