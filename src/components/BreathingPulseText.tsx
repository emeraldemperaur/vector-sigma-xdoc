import { useEffect, useRef } from 'react';

export interface BreathingPulseTextProps {
  text: string;
  rgbColor?: [number, number, number];
  density?: number;
  width?: number | string;
  height?: number | string;
  particleRadius?: number;
  enableMouseInteract?: boolean;
  repelRadius?: number;
  repulsionForce?: number;
}

const BreathingPulseText = ({
  text,
  rgbColor = [46, 230, 166],
  density = 4,
  width = '100%',
  height = '100%',
  particleRadius = 1.3,
  enableMouseInteract = true,
  repelRadius = 80,
  repulsionForce = 40,
}: BreathingPulseTextProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    let isMounted = true;
    let rafId: number;
    let resizeObserver: ResizeObserver;
    
    const cv = canvasRef.current;
    const container = containerRef.current;
    
    if (!cv || !container) return;

    const ctx = cv.getContext('2d', { alpha: true, willReadFrequently: true });
    if (!ctx) return;

    let P: any[] = [];
    let cx = 0;
    let cy = 0;
    let logicalW = 0;
    let logicalH = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableMouseInteract) return;
      const rect = cv.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!enableMouseInteract || e.touches.length === 0) return;
      const rect = cv.getBoundingClientRect();
      mouseRef.current = {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    };

    const handleTouchEnd = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    cv.addEventListener('mousemove', handleMouseMove);
    cv.addEventListener('mouseleave', handleMouseLeave);
    cv.addEventListener('touchstart', handleTouchMove, { passive: true });
    cv.addEventListener('touchmove', handleTouchMove, { passive: true });
    cv.addEventListener('touchend', handleTouchEnd);
    cv.addEventListener('touchcancel', handleTouchEnd);

    const spring2D = (s: any, tx: number, ty: number, k = 0.08, d = 0.75) => {
      s.vx += (tx - s.x) * k;
      s.vx *= d;
      s.x += s.vx;
      s.vy += (ty - s.y) * k;
      s.vy *= d;
      s.y += s.vy;
    };

    const sampleText = (lw: number, lh: number, renderText: string) => {
      const off = document.createElement('canvas');
      const octx = off.getContext('2d', { willReadFrequently: true });
      if (!octx) return [];
      
      off.width = lw;
      off.height = lh;
      
      const fs = Math.min(lh * 0.6, (lw / renderText.length) * 1.4, 250);
      octx.font = `700 ${fs}px "Space Grotesk", sans-serif`;
      octx.textAlign = 'center';
      octx.textBaseline = 'middle';
      octx.fillStyle = '#fff';
      octx.fillText(renderText, lw / 2, lh / 2);
      
      const { data } = octx.getImageData(0, 0, lw, lh);
      const pts = [];
      
      for (let y = 0; y < lh; y += density) {
        for (let x = 0; x < lw; x += density) {
          if (data[(y * lw + x) * 4 + 3] > 128) {
            pts.push({ x, y });
          }
        }
      }
      return pts;
    };

    const initAnimation = (lw: number, lh: number) => {
      cx = lw / 2;
      cy = lh / 2;
      const pts = sampleText(lw, lh, text);
      
      P = pts.map(o => ({
        x: o.x, 
        y: o.y, 
        vx: 0, 
        vy: 0, 
        ox: o.x, 
        oy: o.y,
        phase: Math.hypot(o.x - cx, o.y - cy) * 0.012,
      }));
    };

    let t = 0;
    const renderLoop = () => {
      t += 0.018;
      ctx.clearRect(0, 0, logicalW, logicalH);
      
      const [r, g, b] = rgbColor;

      P.forEach(p => {
        const breathe = Math.sin(t + p.phase) * 14;
        const dx = p.ox - cx;
        const dy = p.oy - cy;
        const dist = Math.hypot(dx, dy) || 1;
        
        let targetX = p.ox + (dx / dist) * breathe;
        let targetY = p.oy + (dy / dist) * breathe;

        if (enableMouseInteract) {
          const mdx = p.x - mouseRef.current.x;
          const mdy = p.y - mouseRef.current.y;
          const mDist = Math.hypot(mdx, mdy);

          if (mDist < repelRadius) {
            const force = (repelRadius - mDist) / repelRadius;
            targetX += (mdx / mDist) * force * repulsionForce; 
            targetY += (mdy / mDist) * force * repulsionForce;
          }
        }
        
        spring2D(p, targetX, targetY, 0.12, 0.72);
        
        const alpha = 0.45 + Math.abs(Math.sin(t + p.phase)) * 0.4;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, particleRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      rafId = requestAnimationFrame(renderLoop);
    };

    document.fonts.ready.then(() => {
      if (!isMounted) return;

      resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const { width: lw, height: lh } = entry.contentRect;
          const dpr = window.devicePixelRatio || 1;
          
          logicalW = lw;
          logicalH = lh;
          
          cv.width = lw * dpr;
          cv.height = lh * dpr;
          
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.scale(dpr, dpr);
          
          initAnimation(lw, lh);
        }
      });

      resizeObserver.observe(container);
      renderLoop();
    });

    return () => {
      isMounted = false;
      cancelAnimationFrame(rafId);
      if (resizeObserver) resizeObserver.disconnect();
      
      cv.removeEventListener('mousemove', handleMouseMove);
      cv.removeEventListener('mouseleave', handleMouseLeave);
      cv.removeEventListener('touchstart', handleTouchMove);
      cv.removeEventListener('touchmove', handleTouchMove);
      cv.removeEventListener('touchend', handleTouchEnd);
      cv.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [text, rgbColor, density, particleRadius, enableMouseInteract, repelRadius, repulsionForce]);

  return (
    <div ref={containerRef} style={{ width, height, position: 'relative', touchAction: 'none' }}>
      <canvas 
        ref={canvasRef} 
        style={{ 
          display: 'block', 
          width: '100%', 
          height: '100%',
          cursor: enableMouseInteract ? 'crosshair' : 'default' 
        }} 
      />
    </div>
  );
};

export default BreathingPulseText;