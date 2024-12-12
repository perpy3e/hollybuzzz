import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import Leaderboard from '../pages/Leaderboard'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'



const Header = () => {
   const { userData } = useContext(AppContext)
   const navigate = useNavigate()
   const getStartedBtn = () => {
      if (userData) {

         toast.success('Enjoy!')
         navigate('/games')
      } else {
         toast.error('Log In first or you will be miss out')
         navigate('/login')
      }
   }



   return (
      <div className='flex flex-col items-center mt-20 px-4 text-center text-[#04361D]'>
         {/* <img src={assets.header_img} alt=""
            className=' h-36 w-100 rounded-full mb-6' /> */}

         <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-4 mt-5'>
            Welcome, {userData ? userData.name : 'Gamer'}
            <img src={assets.hand_wave} alt=""
               className='w-8 aspect-square' /></h1>

         <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>
            Begin Your Epic Chronicle!</h2>

         <Leaderboard />

         <button
            onClick={getStartedBtn}
            className='btn mt-5 mb-10 shadow-[0_4px_6px_rgba(255,255,255,0.3)] hover:shadow-[0_6px_8px_rgba(255,255,255,0.5)] 
           text-black bg-white ease-out hover:translate-y-1 transition-all 
           rounded-full px-8 py-3 text-lg font-semibold hover:bg-gray-100'>
            Seize Your Legend
         </button>


      </div>
   )
}

export default Header









