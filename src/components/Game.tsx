import React, { useState, useEffect } from 'react';
import GameBoard from './GameBoard';
import GameControls from './GameControls';
import { Difficulty, GameStatus } from '../types';
import useGameState from '../hooks/useGameState';
import { themes } from '../types/theme';

function Game() {
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY);
  const [isFirstGame, setIsFirstGame] = useState(true);
  const [theme, setTheme] = useState('default');

  const {
    cards, gridSize, flippedIndices, matchedPairs, moveCount, timer, gameStatus, flipCard, resetGame, startGame, pauseGame, resumeGame,
  } = useGameState(difficulty);

  const totalPairs = cards.length / 2;
  const isGameCompleted = gameStatus === GameStatus.COMPLETED;

  useEffect(() => {
    resetGame();
    setIsFirstGame(false);
  }, [difficulty]);

  useEffect(() => {
    if (isFirstGame) {
      startGame();
      setIsFirstGame(false);
    }
  }, [isFirstGame]);

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
  };

  return (
    <div
      className="w-full max-w-5xl mx-auto rounded-2xl shadow-xl overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${themes[theme]})` }}
    >
      <div className="p-6 backdrop-blur-sm bg-white/70 rounded-2xl space-y-6">

        {/* Theme Selector */}
<div className="flex justify-end mb-6">
  <label
    htmlFor="theme-select"
    className="mr-3 font-semibold text-sm text-gray-1000 dark:text-gray-100"
  >
    Select Theme:
  </label>
  <select
    id="theme-select"
    value={theme}
    onChange={(e) => setTheme(e.target.value)}
    className="px-2 py-1 rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
  >
    {Object.keys(themes).map((key) => (
      <option key={key} value={key}>
        {key.charAt(0).toUpperCase() + key.slice(1)}
      </option>
    ))}
  </select>
</div>


        {/* Controls */}
        <GameControls
          difficulty={difficulty}
          onDifficultyChange={handleDifficultyChange}
          moveCount={moveCount}
          timer={timer}
          matchedPairs={matchedPairs}
          totalPairs={totalPairs}
          gameStatus={gameStatus}
          onReset={resetGame}
          onStart={startGame}
          onPause={pauseGame}
          onResume={resumeGame} />

        {/* Game Board with overlay */}
<div className="relative">
  {isGameCompleted && (
    <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20 rounded-xl animate-fade-in backdrop-blur-md">
      <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-2xl shadow-2xl text-center space-y-5 max-w-md w-full mx-4 transition-transform duration-300 scale-100 animate-bounce-in">
        <h2 className="text-3xl md:text-4xl font-extrabold text-green-600 dark:text-green-400 tracking-tight">
          🎉 Congratulations!
        </h2>
        <p className="text-base md:text-lg text-gray-800 dark:text-gray-200">
          You completed the game in <strong className="text-blue-600 dark:text-blue-400">{timer}</strong> seconds with{' '}
          <strong className="text-purple-600 dark:text-purple-400">{moveCount}</strong> moves!
        </p>
        <button
          onClick={resetGame}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:brightness-110 active:scale-95 transition-all duration-200 shadow-md"
        >
          🔁 Play Again
        </button>
      </div>
    </div>
  )}


          <GameBoard
            cards={cards}
            flippedIndices={flippedIndices}
            onCardClick={flipCard}
            difficulty={difficulty}
            gridSize={gridSize} />
        </div>
      </div>
    </div>
  );
}

export default Game;
