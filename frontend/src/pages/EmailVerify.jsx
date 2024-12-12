import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BackgroundMusic from '../components/backgroundMusic'

import Snowfall from 'react-snowfall'; // Import the snowfall library
import loginBg from '../assets/loginbg.png';

const EmailVerify = () => {
    //send cookie
    axios.defaults.withCredentials = true

    const { backendUrl, isLoggedin, userData, getUserData } = useContext(AppContext)
    const navigate = useNavigate()

    const inputRefs = React.useRef([])
    const handleInput = (e, index) => {
        if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };
    //back
    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
            const prevInput = inputRefs.current[index - 1];
            prevInput.focus();
            prevInput.value = '';
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const paste = e.clipboardData.getData('text');
        const pasteArray = paste.split('');


        inputRefs.current.forEach((input) => {
            if (input) input.value = '';
        });


        inputRefs.current[0]?.focus();


        pasteArray.forEach((char, index) => {
            if (inputRefs.current[index]) {
                inputRefs.current[index].value = char;
            }
        });


        const nextInput = inputRefs.current[pasteArray.length];
        nextInput?.focus();
    };

    const onSubmitHandler = async (e) => {
        try {
            //not reload page
            e.preventDefault()
            const otpArray = inputRefs.current.map(e => e.value)
            const otp = otpArray.join('')

            const { data } = await axios.post(backendUrl + '/api/auth/verify-account', { otp })
            if (data.success) {
                toast.success(data.message)
                getUserData()
                navigate('/')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //when localhost:5173/email-verify if verify cant access go back to only homepage
    useEffect(() => {
        isLoggedin && userData && userData.isAccountVerified && navigate('/')
    }, [isLoggedin, userData])



    return (
        <div
            className='flex items-center justify-center min-h-screen px-6 sm:px-0'
            style={{
                backgroundImage: `url(${loginBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <BackgroundMusic />
            <Snowfall color="white" snowflakeCount={100} style={{ position: 'absolute', zIndex: 1 }} />
            <img onClick={() => navigate('/')}
                src={assets.game} alt=""
                className='absolute left-5 sm:left-20 top-5 h-20 sm:h-12 object-contain cursor-pointer'
                style={{ width: "auto" }}
                />

            <form onSubmit={onSubmitHandler}
                className='bg-white bg-opacity-80 p-8 rounded-3xl shadow-lg w-96 text-sm'>
                <h1 className='text-[#04361D] text-2xl font-semibold text-center mb-4'>
                    Email Verify OTP</h1>
                <p className='text-center mb-6 text-[#40826D]'>
                    Enter the 6-digit code sent to your email</p>

                <div className='flex justify-between mb-8' onPaste={handlePaste}>
                    {Array(6).fill(0).map((_, index) => (
                        <input
                            type="text"
                            maxLength="1"
                            key={index}
                            required
                            className='w-12 h-12 bg-white bg-opacity-60 text-[#40826D] text-center 
                                        text-xl rounded-md'
                            ref={(e) => (inputRefs.current[index] = e)}
                            onInput={(e) => handleInput(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                        />
                    ))}
                </div>


                <button className='w-full py-3 bg-[#40826d] text-[#F0F2D5]  rounded-full '>
                    Verify Email
                </button>
            </form>
            <footer
                className="absolute bottom-0 left-0 right-0 text-[#366a56] text-center py-4">
                <p className="text-sm">© 2024 HOLLYBUZZZ Inc. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default EmailVerify