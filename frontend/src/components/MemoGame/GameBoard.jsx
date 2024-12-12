import React, { useContext } from 'react'
import FruitCard from './FruitCard';
import { GameContext } from './context/GameContextProvider';

const GameBoard = () => {

  const { cards } = useContext(GameContext);


  return (
    <div className=" absolute top-[34%] md:top-[35%] left-[26%] w-[16.5rem] h-[16.5rem]  md:w-[19rem] md:h-[19rem] mx-auto items-center grid grid-cols-4">
      {cards.map((fruit, index) => (
        <FruitCard key={index} fruitId={index} />
      ))}
    </div>
  );
}

export default GameBoard