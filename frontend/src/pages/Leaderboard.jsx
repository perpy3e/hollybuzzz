import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';


const Leaderboard = () => {
    const { userData, backendUrl } = useContext(AppContext);
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLeaderboard = async () => {
        if (!userData?._id) {
            console.error('User ID not found');
            toast.error('User ID not found. Please log in again.');
            setLoading(false);
            return;
        }

        try {
            const { data } = await axios.get(`${backendUrl}/api/user/leaderboard`, {
                withCredentials: true,
            });

            if (data.success) {
                setLeaderboard(data.leaderboard);
            } else {
                toast.error('Failed to fetch leaderboard data');
            }
        } catch (error) {
            console.error('Error fetching leaderboard:', error.message);
            toast.error('An error occurred while fetching leaderboard data');
        }

        setLoading(false);
    };

    useEffect(() => {
        if (userData) {
            fetchLeaderboard();
        }
    }, [userData]);

    if (loading) {
        return (
            <div className="text-center py-10 text-blue-950">
                <div className="spinner">Please Log in first to see Leaderboard...</div>
            </div>
        );
    }

    if (!userData) {
        return <p className="text-center text-lg">Loading user data...</p>;
    }

    return (
        <div className="leaderboard-container max-w-4xl mx-auto p-6 bg-blue-300 rounded-lg shadow-xl mt-5">
            <h2 className="text-3xl font-bold text-center mb-6 text-white">Leaderboard</h2>
            <table className="table-auto w-full text-left text-black">
                <thead>
                    <tr className="bg-blue-400">
                        <th className="py-3 px-4 text-lg">Rank</th>
                        <th className="py-3 px-4 text-lg">Name</th>
                        <th className="py-3 px-4 text-lg">Coins</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((user, index) => (
                        <tr
                            key={index}
                            className={`text-lg hover:bg-blue-300 ${user.isCurrentUser ? 'bg-yellow-200 text-black' : 'bg-blue-200'}`}
                        >
                            <td className="py-3 px-4">{user.rank}</td>
                            <td className="py-3 px-4">{user.isCurrentUser ? 'Me' : user.name}</td>
                            <td className="py-3 px-4">{user.coins}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
