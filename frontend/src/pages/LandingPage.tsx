import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, ArrowRight, CheckCircle2, Lock, Cpu, Eye, Radio, Sparkles, X, 
  Mail, User as UserIcon, Terminal, UserCheck, Shield 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Role } from '../types/index';
import { ToastContainer, ToastMessage } from '../components/ui/Toast';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginAsPreset, loginCustom, signupCustom } = useAuth();

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState<'signin' | 'signup' | 'presets'>('signin');

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
      setShowAuthModal(false);
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
      addToast('success', 'Account Created Successfully', `Welcome ${fullName}! Your CYBERGUARD AI vault is active.`);
      setShowAuthModal(false);
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
    setShowAuthModal(false);
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
    <div className="min-h-screen bg-[#080B11] text-[#F8FAFC] overflow-hidden relative">
      <ToastContainer toasts={toasts} onClose={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />

      {/* Navigation Bar with Live Sign In / Sign Up Controls */}
      <nav className="h-20 border-b border-[#232D42] bg-[#0F1420]/80 backdrop-blur-lg px-6 md:px-8 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-sky-600 via-cyan-500 to-emerald-400 text-slate-950 shadow-cyber-glow">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <span className="font-extrabold text-xl tracking-wider">CYBERGUARD<span className="text-cyan-400">AI</span></span>
        </div>

        {/* Auth & Navigation Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => { setAuthTab('signin'); setShowAuthModal(true); }}
            className="px-4 py-2 rounded-xl bg-[#161D2F] border border-[#232D42] hover:border-cyan-400 text-xs font-mono text-slate-200 hover:text-white transition-all"
          >
            Sign In
          </button>
          
          <button
            onClick={() => { setAuthTab('signup'); setShowAuthModal(true); }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-extrabold text-xs shadow-cyber-glow hover:scale-105 transition-all"
          >
            Sign Up
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            className="hidden lg:block px-4 py-2 rounded-xl bg-[#161D2F] border border-[#232D42] hover:border-sky-500/50 text-xs font-mono text-slate-400 hover:text-white transition-all"
          >
            Consumer Guard
          </button>

          <button
            onClick={() => navigate('/soc')}
            className="hidden lg:block px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-400 text-slate-950 font-bold text-xs shadow-cyber-glow transition-all"
          >
            Enter SOC Command
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 px-6 max-w-7xl mx-auto text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/30 text-cyan-400 text-xs font-mono mb-8"
        >
          <Sparkles className="w-4 h-4" />
          <span>PROACTIVE AI CYBERSECURITY ENGINE V1.0</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto"
        >
          Your AI-Powered Shield Against Digital Fraud.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
        >
          Detect phishing, scam messages, account takeovers, and suspicious transactions before they become real-world losses.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => { setAuthTab('signup'); setShowAuthModal(true); }}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-extrabold text-base shadow-cyber-glow hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <span>Protect Yourself Now</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate('/simulation')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#161D2F] border border-[#232D42] hover:border-amber-500/50 text-amber-400 font-bold text-base transition-all flex items-center justify-center gap-2"
          >
            <span>Run Hackathon Attack Simulation</span>
            <Radio className="w-5 h-5 animate-pulse" />
          </button>
        </motion.div>

        {/* Live Threat Hero Ticker */}
        <div className="mt-16 max-w-4xl mx-auto p-4 rounded-2xl bg-[#0F1420]/90 border border-[#232D42] flex items-center justify-between text-xs font-mono text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-emerald-400 font-bold uppercase">LIVE PROTECTION</span>
          </div>
          <div className="flex items-center gap-6 overflow-hidden text-slate-400">
            <span>● Phishing domain blocked (96/100)</span>
            <span>● Suspicious ₹85,000 transfer intercepted</span>
            <span>● Account takeover correlation active</span>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-[#232D42]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-[#0F1420] border border-[#232D42] hover:border-sky-500/40 transition-all">
            <div className="p-4 rounded-2xl bg-sky-500/10 text-cyan-400 w-fit mb-6">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Detect</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Multi-signal telemetry analyzing URL structures, SMS NLP urgency, transaction anomalies, and login locations.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#0F1420] border border-[#232D42] hover:border-cyan-500/40 transition-all">
            <div className="p-4 rounded-2xl bg-cyan-500/10 text-cyan-400 w-fit mb-6">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Explain</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Natural-language explainable AI breaking down exact evidence, risk factors, confidence ratings, and root causes.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#0F1420] border border-[#232D42] hover:border-emerald-500/40 transition-all">
            <div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-400 w-fit mb-6">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Prevent</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Automated session revoking, transaction freezing, biometric step-up 2FA, and attack-graph correlation.
            </p>
          </div>
        </div>
      </section>

      {/* EMBEDDED AUTHENTICATION MODAL (SIGN IN / SIGN UP / PRESETS) */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-[#0F1420] border border-[#232D42] rounded-3xl p-8 shadow-2xl space-y-6 text-center relative"
            >
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#161D2F]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-sky-600 via-cyan-500 to-emerald-400 text-slate-950 w-fit mx-auto shadow-cyber-glow">
                <ShieldAlert className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-white flex items-center justify-center gap-1">
                  CYBERGUARD<span className="text-cyan-400">AI</span>
                </h3>
                <p className="text-xs font-mono text-cyan-400 tracking-wider mt-1 uppercase">Zero-Trust Access Portal</p>
              </div>

              {/* Tabs */}
              <div className="flex rounded-2xl bg-[#161D2F] p-1 border border-[#232D42] font-mono text-xs">
                <button
                  onClick={() => setAuthTab('signin')}
                  className={`flex-1 py-2 rounded-xl transition-all font-bold ${
                    authTab === 'signin' ? 'bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 shadow-cyber-glow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setAuthTab('signup')}
                  className={`flex-1 py-2 rounded-xl transition-all font-bold ${
                    authTab === 'signup' ? 'bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 shadow-cyber-glow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Sign Up
                </button>
                <button
                  onClick={() => setAuthTab('presets')}
                  className={`flex-1 py-2 rounded-xl transition-all font-bold ${
                    authTab === 'presets' ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-cyber-glow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Demo Presets
                </button>
              </div>

              {/* 1. SIGN IN TAB */}
              {authTab === 'signin' && (
                <form onSubmit={handleSignIn} className="space-y-4 font-mono text-xs text-left">
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
                    {loading ? 'AUTHENTICATING JWT...' : 'SIGN IN TO CYBERGUARD'}
                  </button>
                </form>
              )}

              {/* 2. SIGN UP TAB */}
              {authTab === 'signup' && (
                <form onSubmit={handleSignUp} className="space-y-4 font-mono text-xs text-left">
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
                      <option value="ADMIN">CISO System Admin (Full Access)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-400 text-slate-950 font-extrabold text-xs shadow-cyber-glow hover:scale-105 transition-all mt-2"
                  >
                    {loading ? 'CREATING VAULT...' : 'CREATE FREE CYBERGUARD ACCOUNT'}
                  </button>
                </form>
              )}

              {/* 3. DEMO PRESETS TAB */}
              {authTab === 'presets' && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">Instant single-click persona authentication:</p>

                  <button
                    onClick={() => handlePresetSelect('SECURITY_ANALYST')}
                    className="w-full p-3.5 rounded-2xl bg-[#161D2F] border border-amber-500/30 hover:border-amber-500 text-left transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                        <Terminal className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">SOC Analyst Persona</p>
                        <p className="text-[10px] font-mono text-slate-400">analyst@cyberguard.demo</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
                  </button>

                  <button
                    onClick={() => handlePresetSelect('USER')}
                    className="w-full p-3.5 rounded-2xl bg-[#161D2F] border border-sky-500/30 hover:border-sky-500 text-left transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-sky-500/20 text-cyan-400">
                        <UserCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">Consumer User Persona</p>
                        <p className="text-[10px] font-mono text-slate-400">user@cyberguard.demo</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  </button>

                  <button
                    onClick={() => handlePresetSelect('ADMIN')}
                    className="w-full p-3.5 rounded-2xl bg-[#161D2F] border border-emerald-500/30 hover:border-emerald-500 text-left transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                        <Shield className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">System Admin Persona</p>
                        <p className="text-[10px] font-mono text-slate-400">admin@cyberguard.demo</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
