import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, UserCheck, Terminal, Shield, ArrowRight, Lock, Mail, User as UserIcon, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Role } from '../types/index';
import { ToastContainer, ToastMessage } from '../components/ui/Toast';

export const LoginPage: React.FC = () => {
  const { loginAsPreset, loginCustom, signupCustom } = useAuth();
  const navigate = useNavigate();

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [activeTab, setActiveTab] = useState<'signin' | 'signup' | 'presets'>('signin');

  // Form Fields
  const [email, setEmail] = useState('surya@cyberguard.ai');
  const [password, setPassword] = useState('••••••••••••');
  const [fullName, setFullName] = useState('Surya Cyber Lead');
  const [selectedRole, setSelectedRole] = useState<Role>('SECURITY_ANALYST');
  const [loading, setLoading] = useState(false);

  const addToast = (type: 'success' | 'warning' | 'error' | 'info', title: string, message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    const success = await loginCustom(email, password);
    setLoading(false);

    if (success) {
      addToast('success', 'Sign In Successful', `Welcome back to CYBERGUARD AI!`);
      setTimeout(() => {
        if (selectedRole === 'SECURITY_ANALYST' || selectedRole === 'ADMIN') {
          navigate('/soc');
        } else {
          navigate('/dashboard');
        }
      }, 500);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !fullName) return;
    setLoading(true);

    const success = await signupCustom(fullName, email, password, selectedRole);
    setLoading(false);

    if (success) {
      addToast('success', 'Account Created Successfully', `Welcome ${fullName}! Your CYBERGUARD AI vault is ready.`);
      setTimeout(() => {
        if (selectedRole === 'SECURITY_ANALYST' || selectedRole === 'ADMIN') {
          navigate('/soc');
        } else {
          navigate('/dashboard');
        }
      }, 500);
    }
  };

  const handlePresetSelect = (role: Role) => {
    loginAsPreset(role);
    addToast('info', 'Preset Persona Authenticated', `Logged in as ${role}`);
    setTimeout(() => {
      if (role === 'SECURITY_ANALYST' || role === 'ADMIN') {
        navigate('/soc');
      } else {
        navigate('/dashboard');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#080B11] flex items-center justify-center p-6 relative">
      <ToastContainer toasts={toasts} onClose={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />

      <div className="w-full max-w-md bg-[#0F1420] border border-[#232D42] rounded-3xl p-8 shadow-2xl space-y-6 text-center">
        {/* Brand Header */}
        <div className="p-4 rounded-2xl bg-gradient-to-tr from-sky-600 via-cyan-500 to-emerald-400 text-slate-950 w-fit mx-auto shadow-cyber-glow">
          <ShieldAlert className="w-10 h-10" />
        </div>

        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center justify-center gap-1.5">
            CYBERGUARD<span className="text-cyan-400">AI</span>
          </h1>
          <p className="text-xs font-mono text-cyan-400 tracking-wider mt-1 uppercase">Authentication & Zero-Trust Access Portal</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex rounded-2xl bg-[#161D2F] p-1 border border-[#232D42] font-mono text-xs">
          <button
            onClick={() => setActiveTab('signin')}
            className={`flex-1 py-2 rounded-xl transition-all font-bold ${
              activeTab === 'signin' ? 'bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 shadow-cyber-glow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`flex-1 py-2 rounded-xl transition-all font-bold ${
              activeTab === 'signup' ? 'bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 shadow-cyber-glow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign Up
          </button>
          <button
            onClick={() => setActiveTab('presets')}
            className={`flex-1 py-2 rounded-xl transition-all font-bold ${
              activeTab === 'presets' ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-cyber-glow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Demo Persona
          </button>
        </div>

        {/* 1. SIGN IN FORM */}
        {activeTab === 'signin' && (
          <form onSubmit={handleSignIn} className="space-y-4 font-mono text-xs text-left animate-in fade-in">
            <div className="space-y-1">
              <label className="text-slate-400">Email Address</label>
              <div className="flex items-center gap-2 px-3 py-2.5 bg-[#161D2F] border border-[#232D42] rounded-xl focus-within:border-cyan-400">
                <Mail className="w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="analyst@cyberguard.ai"
                  className="w-full bg-transparent text-white focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-400">Password</label>
              <div className="flex items-center gap-2 px-3 py-2.5 bg-[#161D2F] border border-[#232D42] rounded-xl focus-within:border-cyan-400">
                <Lock className="w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-white focus:outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-extrabold text-xs shadow-cyber-glow hover:scale-105 transition-all mt-2"
            >
              {loading ? 'AUTHENTICATING FIDO2 JWT...' : 'SIGN IN TO CYBERGUARD VAULT'}
            </button>
          </form>
        )}

        {/* 2. SIGN UP FORM */}
        {activeTab === 'signup' && (
          <form onSubmit={handleSignUp} className="space-y-4 font-mono text-xs text-left animate-in fade-in">
            <div className="space-y-1">
              <label className="text-slate-400">Full Name</label>
              <div className="flex items-center gap-2 px-3 py-2.5 bg-[#161D2F] border border-[#232D42] rounded-xl focus-within:border-cyan-400">
                <UserIcon className="w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Surya Prakash"
                  className="w-full bg-transparent text-white focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-400">Email Address</label>
              <div className="flex items-center gap-2 px-3 py-2.5 bg-[#161D2F] border border-[#232D42] rounded-xl focus-within:border-cyan-400">
                <Mail className="w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@domain.com"
                  className="w-full bg-transparent text-white focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-400">Password</label>
              <div className="flex items-center gap-2 px-3 py-2.5 bg-[#161D2F] border border-[#232D42] rounded-xl focus-within:border-cyan-400">
                <Lock className="w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-white focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-400">Select Account Role</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as Role)}
                className="w-full p-2.5 rounded-xl bg-[#161D2F] border border-[#232D42] text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                <option value="USER">Consumer Security Guard (Personal)</option>
                <option value="SECURITY_ANALYST">SOC Lead Analyst (Enterprise)</option>
                <option value="ADMIN">CISO System Admin (Full Vault Access)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-400 text-slate-950 font-extrabold text-xs shadow-cyber-glow hover:scale-105 transition-all mt-2"
            >
              {loading ? 'CREATING ZERO-TRUST VAULT...' : 'CREATE FREE CYBERGUARD ACCOUNT'}
            </button>
          </form>
        )}

        {/* 3. DEMO PRESETS */}
        {activeTab === 'presets' && (
          <div className="space-y-3 animate-in fade-in">
            <p className="text-xs text-slate-400">Instant single-click persona authentication for hackathons & demos:</p>

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
        )}
      </div>
    </div>
  );
};
