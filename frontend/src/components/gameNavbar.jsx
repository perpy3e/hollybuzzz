import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const gameNavbar = () => {
    const navigate = useNavigate();
    const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContext);

    const sendVerificatinonOtp = async () => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp');
            if (data.success) {
                navigate('/email-verify');
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

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

    const goToProfile = () => {
        navigate('/profile');
    };

    const goToReward = () => {
        navigate('/reward');
    };

    return (
        <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0 bg-transparent">
            <img
                src={assets.game}
                alt=""
                className="h-20 sm:h-12 object-contain"
                style={{ width: "auto" }}
            />

            {userData ? (
                <div className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group">
                    {userData.name[0].toUpperCase()}
                    <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
                        <ul className="list-none m-0 p-4 bg-white shadow-md rounded-lg text-sm w-[200px]">
                            {!userData.isAccountVerified && (
                                <li
                                    onClick={sendVerificatinonOtp}
                                    className="flex items-center gap-3 py-2 px-3 hover:bg-blue-100 hover:text-green-700 cursor-pointer rounded-md transition-all"
                                >
                                    <span className="material-icons">mail</span>
                                    <span className="flex-grow">Verify Email</span>
                                </li>
                            )}

                            <li
                                onClick={goToProfile}
                                className="flex items-center gap-3 py-2 px-3 hover:bg-blue-100 hover:text-blue-600 cursor-pointer rounded-md transition-all"
                            >
                                <span className="material-icons">account_circle</span>
                                <span className="flex-grow">My Profile</span>
                            </li>

                            <li
                                onClick={goToReward}
                                className="flex items-center gap-3 py-2 px-3 hover:bg-blue-100 hover:text-yellow-600 cursor-pointer rounded-md transition-all"
                            >
                                <span className="material-icons">card_giftcard</span>
                                <span className="flex-grow">My Reward</span>
                            </li>

                            <li
                                onClick={logout}
                                className="flex items-center gap-3 py-2 px-3 hover:bg-red-100 hover:text-red-600 cursor-pointer rounded-md transition-all"
                            >
                                <span className="material-icons">logout</span>
                                <span className="flex-grow">Log Out</span>
                            </li>
                        </ul>
                    </div>

                </div>
            ) : (
                <button
                    onClick={() => navigate('/login')}
                    className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-green-100 transition-all"
                >
                    Login <img src={assets.arrow_icon} />
                </button>
            )}
        </div>
    );
};

export default gameNavbar;
