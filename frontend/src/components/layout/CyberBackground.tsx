import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

export const CyberBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse interactive Animus pulse position
    let mouseX = width / 2;
    let mouseY = height / 2;
    let mouseRipples: { x: number; y: number; radius: number; maxRadius: number; alpha: number; color: string }[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (Math.random() > 0.25) {
        mouseRipples.push({
          x: mouseX,
          y: mouseY,
          radius: 5,
          maxRadius: 120 + Math.random() * 60,
          alpha: 1.0,
          color: Math.random() > 0.4 ? '#00F0FF' : '#F59E0B'
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 1. Animus Ascending Memory Shards & Triangles
    const shardCount = Math.floor((width * height) / 6000);
    interface AnimusShard {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      alpha: number;
      pulse: number;
      rotation: number;
      rotSpeed: number;
      color: string;
      isTriangle: boolean;
    }

    const shards: AnimusShard[] = [];
    const animusColors = ['#00F0FF', '#00FFFF', '#3B82F6', '#A855F7', '#F59E0B', '#10B981', '#FFFFFF'];

    for (let i = 0; i < shardCount; i++) {
      shards.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 7 + 2.5,
        speedY: -(Math.random() * 1.8 + 0.6),
        speedX: (Math.random() - 0.5) * 0.7,
        alpha: Math.random() * 0.9 + 0.3,
        pulse: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.06,
        color: animusColors[Math.floor(Math.random() * animusColors.length)],
        isTriangle: Math.random() > 0.2
      });
    }

    // 2. Animus Floating Memory Glyphs & Code Runes
    interface AnimusGlyph {
      x: number;
      y: number;
      text: string;
      alpha: number;
      speedY: number;
      color: string;
    }

    const runeTexts = [
      '▲ CYBERGUARD AI SYNCHRONIZED',
      '◆ CYBERGUARD MESH 07',
      '◈ CYBERGUARD AI ACTIVE',
      '⚡ ZERO-TRUST ENFORCED',
      '0101101010110101',
      '▲ NEXUS OVERRIDE',
      '◈ CYBERGUARD CORE',
      '◆ SYNCHRONIZING SYSTEM',
      '⚡ CYBERGUARD SYNC 100%',
      '▲ CYBERGUARD AI CORRIDOR V4.2'
    ];

    const glyphs: AnimusGlyph[] = [];
    for (let i = 0; i < 28; i++) {
      glyphs.push({
        x: Math.random() * (width - 250) + 50,
        y: Math.random() * height,
        text: runeTexts[Math.floor(Math.random() * runeTexts.length)],
        alpha: Math.random() * 0.7 + 0.3,
        speedY: -(Math.random() * 0.7 + 0.4),
        color: Math.random() > 0.35 ? '#00F0FF' : '#F59E0B'
      });
    }

    // 3. Eagle Vision Pulse Wave Timers
    let eaglePulseRadius = 0;
    let eaglePulseAlpha = 0.95;

    // 4. Animus 3D Perspective Grid Offset
    let gridOffset = 0;

    // Render Animus Live Virtual Reality Canvas
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep Dark Animus Atmosphere Background Gradient
      const bgGrad = ctx.createRadialGradient(
        width / 2, height * 0.4, 80,
        width / 2, height / 2, Math.max(width, height)
      );
      bgGrad.addColorStop(0, '#0F1A36');
      bgGrad.addColorStop(0.45, '#080E24');
      bgGrad.addColorStop(1, '#040714');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // A. Animus Ethereal Vertical Light Beams
      for (let i = 0; i < 7; i++) {
        const beamX = (width / 8) * (i + 1);
        const beamGrad = ctx.createLinearGradient(beamX, 0, beamX + 70, height);
        beamGrad.addColorStop(0, 'rgba(0, 240, 255, 0.16)');
        beamGrad.addColorStop(0.5, 'rgba(168, 85, 247, 0.08)');
        beamGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = beamGrad;
        ctx.beginPath();
        ctx.moveTo(beamX - 60, 0);
        ctx.lineTo(beamX + 100, 0);
        ctx.lineTo(beamX + 180, height);
        ctx.lineTo(beamX - 140, height);
        ctx.closePath();
        ctx.fill();
      }

      // B. Eagle Vision Horizon Pulse Waves
      eaglePulseRadius += 4.0;
      eaglePulseAlpha -= 0.008;
      if (eaglePulseAlpha <= 0 || eaglePulseRadius > Math.max(width, height) * 0.9) {
        eaglePulseRadius = 10;
        eaglePulseAlpha = 0.95;
      }

      ctx.save();
      ctx.strokeStyle = `rgba(245, 158, 11, ${eaglePulseAlpha * 0.75})`;
      ctx.lineWidth = 3.0;
      ctx.shadowColor = '#F59E0B';
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(width / 2, height * 0.42, eaglePulseRadius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // C. Animus 3D Horizon Perspective Grid Lines
      const horizonY = height * 0.42;
      const vanishingX = width / 2;

      ctx.lineWidth = 1.2;

      // Perspective Rays from Horizon
      const numRays = 42;
      for (let i = 0; i <= numRays; i++) {
        const angle = ((i - numRays / 2) / (numRays / 2)) * (Math.PI / 2.05);
        const endX = vanishingX + Math.sin(angle) * width * 1.8;
        const endY = height;

        ctx.strokeStyle = 'rgba(0, 240, 255, 0.28)';
        ctx.beginPath();
        ctx.moveTo(vanishingX, horizonY);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // Mirror to ceiling grid
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.24)';
        ctx.beginPath();
        ctx.moveTo(vanishingX, horizonY);
        ctx.lineTo(endX, 0);
        ctx.stroke();
      }

      // Moving Horizontal Perspective Grid Lines
      gridOffset = (gridOffset + 1.2) % 36;
      for (let y = horizonY; y < height; y += 15 + (y - horizonY) * 0.09) {
        const drawY = y + gridOffset;
        if (drawY <= height) {
          const alpha = ((drawY - horizonY) / (height - horizonY)) * 0.42;
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(0, drawY);
          ctx.lineTo(width, drawY);
          ctx.stroke();
        }
      }

      // Mirror ceiling horizontal lines
      for (let y = horizonY; y > 0; y -= 15 + (horizonY - y) * 0.09) {
        const drawY = y - gridOffset;
        if (drawY >= 0) {
          const alpha = ((horizonY - drawY) / horizonY) * 0.35;
          ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(0, drawY);
          ctx.lineTo(width, drawY);
          ctx.stroke();
        }
      }

      // D. Render & Update Interactive Mouse Ripples
      for (let i = mouseRipples.length - 1; i >= 0; i--) {
        const r = mouseRipples[i];
        r.radius += 3.8;
        r.alpha -= 0.022;

        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          mouseRipples.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = r.color;
        ctx.lineWidth = 2.2;
        ctx.globalAlpha = r.alpha;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Animus inner pulse diamond
        ctx.beginPath();
        ctx.moveTo(r.x, r.y - r.radius * 0.65);
        ctx.lineTo(r.x + r.radius * 0.65, r.y);
        ctx.lineTo(r.x, r.y + r.radius * 0.65);
        ctx.lineTo(r.x - r.radius * 0.65, r.y);
        ctx.closePath();
        ctx.stroke();

        ctx.globalAlpha = 1.0;
      }

      // E. Render Ascending Animus Memory Triangles & Shards
      shards.forEach(s => {
        s.y += s.speedY;
        s.x += s.speedX;
        s.pulse += 0.07;
        s.rotation += s.rotSpeed;

        if (s.y < -20) {
          s.y = height + 20;
          s.x = Math.random() * width;
        }

        const currentAlpha = (Math.sin(s.pulse) * 0.35 + 0.65) * s.alpha;

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 14;
        ctx.globalAlpha = currentAlpha;

        if (s.isTriangle) {
          ctx.beginPath();
          ctx.moveTo(0, -s.size * 1.4);
          ctx.lineTo(s.size * 1.1, s.size * 1.1);
          ctx.lineTo(-s.size * 1.1, s.size * 1.1);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.fillRect(-s.size / 2, -s.size / 2, s.size, s.size);
        }

        ctx.restore();
      });

      // F. Render Animus Floating Memory Glyphs & Runes
      ctx.font = '12px "Orbitron", monospace';
      glyphs.forEach(g => {
        g.y += g.speedY;
        if (g.y < -30) {
          g.y = height + 30;
          g.x = Math.random() * (width - 250) + 50;
        }

        ctx.fillStyle = g.color;
        ctx.shadowColor = g.color;
        ctx.shadowBlur = 12;
        ctx.globalAlpha = g.alpha;
        ctx.fillText(g.text, g.x, g.y);
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;
      });

      // G. Animus Central Horizon Glowing Beacon Line
      const horizonGrad = ctx.createLinearGradient(0, horizonY, width, horizonY);
      horizonGrad.addColorStop(0, 'rgba(0, 240, 255, 0)');
      horizonGrad.addColorStop(0.2, 'rgba(0, 240, 255, 0.6)');
      horizonGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.95)');
      horizonGrad.addColorStop(0.8, 'rgba(168, 85, 247, 0.6)');
      horizonGrad.addColorStop(1, 'rgba(0, 240, 255, 0)');

      ctx.lineWidth = 3.5;
      ctx.strokeStyle = horizonGrad;
      ctx.shadowColor = '#00F0FF';
      ctx.shadowBlur = 24;
      ctx.beginPath();
      ctx.moveTo(0, horizonY);
      ctx.lineTo(width, horizonY);
      ctx.stroke();
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500"
      style={{ background: 'transparent' }}
    />
  );
};
