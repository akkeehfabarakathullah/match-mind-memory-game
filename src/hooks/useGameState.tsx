import { useState, useEffect, useCallback, useRef } from 'react';
import { CardType, Difficulty, GameStatus } from '../types';
import { generateCards, GameConfig } from '../utils/gameUtils';

const useGameState = (difficulty: Difficulty) => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [gridSize, setGridSize] = useState<{ rows: number; cols: number }>({ rows: 3, cols: 4 });
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.READY);
  
  const timerRef = useRef<number | null>(null);
  
  // Initialize game with cards based on difficulty
  useEffect(() => {
    const gameConfig: GameConfig = generateCards(difficulty);
    setCards(gameConfig.cards);
    setGridSize(gameConfig.gridSize);
  }, [difficulty]);
  
  // Handle timer
  useEffect(() => {
    if (gameStatus === GameStatus.PLAYING) {
      timerRef.current = window.setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [gameStatus]);
  
  // Check for game completion
  useEffect(() => {
    if (matchedPairs === cards.length / 2 && cards.length > 0) {
      setGameStatus(GameStatus.COMPLETED);
    }
  }, [matchedPairs, cards.length]);
  
  // Check for matches when two cards are flipped
  useEffect(() => {
    if (flippedIndices.length === 2) {
      setMoveCount(prev => prev + 1);
      
      const [firstIndex, secondIndex] = flippedIndices;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];
      
      if (firstCard.icon === secondCard.icon) {
        // Match found
        setCards(prevCards => 
          prevCards.map((card, index) => 
            index === firstIndex || index === secondIndex
              ? { ...card, isMatched: true }
              : card
          )
        );
        setMatchedPairs(prev => prev + 1);
        setFlippedIndices([]);
      } else {
        // No match, flip back after a delay
        const timer = setTimeout(() => {
          setFlippedIndices([]);
        }, 1000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [flippedIndices, cards]);
  
  // Flip a card
  const flipCard = useCallback((index: number) => {
    // Can't flip if game isn't playing
    if (gameStatus !== GameStatus.PLAYING) return;
    
    // Can't flip more than 2 cards at once
    if (flippedIndices.length >= 2) return;
    
    // Can't flip a card that's already flipped or matched
    if (flippedIndices.includes(index) || cards[index].isMatched) return;
    
    setFlippedIndices(prev => [...prev, index]);
  }, [flippedIndices, cards, gameStatus]);
  
  // Reset the game
  const resetGame = useCallback(() => {
    const gameConfig = generateCards(difficulty);
    setCards(gameConfig.cards);
    setGridSize(gameConfig.gridSize);
    setFlippedIndices([]);
    setMatchedPairs(0);
    setMoveCount(0);
    setTimer(0);
    setGameStatus(GameStatus.READY);
  }, [difficulty]);
  
  // Start the game
  const startGame = useCallback(() => {
    setGameStatus(GameStatus.PLAYING);
  }, []);
  
  // Pause the game
  const pauseGame = useCallback(() => {
    if (gameStatus === GameStatus.PLAYING) {
      setGameStatus(GameStatus.PAUSED);
    }
  }, [gameStatus]);
  
  // Resume the game
  const resumeGame = useCallback(() => {
    if (gameStatus === GameStatus.PAUSED) {
      setGameStatus(GameStatus.PLAYING);
    }
  }, [gameStatus]);
  
  return {
    cards,
    gridSize,
    flippedIndices,
    matchedPairs,
    moveCount,
    timer,
    gameStatus,
    flipCard,
    resetGame,
    startGame,
    pauseGame,
    resumeGame,
  };
};

export default useGameState;