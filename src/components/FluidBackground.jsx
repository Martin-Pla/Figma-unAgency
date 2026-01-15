import React, { useEffect, useRef } from 'react';

export default function FluidBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Fluid blob particles
    class Blob {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 200 + 150;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        
        // Dark, ethereal color palette
        const colors = [
          '#0a0a0a', // Deep black
          '#1a1a2e', // Dark blue-black
          '#16213e', // Navy
          '#1f1f1f', // Charcoal
          '#2d1b3d', // Deep purple
          '#1c2938', // Dark slate
        ];
        
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.targetColor = colors[Math.floor(Math.random() * colors.length)];
        this.colorTransition = 0;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < -this.radius) this.x = canvas.width + this.radius;
        if (this.x > canvas.width + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = canvas.height + this.radius;
        if (this.y > canvas.height + this.radius) this.y = -this.radius;

        // Smooth color transition
        this.colorTransition += 0.002;
        if (this.colorTransition >= 1) {
          this.color = this.targetColor;
          const colors = [
            '#0a0a0a',
            '#1a1a2e',
            '#16213e',
            '#1f1f1f',
            '#2d1b3d',
            '#1c2938',
          ];
          this.targetColor = colors[Math.floor(Math.random() * colors.length)];
          this.colorTransition = 0;
        }
      }

      draw() {
        if (!ctx) return;
        
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.radius
        );

        // Interpolate between current and target color
        gradient.addColorStop(0, this.color + '80');
        gradient.addColorStop(0.5, this.color + '40');
        gradient.addColorStop(1, this.color + '00');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create blobs
    const blobs = [];
    for (let i = 0; i < 6; i++) {
      blobs.push(new Blob());
    }

    // Animation loop
    const animate = () => {
      // Dark background base
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Apply blur filter for fluid effect
      ctx.filter = 'blur(80px)';

      blobs.forEach((blob) => {
        blob.update();
        blob.draw();
      });

      ctx.filter = 'none';

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fluid-background"
      style={{ background: '#000000' }}
    />
  );
}
