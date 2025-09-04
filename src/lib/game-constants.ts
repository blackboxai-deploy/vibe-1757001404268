// Game configuration constants
export const GAME_CONFIG = {
  // Grid dimensions
  GRID_SIZE: 20,
  CANVAS_SIZE: 400,
  
  // Game timing
  INITIAL_SPEED: 150, // milliseconds between moves
  SPEED_INCREMENT: 5, // speed increase per food eaten
  MIN_SPEED: 50, // maximum speed limit
  
  // Scoring
  POINTS_PER_FOOD: 10,
  BONUS_MULTIPLIER: 1.5, // bonus for consecutive food without hitting walls
  
  // Colors
  COLORS: {
    BACKGROUND: '#0f172a',
    GRID: '#1e293b',
    SNAKE_HEAD: '#10b981',
    SNAKE_BODY: '#059669',
    FOOD: '#ef4444',
    TEXT: '#f1f5f9',
    ACCENT: '#3b82f6'
  }
} as const;

// Direction vectors
export const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 }
} as const;

// Key mappings
export const KEY_MAP = {
  // Arrow keys
  'ArrowUp': DIRECTIONS.UP,
  'ArrowDown': DIRECTIONS.DOWN,
  'ArrowLeft': DIRECTIONS.LEFT,
  'ArrowRight': DIRECTIONS.RIGHT,
  
  // WASD keys
  'KeyW': DIRECTIONS.UP,
  'KeyS': DIRECTIONS.DOWN,
  'KeyA': DIRECTIONS.LEFT,
  'KeyD': DIRECTIONS.RIGHT,
  
  // Alternative keys
  'KeyK': DIRECTIONS.UP,
  'KeyJ': DIRECTIONS.DOWN,
  'KeyH': DIRECTIONS.LEFT,
  'KeyL': DIRECTIONS.RIGHT
} as const;

// Game states
export enum GameState {
  MENU = 'menu',
  PLAYING = 'playing',
  PAUSED = 'paused',
  GAME_OVER = 'game_over'
}

// Local storage keys
export const STORAGE_KEYS = {
  HIGH_SCORE: 'snake-game-high-score',
  SETTINGS: 'snake-game-settings'
} as const;