import { useEffect, useRef } from 'react';

interface Particle {
  size: number;
  position: { x: number; y: number };
  lastPosition: { x: number; y: number };
  offset: { x: number; y: number };
  shift: { x: number; y: number };
  speed: number;
  targetSize: number;
  color: string;
  orbit: number;
}

const CursorTrail = ({ darkMode }: { darkMode: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isRunning = useRef(false);

  useEffect(() => {
    if (isRunning.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    isRunning.current = true;
    let animationFrameId: number;

    let width = parent.offsetWidth;
    let height = parent.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    const QUANTITY = 25;
    let mouseX = width * 0.5;
    let mouseY = height * 0.5;
    let particles: Particle[] = [];
    
    let targetAlpha = 0; 
    let currentAlpha = 0;
    let lastTime = performance.now();
    let isVisible = document.visibilityState === 'visible';

    const createParticles = () => {
      particles = [];
      for (let i = 0; i < QUANTITY; i++) {
        const isBurgundy = Math.random() > 0.5;
        const rgbColor = isBurgundy ? '128, 0, 32' : '0, 100, 0';
        
        particles.push({
          size: 1,
          position: { x: mouseX, y: mouseY },
          lastPosition: { x: mouseX, y: mouseY },
          offset: { x: 0, y: 0 },
          shift: { x: mouseX, y: mouseY },
          speed: 0.01 + Math.random() * 0.04,
          targetSize: 1,
          color: `rgba(${rgbColor}, ${0.4 + Math.random() * 0.4})`,
          orbit: 35 + (35 * Math.random()) 
        });
      }
    };

    createParticles();

    const onMouseMove = (e: MouseEvent) => {
      targetAlpha = 1; 
      const rect = parent.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    
    const onMouseLeave = () => targetAlpha = 0; 
    
    const onMouseEnter = () => {
      targetAlpha = 1; 
      lastTime = performance.now(); 
    };

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = Math.floor(entry.contentRect.width);
        height = Math.floor(entry.contentRect.height);
        canvas.width = width;
        canvas.height = height;
      }
    });

    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === 'visible';
      if (isVisible) {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(loop);
      } else {
        cancelAnimationFrame(animationFrameId);
        context.clearRect(0, 0, width, height); 
      }
    };

    resizeObserver.observe(parent);
    parent.addEventListener('mousemove', onMouseMove, { passive: true });
    parent.addEventListener('mouseleave', onMouseLeave);
    parent.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const loop = (timestamp: number) => {
      if (!isRunning.current || !isVisible) return; 

      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      const dtMultiplier = Math.min(deltaTime / 16.66, 3);

      context.clearRect(0, 0, width, height);
      
      currentAlpha += (targetAlpha - currentAlpha) * (0.08 * dtMultiplier);
      currentAlpha = Math.max(0, Math.min(1, currentAlpha));
      context.globalAlpha = currentAlpha;
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        p.lastPosition.x = p.position.x;
        p.lastPosition.y = p.position.y;
        
        p.offset.x += p.speed * dtMultiplier;
        p.offset.y += p.speed * dtMultiplier;
        
        p.shift.x += (mouseX - p.shift.x) * (p.speed * dtMultiplier);
        p.shift.y += (mouseY - p.shift.y) * (p.speed * dtMultiplier);
        
        p.position.x = p.shift.x + Math.cos(i + p.offset.x) * p.orbit;
        p.position.y = p.shift.y + Math.sin(i + p.offset.y) * p.orbit;
        
        p.size += (p.targetSize - p.size) * (0.05 * dtMultiplier);
        if (Math.abs(p.size - p.targetSize) < 0.1) {
          p.targetSize = 1 + Math.random() * 3; 
        }
        
        context.beginPath();
        context.fillStyle = p.color;
        context.strokeStyle = p.color;
        context.lineWidth = p.size;
        context.moveTo(p.lastPosition.x, p.lastPosition.y);
        context.lineTo(p.position.x, p.position.y);
        context.stroke();
        context.arc(p.position.x, p.position.y, p.size / 2, 0, Math.PI * 2, true);
        context.fill();
      }
      
      animationFrameId = requestAnimationFrame(loop);
    };

    if (isVisible) {
      animationFrameId = requestAnimationFrame(loop);
    }

    return () => {
      isRunning.current = false;
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      parent.removeEventListener('mousemove', onMouseMove);
      parent.removeEventListener('mouseleave', onMouseLeave);
      parent.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      context.clearRect(0, 0, width, height);
    };
  }, [darkMode]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none', 
        zIndex: 5, 
      }}
    />
  );
};

export default CursorTrail;