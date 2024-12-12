import React, { useContext } from "react";
import { GameContext } from "./context/GameContextProvider";
import Score from "../MemoGame/images/score.png";
import RestartBtn from "../MemoGame/images/restart-btn.png";
import Confetti from "react-confetti";

const Overlay = () => {
  const { gameOver, gameWon, restartGame, score } = useContext(GameContext);

  if (!gameOver && !gameWon) return null;

  return (
    <div className=" absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-50 rounded-xl">
      <h1 className=" text-orange-300 text-5xl md:text-8xl font-serif font-bold mb-8">
        {gameOver ? " Game Over 😥 " : gameWon ? " You Win 🎉 " : ""}
      </h1>
      <div className=" flex items-center gap-3 mt-10">
        <img src={Score} alt="score" className=" w-10 h-10" />
        <p className=" text-4xl uppercase font-bold text-white ">
          {" "}
          Your Score :{" "}
          <span className="text-green-500 text-5xl"> {score} </span>{" "}
        </p>
      </div>

      <div className=" mt-10 flex justify-center items-center gap-3 bg-sidebar-background bg-center bg-contain bg-no-repeat w-64 h-20 md:h-32">
        <button onClick={restartGame} className=" flex items-center gap-3">
          <img src={RestartBtn} alt="" className=" w-8 h-8 md:w-10 md:h-10" />
          <p className=" text-amber-900 md:text-lg font-bold">Replay</p>
        </button>
      </div>
      {gameWon && (
        <>
          <Confetti
            width={2000}
            height={1000}
            tweenDuration={5000}
            numberOfPieces={200}
            gravity={0.01}
            colors={["#f44336", "#00ff00", "#0000ff", "#ffff00", "#9c27b0"]}
          />
        </>
      )}
    </div>
  );
};

export default Overlay;
