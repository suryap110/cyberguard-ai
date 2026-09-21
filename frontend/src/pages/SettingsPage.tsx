import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Sun, Moon, Lock, Shield, Sliders, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { ToastContainer, ToastMessage } from '../components/ui/Toast';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Settings State
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [autoContain, setAutoContain] = useState(true);
  const [mfaEnforced, setMfaEnforced] = useState(true);

  const addToast = (type: 'success' | 'warning' | 'error' | 'info', title: string, message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  const handleSave = () => {
    addToast('success', 'Preferences Saved', 'Cyber Shield AI security preferences updated.');
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-4xl mx-auto font-sans text-[#F8FAFC]">
      <ToastContainer toasts={toasts} onClose={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/60 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#F8FAFC] tracking-wide flex items-center gap-2.5">
            <SettingsIcon className="w-7 h-7 text-[#00E5FF]" />
            Settings & System Preferences
          </h1>
          <p className="text-xs text-[#94A3B8] mt-1">Configure profile details, notification thresholds, security policies, and theme modes</p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#3B82F6] text-[#070B14] font-extrabold text-xs shadow-[0_0_15px_rgba(0,229,255,0.25)] hover:scale-105 transition-all cursor-pointer"
        >
          Save Preferences
        </button>
      </div>

      {/* 1. Profile Section */}
      <div className="cg-card p-6 space-y-4">
        <h3 className="text-sm font-bold text-[#F8FAFC] flex items-center gap-2 border-b border-slate-800/60 pb-3">
          <User className="w-4 h-4 text-[#00E5FF]" />
          User Profile Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-[#151F32] space-y-1">
            <span className="text-[#94A3B8]">Full Name</span>
            <p className="font-bold text-[#F8FAFC] text-sm">{user?.full_name || 'Surya Prakash'}</p>
          </div>
          <div className="p-3.5 rounded-xl bg-[#151F32] space-y-1">
            <span className="text-[#94A3B8]">Email Address</span>
            <p className="font-bold text-[#F8FAFC] text-sm">{user?.email || 'surya@cybershield.ai'}</p>
          </div>
        </div>
      </div>

      {/* 2. Security Preferences */}
      <div className="cg-card p-6 space-y-4">
        <h3 className="text-sm font-bold text-[#F8FAFC] flex items-center gap-2 border-b border-slate-800/60 pb-3">
          <Lock className="w-4 h-4 text-[#7C3AED]" />
          Security Preferences & Authentication
        </h3>
        <div className="space-y-3 text-xs">
          <label className="flex items-center justify-between p-3.5 rounded-xl bg-[#151F32] cursor-pointer">
            <div>
              <p className="font-bold text-[#F8FAFC]">Multi-Factor Authentication (MFA)</p>
              <p className="text-[11px] text-[#94A3B8]">Require WebAuthn FIDO2 step-up for elevated admin actions</p>
            </div>
            <input
              type="checkbox"
              checked={mfaEnforced}
              onChange={(e) => setMfaEnforced(e.target.checked)}
              className="w-4 h-4 text-[#00E5FF] rounded focus:ring-0 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-xl bg-[#151F32] cursor-pointer">
            <div>
              <p className="font-bold text-[#F8FAFC]">Automated SOAR Auto-Containment</p>
              <p className="text-[11px] text-[#94A3B8]">Automatically block malicious IPs when AI confidence exceeds 95%</p>
            </div>
            <input
              type="checkbox"
              checked={autoContain}
              onChange={(e) => setAutoContain(e.target.checked)}
              className="w-4 h-4 text-[#00E5FF] rounded focus:ring-0 cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* 3. Notifications & Alert Settings */}
      <div className="cg-card p-6 space-y-4">
        <h3 className="text-sm font-bold text-[#F8FAFC] flex items-center gap-2 border-b border-slate-800/60 pb-3">
          <Bell className="w-4 h-4 text-[#3B82F6]" />
          Alerts & Notifications Config
        </h3>
        <div className="space-y-3 text-xs">
          <label className="flex items-center justify-between p-3.5 rounded-xl bg-[#151F32] cursor-pointer">
            <div>
              <p className="font-bold text-[#F8FAFC]">Email Critical Incident Notifications</p>
              <p className="text-[11px] text-[#94A3B8]">Receive instant SMS & Email digests for Critical threats</p>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="w-4 h-4 text-[#00E5FF] rounded focus:ring-0 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-xl bg-[#151F32] cursor-pointer">
            <div>
              <p className="font-bold text-[#F8FAFC]">Push Notifications</p>
              <p className="text-[11px] text-[#94A3B8]">Enable browser push notifications for real-time alerts</p>
            </div>
            <input
              type="checkbox"
              checked={pushAlerts}
              onChange={(e) => setPushAlerts(e.target.checked)}
              className="w-4 h-4 text-[#00E5FF] rounded focus:ring-0 cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* 4. Theme & System Preferences */}
      <div className="cg-card p-6 space-y-4">
        <h3 className="text-sm font-bold text-[#F8FAFC] flex items-center gap-2 border-b border-slate-800/60 pb-3">
          <Sliders className="w-4 h-4 text-[#00E5FF]" />
          Theme & System Appearance
        </h3>
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#151F32] text-xs">
          <div>
            <p className="font-bold text-[#F8FAFC]">Dashboard Theme Mode</p>
            <p className="text-[11px] text-[#94A3B8]">Current Mode: <strong className="text-[#00E5FF] uppercase">{theme}</strong></p>
          </div>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-xl bg-[#101827] border border-slate-800 text-[#00E5FF] hover:border-[#00E5FF] font-semibold transition-all flex items-center gap-2 cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#00E5FF]" />}
            <span>Switch Mode</span>
          </button>
        </div>
      </div>

      {/* 5. Account Sign Out Section */}
      <div className="cg-card p-6 space-y-4 border-red-500/30">
        <h3 className="text-sm font-bold text-red-400 flex items-center gap-2 border-b border-slate-800/60 pb-3">
          <LogOut className="w-4 h-4 text-red-400" />
          Account Session Management
        </h3>
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#151F32] text-xs">
          <div>
            <p className="font-bold text-white">Sign Out of Session</p>
            <p className="text-[11px] text-slate-400">Clear JWT access tokens and log out of CyberGuard AI</p>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="px-5 py-2.5 rounded-xl bg-red-500/20 border border-red-500/50 hover:bg-red-500 text-red-300 hover:text-white font-bold transition-all flex items-center gap-2 cursor-pointer shadow-cyber-glow"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
