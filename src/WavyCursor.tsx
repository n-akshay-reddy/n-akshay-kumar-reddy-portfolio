import React, { useRef, useEffect } from 'react';

// --- UPDATED CONFIGURATION ---
// The 'trails' value has been increased to add more lines.
const ANIMATION_CONFIG = {
  friction: 0.5,
  trails: 20, // Increased from 5 to 10 for more lines.
  size: 30,
  dampening: 0.25,
  tension: 0.98,
};

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

class ColorSineWave {
  phase: number;
  offset: number;
  frequency: number;
  amplitude: number;
  value: number;

  constructor(config: { phase: number; offset: number; frequency: number; amplitude: number }) {
    this.phase = config.phase || 0;
    this.offset = config.offset || 0;
    this.frequency = config.frequency || 0.001;
    this.amplitude = config.amplitude || 1;
    this.value = 0;
  }

  update(): number {
    this.phase += this.frequency;
    this.value = this.offset + Math.sin(this.phase) * this.amplitude;
    return this.value;
  }
}

class WavyLine {
  spring: number;
  friction: number;
  nodes: Node[];

  constructor(spring: number, initialX: number, initialY: number) {
    this.spring = spring + 0.1 * Math.random() - 0.05;
    this.friction = ANIMATION_CONFIG.friction + 0.01 * Math.random() - 0.005;
    this.nodes = [];
    for (let i = 0; i < ANIMATION_CONFIG.size; i++) {
      this.nodes.push({
        x: initialX,
        y: initialY,
        vx: 0,
        vy: 0,
      });
    }
  }

  update(targetX: number, targetY: number): void {
    const firstNode = this.nodes[0];
    firstNode.vx += (targetX - firstNode.x) * this.spring;
    firstNode.vy += (targetY - firstNode.y) * this.spring;

    let spring = this.spring;
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      if (i > 0) {
        const prevNode = this.nodes[i - 1];
        node.vx += (prevNode.x - node.x) * spring;
        node.vy += (prevNode.y - node.y) * spring;
        node.vx += prevNode.vx * ANIMATION_CONFIG.dampening;
        node.vy += prevNode.vy * ANIMATION_CONFIG.dampening;
      }
      
      node.vx *= this.friction;
      node.vy *= this.friction;
      node.x += node.vx;
      node.y += node.vy;

      spring *= ANIMATION_CONFIG.tension;
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (this.nodes.length < 2) return;

    const firstNode = this.nodes[0];
    ctx.beginPath();
    ctx.moveTo(firstNode.x, firstNode.y);

    for (let i = 1; i < this.nodes.length - 2; i++) {
      const node = this.nodes[i];
      const nextNode = this.nodes[i + 1];
      const midX = (node.x + nextNode.x) * 0.5;
      const midY = (node.y + nextNode.y) * 0.5;
      ctx.quadraticCurveTo(node.x, node.y, midX, midY);
    }
    
    const lastNode = this.nodes[this.nodes.length - 2];
    const finalNode = this.nodes[this.nodes.length - 1];
    ctx.quadraticCurveTo(lastNode.x, lastNode.y, finalNode.x, finalNode.y);
    ctx.stroke();
  }
}

const WavyCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailsRef = useRef<WavyLine[]>([]);
  const mousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const colorSineWave = useRef<ColorSineWave | null>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    const initLines = (): void => {
      mousePosition.current = { x: canvas.width / 2, y: canvas.height / 2 };
      trailsRef.current = [];
      for (let i = 0; i < ANIMATION_CONFIG.trails; i++) {
        trailsRef.current.push(new WavyLine(
          0.45 + i / ANIMATION_CONFIG.trails * 0.025,
          mousePosition.current.x,
          mousePosition.current.y
        ));
      }
    };
    initLines();

    colorSineWave.current = new ColorSineWave({
      phase: 2 * Math.random() * Math.PI,
      amplitude: 85,
      frequency: 0.0015,
      offset: 285,
    });

    const animate = (): void => {
      if (!ctx || !colorSineWave.current) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.globalCompositeOperation = "lighter";
      ctx.lineWidth = 1;
      
      const hue = colorSineWave.current.update();
      ctx.strokeStyle = `hsla(${Math.round(hue)}, 90%, 50%, 0.25)`;

      trailsRef.current.forEach((line) => {
        line.update(mousePosition.current.x, mousePosition.current.y);
        line.draw(ctx);
      });
      
      animationFrameId.current = window.requestAnimationFrame(animate);
    };
    animate();

    const handleMouseMove = (e: MouseEvent): void => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleResize = (): void => {
      resizeCanvas();
      initLines();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        window.cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
};

export default WavyCursor;