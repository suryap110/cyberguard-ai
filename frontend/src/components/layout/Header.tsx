import React, { useState, useEffect } from 'react';
import { Search, Bell, ShieldCheck, Activity, Terminal, Globe, Settings, Cpu, Volume2, VolumeX, Sparkles, Zap, Award, Flame, Heart, Shield, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWebSocket } from '../../context/WebSocketContext';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Role } from '../../types/index';
import { soundFx } from '../../utils/audioSfx';

interface HeaderProps {
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const { user, loginAsPreset, logout } = useAuth();
  const { isConnected } = useWebSocket();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [soundEnabled, setSoundEnabled] = useState(soundFx.enabled);
  const [playerXp, setPlayerXp] = useState(148500);
  const [cyberCredits, setCyberCredits] = useState(45820);

  useEffect(() => {
    const timer = setInterval(() => {
      setPlayerXp(prev => prev + 12);
      setCyberCredits(prev => prev + Math.floor(Math.random() * 5) + 1);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const toggleAudio = () => {
    soundFx.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) soundFx.playLevelUp();
  };

  const handleRoleChange = (role: Role) => {
    soundFx.playClick();
    loginAsPreset(role);
    if (role === 'USER') {
      navigate('/dashboard');
    } else if (role === 'SECURITY_ANALYST') {
      navigate('/soc');
    } else if (role === 'ADMIN') {
      navigate('/enterprise-risk');
    }
  };

  const navTabs = [
    { name: 'QUEST HQ', path: '/soc', icon: Terminal },
    { name: 'WAR ROOM', path: '/simulation', icon: Activity },
    { name: 'ARMORY', path: '/scanner/url', icon: Globe },
    { name: 'AI COMPANION', path: '/copilot', icon: Cpu },
    { name: 'ACHIEVEMENTS', path: '/security-report', icon: Award }
  ];

  return (
    <header className="h-16 border-b border-amber-500/40 bg-[#070B14]/90 backdrop-blur-2xl px-4 md:px-6 flex items-center justify-between shrink-0 z-30 font-mono text-xs text-white relative shadow-[0_0_20px_rgba(245,158,11,0.15)]">
      <div className="animus-scanline" />

      {/* Left: Player Profile & Dual HP / Shield Bars */}
      <div className="flex items-center gap-4">
        {/* Player Avatar & Level Badge */}
        <div className="flex items-center gap-3 bg-[#0B1220]/90 p-1.5 rounded-2xl border border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
          <div className="relative w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-600 p-0.5 shadow-cyber-glow">
            <div className="w-full h-full bg-[#070B14] rounded-[10px] flex items-center justify-center font-black text-xs text-amber-400 font-orbitron">
              {user?.full_name?.charAt(0) || 'S'}
            </div>
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-400 border-2 border-[#070B14] animate-ping"></span>
          </div>

          <div className="hidden sm:block text-left font-orbitron">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-xs">{user?.full_name || 'SURYA-1'}</span>
              <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/50 text-[9px] font-bold">
                LVL 99 S+
              </span>
            </div>
            <p className="text-[9px] text-amber-400 font-mono">CYBERGUARD AI SENTINEL</p>
          </div>
        </div>

        {/* Dual HP & Energy Shield HUD Bar */}
        <div className="hidden 2xl:flex items-center gap-3 bg-[#0B1220]/90 px-3 py-1.5 rounded-2xl border border-amber-500/30">
          {/* Health Bar */}
          <div className="space-y-0.5">
            <div className="flex items-center justify-between text-[9px] text-emerald-400 font-bold font-orbitron">
              <span className="flex items-center gap-1"><Heart className="w-3 h-3 fill-emerald-400 text-emerald-400" /> HP</span>
              <span>100 / 100</span>
            </div>
            <div className="w-24 bg-[#101827] h-1.5 rounded-full overflow-hidden border border-emerald-500/30">
              <div className="bg-emerald-400 h-full w-full shadow-[0_0_8px_#10B981]"></div>
            </div>
          </div>

          <div className="h-6 w-px bg-amber-500/30"></div>

          {/* Energy Shield Bar */}
          <div className="space-y-0.5">
            <div className="flex items-center justify-between text-[9px] text-amber-400 font-bold font-orbitron">
              <span className="flex items-center gap-1"><Shield className="w-3 h-3 fill-amber-400 text-amber-400" /> SHIELD</span>
              <span>250 / 250</span>
            </div>
            <div className="w-24 bg-[#101827] h-1.5 rounded-full overflow-hidden border border-amber-500/30">
              <div className="bg-amber-400 h-full w-full shadow-[0_0_8px_#F59E0B]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Center: Game Quest Navigation Tabs - Animus Animatic Style */}
      <div className="hidden lg:flex items-center gap-1 bg-[#0B1220]/90 p-1.5 rounded-2xl border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.2)] font-orbitron">
        {navTabs.map(tab => {
          const isActive = location.pathname === tab.path || (tab.path === '/soc' && location.pathname === '/');
          return (
            <button
              key={tab.name}
              onClick={() => { soundFx.playLaserScan(); navigate(tab.path); }}
              className={`px-3.5 py-1.5 text-xs transition-all flex items-center gap-1.5 animus-button-clip cursor-pointer ${
                isActive 
                  ? 'bg-gradient-to-r from-amber-500/30 via-amber-400/20 to-amber-600/30 text-amber-300 border border-amber-500/80 shadow-[0_0_20px_rgba(245,158,11,0.5)] font-bold' 
                  : 'text-slate-300 hover:text-amber-300 hover:bg-[#101827] border border-transparent'
              }`}
            >
              <tab.icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* Right: XP Counter, Cyber Credits, Audio SFX Toggle & Search */}
      <div className="flex items-center gap-3">
        {/* Cmd+K Search Palette Trigger */}
        <button
          onClick={() => { soundFx.playClick(); onOpenSearch(); }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0B1220] border border-cyan-500/30 text-[#94A3B8] hover:text-[#00E5FF] hover:border-[#00E5FF] transition-all group shadow-cyber-glow"
        >
          <Search className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-[#00E5FF]" />
          <span className="hidden md:inline text-xs font-mono">⌘K</span>
        </button>

        {/* Cyber Credits Ticker */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-400 font-bold text-[11px] shadow-cyber-glow">
          <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400 animate-bounce" />
          <span>{cyberCredits.toLocaleString()} CR</span>
        </div>

        {/* Player XP Ticker */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/40 text-purple-300 font-bold text-[11px] shadow-cyber-glow">
          <Award className="w-3.5 h-3.5 text-purple-400" />
          <span>{playerXp.toLocaleString()} XP</span>
        </div>

        {/* Sound SFX Toggle Switch */}
        <button
          onClick={toggleAudio}
          title={soundEnabled ? 'Mute Gaming Audio SFX' : 'Enable Gaming Audio SFX'}
          className={`p-2 rounded-xl border transition-all ${
            soundEnabled 
              ? 'bg-cyan-500/20 border-cyan-500/60 text-cyan-400 shadow-cyber-glow' 
              : 'bg-[#0B1220] border-[#1E293B] text-slate-500'
          }`}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Persona Switcher Dropdown */}
        <select
          value={user?.role || 'SECURITY_ANALYST'}
          onChange={(e) => handleRoleChange(e.target.value as Role)}
          className="px-3 py-1.5 rounded-xl bg-[#0B1220] border border-cyan-500/40 text-xs font-mono font-bold text-[#00E5FF] focus:outline-none focus:border-[#00E5FF] cursor-pointer hidden xl:block"
        >
          <option value="USER">Consumer Security Mode</option>
          <option value="SECURITY_ANALYST">SOC Commander Mode</option>
          <option value="ADMIN">CISO Overlord Mode</option>
        </select>

        {/* Sign Out Button */}
        <button
          onClick={() => {
            soundFx.playClick();
            logout();
            navigate('/login');
          }}
          title="Sign Out of CYBERGUARD AI"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/40 hover:border-red-500 text-red-400 hover:bg-red-500/20 text-xs font-mono font-bold transition-all shadow-cyber-glow cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </div>
    </header>
  );
};
