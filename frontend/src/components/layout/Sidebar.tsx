import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  ShieldAlert, LayoutDashboard, Link2, MessageSquare, QrCode, 
  CreditCard, UserCheck, Smartphone, Bell, Bot, Terminal, 
  Settings, ChevronLeft, ChevronRight, Play, Server,
  Database, Zap, Building2, Lock, Cpu, Mic, FileCode, Sparkles, Shield
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth();

  const consumerNav = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'UPI Fraud & Spoof', path: '/upi-guard', icon: QrCode, highlight: true },
    { name: 'Deepfake AI Voice', path: '/deepfake-detector', icon: Mic },
    { name: 'WhatsApp APK Guard', path: '/apk-scanner', icon: FileCode },
    { name: 'SIM Swap Defense', path: '/sim-guard', icon: Smartphone },
    { name: 'URL Scanner', path: '/scanner/url', icon: Link2 },
    { name: 'Message Scanner', path: '/scanner/message', icon: MessageSquare },
    { name: 'Transactions', path: '/transactions', icon: CreditCard },
    { name: 'Identity Security', path: '/identity', icon: UserCheck },
    { name: 'Alert Center', path: '/alerts', icon: Bell },
    { name: 'AI Copilot', path: '/copilot', icon: Bot },
  ];

  const socNav = [
    { name: 'SOC Command Center', path: '/soc', icon: Terminal, badge: 'LIVE' },
    { name: 'Dark Web Intel', path: '/threat-intel', icon: Database },
    { name: 'SOAR Playbooks', path: '/playbooks', icon: Zap },
    { name: 'Enterprise Risk', path: '/enterprise-risk', icon: Building2 },
    { name: 'Zero-Trust Guard', path: '/zero-trust', icon: Lock },
    { name: 'ML Fraud Sandbox', path: '/fraud-sandbox', icon: Cpu },
    { name: 'Autonomous AI Agent', path: '/autonomous-agent', icon: Bot },
    { name: 'Attack Simulator', path: '/simulation', icon: Play },
    { name: 'System Health', path: '/admin/health', icon: Server },
  ];

  return (
    <aside className={`relative flex flex-col h-screen bg-[#0F1420] border-r border-[#232D42] transition-all duration-300 z-30 ${collapsed ? 'w-20' : 'w-64'}`}>
      {/* Brand Header with Enhanced 3D Shield Badge & Icons */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-[#232D42]">
        <div className="flex items-center gap-3 overflow-hidden">
          {/* Official High-Tech Glowing Shield & AI Sparkle Badge */}
          <div className="relative p-2.5 rounded-2xl bg-gradient-to-tr from-cyan-600 via-sky-500 to-emerald-400 text-slate-950 shadow-cyber-glow ring-2 ring-cyan-400/40 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-6 h-6 text-slate-950 animate-pulse" />
            <Sparkles className="w-3.5 h-3.5 text-amber-300 absolute -top-1 -right-1 drop-shadow-md" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0F1420] animate-ping"></span>
          </div>

          {!collapsed && (
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-extrabold text-base tracking-wider text-white flex items-center gap-1 leading-none">
                  CYBERGUARD<span className="text-cyan-400">AI</span>
                </h1>
                <span className="px-1.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-[9px] font-mono font-bold text-cyan-300 flex items-center gap-0.5">
                  <Cpu className="w-2.5 h-2.5 text-cyan-400 animate-spin" /> PRO
                </span>
              </div>
              <p className="text-[10px] text-sky-400 font-mono tracking-widest uppercase mt-0.5">Detect. Explain. Prevent.</p>
            </div>
          )}
        </div>
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#161D2F] transition-colors"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {/* Consumer Guard Section */}
        <div>
          {!collapsed && <p className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Consumer Guard</p>}
          <nav className="space-y-1">
            {consumerNav.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    isActive 
                      ? 'bg-sky-500/10 text-cyan-400 border border-sky-500/30 shadow-cyber-glow' 
                      : item.highlight
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'text-slate-300 hover:bg-[#161D2F] hover:text-white'
                  }`
                }
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Enterprise SOC Section */}
        <div>
          {!collapsed && <p className="px-3 text-[11px] font-semibold text-amber-400/90 uppercase tracking-wider mb-2 flex items-center justify-between">
            Enterprise SOC
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          </p>}
          <nav className="space-y-1">
            {socNav.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all justify-between ${
                    isActive 
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-cyber-glow' 
                      : 'text-slate-300 hover:bg-[#161D2F] hover:text-white'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 shrink-0 text-amber-400" />
                  {!collapsed && <span>{item.name}</span>}
                </div>
                {!collapsed && item.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 rounded">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Footer / Settings */}
      <div className="p-3 border-t border-[#232D42]">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
              isActive ? 'bg-sky-500/10 text-cyan-400' : 'text-slate-400 hover:bg-[#161D2F] hover:text-white'
            }`
          }
        >
          <Settings className="w-5 h-5 shrink-0" />
          {!collapsed && <span>Settings & Auth</span>}
        </NavLink>
      </div>
    </aside>
  );
};
