import React, { useEffect, useState } from 'react';

function EventFeed() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const res = await fetch('http://localhost:4000/api/events');
                const data = await res.json();
                setEvents(data?.events || []); // adjust if API returns { events: [...] }
            } catch (err) {
                console.error('Failed to load events', err);
                setEvents([]);
            } finally {
                setLoading(false);
            }
        }
        fetchEvents();
    }, []);

    if (loading) {
        return <div className="text-center text-gray-500">Loading events...</div>;
    }

    if (events.length === 0) {
        return <div className="text-center text-gray-400">No upcoming events.</div>;
    }

    return (
        <div className="space-y-4">
            {events.map((event) => (
                <div key={event._id} className="bg-white p-4 shadow rounded">
                    <h3 className="text-lg font-bold">{event.title}</h3>
                    <p className="text-gray-700">{event.description}</p>
                    <p className="text-sm text-gray-500">
                        📍 {event.location} | 🗓️ {new Date(event.date).toLocaleString()}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default EventFeed;
