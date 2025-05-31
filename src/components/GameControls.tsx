import React from 'react';
import { Clock, RotateCcw, Play, Pause, Medal } from 'lucide-react';
import { Difficulty, GameStatus } from '../types';

interface GameControlsProps {
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  moveCount: number;
  timer: number;
  matchedPairs: number;
  totalPairs: number;
  gameStatus: GameStatus;
  onReset: () => void;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  difficulty,
  onDifficultyChange,
  moveCount,
  timer,
  matchedPairs,
  totalPairs,
  gameStatus,
  onReset,
  onStart,
  onPause,
  onResume,
}) => {
  const isPaused = gameStatus === GameStatus.PAUSED;
  const isPlaying = gameStatus === GameStatus.PLAYING;
  const isReady = gameStatus === GameStatus.READY;
  const isCompleted = gameStatus === GameStatus.COMPLETED;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const difficultyInfo = {
    [Difficulty.EASY]: { label: 'Easy', color: 'bg-green-500', grid: '3×4' },
    [Difficulty.MEDIUM]: { label: 'Medium', color: 'bg-purple-500', grid: '4×4' },
    [Difficulty.HARD]: { label: 'Hard', color: 'bg-red-500', grid: '5×6' },
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex gap-2">
          {Object.entries(difficultyInfo).map(([level, info]) => (
            <button
              key={level}
              onClick={() => onDifficultyChange(level as Difficulty)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all
                flex items-center gap-2
                ${difficulty === level
                  ? `${info.color} text-white shadow-lg scale-105`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
              disabled={isPlaying && !isCompleted}
            >
              {info.label}
              <span className="text-xs opacity-80">{info.grid}</span>
            </button>
          ))}
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={onReset}
            className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            title="Reset Game"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          
          {isReady && (
            <button
              onClick={onStart}
              className="p-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors shadow-lg"
              title="Start Game"
            >
              <Play className="w-5 h-5" />
            </button>
          )}
          
          {isPlaying && (
            <button
              onClick={onPause}
              className="p-2 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition-colors shadow-lg"
              title="Pause Game"
            >
              <Pause className="w-5 h-5" />
            </button>
          )}
          
          {isPaused && (
            <button
              onClick={onResume}
              className="p-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors shadow-lg"
              title="Resume Game"
            >
              <Play className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 text-center shadow-md">
          <div className="flex items-center justify-center gap-1 text-gray-500 mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-medium">Time</span>
          </div>
          <div className="text-xl font-mono font-bold text-gray-800">{formatTime(timer)}</div>
        </div>
        
        <div className="bg-white rounded-lg p-4 text-center shadow-md">
          <div className="flex items-center justify-center gap-1 text-gray-500 mb-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="text-xs font-medium">Moves</span>
          </div>
          <div className="text-xl font-mono font-bold text-gray-800">{moveCount}</div>
        </div>
        
        <div className="bg-white rounded-lg p-4 text-center shadow-md">
          <div className="flex items-center justify-center gap-1 text-gray-500 mb-1">
            <Medal className="w-4 h-4" />
            <span className="text-xs font-medium">Progress</span>
          </div>
          <div className="text-xl font-mono font-bold text-gray-800">
            {matchedPairs}/{totalPairs}
          </div>
        </div>
      </div>
      
      <div className="w-full bg-gray-100 rounded-full h-3">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${(matchedPairs / totalPairs) * 100}%` }}
        >
          <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
        </div>
      </div>
    </div>
  );
};

export default GameControls