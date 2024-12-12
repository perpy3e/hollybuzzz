import express from 'express'
import userAuth from '../middleware/userAuth.js';
import { getUserData, updateUserProfile,  getUserCoins ,claimCoinForDay , getLeaderboard } from '../controllers/userController.js';


const userRouter = express.Router();

userRouter.get('/data', userAuth , getUserData)
userRouter.put('/update-profile', userAuth, updateUserProfile);

userRouter.get('/get-coins/:userId', userAuth, getUserCoins);
userRouter.post('/claim-coin/:userId', userAuth, claimCoinForDay);
userRouter.get('/leaderboard', userAuth, getLeaderboard);





export default userRouter;

