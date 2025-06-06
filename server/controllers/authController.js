import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/usermodel.js'; //database info
import transporter from '../config/nodemailer.js'; //nodemailer config
import dotenv from 'dotenv';

dotenv.config();

// User Registerr
export const register = async (req, res) => {
    const { name, email, password } = req.body;

    // if not
    if (!name || !email || !password) {
        return res.json({ success: false, message: "Missing Details" })
    }
    try {
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({ name, email, password: hashedPassword });
        await user.save(); //save in db

        //token expire in 7 days 
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,
            { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            //if production = true if not = false
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // Welcome Email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to Our Website',
            text: `Welcome to our website! Your account has been created with email: ${email}`

        }

        await transporter.sendMail(mailOptions);

        return res.json({ success: true });

    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

// User Log in 
export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt:', req.body);

    if (!email || !password) {
        return res.json({ success: false, message: "Email and Password are required" })
    }
    try {

        //check email
        const user = await userModel.findOne({ email });
        console.log('User found:', user);
        if (!user) {
            return res.json({ success: false, message: "Invalid Email" })
        }
        //check password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Password" })
        }

        //generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,
            { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: true ,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000

        });
        return res.json({ success: true });


    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

//User Log Out
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true ,
            sameSite: 'none',
        })

        return res.json({ success: true, message: "Logged Out" })


    } catch (error) {

        return res.json({ success: false, message: error.message })
    }

}

// Send OTP to User's Email
export const sendVerifyOtp = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await userModel.findById(userId)
        if (user.isAccountVerified) {
            return res.json({ success: false, message: "Account is already verified" })
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000))
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account Verification OTP',
            text: `Your OTP is ${otp}. Verify your account using this OTP.`
        }
        await transporter.sendMail(mailOptions)

        res.json({ success: true, message: 'Verification OTP Sent On Email' });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

//Verify Email 
export const verifyEmail = async (req, res) => {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
        return res.json({ success: false, message: 'Missing details' });
    }

    try {
        // Find user by ID
        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.json({ success: false, message: 'Invalid OTP' });
        }

        // Check if OTP has expired
        if (user.verifyOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: 'OTP expired' });
        }

        // Update user details
        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save();

        return res.json({ success: true, message: 'Email verified successfully' });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

//check if user is authenticated

export const isAuthenticated = async (req, res) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.json({ success: false, message: 'Not Authorized' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded.id) {
            return res.json({ success: false, message: 'Not Authorized' });
        }
        return res.json({ success: true, message: 'User is authenticated', userId: decoded.id });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

//Send Reset Password OTP
export const sendResetOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.json({ success: false, message: 'Email is required' });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000))
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 60 * 1000

        //save 
        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password Reset OTP',
            text: `Your OTP for resetting password is ${otp}. Use this OTP to proceed with resetting 
        your password.`
        }
        await transporter.sendMail(mailOptions)

        return res.json({ success: true, message: 'OTP is sent to your email' });

    } catch {
        return res.json({ success: false, message: error.message });
    }
}

//Reset User Password after verify otp
export const resetPassword = async (req, res) => {

    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.json({ success: false, message: 'Email, OTP, and new password is required' });
    }
    try {

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        if (user.resetOtp === "" || user.resetOtp !== otp) {
            return res.json({ success: false, message: 'Invalid OTP' });
        }

        if (user.resetOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: 'OTP Expired' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;

        await user.save();

        return res.json({ success: true, message: 'Password has been reset successfully' });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}


