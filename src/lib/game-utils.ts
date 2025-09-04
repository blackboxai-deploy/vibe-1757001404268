import { GAME_CONFIG } from './game-constants';

// Position interface
export interface Position {
  x: number;
  y: number;
}

// Direction interface
export interface Direction {
  x: number;
  y: number;
}

/**
 * Check if two positions are equal
 */
export const isPositionEqual = (pos1: Position, pos2: Position): boolean => {
  return pos1.x === pos2.x && pos1.y === pos2.y;
};

/**
 * Check if position is within game boundaries
 */
export const isValidPosition = (position: Position): boolean => {
  const gridCount = GAME_CONFIG.CANVAS_SIZE / GAME_CONFIG.GRID_SIZE;
  return (
    position.x >= 0 &&
    position.x < gridCount &&
    position.y >= 0 &&
    position.y < gridCount
  );
};

/**
 * Generate random position for food
 */
export const generateRandomPosition = (): Position => {
  const gridCount = GAME_CONFIG.CANVAS_SIZE / GAME_CONFIG.GRID_SIZE;
  return {
    x: Math.floor(Math.random() * gridCount),
    y: Math.floor(Math.random() * gridCount)
  };
};

/**
 * Generate food position that doesn't collide with snake
 */
export const generateFoodPosition = (snake: Position[]): Position => {
  let foodPosition: Position;
  
  do {
    foodPosition = generateRandomPosition();
  } while (snake.some(segment => isPositionEqual(segment, foodPosition)));
  
  return foodPosition;
};

/**
 * Check if snake collides with itself
 */
export const checkSelfCollision = (snake: Position[]): boolean => {
  const head = snake[0];
  const body = snake.slice(1);
  return body.some(segment => isPositionEqual(head, segment));
};

/**
 * Check if snake collides with walls
 */
export const checkWallCollision = (position: Position): boolean => {
  return !isValidPosition(position);
};

/**
 * Get opposite direction
 */
export const getOppositeDirection = (direction: Direction): Direction => {
  return {
    x: -direction.x,
    y: -direction.y
  };
};

/**
 * Check if direction change is valid (can't reverse into self)
 */
export const isValidDirectionChange = (currentDirection: Direction, newDirection: Direction): boolean => {
  const opposite = getOppositeDirection(currentDirection);
  return !(newDirection.x === opposite.x && newDirection.y === opposite.y);
};

/**
 * Move position in given direction
 */
export const movePosition = (position: Position, direction: Direction): Position => {
  return {
    x: position.x + direction.x,
    y: position.y + direction.y
  };
};

/**
 * Calculate game speed based on score
 */
export const calculateSpeed = (score: number): number => {
  const speedReduction = Math.floor(score / (GAME_CONFIG.POINTS_PER_FOOD * 3)) * GAME_CONFIG.SPEED_INCREMENT;
  return Math.max(GAME_CONFIG.MIN_SPEED, GAME_CONFIG.INITIAL_SPEED - speedReduction);
};

/**
 * Get high score from localStorage
 */
export const getHighScore = (): number => {
  if (typeof window === 'undefined') return 0;
  
  try {
    const stored = localStorage.getItem('snake-game-high-score');
    return stored ? parseInt(stored, 10) : 0;
  } catch (error) {
    console.warn('Failed to retrieve high score:', error);
    return 0;
  }
};

/**
 * Save high score to localStorage
 */
export const saveHighScore = (score: number): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('snake-game-high-score', score.toString());
  } catch (error) {
    console.warn('Failed to save high score:', error);
  }
};

/**
 * Format score for display
 */
export const formatScore = (score: number): string => {
  return score.toString().padStart(4, '0');
};

/**
 * Calculate distance between two positions (for AI or advanced features)
 */
export const calculateDistance = (pos1: Position, pos2: Position): number => {
  return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y);
};