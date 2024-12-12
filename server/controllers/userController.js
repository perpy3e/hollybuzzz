import userModel from "../models/usermodel.js";
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

export const getUserData = async (req,res) => {
 try {

    const {userId} = req.body;
//
    if (!userId) {
        return res.status(400).json({ success: false, message: 'User ID is missing' });
    }

    const user = await userModel.findById(userId);

    if(!user){
        return  res.json({success:false , message: 'User not found'});
    }
    res.json({
        success:true,
        userData:{
            _id: user._id,
            fullName: user.fullName,
            name: user.name,
            email: user.email,
            isAccountVerified: user.isAccountVerified,
            password: user.password,
            coins: user.coins,
            lastClaimTime: user.lastClaimTime
        }
     });

 } catch (error) {
    res.json({success:false , message: error.message});
 }
}


// Update User Profile
export const updateUserProfile = async (req, res) => {
    const { name, email, password } = req.body;
    const userId = req.body.userId; 

    if (!userId) {
        return res.status(400).json({ success: false, message: 'User ID is missing' });
    }

    try {
        const updates = { name, email };

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updates.password = hashedPassword;
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            updates,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, message: 'Profile updated', user: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update profile.', error: error.message });
    }
};




// Controller to get user coins
export const getUserCoins = async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log("User ID received:", userId);

        // Validate User ID format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid User ID format" });
        }

        const user = await userModel.findById(userId);

        if (!user) {
            console.log(`User not found with ID: ${userId}`);
            return res.status(404).json({ success: false, message: "User not found" });
        }

        console.log(`User found: ${user.name}, Coins: ${user.coins}`);
        res.status(200).json({ success: true, coins: user.coins });
    } catch (error) {
        console.error("Error fetching user coins:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


export const claimCoinForDay = async (req, res) => {
    try {
        const { userId } = req.params;
        const currentDate = new Date();

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const lastClaimTime = user.lastClaimTime;
        const timeDiff = lastClaimTime ? Math.floor((currentDate - lastClaimTime) / 1000) : 86401; // Time difference in seconds

        if (timeDiff < 86400) {  
            return res.status(400).json({
                success: false, 
                message: "You have already claimed your coin for today.",
                remainingTime: 86400 - timeDiff // Remaining time 
            });
        }

        
        user.coins += 1;
        user.lastClaimTime = currentDate;  // Store the current date 
        await user.save();

        // Return the updated coin count and last claim time
        res.status(200).json({
            success: true, 
            coins: user.coins, 
            lastClaimTime: user.lastClaimTime.toISOString(),
            remainingTime: 86400 
        });
    } catch (error) {
        console.error("Error claiming coin:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const getLeaderboard = async (req, res) => {
    try {
        
        const loggedInUserId = req.body.userId;  

        
        if (!loggedInUserId) {
            return res.status(400).json({ success: false, message: 'User ID not provided' });
        }

        // fetch coin an descending
        const users = await userModel.find().sort({ coins: -1 });

        // create data
        const leaderboard = users.map((user, index) => {
            const isCurrentUser = user._id.toString() === loggedInUserId;
            return {
                rank: index + 1,
                name: isCurrentUser ? "me" : user.name,  // if it's current user -> me
                coins: user.coins,
                isCurrentUser: isCurrentUser  // track  current user
            };
        });

        // Return the leaderboard as a response
        res.json({
            success: true,
            leaderboard,
        });
    } catch (error) {
       
        res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
};
