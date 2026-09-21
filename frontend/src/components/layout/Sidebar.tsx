import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Shield, LayoutDashboard, ShieldAlert, Activity, Network, Bot, 
  FileText, Settings, ChevronLeft, ChevronRight, QrCode, Mic, 
  FileCode, Smartphone, Link2, MessageSquare, CreditCard, UserCheck,
  Database, Zap, Cpu, Play, Lock, Server, Building2, ChevronDown, Sparkles,
  Swords, Crosshair, Award, Flame, Box, LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { soundFx } from '../../utils/audioSfx';

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [showArmory, setShowArmory] = useState(true);

  // Gamified Primary Navigation Links
  const primaryNav = [
    { name: 'QUEST HQ (SOC)', path: '/soc', icon: Swords },
    { name: 'THREAT RADAR', path: '/alerts', icon: Crosshair },
    { name: 'WAR ROOM (SIM)', path: '/simulation', icon: Play },
    { name: 'CYBER NETWORK', path: '/network', icon: Network },
    { name: 'AI COMPANION', path: '/copilot', icon: Bot, badge: 'LVL 99' },
    { name: 'ACHIEVEMENTS', path: '/security-report', icon: Award },
    { name: 'SETTINGS', path: '/settings', icon: Settings },
  ];

  // 16 Security Armory Equipment Modules
  const securityModules = [
    { name: 'UPI Fraud Shield', path: '/upi-guard', icon: QrCode, rarity: 'MYTHIC' },
    { name: 'Deepfake AI Voice', path: '/deepfake-detector', icon: Mic, rarity: 'LEGENDARY' },
    { name: 'APK Guard', path: '/apk-scanner', icon: FileCode, rarity: 'EPIC' },
    { name: 'SIM Swap Defense', path: '/sim-guard', icon: Smartphone, rarity: 'RARE' },
    { name: 'URL Scanner', path: '/scanner/url', icon: Link2, rarity: 'MYTHIC' },
    { name: 'Message Scanner', path: '/scanner/message', icon: MessageSquare, rarity: 'LEGENDARY' },
    { name: 'QR Code Scanner', path: '/scanner/qr', icon: QrCode, rarity: 'EPIC' },
    { name: 'Identity Leak Vault', path: '/identity', icon: UserCheck, rarity: 'MYTHIC' },
    { name: 'Dark Web Intel', path: '/threat-intel', icon: Database, rarity: 'MYTHIC' },
    { name: 'SOAR Playbooks', path: '/playbooks', icon: Zap, rarity: 'LEGENDARY' },
    { name: 'ML Sandbox', path: '/fraud-sandbox', icon: Cpu, rarity: 'EPIC' },
    { name: 'Attack Simulator', path: '/simulation', icon: Play, rarity: 'MYTHIC' },
    { name: 'Zero-Trust Guard', path: '/zero-trust', icon: Lock, rarity: 'LEGENDARY' },
    { name: 'System Health', path: '/admin/health', icon: Server, rarity: 'RARE' },
    { name: 'Incident Console', path: '/incidents', icon: ShieldAlert, rarity: 'EPIC' },
    { name: 'Executive Report', path: '/security-report', icon: FileText, rarity: 'MYTHIC' },
  ];

  return (
    <aside className={`relative flex flex-col h-screen bg-[#070B14]/90 backdrop-blur-2xl border-r border-amber-500/40 transition-all duration-200 z-30 shrink-0 shadow-[0_0_30px_rgba(245,158,11,0.15)] ${collapsed ? 'w-20' : 'w-64'}`}>
      {/* Brand Header - Animus VR Core */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-amber-500/40 bg-[#0B1220]/90 relative overflow-hidden">
        <div className="animus-scanline" />
        <NavLink to="/soc" className="flex items-center gap-3 overflow-hidden group" onClick={() => soundFx.playLaserScan()}>
          <div className="relative p-2.5 rounded-xl bg-[#101827] border border-amber-500/70 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Flame className="w-5 h-5 text-amber-400 fill-amber-400 animate-pulse" />
            <span className="absolute inset-0 rounded-xl border border-amber-400/40 animate-ping opacity-40 pointer-events-none"></span>
          </div>

          {!collapsed && (
            <div>
              <h1 className="font-black text-xs tracking-wide text-white flex items-center gap-1 font-orbitron leading-none">
                CYBERGUARD <span className="text-amber-400">AI</span>
              </h1>
              <p className="text-[9px] text-cyan-400 font-mono tracking-widest uppercase mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                <span>CYBERGUARD AI 100%</span>
              </p>
            </div>
          )}
        </NavLink>
        <button 
          onClick={() => { soundFx.playClick(); setCollapsed(!collapsed); }}
          className="p-1.5 rounded-lg text-amber-400/70 hover:text-amber-300 hover:bg-amber-500/20 transition-colors cursor-pointer"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Core Quest Navigation Items */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 font-mono">
        <div className="px-3 pb-2 text-[10px] font-bold tracking-wider text-amber-400 uppercase flex items-center justify-between font-orbitron">
          <span>{!collapsed ? '🛡️ CYBERGUARD AI' : 'CYBERGUARD'}</span>
          {!collapsed && <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[8px]">RANK: S+</span>}
        </div>

        {primaryNav.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            title={item.name}
            onClick={() => soundFx.playLaserScan()}
            className={({ isActive }) =>
              `flex items-center gap-3.5 px-3.5 py-2.5 text-xs transition-all relative group animus-button-clip ${
                isActive 
                  ? 'bg-gradient-to-r from-amber-500/30 via-cyan-500/20 to-purple-500/20 text-amber-300 border border-amber-500/80 shadow-[0_0_20px_rgba(245,158,11,0.5)] font-bold font-orbitron' 
                  : 'text-slate-300 hover:bg-[#0B1220] hover:text-amber-300 border border-amber-500/20'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-amber-400' : 'text-slate-400 group-hover:text-amber-400'}`} />
                {!collapsed && <span className="truncate tracking-wide">{item.name}</span>}

                {item.badge && !collapsed && (
                  <span className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/40 font-orbitron">
                    {item.badge}
                  </span>
                )}

                {/* Golden Eagle Sync Active Indicator Bar */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-amber-400 rounded-r shadow-[0_0_12px_#F59E0B]" />
                )}
              </>
            )}
          </NavLink>
        ))}

        {/* Collapsible Security Armory Equipment Header */}
        <div className="pt-4 px-1">
          <button 
            onClick={() => { soundFx.playClick(); setShowArmory(!showArmory); }}
            className="w-full flex items-center justify-between px-2.5 py-1.5 text-[10px] font-bold tracking-wider text-amber-400 hover:text-white uppercase transition-colors"
          >
            <span className="flex items-center gap-1.5"><Box className="w-3.5 h-3.5" /> {!collapsed ? '🛡️ SECURITY ARMORY' : 'ARMORY'}</span>
            {!collapsed && <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showArmory ? 'rotate-180' : ''}`} />}
          </button>
        </div>

        {showArmory && securityModules.map((module) => (
          <NavLink
            key={module.path}
            to={module.path}
            title={module.name}
            onClick={() => soundFx.playClick()}
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all relative ${
                isActive 
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold shadow-cyber-glow' 
                  : 'text-[#94A3B8] hover:bg-[#101827] hover:text-white'
              }`
            }
          >
            <div className="flex items-center gap-2.5 truncate">
              <module.icon className="w-3.5 h-3.5 shrink-0 text-cyan-400" />
              {!collapsed && <span className="truncate text-[11px] font-mono">{module.name}</span>}
            </div>

            {!collapsed && (
              <span className={`text-[8px] font-extrabold px-1 rounded ${
                module.rarity === 'MYTHIC' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
              }`}>
                {module.rarity}
              </span>
            )}
          </NavLink>
        ))}
      </div>

      {/* Bottom Gaming Status Bar */}
      <div className="p-3 border-t border-[#1E293B] bg-[#0B1220] font-mono text-xs space-y-2">
        <div className="flex items-center justify-between text-[10px] text-slate-400">
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            SHIELD ACTIVE
          </span>
          <span className="text-amber-400 font-bold">XP 148.5k</span>
        </div>
        {!collapsed && (
          <div className="w-full bg-[#101827] h-1.5 rounded-full overflow-hidden border border-[#1E293B]">
            <div className="bg-gradient-to-r from-cyan-400 via-purple-500 to-amber-400 h-full w-[94%] shadow-cyber-glow"></div>
          </div>
        )}

        {/* Sign Out Action Button */}
        <button
          onClick={() => {
            soundFx.playClick();
            logout();
            navigate('/login');
          }}
          title="Sign Out"
          className="w-full py-2 px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-400 text-red-400 font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-cyber-glow cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
};
