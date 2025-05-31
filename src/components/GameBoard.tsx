import React from 'react';
import Card from './Card';
import { CardType, Difficulty } from '../types';

interface GameBoardProps {
  cards: CardType[];
  flippedIndices: number[];
  onCardClick: (index: number) => void;
  difficulty: Difficulty;
  gridSize: { rows: number; cols: number };
}

const GameBoard: React.FC<GameBoardProps> = ({
  cards,
  flippedIndices,
  onCardClick,
  difficulty,
  gridSize,
}) => {
  return (
    <div 
      className="grid gap-3 sm:gap-4 mx-auto"
      style={{
        gridTemplateColumns: `repeat(${gridSize.cols}, minmax(0, 1fr))`,
        maxWidth: difficulty === Difficulty.HARD ? '800px' : '600px'
      }}
    >
      {cards.map((card, index) => (
        <Card
          key={index}
          card={card}
          isFlipped={flippedIndices.includes(index)}
          onClick={() => onCardClick(index)}
          size={difficulty === Difficulty.HARD ? 'sm' : 'md'}
        />
      ))}
    </div>
  );
};

export default GameBoard