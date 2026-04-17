"use client";

import { useEffect, useRef } from "react";

export default function DitherBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth / 2; // Fixed resolution for "Dithered" look
      canvas.height = canvas.offsetHeight / 2;
    };

    window.addEventListener("resize", resize);
    resize();

    const draw = () => {
      time += 0.05;
      const { width, height } = canvas;
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const i = (y * width + x) * 4;
          
          // Noise calculation for Dither pattern
          const noise = Math.sin(x * 0.1 + time) * Math.cos(y * 0.1 - time) * 0.5 + 0.5;
          const random = Math.random();
          
          // Dither threshold (Bayer-like)
          const threshold = (noise + random) / 2;
          
          if (threshold > 0.7) {
            data[i] = 194;     // Rigko Red R
            data[i + 1] = 0;   // Rigko Red G
            data[i + 2] = 11;  // Rigko Red B
            data[i + 3] = 255; // Full Opacity for the pixel itself
          } else {
            data[i] = 0;
            data[i + 1] = 0;
            data[i + 2] = 0;
            data[i + 3] = 0;
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full opacity-15 mix-blend-screen pointer-events-none"
      style={{ imageRendering: 'pixelated' }}
    />
  );
}
