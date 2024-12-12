import React from 'react';
import { assets } from "../../assets/assets"; 
import { useNavigate } from 'react-router-dom'; 

const PacMan = () => {
  
  
  const Navbar = () => {
    const navigate = useNavigate();
    return (
      <div className="w-full flex justify-between items-center py-2 px-4 sm:py-3 sm:px-16 absolute top-0 bg-[#40826d] z-10">
        <img
          onClick={() => navigate('/')}
          src={assets.game}
          alt=""
          className="h-20 sm:h-12 object-contain cursor-pointer"
          style={{ width: "auto" }}
        />
        <h1 className="text-xl sm:text-2xl text-white font-bold">PacMan</h1>
      </div>
    );
  };

  return (
    <div className="relative pt-10">
      
      <Navbar />

      
      <div 
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          backgroundColor: '#0a0743',
          paddingTop: '60px' 
        }}
      >
        <iframe
          src="/pacman/pacman.html" 
          width="431"
          height="700"
          title="PACMAN Game"
          style={{ border: 'none' }}
        />
      </div>
    </div>
  );
};

export default PacMan;
