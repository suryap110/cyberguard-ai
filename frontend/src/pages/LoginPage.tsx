import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, UserCheck, Terminal, Shield, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Role } from '../types';

export const LoginPage: React.FC = () => {
  const { loginAsPreset } = useAuth();
  const navigate = useNavigate();

  const handlePresetSelect = (role: Role) => {
    loginAsPreset(role);
    if (role === 'SECURITY_ANALYST' || role === 'ADMIN') {
      navigate('/soc');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#080B11] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#0F1420] border border-[#232D42] rounded-3xl p-8 shadow-2xl space-y-6 text-center">
        <div className="p-4 rounded-2xl bg-gradient-to-tr from-sky-600 to-cyan-400 text-white w-fit mx-auto shadow-cyber-glow">
          <ShieldAlert className="w-10 h-10" />
        </div>

        <div>
          <h1 className="text-2xl font-extrabold text-white">CYBERGUARD AI</h1>
          <p className="text-xs font-mono text-cyan-400 tracking-wider mt-1 uppercase">Detect. Explain. Prevent.</p>
        </div>

        <p className="text-xs text-slate-400">Select a preset demo persona for instant single-click access:</p>

        <div className="space-y-3">
          <button
            onClick={() => handlePresetSelect('SECURITY_ANALYST')}
            className="w-full p-4 rounded-2xl bg-[#161D2F] border border-amber-500/30 hover:border-amber-500 text-left transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">SOC Analyst Persona</p>
                <p className="text-[11px] font-mono text-slate-400">analyst@cyberguard.demo</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
          </button>

          <button
            onClick={() => handlePresetSelect('USER')}
            className="w-full p-4 rounded-2xl bg-[#161D2F] border border-sky-500/30 hover:border-sky-500 text-left transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-sky-500/20 text-cyan-400">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Consumer User Persona</p>
                <p className="text-[11px] font-mono text-slate-400">user@cyberguard.demo</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
          </button>

          <button
            onClick={() => handlePresetSelect('ADMIN')}
            className="w-full p-4 rounded-2xl bg-[#161D2F] border border-emerald-500/30 hover:border-emerald-500 text-left transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">System Admin Persona</p>
                <p className="text-[11px] font-mono text-slate-400">admin@cyberguard.demo</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
};
