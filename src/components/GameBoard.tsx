'use client';

import { useEffect, useRef } from 'react';
import { GAME_CONFIG } from '@/lib/game-constants';
import { Position } from '@/lib/game-utils';

interface GameBoardProps {
  snake: Position[];
  food: Position;
  isGameRunning: boolean;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  snake,
  food,
  isGameRunning
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.fillStyle = GAME_CONFIG.COLORS.BACKGROUND;
    ctx.fillRect(0, 0, GAME_CONFIG.CANVAS_SIZE, GAME_CONFIG.CANVAS_SIZE);
    
    // Draw grid
    ctx.strokeStyle = GAME_CONFIG.COLORS.GRID;
    ctx.lineWidth = 0.5;
    
    for (let i = 0; i <= GAME_CONFIG.CANVAS_SIZE; i += GAME_CONFIG.GRID_SIZE) {
      // Vertical lines
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, GAME_CONFIG.CANVAS_SIZE);
      ctx.stroke();
      
      // Horizontal lines
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(GAME_CONFIG.CANVAS_SIZE, i);
      ctx.stroke();
    }
    
    // Draw snake
    snake.forEach((segment, index) => {
      const x = segment.x * GAME_CONFIG.GRID_SIZE;
      const y = segment.y * GAME_CONFIG.GRID_SIZE;
      
      // Snake head
      if (index === 0) {
        ctx.fillStyle = GAME_CONFIG.COLORS.SNAKE_HEAD;
        ctx.fillRect(x + 1, y + 1, GAME_CONFIG.GRID_SIZE - 2, GAME_CONFIG.GRID_SIZE - 2);
        
        // Add eyes to snake head
        ctx.fillStyle = GAME_CONFIG.COLORS.BACKGROUND;
        const eyeSize = 3;
        const eyeOffset = 5;
        ctx.fillRect(x + eyeOffset, y + eyeOffset, eyeSize, eyeSize);
        ctx.fillRect(x + GAME_CONFIG.GRID_SIZE - eyeOffset - eyeSize, y + eyeOffset, eyeSize, eyeSize);
      } else {
        // Snake body
        ctx.fillStyle = GAME_CONFIG.COLORS.SNAKE_BODY;
        ctx.fillRect(x + 2, y + 2, GAME_CONFIG.GRID_SIZE - 4, GAME_CONFIG.GRID_SIZE - 4);
      }
    });
    
    // Draw food with pulsing effect
    const time = Date.now() / 1000;
    const pulse = Math.sin(time * 8) * 0.1 + 0.9; // Pulsing between 0.8 and 1.0
    
    ctx.fillStyle = GAME_CONFIG.COLORS.FOOD;
    const foodX = food.x * GAME_CONFIG.GRID_SIZE;
    const foodY = food.y * GAME_CONFIG.GRID_SIZE;
    const foodSize = GAME_CONFIG.GRID_SIZE * pulse;
    
    ctx.beginPath();
    ctx.arc(
      foodX + GAME_CONFIG.GRID_SIZE / 2,
      foodY + GAME_CONFIG.GRID_SIZE / 2,
      foodSize / 2 - 1,
      0,
      2 * Math.PI
    );
    ctx.fill();
    
    // Add shine effect to food
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.beginPath();
    ctx.arc(
      foodX + GAME_CONFIG.GRID_SIZE / 2 - 2,
      foodY + GAME_CONFIG.GRID_SIZE / 2 - 2,
      (foodSize / 2 - 1) * 0.4,
      0,
      2 * Math.PI
    );
    ctx.fill();
    
  }, [snake, food, isGameRunning]);
  
  // Animation frame for smooth pulsing food
  useEffect(() => {
    if (!isGameRunning) return;
    
    let animationId: number;
    
    const animate = () => {
      // Trigger re-render for pulsing food animation
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Only redraw food area for performance
          const foodX = food.x * GAME_CONFIG.GRID_SIZE;
          const foodY = food.y * GAME_CONFIG.GRID_SIZE;
          
          // Clear food area
          ctx.fillStyle = GAME_CONFIG.COLORS.BACKGROUND;
          ctx.fillRect(foodX, foodY, GAME_CONFIG.GRID_SIZE, GAME_CONFIG.GRID_SIZE);
          
          // Redraw grid line for food area
          ctx.strokeStyle = GAME_CONFIG.COLORS.GRID;
          ctx.lineWidth = 0.5;
          ctx.strokeRect(foodX, foodY, GAME_CONFIG.GRID_SIZE, GAME_CONFIG.GRID_SIZE);
          
          // Draw animated food
          const time = Date.now() / 1000;
          const pulse = Math.sin(time * 8) * 0.1 + 0.9;
          
          ctx.fillStyle = GAME_CONFIG.COLORS.FOOD;
          ctx.beginPath();
          ctx.arc(
            foodX + GAME_CONFIG.GRID_SIZE / 2,
            foodY + GAME_CONFIG.GRID_SIZE / 2,
            (GAME_CONFIG.GRID_SIZE * pulse) / 2 - 1,
            0,
            2 * Math.PI
          );
          ctx.fill();
          
          // Add shine effect
          ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.beginPath();
          ctx.arc(
            foodX + GAME_CONFIG.GRID_SIZE / 2 - 2,
            foodY + GAME_CONFIG.GRID_SIZE / 2 - 2,
            ((GAME_CONFIG.GRID_SIZE * pulse) / 2 - 1) * 0.4,
            0,
            2 * Math.PI
          );
          ctx.fill();
        }
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [food, isGameRunning]);
  
  return (
    <div className="flex items-center justify-center p-4">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={GAME_CONFIG.CANVAS_SIZE}
          height={GAME_CONFIG.CANVAS_SIZE}
          className="border-2 border-slate-600 rounded-lg shadow-2xl bg-slate-900"
          style={{
            imageRendering: 'pixelated'
          }}
        />
        {!isGameRunning && (
          <div className="absolute inset-0 bg-slate-900 bg-opacity-50 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <div className="text-slate-300 text-center">
              <div className="text-sm opacity-75">Press SPACE to start</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};