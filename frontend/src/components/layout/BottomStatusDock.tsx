import React, { useState, useEffect } from 'react';
import { Cpu, Activity, Clock, Zap, Wifi, Hexagon } from 'lucide-react';

export const BottomStatusDock: React.FC = () => {
  const [timeStr, setTimeStr] = useState('24:00:00');
  const [systemLoad, setSystemLoad] = useState(34);
  const [dataStream, setDataStream] = useState(1.2);
  const [dockLatency, setDockLatency] = useState(14);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toTimeString().split(' ')[0]);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    const metricsInterval = setInterval(() => {
      setSystemLoad(30 + Math.floor(Math.random() * 10));
      setDataStream(parseFloat((1.1 + Math.random() * 0.4).toFixed(2)));
      setDockLatency(12 + Math.floor(Math.random() * 6));
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(metricsInterval);
    };
  }, []);

  return (
    <footer className="relative h-11 shrink-0 bg-[#070B14]/95 backdrop-blur-lg border-t border-[#1E293B] px-4 md:px-6 flex items-center justify-between z-20 font-mono text-[11px] text-[#94A3B8]">
      {/* Left Group: System Time, Uptime, System Load */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-[#00E5FF]" />
          <span className="text-[#64748B] uppercase">SYSTEM TIME:</span>
          <span className="font-bold text-[#F8FAFC] tracking-widest">{timeStr}</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 border-l border-slate-800/80 pl-6">
          <span className="text-[#64748B] uppercase">UPTIME:</span>
          <span className="font-bold text-[#10B981]">127d 14h 36m</span>
        </div>

        <div className="hidden md:flex items-center gap-2 border-l border-slate-800/80 pl-6">
          <Cpu className="w-3.5 h-3.5 text-[#7C3AED]" />
          <span className="text-[#64748B] uppercase">SYSTEM LOAD:</span>
          <span className="font-bold text-[#F8FAFC]">{systemLoad}%</span>
          <div className="w-16 h-1.5 bg-[#151F32] rounded-full overflow-hidden ml-1">
            <div className="h-full bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] rounded-full transition-all duration-500" style={{ width: `${systemLoad}%` }} />
          </div>
        </div>
      </div>

      {/* Center: Glowing Hexagonal Tech Core Badge */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-4">
        <div className="relative p-2.5 rounded-2xl bg-[#070B14] border border-[#00E5FF]/60 text-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.4)] flex items-center justify-center">
          <Hexagon className="w-5 h-5 text-[#00E5FF] animate-pulse" />
          <span className="absolute -bottom-1 w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
        </div>
      </div>

      {/* Right Group: Data Stream, Latency, Packet Loss */}
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[#64748B] uppercase">DATA STREAM:</span>
          <span className="font-bold text-[#00E5FF]">{dataStream} TB/s</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 border-l border-slate-800/80 pl-6">
          <Activity className="w-3.5 h-3.5 text-[#10B981]" />
          <span className="text-[#64748B] uppercase">LATENCY:</span>
          <span className="font-bold text-[#10B981]">{dockLatency}ms</span>
        </div>

        <div className="flex items-center gap-2 border-l border-slate-800/80 pl-6">
          <Wifi className="w-3.5 h-3.5 text-[#7C3AED]" />
          <span className="text-[#64748B] uppercase">PACKET LOSS:</span>
          <span className="font-bold text-[#10B981]">0.01%</span>
        </div>
      </div>
    </footer>
  );
};
