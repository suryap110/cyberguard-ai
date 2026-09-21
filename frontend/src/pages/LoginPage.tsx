import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ShieldAlert, Lock, Mail, User as UserIcon, ArrowRight, AlertCircle, Check, KeyRound, Globe, Home } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Role } from '../types/index';
import { ToastContainer, ToastMessage } from '../components/ui/Toast';

export const LoginPage: React.FC = () => {
  const { loginAsPreset, loginCustom, signupCustom } = useAuth();
  const navigate = useNavigate();

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [activeTab, setActiveTab] = useState<'signin' | 'signup' | 'pin' | 'presets'>('signin');

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [selectedRole, setSelectedRole] = useState<Role>('SECURITY_ANALYST');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const addToast = (type: 'success' | 'warning' | 'error' | 'info', title: string, message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }
    if (!password.trim()) {
      setErrorMessage("Please enter your password.");
      return;
    }

    setLoading(true);
    const result = await loginCustom(email, password);
    setLoading(false);

    if (result.success) {
      addToast('success', 'Authentication Granted', `Welcome back to Cyber Shield AI!`);
      setTimeout(() => navigate('/soc'), 500);
    } else {
      setErrorMessage(result.error || "Authentication failed. Please verify credentials.");
    }
  };

  const handlePinAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinCode.length < 4) {
      setErrorMessage("Please enter a valid PIN.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      loginAsPreset('SECURITY_ANALYST');
      setLoading(false);
      addToast('success', 'PIN Authenticated', 'Hardware PIN Factor verified.');
      navigate('/soc');
    }, 400);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setErrorMessage("Please complete all registration fields.");
      return;
    }

    setLoading(true);
    const result = await signupCustom(fullName, email, password, selectedRole);
    setLoading(false);

    if (result.success) {
      addToast('success', 'Account Created', `Welcome to Cyber Shield AI!`);
      setTimeout(() => navigate('/soc'), 500);
    } else {
      setErrorMessage(result.error || "Could not register account.");
    }
  };

  const handlePresetSelect = (role: Role) => {
    loginAsPreset(role);
    addToast('info', 'Demo Persona Authenticated', `Logged in as ${role}`);
    setTimeout(() => navigate('/soc'), 400);
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Subtle Particle & Grid Layers */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00E5FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#7C3AED]/10 rounded-full blur-3xl pointer-events-none" />

      <ToastContainer toasts={toasts} onClose={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />

      {/* Login Card */}
      <div className="w-full max-w-md bg-[#101827] border border-slate-800/80 rounded-3xl p-8 shadow-2xl space-y-6 text-center relative z-10">
        
        {/* Futuristic Shield Icon Logo */}
        <div className="w-16 h-16 rounded-2xl bg-[#151F32] border border-[#00E5FF]/40 text-[#00E5FF] shadow-[0_0_25px_rgba(0,229,255,0.25)] flex items-center justify-center mx-auto transition-transform hover:scale-105">
          <Shield className="w-8 h-8 text-[#00E5FF]" />
        </div>

        <div>
          <h1 className="text-2xl font-extrabold text-[#F8FAFC] tracking-wide flex items-center justify-center gap-2 font-orbitron">
            CYBERGUARD <span className="text-[#00E5FF]">AI</span>
          </h1>
          <p className="text-xs text-[#94A3B8] mt-1 font-medium">Enterprise SOC Security Portal</p>
        </div>

        {/* Tab Selection */}
        <div className="flex rounded-xl bg-[#0B1220] p-1 border border-slate-800/60 text-xs font-semibold">
          <button
            onClick={() => { setActiveTab('signin'); setErrorMessage(null); }}
            className={`flex-1 py-2 rounded-lg transition-all ${
              activeTab === 'signin' ? 'bg-[#00E5FF] text-[#070B14] font-bold shadow-[0_0_12px_rgba(0,229,255,0.3)]' : 'text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setActiveTab('pin'); setErrorMessage(null); }}
            className={`flex-1 py-2 rounded-lg transition-all ${
              activeTab === 'pin' ? 'bg-[#00E5FF] text-[#070B14] font-bold shadow-[0_0_12px_rgba(0,229,255,0.3)]' : 'text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
          >
            PIN Access
          </button>
          <button
            onClick={() => { setActiveTab('signup'); setErrorMessage(null); }}
            className={`flex-1 py-2 rounded-lg transition-all ${
              activeTab === 'signup' ? 'bg-[#00E5FF] text-[#070B14] font-bold shadow-[0_0_12px_rgba(0,229,255,0.3)]' : 'text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
          >
            Register
          </button>
          <button
            onClick={() => { setActiveTab('presets'); setErrorMessage(null); }}
            className={`flex-1 py-2 rounded-lg transition-all ${
              activeTab === 'presets' ? 'bg-[#7C3AED] text-[#F8FAFC] font-bold shadow-[0_0_12px_rgba(124,58,237,0.3)]' : 'text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
          >
            Demo
          </button>
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-[#FF3B3B]/10 border border-[#FF3B3B]/40 text-[#FF3B3B] text-xs text-left flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-[#FF3B3B] shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* 1. SIGN IN FORM */}
        {activeTab === 'signin' && (
          <form onSubmit={handleSignIn} className="space-y-4 text-xs text-left">
            <div className="space-y-1.5">
              <label className="text-[#94A3B8] font-medium">Email Address</label>
              <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-[#151F32] border border-slate-800/80 rounded-xl focus-within:border-[#00E5FF]">
                <Mail className="w-4 h-4 text-[#64748B]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="analyst@cybershield.ai"
                  className="w-full bg-transparent text-[#F8FAFC] focus:outline-none placeholder-[#64748B]"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[#94A3B8] font-medium">Password</label>
              <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-[#151F32] border border-slate-800/80 rounded-xl focus-within:border-[#00E5FF]">
                <Lock className="w-4 h-4 text-[#64748B]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-transparent text-[#F8FAFC] focus:outline-none placeholder-[#64748B]"
                  required
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded bg-[#151F32] border-slate-700 text-[#00E5FF] focus:ring-0 cursor-pointer"
                />
                <span className="text-[#94A3B8]">Remember me</span>
              </label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); addToast('info', 'Password Reset Link', 'Sent to registered email.'); }} className="text-[#00E5FF] hover:underline font-medium">
                Forgot Password?
              </a>
            </div>

            {/* High Contrast Cyan Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#3B82F6] text-[#070B14] font-extrabold text-sm shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:scale-[1.02] transition-all mt-2 disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'AUTHENTICATING...' : 'LOG IN TO SOC DASHBOARD'}
            </button>
          </form>
        )}

        {/* 2. PIN ACCESS FORM */}
        {activeTab === 'pin' && (
          <form onSubmit={handlePinAuth} className="space-y-4 text-xs text-left">
            <div className="space-y-1.5">
              <label className="text-[#94A3B8] font-medium">Security Factor PIN</label>
              <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-[#151F32] border border-slate-800/80 rounded-xl focus-within:border-[#00E5FF]">
                <KeyRound className="w-4 h-4 text-[#00E5FF]" />
                <input
                  type="password"
                  maxLength={6}
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  placeholder="Enter 6-Digit PIN (e.g. 123456)"
                  className="w-full bg-transparent text-[#F8FAFC] tracking-widest text-center font-mono text-sm focus:outline-none placeholder-[#64748B]"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#00E5FF] text-[#070B14] font-extrabold text-sm shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:scale-[1.02] transition-all mt-2"
            >
              {loading ? 'VERIFYING PIN...' : 'VERIFY & ACCESS SYSTEM'}
            </button>
          </form>
        )}

        {/* 3. SIGN UP FORM */}
        {activeTab === 'signup' && (
          <form onSubmit={handleSignUp} className="space-y-3.5 text-xs text-left">
            <div className="space-y-1">
              <label className="text-[#94A3B8]">Full Name</label>
              <div className="flex items-center gap-2 px-3 py-2 bg-[#151F32] border border-slate-800/80 rounded-xl focus-within:border-[#00E5FF]">
                <UserIcon className="w-4 h-4 text-[#64748B]" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Surya Prakash"
                  className="w-full bg-transparent text-[#F8FAFC] focus:outline-none"
                  required
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[#94A3B8]">Email Address</label>
              <div className="flex items-center gap-2 px-3 py-2 bg-[#151F32] border border-slate-800/80 rounded-xl focus-within:border-[#00E5FF]">
                <Mail className="w-4 h-4 text-[#64748B]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="surya@cybershield.ai"
                  className="w-full bg-transparent text-[#F8FAFC] focus:outline-none"
                  required
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[#94A3B8]">Create Password</label>
              <div className="flex items-center gap-2 px-3 py-2 bg-[#151F32] border border-slate-800/80 rounded-xl focus-within:border-[#00E5FF]">
                <Lock className="w-4 h-4 text-[#64748B]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full bg-transparent text-[#F8FAFC] focus:outline-none"
                  required
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[#94A3B8]">Account Access Role</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as Role)}
                className="w-full px-3 py-2 bg-[#151F32] border border-slate-800/80 rounded-xl text-[#F8FAFC] focus:outline-none focus:border-[#00E5FF]"
              >
                <option value="SECURITY_ANALYST">SOC Security Lead / Analyst</option>
                <option value="ADMIN">CISO Administrator</option>
                <option value="USER">Consumer Security User</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#3B82F6] text-[#070B14] font-extrabold text-sm shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:scale-[1.02] transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? 'CREATING ACCOUNT...' : 'CREATE & SIGN IN'}
            </button>
          </form>
        )}

        {/* 4. DEMO PERSONAS */}
        {/* 4. DEMO PERSONAS */}
        {activeTab === 'presets' && (
          <div className="space-y-2.5 text-xs">
            <p className="text-[#94A3B8]">Click any preset persona for instant login:</p>
            <button
              onClick={() => handlePresetSelect('SECURITY_ANALYST')}
              className="w-full p-3 rounded-xl bg-[#151F32] border border-slate-800 hover:border-[#00E5FF] text-left flex items-center justify-between group transition-all"
            >
              <div>
                <p className="font-bold text-[#F8FAFC]">SOC Analyst Persona</p>
                <p className="text-[10px] text-[#94A3B8]">Full access to SOC Command Center</p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#64748B] group-hover:text-[#00E5FF]" />
            </button>

            <button
              onClick={() => handlePresetSelect('ADMIN')}
              className="w-full p-3 rounded-xl bg-[#151F32] border border-slate-800 hover:border-[#7C3AED] text-left flex items-center justify-between group transition-all"
            >
              <div>
                <p className="font-bold text-[#F8FAFC]">CISO Admin Persona</p>
                <p className="text-[10px] text-[#94A3B8]">Executive risk & audit reports</p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#64748B] group-hover:text-[#7C3AED]" />
            </button>
          </div>
        )}

        {/* CLICKABLE HOMEPAGE REDIRECT CARD */}
        <div 
          onClick={() => navigate('/')}
          className="w-full p-4 rounded-2xl bg-gradient-to-r from-[#0B1220] via-[#151F32] to-[#0B1220] border border-[#00E5FF]/50 hover:border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.2)] hover:shadow-[0_0_35px_rgba(0,229,255,0.45)] transition-all cursor-pointer group flex items-center justify-between font-mono text-left pt-3 mt-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/50 text-[#00E5FF] group-hover:scale-110 transition-transform">
              <Globe className="w-5 h-5 text-[#00E5FF]" />
            </div>
            <div>
              <p className="font-orbitron font-extrabold text-xs text-white group-hover:text-[#00E5FF] transition-colors flex items-center gap-1.5">
                <span>RETURN TO HOMEPAGE</span>
                <span className="px-1.5 py-0.5 bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40 rounded text-[9px] font-bold">CYBERGUARD AI</span>
              </p>
              <p className="text-[10px] text-[#94A3B8]">Click card to explore 12 Defense Armory Modules & Specs</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-[#00E5FF] group-hover:translate-x-1 transition-transform shrink-0" />
        </div>
      </div>
    </div>
  );
};
