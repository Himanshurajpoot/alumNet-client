import React, { useState } from 'react';
import { useAuth } from '../utils/auth';

function CreatePost() {
    const auth = useAuth();
    const user = auth.user.user;

    const [form, setForm] = useState({
        title: '',
        content: '',
        image: null
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = e => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setForm(prev => ({ ...prev, image: files[0] }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            const token = localStorage.getItem('jwt');

            const formData = new FormData();
            formData.append('title', form.title);
            formData.append('content', form.content);
            if (form.image) formData.append('image', form.image);

            const res = await fetch('http://localhost:4000/api/posts', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Failed to create post');
            }
            setSuccess('Post created successfully!');
            setForm({ title: '', content: '', image: null });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-4 max-w-xl mx-auto flex flex-col gap-4 mt-12">
            <div className="flex items-center gap-3 mb-2 group cursor-pointer rounded">
               <img
  alt="Profile"
  className="w-24 h-24 rounded-full object-cover border-4 border-blue-300 mb-4"
  src={
    user?.avatarUrl && user.avatarUrl.trim() !== ""
      ? user.avatarUrl.startsWith("http")
        ? user.avatarUrl
        : `http://localhost:4000${user.avatarUrl}`
      : "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
  }
/>


                <div>
                    <div className="font-semibold text-gray-800 hover:underline hover:text-blue-500 cursor-pointer">
                        {user?.name}
                    </div>
                    <div className="text-xs text-gray-500">
                        Post to Anyone <span className="ml-1">&#9660;</span>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Title"
                    required
                />
                <textarea
                    name="content"
                    value={form.content}
                    onChange={handleChange}
                    className="border rounded p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                    rows={2}
                    placeholder="What do you want to talk about?"
                    required
                />
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="block text-sm text-gray-500"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold"
                    disabled={loading}
                >
                    {loading ? 'Posting...' : 'Post'}
                </button>
                {error && <div className="text-red-500">{error}</div>}
                {success && <div className="text-green-600">{success}</div>}
            </form>
        </div>
    );
}




export default CreatePost;
