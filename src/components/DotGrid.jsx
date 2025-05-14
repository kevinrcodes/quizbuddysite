import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import styles from './DotGrid.module.css';

const GRID_SPACING = 20;
const DOT_RADIUS = 1;
const DARK_GRAY = 'rgb(52, 52, 52)';
const ACCENT_COLOR = 'rgb(255, 50, 50)';
const MAX_DISTANCE = 250;
const MAX_BRIGHTNESS = 1;
const MIN_BRIGHTNESS = 0.2;
const LERP_FACTOR = 0.03;
const TRAIL_LENGTH = 10;
const TRAIL_FADE = 0.15;
const TRAIL_UPDATE_INTERVAL = 2; // Update trail every 2 frames

// Helper function to interpolate between two RGB colors
const interpolateColor = (color1, color2, factor) => {
  const r1 = parseInt(color1.slice(4, -1).split(',')[0]);
  const g1 = parseInt(color1.slice(4, -1).split(',')[1]);
  const b1 = parseInt(color1.slice(4, -1).split(',')[2]);
  
  const r2 = parseInt(color2.slice(4, -1).split(',')[0]);
  const g2 = parseInt(color2.slice(4, -1).split(',')[1]);
  const b2 = parseInt(color2.slice(4, -1).split(',')[2]);

  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);

  return `rgb(${r}, ${g}, ${b})`;
};

function DotGrid({ mouseX, mouseY }) {
  const canvasRef = useRef(null);
  const currentPos = useRef({ x: 0, y: 0 });
  const trailPositions = useRef([]);
  const frameCount = useRef(0);
  const animationFrameId = useRef(null);
  const resizeTimeout = useRef(null);
  const gridRef = useRef(null);

  // Memoize grid calculation
  const calculateGrid = useCallback((width, height) => {
    const cols = Math.ceil(width / GRID_SPACING);
    const rows = Math.ceil(height / GRID_SPACING);
    const grid = [];

    for (let row = 0; row < rows; row++) {
      const rowArray = [];
      for (let col = 0; col < cols; col++) {
        rowArray.push({
          x: col * GRID_SPACING,
          y: row * GRID_SPACING
        });
      }
      grid.push(rowArray);
    }
    return grid;
  }, []);

  // Memoize brightness calculation
  const calculateBrightness = useCallback((dotX, dotY, posX, posY, intensity = 1) => {
    const dx = posX - dotX;
    const dy = posY - dotY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > MAX_DISTANCE) return 0;
    
    const brightness = (1 - (distance / MAX_DISTANCE)) * intensity;
    return brightness;
  }, []);

  // Memoize resize handler
  const handleResize = useCallback(() => {
    if (resizeTimeout.current) {
      clearTimeout(resizeTimeout.current);
    }
    resizeTimeout.current = setTimeout(() => {
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        gridRef.current = calculateGrid(rect.width, rect.height);
        drawDots(gridRef.current);
      }
    }, 100);
  }, [calculateGrid]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Linear interpolation function
    const lerp = (start, end, factor) => {
      return start + (end - start) * factor;
    };

    // Set canvas size to match container
    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      gridRef.current = calculateGrid(rect.width, rect.height);
    };

    // Draw all dots with lighting effect
    const drawDots = (grid) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update current position with lerp
      currentPos.current.x = lerp(currentPos.current.x, mouseX, LERP_FACTOR);
      currentPos.current.y = lerp(currentPos.current.y, mouseY, LERP_FACTOR);

      // Update trail positions less frequently
      frameCount.current++;
      if (frameCount.current % TRAIL_UPDATE_INTERVAL === 0) {
        const lastPos = trailPositions.current[0];
        const distance = lastPos ? 
          Math.sqrt(
            Math.pow(currentPos.current.x - lastPos.x, 2) + 
            Math.pow(currentPos.current.y - lastPos.y, 2)
          ) : Infinity;

        if (!lastPos || distance > 5) {
          trailPositions.current.unshift({ 
            x: currentPos.current.x, 
            y: currentPos.current.y 
          });
          if (trailPositions.current.length > TRAIL_LENGTH) {
            trailPositions.current.pop();
          }
        }
      }

      // Draw dots for each position in the trail
      grid.forEach(row => {
        row.forEach(dot => {
          let maxBrightness = 0;
          
          trailPositions.current.forEach((pos, index) => {
            const intensity = Math.pow(1 - TRAIL_FADE, index);
            const brightness = calculateBrightness(dot.x, dot.y, pos.x, pos.y, intensity);
            maxBrightness = Math.max(maxBrightness, brightness);
          });

          const color = maxBrightness === 0 ? DARK_GRAY : interpolateColor(DARK_GRAY, ACCENT_COLOR, maxBrightness);
          
          ctx.beginPath();
          ctx.fillStyle = color;
          ctx.arc(dot.x, dot.y, DOT_RADIUS, 0, Math.PI * 2);
          ctx.fill();
        });
      });

      animationFrameId.current = requestAnimationFrame(() => drawDots(grid));
    };

    // Initial setup
    resizeCanvas();
    drawDots(gridRef.current);

    // Handle window resize with debouncing
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [mouseX, mouseY, handleResize, calculateBrightness]);

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}

export default React.memo(DotGrid);
