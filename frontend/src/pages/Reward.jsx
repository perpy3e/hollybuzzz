import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import Confetti from 'react-confetti';
import BackgroundMusic from '../components/backgroundMusic'




const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;


    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

const Reward = () => {
    const { userData, backendUrl } = useContext(AppContext);
    const [userCoins, setUserCoins] = useState(0);
    const [isClaimed, setIsClaimed] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);
    const [loading, setLoading] = useState(true);


    const userId = userData?._id;

    const [showConfetti, setShowConfetti] = useState(true);



    // fetch coins and claim status
    const fetchCoins = async () => {
        if (!userId) {
            console.error('User ID not found');
            toast.error('User ID not found. Please log in again.');
            setLoading(false);
            return;
        }

        try {
            const { data } = await axios.get(`${backendUrl}/api/user/get-coins/${userId}`, { withCredentials: true });

            if (data.success) {
                setUserCoins(data.coins);
                const lastClaimTime = data.lastClaimTime;

                if (lastClaimTime) {
                    const timeDiff = Math.floor((new Date().getTime() - new Date(lastClaimTime).getTime()) / 1000);
                    if (timeDiff < 86400) { // less than 24hrs
                        setIsClaimed(true);
                        setRemainingTime(86400 - timeDiff); // remaining time
                    } else {
                        setIsClaimed(false);
                        setRemainingTime(0); // reset
                    }
                } else {
                    setIsClaimed(false);
                    setRemainingTime(0);
                }
            } else {
                toast.error(data.message || 'Failed to fetch coins');
            }
        } catch (error) {
            console.error('Error fetching coins:', error.message);
            toast.error('An error occurred while fetching your coins.');
        }
        setLoading(false);
    };

    // claim the coin / update backend
    const claimCoin = async () => {
        if (isClaimed) {
            toast.error('You have already claimed your coin today.');
            return;
        }

        try {
            const { data } = await axios.post(`${backendUrl}/api/user/claim-coin/${userId}`, {}, { withCredentials: true });

            if (data.success) {
                setUserCoins(data.coins);
                setIsClaimed(true);
                setRemainingTime(86400);

                // update last claim in localstorage
                localStorage.setItem('lastClaimTime', new Date().toISOString());

                toast.success('Successfully claimed your coin!');
            } else {
                toast.error(data.message || 'Failed to claim coin');
            }
        } catch (error) {
            console.error('Error claiming coin:', error);
            toast.error('You have already claimed reward for today.');
        }
    };

    // countdown logic 
    useEffect(() => {
        if (remainingTime > 0) {
            const interval = setInterval(() => {
                setRemainingTime((prev) => {
                    if (prev <= 1) {
                        clearInterval(interval); // Stop interval when time reaches 0
                        setIsClaimed(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(interval); // Clean up interval on component unmount
        }
    }, [remainingTime]);

    // fetch data and check claim status
    useEffect(() => {
        if (userData) {
            fetchCoins();
        }
    }, [userData]);

    // reset claim status if more than 24 hours passed since last claim
    useEffect(() => {
        const lastClaimTime = localStorage.getItem('lastClaimTime');
        if (lastClaimTime) {
            const timeDiff = Math.floor((new Date().getTime() - new Date(lastClaimTime).getTime()) / 1000);
            if (timeDiff >= 86400) {
                setIsClaimed(false); // Reset claim status
                setRemainingTime(0); // Reset remaining time
            }
        }
    }, []);

    if (loading) {
        return <div className="spinner">Loading...</div>;
    }

    if (!userData) {
        return <p className="text-center text-lg">Loading user data...</p>;
    }

    return (
        <div className="reward-container max-w-4xl mx-auto p-4 mt-20">
            <BackgroundMusic />
            <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={70} recycle={true} />
            <h1 className="text-2xl font-bold text-center mb-4">My Rewards 🎉</h1>
            <p className="text-center text-lg mb-4">You currently have {userCoins} coins</p>


            <div className="text-center mt-10">
                {isClaimed ? (
                    <div>
                        <p className="text-sm mb-2">You have already claimed your coin today.</p>
                        <p className="text-sm mb-4">Next claim available in: <strong>{formatTime(remainingTime)}</strong></p>
                    </div>
                ) : (


                    <div className="flex flex-col items-center justify-center p-6  bg-opacity-70 rounded-lg shadow-xl max-w-lg mx-auto mt-10">

                        <div className="text-center mb-6">
                            {!isClaimed && remainingTime === 0 && (
                                <img
                                    src={assets.rewards}
                                    alt="Reward Box"
                                    className="w-56 h-56 mx-auto mb-6 transition-transform transform hover:scale-105"


                                />
                            )}
                        </div>
                        <p className="text-gray-600 text-lg mb-4 font-semibold">Claim your coin now!</p>
                        <p className="text-gray-500 text-sm mb-6">Hurry up and claim your reward before it expires</p>
                        <button
                            className={`bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 px-6 rounded-lg shadow-md hover:scale-105 transition-all duration-300 ease-in-out ${isClaimed || remainingTime > 0 ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            onClick={claimCoin}
                            disabled={isClaimed || remainingTime > 0}
                        >
                            {isClaimed ? 'Claimed' : remainingTime > 0 ? `Claim in ${remainingTime}s` : 'Claim Coin'}
                        </button>
                    </div>


                )}
            </div>

            {isClaimed && remainingTime > 0 && (
                <div className="text-center mt-6">
                    <p className="text-sm mb-4">Your next claim is available in:</p>
                    <p className="text-lg font-bold">{formatTime(remainingTime)}</p>
                </div>
            )}


        </div>
    );
};

export default Reward;
