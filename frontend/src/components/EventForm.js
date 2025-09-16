import React, { useState } from 'react';

function EventForm({ onClose }) {
    const [form, setForm] = useState({
        title: '',
        description: '',
        date: '',
        location: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:4000/api/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            if (res.ok) {
                onClose(); // Close form
            } else {
                alert('Failed to create event');
            }
        } catch (err) {
            console.error(err);
            alert('An error occurred');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Create Event</h2>
            <input
                type="text"
                placeholder="Title"
                className="w-full border px-3 py-2 rounded"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                required
            />
            <textarea
                placeholder="Description"
                className="w-full border px-3 py-2 rounded"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                required
            />
            <input
                type="datetime-local"
                className="w-full border px-3 py-2 rounded"
                value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })}
                required
            />
            <input
                type="text"
                placeholder="Location"
                className="w-full border px-3 py-2 rounded"
                value={form.location}
                onChange={e => setForm({ ...form, location: e.target.value })}
                required
            />
            <div className="flex justify-end gap-2">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded border border-gray-400 text-gray-700 hover:bg-gray-100"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                    Create
                </button>
            </div>
        </form>
    );
}

export default EventForm;
