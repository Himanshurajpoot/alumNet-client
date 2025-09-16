import React, { useState } from 'react';
import { useAuth } from '../utils/auth';
import EventForm from './EventForm';
import EventFeed from './EventFeed';

function Event() {
    const { user } = useAuth();
    const [showForm, setShowForm] = useState(false);

    const isAlumni = user?.user?.role === 'alumni';

    return (
        <div className="relative min-h-screen bg-gray-100 p-4">
            {/* Start Event box */}
            {isAlumni && (
                <div
                    className="bg-white rounded-lg shadow p-4 mb-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition w-full max-w-2xl mx-auto"
                    onClick={() => setShowForm(true)}
                >
                    <img
                        src={
                            user.user.avatarUrl?.startsWith('http')
                                ? user.user.avatarUrl
                                : `http://localhost:4000${user.user.avatarUrl}`
                        }
                        alt="User"
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Start an event"
                            className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-full border border-gray-300 cursor-pointer focus:outline-none"
                            disabled
                        />
                    </div>
                </div>
            )}


            {/* Dim background and show Event Form */}
            {showForm && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-40 z-40 backdrop-blur-sm" onClick={() => setShowForm(false)} />
                    <div className="fixed inset-0 z-50 flex justify-center items-center">
                        <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
                            <EventForm onClose={() => setShowForm(false)} />
                        </div>
                    </div>
                </>
            )}

            {/* Feed */}
            <div className={showForm ? 'opacity-20 pointer-events-none' : ''}>
                <EventFeed />
            </div>
        </div>
    );
}

export default Event;
