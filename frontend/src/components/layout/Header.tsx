import React, { useState } from 'react';
import { Search, Bell, Volume2, VolumeX, Download } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWebSocket } from '../../context/WebSocketContext';
import { useNavigate } from 'react-router-dom';
import { Role } from '../../types/index';

interface HeaderProps {
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const { user, loginAsPreset } = useAuth();
  const { isConnected, lastMessage } = useWebSocket();
  const navigate = useNavigate();
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <header className="h-16 border-b border-[#232D42] bg-[#0F1420]/80 backdrop-blur-md px-6 flex items-center justify-between shrink-0 z-20">
      {/* Search Input Trigger */}
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-3 px-4 py-2 rounded-xl bg-[#161D2F] border border-[#232D42] hover:border-cyan-400/50 text-slate-400 hover:text-white transition-all text-xs font-mono w-64 md:w-80 justify-between"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-500" />
            <span>Search URLs, Threats, Playbooks...</span>
          </div>
          <kbd className="px-1.5 py-0.5 rounded bg-[#080B11] border border-[#232D42] text-[10px] text-slate-400 font-bold">Ctrl+K</kbd>
        </button>

        {/* Real-time WebSocket Signal Indicator */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#161D2F] border border-[#232D42] text-[11px] font-mono">
          <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-400 animate-ping' : 'bg-red-500'}`}></span>
          <span className="text-slate-300">{isConnected ? 'LIVE SOC FEED' : 'OFFLINE'}</span>
          {lastMessage && <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-bold">LIVE SIGNAL</span>}
        </div>
      </div>

      {/* Right Controls: Persona Switcher + Play Store Installer + Profile */}
      <div className="flex items-center gap-3">
        {/* Persona Switcher Dropdown */}
        <select
          value={user?.role || 'SECURITY_ANALYST'}
          onChange={(e) => loginAsPreset(e.target.value as Role)}
          className="px-3 py-1.5 rounded-xl bg-[#161D2F] border border-[#232D42] text-xs font-mono text-cyan-400 focus:outline-none focus:border-cyan-400 cursor-pointer hidden md:block"
        >
          <option value="USER">Consumer Guard View</option>
          <option value="SECURITY_ANALYST">SOC Analyst View</option>
          <option value="ADMIN">CISO Admin View</option>
        </select>

        {/* Play Store / Native PWA Install Button */}
        <button
          onClick={() => alert('CYBERGUARD AI Progressive Web App (PWA) is installed and ready for Play Store deployment!')}
          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold hover:scale-105 transition-all flex items-center gap-1.5"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Install Native App</span>
        </button>

        {/* Sound FX Toggle */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="p-2 rounded-xl bg-[#161D2F] border border-[#232D42] text-slate-400 hover:text-white transition-all"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Notifications Icon */}
        <button
          onClick={() => navigate('/alerts')}
          className="p-2 rounded-xl bg-[#161D2F] border border-[#232D42] text-slate-400 hover:text-white relative transition-all"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
        </button>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-3 pl-2 border-l border-[#232D42]">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-cyan-400 flex items-center justify-center text-slate-950 font-extrabold text-xs font-mono shadow-cyber-glow">
            {user?.full_name?.charAt(0) || 'S'}
          </div>
          <div className="hidden xl:block text-left font-mono">
            <p className="text-xs font-bold text-white leading-tight">{user?.full_name || 'Surya'}</p>
            <p className="text-[10px] text-slate-400">{user?.role || 'Enterprise Admin'}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
