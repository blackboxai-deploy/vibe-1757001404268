'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  GAME_CONFIG, 
  DIRECTIONS, 
  GameState 
} from '@/lib/game-constants';
import {
  Position,
  Direction,
  generateFoodPosition,
  checkSelfCollision,
  checkWallCollision,
  movePosition,
  isValidDirectionChange,
  calculateSpeed,
  getHighScore,
  saveHighScore
} from '@/lib/game-utils';

export interface GameStats {
  score: number;
  highScore: number;
  level: number;
  speed: number;
}

export interface UseSnakeGameReturn {
  // Game state
  gameState: GameState;
  snake: Position[];
  food: Position;
  direction: Direction;
  stats: GameStats;
  
  // Game actions
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  resetGame: () => void;
  changeDirection: (newDirection: Direction) => void;
  
  // Game info
  isGameRunning: boolean;
  canChangeDirection: boolean;
}

const INITIAL_SNAKE: Position[] = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 }
];

const INITIAL_DIRECTION = DIRECTIONS.RIGHT;

export const useSnakeGame = (): UseSnakeGameReturn => {
  // Game state
  const [gameState, setGameState] = useState<GameState>(GameState.MENU);
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>(() => generateFoodPosition(INITIAL_SNAKE));
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  // Game timing
  const gameLoopRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastMoveTimeRef = useRef<number>(0);
  const pendingDirectionRef = useRef<Direction | null>(null);
  
  // Load high score on mount
  useEffect(() => {
    setHighScore(getHighScore());
  }, []);
  
  // Calculate derived stats
  const level = Math.floor(score / (GAME_CONFIG.POINTS_PER_FOOD * 5)) + 1;
  const speed = calculateSpeed(score);
  
  const stats: GameStats = {
    score,
    highScore,
    level,
    speed
  };
  
  // Game loop
  const gameLoop = useCallback(() => {
    const currentTime = Date.now();
    const timeSinceLastMove = currentTime - lastMoveTimeRef.current;
    
    if (timeSinceLastMove >= speed) {
      setSnake(currentSnake => {
        const currentDirection = pendingDirectionRef.current || direction;
        pendingDirectionRef.current = null;
        
        const head = currentSnake[0];
        const newHead = movePosition(head, currentDirection);
        
        // Check collisions
        if (checkWallCollision(newHead) || checkSelfCollision([newHead, ...currentSnake])) {
          setGameState(GameState.GAME_OVER);
          return currentSnake;
        }
        
        // Check food collision
        const ateFood = newHead.x === food.x && newHead.y === food.y;
        const newSnake = [newHead, ...currentSnake];
        
        if (ateFood) {
          // Grow snake and update score
          setScore(prevScore => {
            const newScore = prevScore + GAME_CONFIG.POINTS_PER_FOOD;
            if (newScore > highScore) {
              setHighScore(newScore);
              saveHighScore(newScore);
            }
            return newScore;
          });
          
          // Generate new food
          setFood(generateFoodPosition(newSnake));
          
          return newSnake;
        } else {
          // Remove tail if no food eaten
          return newSnake.slice(0, -1);
        }
      });
      
      // Update direction for next move
      if (pendingDirectionRef.current) {
        setDirection(pendingDirectionRef.current);
      }
      
      lastMoveTimeRef.current = currentTime;
    }
  }, [direction, food, speed, highScore]);
  
  // Start game loop
  useEffect(() => {
    if (gameState === GameState.PLAYING) {
      lastMoveTimeRef.current = Date.now();
      gameLoopRef.current = setInterval(gameLoop, 16); // ~60fps
      
      return () => {
        if (gameLoopRef.current) {
          clearInterval(gameLoopRef.current);
          gameLoopRef.current = null;
        }
      };
    }
    
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
      gameLoopRef.current = null;
    }
  }, [gameState, gameLoop]);
  
  // Game actions
  const startGame = useCallback(() => {
    setGameState(GameState.PLAYING);
  }, []);
  
  const pauseGame = useCallback(() => {
    if (gameState === GameState.PLAYING) {
      setGameState(GameState.PAUSED);
    }
  }, [gameState]);
  
  const resumeGame = useCallback(() => {
    if (gameState === GameState.PAUSED) {
      setGameState(GameState.PLAYING);
    }
  }, [gameState]);
  
  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFoodPosition(INITIAL_SNAKE));
    setScore(0);
    pendingDirectionRef.current = null;
    setGameState(GameState.MENU);
  }, []);
  
  const changeDirection = useCallback((newDirection: Direction) => {
    if (gameState === GameState.PLAYING && isValidDirectionChange(direction, newDirection)) {
      pendingDirectionRef.current = newDirection;
    }
  }, [gameState, direction]);
  
  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      event.preventDefault();
      
      switch (event.code) {
        case 'Space':
          if (gameState === GameState.PLAYING) {
            pauseGame();
          } else if (gameState === GameState.PAUSED) {
            resumeGame();
          } else if (gameState === GameState.MENU || gameState === GameState.GAME_OVER) {
            startGame();
          }
          break;
          
        case 'Escape':
          if (gameState === GameState.PLAYING) {
            pauseGame();
          } else if (gameState === GameState.PAUSED) {
            resetGame();
          }
          break;
          
        case 'KeyR':
          resetGame();
          break;
          
        // Direction keys
        case 'ArrowUp':
        case 'KeyW':
        case 'KeyK':
          changeDirection(DIRECTIONS.UP);
          break;
          
        case 'ArrowDown':
        case 'KeyS':
        case 'KeyJ':
          changeDirection(DIRECTIONS.DOWN);
          break;
          
        case 'ArrowLeft':
        case 'KeyA':
        case 'KeyH':
          changeDirection(DIRECTIONS.LEFT);
          break;
          
        case 'ArrowRight':
        case 'KeyD':
        case 'KeyL':
          changeDirection(DIRECTIONS.RIGHT);
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, changeDirection, startGame, pauseGame, resumeGame, resetGame]);
  
  const isGameRunning = gameState === GameState.PLAYING;
  const canChangeDirection = gameState === GameState.PLAYING;
  
  return {
    // Game state
    gameState,
    snake,
    food,
    direction,
    stats,
    
    // Game actions
    startGame,
    pauseGame,
    resumeGame,
    resetGame,
    changeDirection,
    
    // Game info
    isGameRunning,
    canChangeDirection
  };
};