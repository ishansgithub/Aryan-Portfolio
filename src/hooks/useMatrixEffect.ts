import { useCallback, useEffect, useRef } from 'react';

export const useMatrixEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeRef = useRef(false);

  const initCanvas = useCallback(() => {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '1000';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);
    canvasRef.current = canvas;
    return canvas;
  }, []);

  const startMatrix = useCallback(() => {
    if (!canvasRef.current) {
      initCanvas();
    }

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = '01アカサタナハマヤラワガザダバパイキシチニヒミリヰギジヂビピウクスツヌフムユルグズブヅプエケセテネヘメレヱゲゼデベペオコソトノホモヨロヲゴゾドボポヴッン';
    const charArray = chars.split('');
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    activeRef.current = true;

    const draw = () => {
      if (!activeRef.current) return;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#0F0';
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      
      requestAnimationFrame(draw);
    };

    draw();
  }, [initCanvas]);

  const stopMatrix = useCallback(() => {
    activeRef.current = false;
    if (canvasRef.current) {
      canvasRef.current.remove();
      canvasRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      stopMatrix();
    };
  }, [stopMatrix]);

  return { startMatrix, stopMatrix };
};