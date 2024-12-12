// for game MemoGame
import React, { createContext, useEffect, useRef, useState } from 'react'

// Import fruit images
import apple from "../images/fruits/apple.png";
import dragonfruit from "../images/fruits/dragonfruit.png";
import durian from "../images/fruits/durian.png";
import mangosteen from "../images/fruits/mangosteen.png";
import passionfruit from "../images/fruits/passionfruit.png";
import pineapple from "../images/fruits/pineapple.png";
import starfruit from "../images/fruits/starfruit.png";
import watermelon from "../images/fruits/watermelon.png";

export const GameContext = createContext();

const GameContextProvider = ({ children }) => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState([]);
    const [showIcons, setShowIcons] = useState(true);

    const [timeLeft, setTimeLeft] = useState(45);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const timerRef = useRef(null); // useRef to keep track of the timer

    const [score, setScore] = useState(0);


    useEffect(() => {
        // Fruit icons array
        const fruitIcons = [
            apple,
            dragonfruit,
            durian,
            mangosteen,
            passionfruit,
            pineapple,
            starfruit,
            watermelon,
        ];

        // Create pairs for each fruit and shuffle them
        const pairIcons = [...fruitIcons, ...fruitIcons];
        const shuffledIcons = pairIcons.sort(() => Math.random() - 0.5);

        // Map shuffled icons to card objects
        const cardItems = shuffledIcons.map((fruit, index) => ({
            id: index,
            fruit,
            flipped: false,
        }));

        setCards(cardItems);

        // Show all icons initially for 3 seconds
        setTimeout(() => {
            setShowIcons(false);
        }, 3000);

        // Timer logic to count down the remaining time
        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    if (!gameWon) setGameOver(true); // Time up, game over
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        // Clear interval on component unmount
        return () => clearInterval(timerRef.current);
    }, [gameWon]);

    // Function to handle card flips
    const flipCard = (index) => {
        if (flippedCards.length === 2) return;

        const updatedCards = [...cards];
        updatedCards[index].flipped = true;
        setCards(updatedCards);

        setFlippedCards((prevFlippedCards) => {
            const newFlippedCards = [...prevFlippedCards, index];

            if (newFlippedCards.length === 2) {
                const [firstIndex, secondIndex] = newFlippedCards;

                if (
                    updatedCards[firstIndex].fruit === updatedCards[secondIndex].fruit
                ) {
                    const newMatchedPairs = [
                        ...matchedPairs,
                        updatedCards[firstIndex].fruit,
                    ];
                    setMatchedPairs(newMatchedPairs);

                    // Check if all pairs are matched
                    if (newMatchedPairs.length === cards.length / 2) {
                        clearInterval(timerRef.current);

                        // Delay the game won UI display by 1 second
                        setTimeout(() => {
                            setGameWon(true);
                        }, 1000);

                        setScore(timeLeft * 10);

                    }
                } else {
                    setTimeout(() => {
                        const resetCards = [...updatedCards];
                        resetCards[firstIndex].flipped = false;
                        resetCards[secondIndex].flipped = false;
                        setCards(resetCards);
                    }, 1000);
                }

                return [];
            }

            return newFlippedCards;
        });
    };

    // Function to restart the game
    const restartGame = () => {
        window.location.reload();
    };

    return (
        <GameContext.Provider
            value={{
                cards,
                flipCard,
                matchedPairs,
                showIcons,

                timeLeft,
                gameOver,
                gameWon,
                restartGame,

                score,
            }}
        >
            {children}

        </GameContext.Provider>
    );
}

export default GameContextProvider