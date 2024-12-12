import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'

import Snowfall from 'react-snowfall';
import loginBg from '../assets/loginbg.png';

const ResetPassword = () => {

  const { backendUrl } = useContext(AppContext)
  axios.defaults.withCredentials = true

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [newPassword, setnewPassword] = useState('')
  const [isEmailSent, setIsEmailSent] = useState('')
  const [otp, setOtp] = useState(0)
  const [isOtpSubmitted, setisOtpSubmitted] = useState(false)


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

  //on submit email
  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/send-reset-otp', { email });
      data.success ? toast.success(data.message) : toast.error(data.message);
      if (data.success) {
        setIsEmailSent(true);
        setOtp("");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //on submit otp
  const onSubmitOTP = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map(e => e.value)
    setOtp(otpArray.join(''))
    setisOtpSubmitted(true)
  }

  //
  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/reset-password',
        { email, otp, newPassword })
      data.success ? toast.success(data.message) : toast.error(data.message)
      data.success && navigate('/login')
    } catch (error) {
      toast.error(error.message)

    }
  }

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
      <Snowfall color="white" snowflakeCount={100} style={{ position: 'absolute', zIndex: 1 }} />
      <img onClick={() => navigate('/')}
        src={assets.game} alt=""
        className='absolute left-5 sm:left-20 top-5 h-20 sm:h-12 object-contain cursor-pointer'
        style={{ width: "auto" }}
      />


      {/* Form 1 Enter email for send otp forgot password*/}
      {!isEmailSent && (
        <form onSubmit={onSubmitEmail} className='bg-white bg-opacity-80 p-8 rounded-3xl shadow-lg w-96 text-sm'>
          <h1 className='text-[#04361D] text-2xl font-semibold text-center mb-4'>
            Reset Password
          </h1>
          <p className='text-center mb-6 text-[#40826D]'>
            Enter your registered email address
          </p>
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-white bg-opacity-60'>
            <img src={assets.mail_icon} alt="" className='w-3 h-3' />
            <input
              type="email"
              placeholder="Enter Email"
              className="bg-transparent outline-none text-white"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <button className="w-full py-2.5 bg-[#40826d] text-[#F0F2D5] rounded-full mt-3">
            Submit
          </button>
        </form>
      )}



      {/* Form 2 Otp input form */}
      {!isOtpSubmitted && isEmailSent && (
        <form onSubmit={onSubmitOTP}
          className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
          <h1 className='text-white text-2xl font-semibold text-center mb-4'>
            Reset Password OTP
          </h1>
          <p className='text-center mb-6 text-indigo-300'>
            Enter the 6-digit code sent to your email
          </p>

          <div className='flex justify-between mb-8' onPaste={handlePaste}>
            {Array(6).fill(0).map((_, index) => (
              <input
                type="text"
                maxLength="1"
                key={index}
                required
                className='w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md'
                ref={(e) => (inputRefs.current[index] = e)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>

          <button className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full'>
            Submit
          </button>
        </form>
      )}


      {/* Form 3 Enter new password*/}

      {isOtpSubmitted && isEmailSent &&

        <form onSubmit={onSubmitNewPassword}
          className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
          <h1 className='text-white text-2xl font-semibold text-center mb-4'>
            New Password</h1>
          <p className='text-center mb-6 text-indigo-300'>
            Enter the new password below</p>
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full
        bg-[#333A5C]'>
            <img src={assets.lock_icon} alt="" className='w-3 h-3' />
            <input type="password" placeholder='Enter New Password'
              className='bg-transparent outline-none text-white'
              value={newPassword} onChange={e => setnewPassword(e.target.value)} required />
          </div>

          <button
            className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 
         text-white rounded-full mt-3'>
            Submit</button>
        </form>
      }


    </div>
  )
}

export default ResetPassword