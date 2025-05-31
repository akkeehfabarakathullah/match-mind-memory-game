import { CardType, Difficulty } from '../types';
import { getRandomIcons } from './iconUtils';

export interface GameConfig {
  cards: CardType[];
  gridSize: { rows: number; cols: number };
}

export const generateCards = (difficulty: Difficulty): GameConfig => {
  let numPairs: number;
  let gridSize: { rows: number; cols: number };
  
  switch (difficulty) {
    case Difficulty.EASY:
      numPairs = 6; // 3x4 grid
      gridSize = { rows: 3, cols: 4 };
      break;
    case Difficulty.MEDIUM:
      numPairs = 8; // 4x4 grid
      gridSize = { rows: 4, cols: 4 };
      break;
    case Difficulty.HARD:
      numPairs = 15; // 5x6 grid
      gridSize = { rows: 5, cols: 6 };
      break;
    default:
      numPairs = 6;
      gridSize = { rows: 3, cols: 4 };
  }
  
  // Get random icons for pairs
  const icons = getRandomIcons(numPairs);
  
  // Create pairs of cards
  const cards: CardType[] = [];
  icons.forEach(icon => {
    // Add two cards with the same icon (a pair)
    cards.push({ icon, isMatched: false });
    cards.push({ icon, isMatched: false });
  });
  
  // Shuffle the cards
  return {
    cards: shuffleArray(cards),
    gridSize
  };
};

// Fisher-Yates shuffle algorithm
export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};