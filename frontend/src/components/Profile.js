import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/auth';
import { profileURL } from '../utils/constant';
import UserForm from './common/UserForm';
import InitialsAvatar from './common/InitialsAvatar';
import departmentsData from '../data/departments.json';

function Profile() {
    const [profile, setProfile] = useState(null);
    const [dummy, setDummy] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student',
        graduationYear: '',
        department: '',
        verified: true,
        isActive: true,
        avatarUrl: '',
        batch: '',
        course: '',
        currentJob: '',
        error: ''
    });
    const [loading, setLoading] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const auth = useAuth();

    const currentyear = new Date().getFullYear();
    const years = [];
    for (let i = 1990; i <= currentyear; i++) {
        years.push(i);
    }

    const departments = departmentsData.departments;

    async function fetchProfile() {
        setLoading(true);

        try {
            let res = await fetch(profileURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.user ? auth.user.token : ""}`
                }
            });
            const data = await res.json();
            if (!res.ok) {
                return Promise.reject(data.errors || 'Something went wrong');
            }
            if (data && data.user) {
                setProfile(data.user);
                setDummy((prev) => ({
                    ...prev,
                    ...data.user
                }))
            }
        } catch (error) {
            console.error(error);
            setError(error.message || 'Failed to fetch profile');
        }
        finally {
            setLoading(false);  // Done loading
        }
    }

    useEffect(() => {
        fetchProfile();
    }, []);


    // resposible for logout
    const handleLogout = () => {
        auth.logout();
        navigate('/');
    };


    // select fileName
    const handleFileChange = async (e) => {
        const file = e.target.files[0];

        if (!file) {
            alert('Please select the file!');
            return;
        }

        // makes the form object
        const formData = new FormData();
        // this takes file name and file object
        formData.append('avatar', file);

        const res = await fetch(profileURL + 'avatar', {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${auth.user.token}`,
            }
        });
        const data = await res.json();
        if (!res.ok) {
            console.log(data, 'Error uploading avatar');
            alert(data?.message)
            return;
        }

        // update the setprofile state
        setProfile(prev => ({
            ...prev,
            avatarUrl: data.avatarUrl
        }));
    };


    // handles edit profile
    const handleEditProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const res = await fetch(profileURL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.user.token}`
                },
                body: JSON.stringify(dummy)
            })

            const data = await res.json();

            if (!res.ok) {
                console.error('Update error:', data);
                setDummy(prev => ({ ...prev, error: data?.message || 'Failed to update profile.' }));
                setLoading(false);
                return;
            }

            // again fetch the updated data from db
            await fetchProfile();
            setShowEdit(false);
        } catch (error) {
            console.error('Update failed:', error);
            setDummy(prev => ({ ...prev, error: 'Update failed. Please try again.' }));
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-500 text-lg">Loading profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-xl mx-auto mt-10 p-6 bg-red-100 text-red-700 rounded">
                <p>Error loading profile: {error}</p>
            </div>
        );
    }
   console.log(auth,'prog');
   

    return (
        <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
            <div className="flex flex-col items-center mb-6">
                {false ? (
                    <img
                        src={`http://localhost:4000${profile.avatarUrl}`}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-4 border-blue-300 mb-4"
                    />
                ) : (
                    <InitialsAvatar 
                        name={profile?.name} 
                        className="mb-4"
                    />
                )}

                {(
                    <label className="cursor-pointer inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded shadow mb-4 transition">
                        Update Image
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                        />
                    </label>
                )}
            </div>

            <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Welcome, {profile?.name}</h2>
            <div className="mb-4">
                <span className="font-semibold text-gray-700">Email:</span> {profile?.email}
            </div>
            <div className="mb-4">
                <span className="font-semibold text-gray-700">Role:</span> {profile?.role}
            </div>
            <div className="mb-4">
                <span className="font-semibold text-gray-700">Department:</span> {profile?.department}
            </div>
            <div className="mb-4">
                <span className="font-semibold text-gray-700">Graduation Year:</span> {profile?.graduationYear}
            </div>
            {profile?.role === "alumni" && (
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded mb-4">
                    <h3 className="text-lg font-semibold text-blue-700 mb-2">Alumni Details</h3>
                    <div><span className="font-semibold">Batch:</span> {profile?.batch}</div>
                    <div><span className="font-semibold">Course:</span> {profile?.course}</div>
                    <div><span className="font-semibold">Current Job:</span> {profile?.currentJob}</div>
                </div>
            )}

            <div className="flex gap-4 mt-6 justify-center">
                <button
                    onClick={() => {
                        setDummy(prev => ({
                            ...prev,
                            ...profile,
                            error: ''
                        }));
                        setShowEdit(true);
                    }}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition" >
                    Edit Profile
                </button>
                <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                    Logout
                </button>
            </div>

            {showEdit && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
                    onClick={() => setShowEdit(false)}
                >
                    <div
                        className="relative bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 hide-scrollbar"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <button
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl z-10"
                            onClick={() => setShowEdit(false)}
                        >
                            &times;
                        </button>

                        <UserForm
                            state={dummy}
                            setState={setDummy}
                            loading={loading}
                            onSubmit={handleEditProfile}
                            years={years}
                            departments={departments}
                            isEdit={true}
                        />
                    </div>
                </div>
            )}

        </div>
    );
}


export default Profile;