import React from 'react';
import { Settings as SettingsIcon, Shield, User, Bell, Sun, Moon, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
          <SettingsIcon className="w-8 h-8 text-cyan-400" />
          SYSTEM & SECURITY SETTINGS
        </h1>
        <p className="text-sm text-slate-400 mt-1">Manage user preferences, authentication settings, and theme customization.</p>
      </div>

      <div className="p-6 rounded-3xl bg-[#0F1420] border border-[#232D42] space-y-6">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <User className="w-5 h-5 text-cyan-400" />
          Profile & Security Role
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
          <div className="p-4 rounded-2xl bg-[#161D2F]">
            <span className="text-slate-400 block">Full Name</span>
            <span className="text-white font-bold text-sm mt-1 block">{user?.full_name}</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#161D2F]">
            <span className="text-slate-400 block">Email Address</span>
            <span className="text-white font-bold text-sm mt-1 block">{user?.email}</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#161D2F]">
            <span className="text-slate-400 block">Assigned Role</span>
            <span className="text-cyan-400 font-bold text-sm mt-1 block">{user?.role}</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#161D2F]">
            <span className="text-slate-400 block">Current Security Score</span>
            <span className="text-emerald-400 font-bold text-sm mt-1 block">{user?.security_score} / 100</span>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-[#0F1420] border border-[#232D42] space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Sun className="w-5 h-5 text-cyan-400" />
          Appearance & Dark Command Center Theme
        </h3>
        <div className="flex items-center justify-between p-4 rounded-2xl bg-[#161D2F]">
          <div>
            <p className="text-sm font-bold text-white">Interface Mode</p>
            <p className="text-xs text-slate-400">Current mode: {theme.toUpperCase()}</p>
          </div>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-xl bg-sky-500/10 border border-sky-500/30 text-cyan-400 font-mono text-xs font-bold hover:bg-sky-500 hover:text-white transition-all"
          >
            Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </button>
        </div>
      </div>
    </div>
  );
};
