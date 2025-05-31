import React from 'react';
import { CardType } from '../types';
import { getLucideIcon } from '../utils/iconUtils';

interface CardProps {
  card: CardType;
  isFlipped: boolean;
  onClick: () => void;
  size?: 'sm' | 'md';
}

const Card: React.FC<CardProps> = ({ card, isFlipped, onClick, size = 'md' }) => {
  const Icon = getLucideIcon(card.icon);

  const sizeClasses = {
    sm: {
      card: 'w-[60px] h-[60px] sm:w-[80px] sm:h-[80px]',
      icon: 'w-6 h-6 sm:w-8 sm:h-8',
      questionMark: 'h-6 w-6 sm:h-7 sm:w-7'
    },
    md: {
      card: 'w-[80px] h-[80px] sm:w-[100px] sm:h-[100px]',
      icon: 'w-8 h-8 sm:w-10 sm:h-10',
      questionMark: 'h-7 w-7 sm:h-8 sm:w-8'
    }
  };

  return (
    <div
      onClick={card.isMatched || isFlipped ? undefined : onClick}
      className={`
        ${sizeClasses[size].card}
        relative cursor-pointer transition-all duration-300
        ${card.isMatched ? 'cursor-default' : ''}
        transform perspective-1000 
        hover:scale-105 transition-transform
      `}
    >
      <div
        className={`
          absolute inset-0 backface-hidden rounded-xl shadow-lg
          transition-transform duration-500 ease-in-out
          ${isFlipped || card.isMatched ? 'rotate-y-180 pointer-events-none' : ''}
          bg-gradient-to-br from-blue-500 to-purple-500
        `}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`${sizeClasses[size].questionMark} bg-white/20 rounded-full flex items-center justify-center`}>
            <span className="text-white font-bold">?</span>
          </div>
        </div>
      </div>
      
      <div
        className={`
          absolute inset-0 backface-hidden rounded-xl shadow-lg
          transition-transform duration-500 ease-in-out rotate-y-180
          ${isFlipped || card.isMatched ? 'rotate-y-0' : ''}
          ${card.isMatched ? 'bg-green-100' : 'bg-white'}
          border-2 ${card.isMatched ? 'border-green-400' : 'border-blue-200'}
        `}
      >
        <div className="flex items-center justify-center h-full">
          <Icon 
            className={`
              ${sizeClasses[size].icon}
              ${card.isMatched ? 'text-green-500' : 'text-blue-500'}
              transition-all duration-300
            `} 
          />
        </div>
      </div>
    </div>
  );
};

export default Card