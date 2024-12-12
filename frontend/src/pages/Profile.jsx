import React, { useContext, useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

import Snowfall from 'react-snowfall'; // Import the snowfall library
import profileBg from '../assets/profilebg.png';
import ProfilePic from '../assets/profile.png';
import Navbar from '../components/Navbar';


const Profile = () => {
    const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContext);
    const navigate = useNavigate()
    // State for edit mode and form fields
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSave = async () => {
        try {
            const { data } = await axios.put(`${backendUrl}/api/user/update-profile`, formData, {
                withCredentials: true
            });

            console.log("Response data:", data); // Log the response for inspection

            if (data.success) {
                // Check if user is available
                if (data.user && data.user.name) {
                    toast.success('Profile updated successfully!');
                    setUserData(data.user); // Update the context with new data
                    setFormData({
                        name: data.user.name,
                        email: data.user.email,
                        password: '', // Don't display the password
                    });
                    setIsEditing(false); // Exit editing mode
                } else {
                    toast.error('Error: Invalid response format');
                }
            } else {
                toast.error(data.message || 'Profile update failed');
            }
        } catch (error) {
            console.error("Error occurred during profile update:", error); // Log error message
            toast.error('An error occurred while updating the profile.');

            // Check if the error is a response error from axios
            if (error.response) {
                console.error("Error response:", error.response); // Log the error response for debugging
            } else {
                console.error("Error message:", error.message); // Log general error message
            }
        }
    };
    // Populate form data when userData is updated
    useEffect(() => {
        if (userData) {
            setFormData({
                name: userData.name,
                email: userData.email,
                password: '', // Don't display the password initially
            });
        }
    }, [userData]);  // Dependency on userData ensures this effect runs when userData changes

    // If userData is null, show loading screen
    if (userData === null) {
        return (
            <div className="min-h-screen flex items-center justify-center"
                style={{
                    backgroundImage: `url(${profileBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}>
                <div className="bg-white p-6 rounded shadow-lg w-full sm:w-1/2">
                    <h1 className="text-2xl font-bold mb-4">Loading...</h1>
                </div>
            </div>
        );
    }

    const logout = async () => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(`${backendUrl}/api/auth/logout`);
            if (data.success) {
                setIsLoggedin(false);
                setUserData(false);
                navigate('/');
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const goToReward = () => {
        navigate('/reward');
    };


    return (
        <div
            className='flex flex-col items-center justify-center min-h-screen'
            style={{
                backgroundImage: `url(${profileBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '100%',
                minHeight: '100vh',
            }}
        >
            <Snowfall color="white" snowflakeCount={100} style={{ position: 'absolute', zIndex: 1 }} />
            <Navbar />

            <div className="grid grid-cols-3 gap-4 mt-16 relative z-10 pt-10 pb-50">
                {/* Edit User Profile Section */}
                <div className="col-span-1 bg-[#F0F2D5] bg-opacity-90 p-5 text-white rounded-xl w-50 h-40">
                    <h2 className="pl-3 mb-6 text-2xl font-semibold text-[#04361D]">Settings</h2>
                    <a href="/profile" className="flex items-center px-4 py-3 font-semibold text-[#F0F2D5] bg-[#40826D] rounded-lg hover:bg-[#04361D]">
                        Edit User Profile
                    </a>
                </div>
                {/* User Profile Section */}
                <div className="col-span-2 bg-[#F0F2D5] bg-opacity-90 p-8 text-white rounded-xl">
                    <h2 className="text-3xl font-bold text-[#04361D]">User Profile</h2>
                    <div className="grid max-w-2xl mx-auto mt-8">
                        {/* User Information */}
                        <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                            <div className="w-40 h-40 p-2 flex justify-center items-center rounded-full bg-black text-white text-3xl relative group ring-4 ring-white ring-offset-2 ring-offset-blue-100">
                                {userData.name[0].toUpperCase()}
                            </div>
                            <div className="flex flex-col space-y-3 sm:ml-8">
                                <button
                                    onClick={goToReward}
                                    type="button"
                                    className="py-3 px-6 font-medium bg-[#40826d] text-[#F0F2D5] rounded-lg hover:bg-[#04361D]"
                                >
                                    My Reward
                                </button>
                                <button
                                    onClick={logout}
                                    type="button"
                                    className="py-3 px-6 font-medium text-[#40826d] bg-white border border-[#04361D] rounded-lg hover:bg-gray-200"
                                >
                                    Log Out
                                </button>
                            </div>
                        </div>
                        {/* Rest of the Profile Details */}
                        <div className="mt-8 text-[#202142]">
                            {/* User Profile Form */}
                            {userData ? (
                                <div className="space-y-6">
                                    {/* Full Name */}
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-[#40826d]">Your Full name</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full p-2.5 bg-gray-100 border border-gray-300 rounded-lg focus:ring-[#40826d] focus:border-[#40826d]"
                                            />
                                        ) : (
                                            <p className="text-lg font-medium">{formData.name || 'Loading...'}</p>
                                        )}
                                    </div>
                                    {/* Email */}
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-[#40826d]">Your Email</label>
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full p-2.5 bg-gray-100 border border-gray-300 rounded-lg focus:ring-[#40826d] focus:border-[#40826d]"
                                            />
                                        ) : (
                                            <p className="text-lg font-medium">{formData.email || 'Loading...'}</p>
                                        )}
                                    </div>
                                    {/* Password */}
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-[#40826d]">Your Password</label>
                                        {isEditing ? (
                                            <input
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                className="w-full p-2.5 bg-gray-100 border border-gray-300 rounded-lg focus:ring-[#40826d] focus:border-[#40826d]"
                                            />
                                        ) : (
                                            <p>******</p>
                                        )}
                                    </div>
                                    {/* Action Buttons */}
                                    {isEditing ? (
                                        <div className="flex justify-end gap-4">
                                            <button
                                                onClick={handleSave}
                                                className="px-5 py-2.5 text-sm font-medium bg-[#40826d] text-[#F0F2D5] rounded-lg hover:bg-[#04361D]"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={() => setIsEditing(false)}
                                                className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="px-5 py-2.5 text-sm font-medium bg-[#40826d] text-[#F0F2D5] rounded-lg hover:bg-[#04361D]"
                                        >
                                            Edit Profile
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <p className="text-gray-500">User Data is not available.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default Profile;
