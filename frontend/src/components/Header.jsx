import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import Leaderboard from '../pages/Leaderboard'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import footerBg from '../assets/footerbg.png';


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
      <div>
         <div className='flex flex-col items-center mt-20 px-4 pb-40 text-center text-[#04361D] relative z-10'>
            {/* <img src={assets.header_img} alt="" className='h-36 w-100 rounded-full mb-6' /> */}

            <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-4 mt-5'>
               Welcome, {userData ? userData.name : 'Gamer'}
               <img src={assets.hand_wave} alt="" className='w-8 aspect-square' />
            </h1>

            <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>
               Begin Your Epic Chronicle!
            </h2>

            <Leaderboard />

            <button
               onClick={getStartedBtn}
               className='btn mt-5 mb-10 shadow-[0_4px_6px_rgba(255,255,255,0.3)] hover:shadow-[0_6px_8px_rgba(255,255,255,0.5)] 
            text-black bg-white ease-out hover:translate-y-1 transition-all 
            rounded-full px-8 py-3 text-lg font-semibold hover:bg-gray-100'>
               Seize Your Legend
            </button>
         </div>
         <footer
            className="absolute left-0 right-0 bottom-0 text-white z-0 h-[500px] overflow-hidden"
            style={{
               backgroundImage: `url(${footerBg})`,
               backgroundSize: 'cover',
               backgroundPosition: 'center bottom',
               backgroundRepeat: 'no-repeat',
               top: 'auto',
               bottom: '-500px',
            }}
         >
            {/* Footer Bottom */}
            <div className="absolute bottom-0 left-0 right-0 text-[#366a56] text-center py-4">
               <p className="text-sm">© 2024 HOLLYBUZZZ Inc. All rights reserved.</p>
            </div>
         </footer>
      </div>



   )
}

export default Header