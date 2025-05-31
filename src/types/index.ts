export enum Difficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
}

export enum GameStatus {
  READY = 'ready',
  PLAYING = 'playing',
  PAUSED = 'paused',
  COMPLETED = 'completed',
}

export interface CardType {
  icon: string;
  isMatched: boolean;
}