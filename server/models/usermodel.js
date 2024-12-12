import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {type: String, require: true},
    email: {type: String, require: true,unique:true}, //no duplicate email
    password: {type: String, require: true},
    //verifty
    verifyOtp: {type: String, default: ''},
    verifyOtpExpireAt: {type: Number, default: 0}, 
    // is account verify true of false
    isAccountVerified: {type: Boolean, default: false}, 
    // reset OTP and OTP expired 
    resetOtp: {type: String, default: ''},
    resetOtpExpireAt: {type: Number, default: 0},
    coins: {type: Number, default:0},
    //claimedDays: { type: [Boolean], default: [false, false, false, false, false, false, false] }, 
    lastClaimTime: { type: Date, default: null }, 
})

const userModel = mongoose.models.user || mongoose.model('user',userSchema)

export default userModel;