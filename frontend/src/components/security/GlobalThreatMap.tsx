import React, { useEffect, useRef, useState } from 'react';
import { Globe, ShieldAlert, Activity, Zap, Radio, Terminal, Server } from 'lucide-react';

interface ThreatPoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  x: number;
  y: number;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
}

export const GlobalThreatMap: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeInterceptions, setActiveInterceptions] = useState(1428590);
  const [activeNodes, setActiveNodes] = useState(4290);

  // Global Threat Hub Coordinates (percentages)
  const hubs: ThreatPoint[] = [
    { id: 'HB-1', name: 'US-East Cyber Gateway (Washington)', lat: 38.9, lng: -77.0, x: 280, y: 150, severity: 'CRITICAL' },
    { id: 'HB-2', name: 'EU Central Threat Hub (Frankfurt)', lat: 50.1, lng: 8.6, x: 510, y: 120, severity: 'HIGH' },
    { id: 'HB-3', name: 'Asia-Pacific Sentinel (Tokyo)', lat: 35.6, lng: 139.6, x: 820, y: 160, severity: 'CRITICAL' },
    { id: 'HB-4', name: 'India SOC Defense Matrix (Mumbai)', lat: 19.0, lng: 72.8, x: 670, y: 220, severity: 'HIGH' },
    { id: 'HB-5', name: 'Southeast Asia Gateway (Singapore)', lat: 1.3, lng: 103.8, x: 750, y: 270, severity: 'MEDIUM' },
    { id: 'HB-6', name: 'South America Shield (Sao Paulo)', lat: -23.5, lng: -46.6, x: 350, y: 320, severity: 'MEDIUM' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let progress = 0;

    const render = () => {
      progress += 0.015;
      if (progress > 1) progress = 0;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Grid Lines Background
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw Laser Arc Connections between Hubs
      const mainHub = hubs[3]; // India SOC Matrix
      hubs.forEach((hub, idx) => {
        if (idx === 3) return;

        // Draw Arc Path
        ctx.beginPath();
        ctx.moveTo(hub.x, hub.y);
        const controlX = (hub.x + mainHub.x) / 2;
        const controlY = Math.min(hub.y, mainHub.y) - 60;
        ctx.quadraticCurveTo(controlX, controlY, mainHub.x, mainHub.y);

        ctx.strokeStyle = hub.severity === 'CRITICAL' ? 'rgba(255, 59, 59, 0.35)' : 'rgba(0, 240, 255, 0.35)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Draw Laser Pulse Moving Dot
        const currentProgress = (progress + idx * 0.2) % 1;
        const pulseX = (1 - currentProgress) * (1 - currentProgress) * hub.x + 2 * (1 - currentProgress) * currentProgress * controlX + currentProgress * currentProgress * mainHub.x;
        const pulseY = (1 - currentProgress) * (1 - currentProgress) * hub.y + 2 * (1 - currentProgress) * currentProgress * controlY + currentProgress * currentProgress * mainHub.y;

        ctx.beginPath();
        ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
        ctx.fillStyle = hub.severity === 'CRITICAL' ? '#FF3B3B' : '#00F0FF';
        ctx.shadowColor = hub.severity === 'CRITICAL' ? '#FF3B3B' : '#00F0FF';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw Hub Nodes & Pulsing Rings
      hubs.forEach((hub) => {
        ctx.beginPath();
        ctx.arc(hub.x, hub.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = hub.id === 'HB-4' ? '#10B981' : hub.severity === 'CRITICAL' ? '#FF3B3B' : '#00F0FF';
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label
        ctx.font = '10px Orbitron, monospace';
        ctx.fillStyle = '#F8FAFC';
        ctx.fillText(hub.name, hub.x + 10, hub.y + 4);
      });

      animFrameId = requestAnimationFrame(render);
    };

    render();

    const interval = setInterval(() => {
      setActiveInterceptions(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 2500);

    return () => {
      cancelAnimationFrame(animFrameId);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="glass-card p-6 md:p-8 space-y-6 relative overflow-hidden border-purple-500/40 font-mono text-left">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-purple-500/30 pb-4">
        <div>
          <div className="section-badge mb-1">
            <span className="badge-glow-dot"></span>
            <span>LIVE GLOBAL CYBER DEFENSE TELEMETRY</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white font-orbitron flex items-center gap-2">
            <Globe className="w-6 h-6 text-[#00F0FF] animate-pulse" />
            <span>GLOBAL THREAT INTERCEPTION MAP</span>
          </h2>
        </div>

        <div className="flex items-center gap-4 text-xs font-orbitron">
          <div className="p-3 rounded-xl bg-[#0B1220] border border-cyan-500/30 space-y-0.5">
            <span className="text-[10px] text-slate-400 block">INTERCEPTIONS</span>
            <span className="text-cyan-400 font-extrabold text-sm">{activeInterceptions.toLocaleString()}</span>
          </div>
          <div className="p-3 rounded-xl bg-[#0B1220] border border-emerald-500/30 space-y-0.5">
            <span className="text-[10px] text-slate-400 block">ACTIVE NODES</span>
            <span className="text-emerald-400 font-extrabold text-sm">{activeNodes.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Canvas Map Container */}
      <div className="relative w-full h-80 rounded-2xl bg-[#050811] border border-purple-500/30 overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.25)] flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={960}
          height={320}
          className="w-full h-full object-cover"
        />

        <div className="absolute bottom-3 left-3 bg-[#0B1220]/90 border border-cyan-500/40 p-2.5 rounded-xl text-[10px] font-orbitron text-cyan-400 flex items-center gap-2 shadow-cyber-glow">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>CYBERGUARD AI GLOBAL MESH ACTIVE • LATENCY 12ms</span>
        </div>
      </div>
    </div>
  );
};
