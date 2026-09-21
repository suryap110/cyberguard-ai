import React, { useState, useEffect } from 'react';
import { Flame, Clock, Sparkles } from 'lucide-react';

interface RushHourCountdownProps {
  title?: string;
  targetDate?: string;
}

export const RushHourCountdown: React.FC<RushHourCountdownProps> = ({
  title = "⚡ CYBERGUARD AI — REAL-TIME DEFENSE MATRIX",
  targetDate = "2027-07-26T09:00:00+05:30"
}) => {
  const [days, setDays] = useState('090');
  const [hours, setHours] = useState('14');
  const [mins, setMins] = useState('28');
  const [secs, setSecs] = useState('45');
  const [pulsing, setPulsing] = useState(false);

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setDays('000');
        setHours('00');
        setMins('00');
        setSecs('00');
        return;
      }

      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);

      setDays(String(d).padStart(3, '0'));
      setHours(String(h).padStart(2, '0'));
      setMins(String(m).padStart(2, '0'));
      setSecs(String(s).padStart(2, '0'));

      setPulsing(true);
      setTimeout(() => setPulsing(false), 300);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="rh27-countdown font-mono border-purple-500/50 shadow-[0_0_35px_rgba(168,85,247,0.35)] relative overflow-hidden group">
      {/* Background Neon Pulse Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-cyan-500/10 to-amber-500/10 blur-xl pointer-events-none"></div>

      <div className="relative z-10 space-y-3">
        <p className="rh27-label font-orbitron flex items-center justify-center gap-2 text-cyan-400">
          <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-bounce" />
          <span>{title}</span>
          <Sparkles className="w-4 h-4 text-purple-400" />
        </p>

        <div className="rh27-timer">
          <div className="rh27-unit border-purple-500/40">
            <div className="rh27-value font-orbitron text-[#F8FAFC]">{days}</div>
            <div className="rh27-unit-label font-orbitron text-purple-300">DAYS</div>
          </div>
          <div className="rh27-sep text-cyan-400 font-orbitron">:</div>
          <div className="rh27-unit border-purple-500/40">
            <div className="rh27-value font-orbitron text-[#F8FAFC]">{hours}</div>
            <div className="rh27-unit-label font-orbitron text-purple-300">HOURS</div>
          </div>
          <div className="rh27-sep text-cyan-400 font-orbitron">:</div>
          <div className="rh27-unit border-purple-500/40">
            <div className="rh27-value font-orbitron text-[#F8FAFC]">{mins}</div>
            <div className="rh27-unit-label font-orbitron text-purple-300">MINS</div>
          </div>
          <div className="rh27-sep text-cyan-400 font-orbitron">:</div>
          <div className="rh27-unit border-cyan-400/60 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
            <div className={`rh27-value font-orbitron text-cyan-400 ${pulsing ? 'cd-pulse' : ''}`}>{secs}</div>
            <div className="rh27-unit-label font-orbitron text-cyan-400">SECS</div>
          </div>
        </div>
      </div>
    </div>
  );
};
