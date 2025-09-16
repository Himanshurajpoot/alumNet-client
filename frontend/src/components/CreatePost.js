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
    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = e => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            const file = files[0];
            setForm(prev => ({ ...prev, image: file }));
            
            // Create preview URL
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setImagePreview(e.target.result);
                };
                reader.readAsDataURL(file);
            }
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleRemoveImage = () => {
        setForm(prev => ({ ...prev, image: null }));
        setImagePreview(null);
        // Reset file input
        const fileInput = document.querySelector('input[name="image"]');
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            const user = localStorage.getItem('user');
            const token = user.token;

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
            setImagePreview(null);
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
                <div className="flex items-center gap-2">
                    <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded transition duration-200 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Upload Image
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            className="hidden"
                        />
                    </label>
                    {form.image && (
                        <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded transition duration-200 flex items-center gap-1"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Remove
                        </button>
                    )}
                </div>

                {/* Image Preview */}
                {imagePreview && (
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full max-h-64 object-cover rounded-lg border border-gray-200"
                        />
                        <div className="absolute top-2 right-2">
                            <button
                                type="button"
                                onClick={handleRemoveImage}
                                className="bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition duration-200"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                >
                    {loading ? 'Posting...' : 'Post'}
                </button>
                {error && <div className="text-red-500 bg-red-50 p-3 rounded border border-red-200">{error}</div>}
                {success && <div className="text-green-600 bg-green-50 p-3 rounded border border-green-200">{success}</div>}
            </form>
        </div>
    );
}




export default CreatePost;
