import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

import Snowfall from 'react-snowfall'; // Import the snowfall library
import loginBg from '../assets/loginbg.png';
import BackgroundMusic from '../components/backgroundMusic'

const Login = () => {

    const navigate = useNavigate()

    const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext)

    const [state, setState] = useState('Sign Up')

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            axios.defaults.withCredentials = true;

            if (state === 'Sign Up') {
                const { data } = await axios.post(backendUrl + '/api/auth/register', {
                    name,
                    email,
                    password
                });

                if (data.success) {
                    // Check if a session or token is set
                    console.log('Registration successful:', data);

                    setIsLoggedin(true);
                    await getUserData(); // Fetch user data after registration
                    navigate('/');
                } else {
                    toast.error(data.message);
                }
            } else {
                const { data } = await axios.post(backendUrl + '/api/auth/login', {
                    email,
                    password
                });

                if (data.success) {
                    setIsLoggedin(true);
                    await getUserData(); // Fetch user data after login
                    navigate('/');
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    };


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

            <div className='bg-white bg-opacity-80 p-10 rounded-3xl shadow-lg w-full sm:w-96
                            text-[#40826D] text-sm'>

                <h2 className='text-3xl font-semibold text-[#04361D] text-center mb-3'>
                    {state === 'Sign Up' ? 'Create Account' : 'Login'}</h2>
                <p className='text-center text-sm mb-6'>
                    {state === 'Sign Up' ? 'Create your account' : 'Login to your account!'}</p>


                <form onSubmit={onSubmitHandler}>
                    {state === 'Sign Up' && (
                        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5
        rounded-full bg-white bg-opacity-60'>
                            <img src={assets.person_icon} alt="" />
                            <input onChange={e => setName(e.target.value)}
                                value={name}
                                className='bg-transparent outline-none'
                                type="text" placeholder="Full Name" required />
                        </div>)}


                    <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5
    rounded-full bg-white bg-opacity-60'>
                        <img src={assets.mail_icon} alt="" />
                        <input onChange={e => setEmail(e.target.value)}
                            value={email}
                            className='bg-transparent outline-none'
                            type="email" placeholder="Email" required />
                    </div>

                    <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5
    rounded-full bg-white bg-opacity-60'>
                        <img src={assets.lock_icon} alt="" />
                        <input onChange={e => setPassword(e.target.value)}
                            value={password}
                            className='bg-transparent outline-none'
                            type="password" placeholder="Password" required />
                    </div>

                    <p onClick={() => navigate('/reset-password')}
                        className='mb-4 cursor-pointer'>
                        Forgot Password?</p>

                    <button className='w-full py-2.5 rounded-full bg-[#40826d] text-[#F0F2D5] font-medium'>
                        {state}</button>

                    {state === 'Sign Up' ?
                        (<p className='text-gray-500 text-center text-xs mt-4'>
                            Already have an account? {'  '}
                            <span onClick={() => setState('Login')}
                                className='text-blue-600 cursor-pointer underline'>
                                Login here</span>
                        </p>)
                        :
                        (<p className='text-gray-400 text-center text-xs mt-4'>
                            Don't have an account? {'  '}
                            <span onClick={() => setState('Sign Up')}
                                className='text-blue-600 cursor-pointer underline'>
                                Sign Up</span>
                        </p>)}

                </form>

            </div>
            <footer
                className="absolute bottom-0 left-0 right-0 text-[#366a56] text-center py-4">
                <p className="text-sm">© 2024 HOLLYBUZZZ Inc. All rights reserved.</p>
            </footer>
        </div>
    )
}


export default Login