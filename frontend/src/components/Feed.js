import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/auth';
import { Picker } from 'emoji-mart'

function Loader() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid mb-4"></div>
                <span className="text-lg text-gray-600">Loading feed...</span>
            </div>
        </div>
    );
}

function Feed() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // ✅ Track user-friendly error message
    const auth = useAuth();

    useEffect(() => {
        async function fetchPosts() {
            try {
                const res = await fetch('http://localhost:4000/api/posts', {
                    method: 'GET',
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }

                const data = await res.json();
                console.log('API response:', data);

                if (Array.isArray(data.posts)) {
                    setPosts(data.posts);
                } else {
                    throw new Error("Invalid data format: 'posts' is not an array");
                }
            } catch (err) {
                console.error('Failed to fetch posts:', err);
                setError('Something went wrong while loading the feed. Please try again later.');
                setPosts([]); // fallback
            } finally {
                setLoading(false);
            }
        }

        fetchPosts();
    }, []);

    function formatTimeAgo(dateString) {
        const now = new Date();
        const postDate = new Date(dateString);
        const diffInSeconds = Math.floor((now - postDate) / 1000);

        if (diffInSeconds < 60) return `${diffInSeconds}s`;
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) return `${diffInMinutes}m`;
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours}h`;
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 30) return `${diffInDays}d`;
        const diffInMonths = Math.floor(diffInDays / 30);
        if (diffInMonths < 12) return `${diffInMonths}mo`;
        const diffInYears = Math.floor(diffInMonths / 12);
        return `${diffInYears}y`;
    }

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="bg-gray-100 min-h-screen flex justify-center pt-8">
            <div className="w-full max-w-2xl h-[80vh] overflow-y-auto px-2">

                {/* ✅ Show error message if exists */}
                {error && (
                    <div className="text-center text-red-500 mb-6">
                        {error}
                    </div>
                )}

                {!error && posts.length === 0 ? (
                    <div className="text-center text-gray-500 mt-20">No posts yet.</div>
                ) : (
                    posts.map(post => (
                        <div
                            key={post._id}
                            className="bg-white rounded-lg shadow mb-6 p-6 flex flex-col gap-3"
                        >
                            {/* ... Your post UI ... */}

                            <div className="flex items-center gap-3 mb-2">
                                <img
                                    src={post.author?.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author?.name || '')}`}
                                    alt={post.author?.name}
                                    className="w-12 h-12 rounded-full object-cover border"
                                />
                                <div>
                                    <div className="font-semibold text-gray-800">{post.author?.name}</div>
                                    <div className="text-xs text-gray-500 flex items-center gap-1">
                                        {formatTimeAgo(post.createdAt)}
                                        <span>•</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4" focusable="false">
                                            <path d="..." />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="font-bold text-lg text-gray-900">{post.title}</div>
                            <div className="text-gray-700">{post.content}</div>

                            {post.imageUrl && (
                                <img
                                    src={`http://localhost:4000${post.imageUrl}`}
                                    alt="Post"
                                    className="w-full max-h-96 object-cover rounded mt-2"
                                />
                            )}
                            <Post
                                post={post}
                                currentUser={auth?.user?.user}
                                formatTimeAgo={formatTimeAgo}
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}


function Post({ post, currentUser, formatTimeAgo }) {

    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    if (!currentUser) return null;

    return (
        <div>

            {/* Buttons */}
            <div className="flex gap-6 mt-4">
                <button className="text-gray-500 hover:text-blue-600">❤️ Like</button>
                <button
                    onClick={() => setShowComments(!showComments)}
                    className="text-gray-500 hover:text-blue-600"
                >
                    💬 Comment
                </button>
            </div>

            {/* Comment Section */}
            {showComments && (
                <div className="mt-4">
                    {/* Static comment for example */}
                    <div className="mb-2">
                        <div className="text-sm text-gray-700 font-medium">Jane Doe</div>
                        <div className="text-gray-600">Nice post!</div>
                    </div>

                    <div className="flex items-start gap-3 mt-4 relative">
                        <img
                            src={`http://localhost:4000${currentUser.avatarUrl}`}
                            className="w-10 h-10 rounded-full object-cover mt-1"
                            alt="User avatar"
                        />
                        <div className="flex-1 relative">
                            <textarea
                                rows="1"
                                placeholder="Write a comment..."
                                className="w-full border rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                            />
                            <div className="absolute bottom-2 right-2">
                                <button
                                    type="button"
                                    onClick={() => setShowEmojiPicker(prev => !prev)}
                                    className="text-gray-500 hover:text-blue-500"
                                >
                                    😊
                                </button>
                                {showEmojiPicker && (
                                    <div className="absolute bottom-10 right-0 z-50">
                                        <Picker
                                            onSelect={(emoji) =>
                                                setCommentText(prev => prev + emoji.native)
                                            }
                                            theme="light"
                                            style={{ zIndex: 100 }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        {commentText.trim() && (
                            <button
                                className="ml-2 bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700"
                                onClick={() => {
                                    setCommentText('');
                                }}
                            >
                                Comment
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}


export default Feed;