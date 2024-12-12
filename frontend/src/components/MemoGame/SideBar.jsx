import React, { useContext } from 'react'
import RestartBtn from "../MemoGame/images/restart-btn.png";
import ClockBtn from "../MemoGame/images/clock.png";
import { GameContext } from './context/GameContextProvider';
import sideBarImg from '../MemoGame/images/sidebar-bg.png'

const SideBar = () => {

  const { timeLeft, restartGame } = useContext(GameContext);

  return (
    <div className=" absolute right-36 md:-right-52 -bottom-[7.5rem] md:bottom-32 flex flex-col items-start gap-1">

      <div className="flex items-center justify-center gap-1 w-64 h-20 md:h-32"
        style={{
          backgroundImage: `url(${sideBarImg})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}>
        <img src={ClockBtn} alt="" className=" w-5 md:w-8" />
        <p className=" text-amber-900 md:text-lg font-bold">
          Time Left :{" "}
          <span className=" md:text-xl text-green-600 shadow">
            {" "}
            {timeLeft} secs
          </span>
        </p>
      </div>

      <div className="flex items-center justify-center gap-3 bg-sidebar-background bg-center bg-contain bg-no-repeat w-64 h-20 md:h-32">
        <button onClick={restartGame} className="flex items-center gap-3">
          <img src={RestartBtn} alt="" className=" w-8 h-8 md:w-10 md:h-10" />
          <p className=" text-amber-900 md:text-lg font-bold">Replay</p>
        </button>
      </div>
    </div>
  );
}

export default SideBar