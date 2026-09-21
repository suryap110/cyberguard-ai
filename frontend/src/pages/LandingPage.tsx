import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, ArrowRight, CheckCircle2, Lock, Cpu, Eye, Radio, Sparkles, X, 
  Mail, User as UserIcon, Terminal, UserCheck, Shield, AlertCircle, QrCode,
  Smartphone, CreditCard, Mic, Database, Search, Bot, Zap, Activity, FileText,
  Globe, RefreshCw, Play, Check, ExternalLink, Layers, ShieldCheck, ChevronRight,
  TrendingUp, BarChart3, AlertTriangle, Layers3, ActivitySquare, Binary, Server,
  Crosshair, Award, Flame, Swords, Box, Skull, Target, HelpCircle, MapPin, Calendar, Users, DollarSign, LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Role } from '../types/index';
import { ToastContainer, ToastMessage } from '../components/ui/Toast';
import { soundFx } from '../utils/audioSfx';

interface FeatureCardItem {
  id: string;
  title: string;
  sectorId: 'SEC-01' | 'SEC-02' | 'SEC-03';
  sectorName: string;
  rarity: 'LEGENDARY' | 'MYTHIC' | 'EPIC' | 'RARE';
  rarityBadgeClass: string;
  description: string;
  icon: React.ReactNode;
  iconBgClass: string;
  borderColorClass: string;
  hoverGlowClass: string;
  textColorClass: string;
  buttonClass: string;
  highlights: string[];
  powerStat: string;
  cooldownStat: string;
  targetRoute: string;
  isPresetModal?: boolean;
}

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginAsPreset, loginCustom, signupCustom, logout, isAuthenticated } = useAuth();

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState<'signin' | 'signup' | 'presets'>('signin');
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);

  // Form Fields for Auth Modal
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role>('USER');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Live Telemetry Ticker States
  const [blockedCount, setBlockedCount] = useState(1428590);
  const [activeScans, setActiveScans] = useState(4821);
  const [activeTabSector, setActiveTabSector] = useState<'ALL' | 'SEC-01' | 'SEC-02' | 'SEC-03'>('ALL');
  const [playerXp, setPlayerXp] = useState(148500);

  useEffect(() => {
    const timer = setInterval(() => {
      setBlockedCount(prev => prev + Math.floor(Math.random() * 3) + 1);
      setActiveScans(prev => prev + (Math.random() > 0.5 ? 1 : -1));
      setPlayerXp(prev => prev + 25);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const addToast = (type: 'success' | 'warning' | 'error' | 'info', title: string, message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playClick();
    setErrorMessage(null);
    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please fill in both email and password.");
      soundFx.playAlarm();
      return;
    }
    setLoading(true);
    const result = await loginCustom(email, password);
    setLoading(false);

    if (result.success) {
      soundFx.playLevelUp();
      addToast('success', 'Sign In Successful', `Welcome back to CYBERGUARD AI!`);
      setShowAuthModal(false);
      setTimeout(() => {
        const currentRole = JSON.parse(localStorage.getItem('cyberguard_user') || '{}').role || 'USER';
        if (currentRole === 'SECURITY_ANALYST' || currentRole === 'ADMIN') {
          navigate('/soc');
        } else {
          navigate('/dashboard');
        }
      }, 500);
    } else {
      soundFx.playAlarm();
      setErrorMessage(result.error || "Authentication failed.");
      addToast('error', 'Sign In Failed', result.error || "Invalid credentials.");
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playClick();
    setErrorMessage(null);
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setErrorMessage("Please complete all sign-up fields.");
      soundFx.playAlarm();
      return;
    }
    setLoading(true);
    const result = await signupCustom(fullName, email, password, selectedRole);
    setLoading(false);

    if (result.success) {
      soundFx.playLevelUp();
      addToast('success', 'Account Created', `Welcome ${fullName}! Your CYBERGUARD AI vault is active.`);
      setShowAuthModal(false);
      setTimeout(() => {
        if (selectedRole === 'SECURITY_ANALYST' || selectedRole === 'ADMIN') {
          navigate('/soc');
        } else {
          navigate('/dashboard');
        }
      }, 500);
    } else {
      soundFx.playAlarm();
      setErrorMessage(result.error || "Sign up failed.");
      addToast('error', 'Sign Up Failed', result.error || "Could not register account.");
    }
  };

  const handlePresetSelect = (role: Role) => {
    soundFx.playLevelUp();
    loginAsPreset(role);
    setShowAuthModal(false);
    addToast('info', 'Persona Authenticated', `Logged in as ${role}`);
    setTimeout(() => {
      if (role === 'SECURITY_ANALYST' || role === 'ADMIN') {
        navigate('/soc');
      } else {
        navigate('/dashboard');
      }
    }, 400);
  };

  // 12 DEDICATED CYBERGUARD SECURITY MODULES
  const featureCards: FeatureCardItem[] = [
    // SECTOR 01: CONSUMER FRAUD & IDENTITY PROTECTION
    {
      id: 'url-guard',
      title: 'Phishing & Rogue URL Guard',
      sectorId: 'SEC-01',
      sectorName: 'CONSUMER FRAUD SHIELD',
      rarity: 'MYTHIC',
      rarityBadgeClass: 'bg-cyan-500/20 text-[#00E5FF] border-cyan-500/60 shadow-cyber-glow',
      description: 'Real-time domain reputation inspection, typosquatting detection, SSL cert validation, and redirect protection.',
      icon: <Globe className="w-6 h-6" />,
      iconBgClass: 'bg-cyan-500/10 border-cyan-500/40 text-[#00E5FF]',
      borderColorClass: 'border-[#1E293B] hover:border-[#00E5FF]',
      hoverGlowClass: 'hover:shadow-[0_0_35px_rgba(0,229,255,0.3)]',
      textColorClass: 'group-hover:text-[#00E5FF]',
      buttonClass: 'bg-[#151F32] hover:bg-[#00E5FF] hover:text-black text-slate-200',
      highlights: ['● Live Domain Scan', '● SSL Cert Inspection', '● Phishing Blacklist'],
      powerStat: 'PWR: 99.8%',
      cooldownStat: 'COOL: 0s',
      targetRoute: '/scanner/url'
    },
    {
      id: 'sms-detector',
      title: 'SMS & Message Scam Detector',
      sectorId: 'SEC-01',
      sectorName: 'CONSUMER FRAUD SHIELD',
      rarity: 'LEGENDARY',
      rarityBadgeClass: 'bg-amber-500/20 text-amber-400 border-amber-500/60 shadow-cyber-glow',
      description: 'NLP neural model analyzing SMS text messages, WhatsApp phishing links, lottery traps, and bank warnings.',
      icon: <FileText className="w-6 h-6" />,
      iconBgClass: 'bg-amber-500/10 border-amber-500/40 text-amber-400',
      borderColorClass: 'border-[#1E293B] hover:border-amber-400',
      hoverGlowClass: 'hover:shadow-[0_0_35px_rgba(251,191,36,0.3)]',
      textColorClass: 'group-hover:text-amber-400',
      buttonClass: 'bg-[#151F32] hover:bg-amber-400 hover:text-black text-slate-200',
      highlights: ['● Social NLP Scanner', '● Impersonation Flag', '● Urgency Detector'],
      powerStat: 'PWR: 98.9%',
      cooldownStat: 'COOL: 0s',
      targetRoute: '/scanner/message'
    },
    {
      id: 'upi-shield',
      title: 'UPI & Payment Transfer Shield',
      sectorId: 'SEC-01',
      sectorName: 'CONSUMER FRAUD SHIELD',
      rarity: 'MYTHIC',
      rarityBadgeClass: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/60 shadow-cyber-glow',
      description: 'Prevents unauthorized VPA debit requests, flags money-mule accounts, and checks instant transfer safety.',
      icon: <CreditCard className="w-6 h-6" />,
      iconBgClass: 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400',
      borderColorClass: 'border-[#1E293B] hover:border-emerald-400',
      hoverGlowClass: 'hover:shadow-[0_0_35px_rgba(52,211,153,0.3)]',
      textColorClass: 'group-hover:text-emerald-400',
      buttonClass: 'bg-[#151F32] hover:bg-emerald-400 hover:text-black text-slate-200',
      highlights: ['● Mule Account Lookup', '● NPCI Fraud Engine', '● Debit Blocker'],
      powerStat: 'PWR: 99.9%',
      cooldownStat: 'COOL: 0s',
      targetRoute: '/upi-guard'
    },
    {
      id: 'qr-scanner',
      title: 'QR Code Security Scanner',
      sectorId: 'SEC-01',
      sectorName: 'CONSUMER FRAUD SHIELD',
      rarity: 'EPIC',
      rarityBadgeClass: 'bg-violet-500/20 text-violet-400 border-violet-500/60 shadow-cyber-glow',
      description: 'Decodes QR code payloads safely before rendering, preventing malformed redirect links and malicious apps.',
      icon: <QrCode className="w-6 h-6" />,
      iconBgClass: 'bg-violet-500/10 border-violet-500/40 text-violet-400',
      borderColorClass: 'border-[#1E293B] hover:border-violet-400',
      hoverGlowClass: 'hover:shadow-[0_0_35px_rgba(167,139,250,0.3)]',
      textColorClass: 'group-hover:text-violet-400',
      buttonClass: 'bg-[#151F32] hover:bg-violet-400 hover:text-black text-slate-200',
      highlights: ['● QR Payload Decoder', '● Qshing Protection', '● Safe Link Preview'],
      powerStat: 'PWR: 97.4%',
      cooldownStat: 'COOL: 0s',
      targetRoute: '/scanner/qr'
    },

    // SECTOR 02: AI FORENSICS & DEEPFAKE SECURITY
    {
      id: 'gemini-copilot',
      title: 'Gemini AI Security Copilot',
      sectorId: 'SEC-02',
      sectorName: 'AI FORENSICS ENGINE',
      rarity: 'LEGENDARY',
      rarityBadgeClass: 'bg-purple-500/20 text-purple-400 border-purple-500/60 shadow-cyber-glow',
      description: 'Interactive AI companion providing automated threat explanation, incident root-cause analysis, and playbooks.',
      icon: <Bot className="w-6 h-6" />,
      iconBgClass: 'bg-purple-500/10 border-purple-500/40 text-purple-400',
      borderColorClass: 'border-[#1E293B] hover:border-purple-400',
      hoverGlowClass: 'hover:shadow-[0_0_35px_rgba(192,132,252,0.3)]',
      textColorClass: 'group-hover:text-purple-400',
      buttonClass: 'bg-[#151F32] hover:bg-purple-400 hover:text-black text-slate-200',
      highlights: ['● LLM Chat Companion', '● Root Cause Audit', '● Security Code Auditor'],
      powerStat: 'PWR: 99.7%',
      cooldownStat: 'COOL: 0s',
      targetRoute: '/copilot'
    },
    {
      id: 'deepfake-detector',
      title: 'Deepfake Voice & Audio Scanner',
      sectorId: 'SEC-02',
      sectorName: 'AI FORENSICS ENGINE',
      rarity: 'MYTHIC',
      rarityBadgeClass: 'bg-pink-500/20 text-pink-400 border-pink-500/60 shadow-cyber-glow',
      description: 'Detects synthetic voice cloning, vocal frequency anomalies, voice-baiting bank scams, and AI impersonation.',
      icon: <Mic className="w-6 h-6" />,
      iconBgClass: 'bg-pink-500/10 border-pink-500/40 text-pink-400',
      borderColorClass: 'border-[#1E293B] hover:border-pink-400',
      hoverGlowClass: 'hover:shadow-[0_0_35px_rgba(244,114,182,0.3)]',
      textColorClass: 'group-hover:text-pink-400',
      buttonClass: 'bg-[#151F32] hover:bg-pink-400 hover:text-black text-slate-200',
      highlights: ['● Voice Clone Detector', '● Spectral Graph', '● Audio Forensics'],
      powerStat: 'PWR: 99.2%',
      cooldownStat: 'COOL: 0s',
      targetRoute: '/deepfake-detector'
    },
    {
      id: 'identity-vault',
      title: 'Identity Leak & PII Dark Web Vault',
      sectorId: 'SEC-02',
      sectorName: 'AI FORENSICS ENGINE',
      rarity: 'LEGENDARY',
      rarityBadgeClass: 'bg-red-500/20 text-red-400 border-red-500/60 shadow-cyber-glow',
      description: 'Searches compromised email dumps, leaked passwords, credit card exposures, and identity leak records.',
      icon: <Database className="w-6 h-6" />,
      iconBgClass: 'bg-red-500/10 border-red-500/40 text-red-400',
      borderColorClass: 'border-[#1E293B] hover:border-red-400',
      hoverGlowClass: 'hover:shadow-[0_0_35px_rgba(248,113,113,0.3)]',
      textColorClass: 'group-hover:text-red-400',
      buttonClass: 'bg-[#151F32] hover:bg-red-500 hover:text-white text-slate-200',
      highlights: ['● Email Breach Lookup', '● Dark Web Monitor', '● PII Leak Alerts'],
      powerStat: 'PWR: 98.6%',
      cooldownStat: 'COOL: 0s',
      targetRoute: '/identity'
    },
    {
      id: 'apk-guard',
      title: 'Mobile APK Permission Guard',
      sectorId: 'SEC-02',
      sectorName: 'AI FORENSICS ENGINE',
      rarity: 'EPIC',
      rarityBadgeClass: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/60 shadow-cyber-glow',
      description: 'Android package inspection detecting overlay malware, keyloggers, and accessibility service abuse.',
      icon: <Smartphone className="w-6 h-6" />,
      iconBgClass: 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400',
      borderColorClass: 'border-[#1E293B] hover:border-cyan-400',
      hoverGlowClass: 'hover:shadow-[0_0_35px_rgba(34,211,238,0.3)]',
      textColorClass: 'group-hover:text-cyan-400',
      buttonClass: 'bg-[#151F32] hover:bg-cyan-400 hover:text-black text-slate-200',
      highlights: ['● Permission Inspector', '● Trojan Detector', '● APK Signature Audit'],
      powerStat: 'PWR: 98.1%',
      cooldownStat: 'COOL: 0s',
      targetRoute: '/apk-scanner'
    },

    // SECTOR 03: ENTERPRISE CYBER OPERATIONS & SIEM
    {
      id: 'attack-simulator',
      title: 'Cyber Threat Attack Simulator',
      sectorId: 'SEC-03',
      sectorName: 'ENTERPRISE CYBER OPS',
      rarity: 'MYTHIC',
      rarityBadgeClass: 'bg-amber-500/20 text-amber-400 border-amber-500/60 shadow-cyber-glow',
      description: 'Simulates multi-stage cyber attacks: brute-force credential stuffing, ransomware, and SQL injection in a war game.',
      icon: <Radio className="w-6 h-6 animate-pulse" />,
      iconBgClass: 'bg-amber-500/10 border-amber-500/40 text-amber-400',
      borderColorClass: 'border-[#1E293B] hover:border-amber-400',
      hoverGlowClass: 'hover:shadow-[0_0_35px_rgba(251,191,36,0.3)]',
      textColorClass: 'group-hover:text-amber-400',
      buttonClass: 'bg-[#151F32] hover:bg-amber-400 hover:text-black text-slate-200',
      highlights: ['● Multi-Vector Simulator', '● War Room Arena', '● Auto Mitigation'],
      powerStat: 'PWR: 99.9%',
      cooldownStat: 'COOL: 0s',
      targetRoute: '/simulation'
    },
    {
      id: 'soc-hub',
      title: 'Enterprise SOC Incident Hub',
      sectorId: 'SEC-03',
      sectorName: 'ENTERPRISE CYBER OPS',
      rarity: 'LEGENDARY',
      rarityBadgeClass: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/60 shadow-cyber-glow',
      description: 'Central SOC monitoring command center featuring real-time telemetry, node graph topology, and SIEM correlation.',
      icon: <Terminal className="w-6 h-6" />,
      iconBgClass: 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400',
      borderColorClass: 'border-[#1E293B] hover:border-emerald-400',
      hoverGlowClass: 'hover:shadow-[0_0_35px_rgba(52,211,153,0.3)]',
      textColorClass: 'group-hover:text-emerald-400',
      buttonClass: 'bg-[#151F32] hover:bg-emerald-400 hover:text-black text-slate-200',
      highlights: ['● Node Topology Graph', '● SIEM Matrix', '● Analyst Triage Desk'],
      powerStat: 'PWR: 99.9%',
      cooldownStat: 'COOL: 0s',
      targetRoute: '/soc'
    },
    {
      id: 'persona-switcher',
      title: 'CyberGuard AI Login & Persona Portal',
      sectorId: 'SEC-03',
      sectorName: 'ENTERPRISE CYBER OPS',
      rarity: 'LEGENDARY',
      rarityBadgeClass: 'bg-[#00E5FF]/20 text-[#00E5FF] border-[#00E5FF]/60 shadow-cyber-glow',
      description: 'Single-click authentication portal for Consumer Guard, SOC Lead Analyst, and CISO System Admin views.',
      icon: <UserCheck className="w-6 h-6 text-[#00E5FF]" />,
      iconBgClass: 'bg-[#00E5FF]/10 border-[#00E5FF]/40 text-[#00E5FF]',
      borderColorClass: 'border-[#1E293B] hover:border-[#00E5FF]',
      hoverGlowClass: 'hover:shadow-[0_0_35px_rgba(0,229,255,0.3)]',
      textColorClass: 'group-hover:text-[#00E5FF]',
      buttonClass: 'bg-[#151F32] hover:bg-[#00E5FF] hover:text-black text-slate-200',
      highlights: ['● Consumer Guard Mode', '● SOC Analyst Mode', '● CISO Admin Mode'],
      powerStat: 'PWR: 100%',
      cooldownStat: 'COOL: 0s',
      targetRoute: '/login',
      isPresetModal: false
    },
    {
      id: 'threat-alerts',
      title: 'Real-time Threat Alerts Feed',
      sectorId: 'SEC-03',
      sectorName: 'ENTERPRISE CYBER OPS',
      rarity: 'EPIC',
      rarityBadgeClass: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/60 shadow-cyber-glow',
      description: 'Streaming security feed capturing live blocked threats, malware detections, and system alert updates.',
      icon: <Activity className="w-6 h-6 animate-pulse" />,
      iconBgClass: 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400',
      borderColorClass: 'border-[#1E293B] hover:border-cyan-400',
      hoverGlowClass: 'hover:shadow-[0_0_35px_rgba(34,211,238,0.3)]',
      textColorClass: 'group-hover:text-cyan-400',
      buttonClass: 'bg-[#151F32] hover:bg-cyan-400 hover:text-black text-slate-200',
      highlights: ['● Live Intercept Stream', '● Automated Risk Ranking', '● SIEM Alert Log'],
      powerStat: 'PWR: 99.1%',
      cooldownStat: 'COOL: 0s',
      targetRoute: '/alerts'
    }
  ];

  const handleCardClick = (card: FeatureCardItem) => {
    soundFx.playLaserScan();
    if (card.isPresetModal) {
      setAuthTab('presets');
      setShowAuthModal(true);
    } else {
      navigate(card.targetRoute);
    }
  };

  const filteredCards = activeTabSector === 'ALL' 
    ? featureCards 
    : featureCards.filter(c => c.sectorId === activeTabSector);

  return (
    <div className="min-h-screen bg-transparent text-[#F8FAFC] overflow-hidden relative selection:bg-cyan-500 selection:text-black font-mono">
      <ToastContainer toasts={toasts} onClose={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />

      {/* DUAL-TIER GAMING HUD STATS TOP BAR */}
      <div className="bg-gradient-to-r from-cyan-950 via-[#0B1220] to-purple-950 border-b border-[#1E293B] px-4 py-2 text-xs font-mono flex items-center justify-between text-slate-300">
        <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap">
          <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            CYBERGUARD AI — COMMAND MATRIX
          </span>
          <span className="text-slate-500">|</span>
          <span>Threats Intercepted: <strong className="text-white">{blockedCount.toLocaleString()}</strong></span>
          <span className="text-slate-500">|</span>
          <span>Player XP: <strong className="text-amber-400">{playerXp.toLocaleString()} XP</strong></span>
          <span className="text-slate-500">|</span>
          <span>Shield: <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">100% OPTIMAL</span></span>
        </div>
        <div className="hidden lg:flex items-center gap-3">
          <span className="text-slate-400">Latency: <strong className="text-cyan-400">14ms</strong></span>
          <button onClick={() => { soundFx.playClick(); navigate('/soc'); }} className="text-cyan-400 hover:underline flex items-center gap-1">
            <span>Quest HQ</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* MAIN NAVIGATION HEADER */}
      <nav className="h-20 border-b border-purple-500/30 bg-[#050811]/90 backdrop-blur-xl px-6 md:px-10 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => { soundFx.playClick(); navigate('/'); }}>
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-purple-600 via-cyan-500 to-amber-400 text-white shadow-cyber-glow">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <span className="font-black text-2xl tracking-wider text-white font-orbitron">CYBERGUARD<span className="text-[#00F0FF]">AI</span></span>
            <span className="block text-[10px] font-orbitron text-purple-300 tracking-widest uppercase flex items-center gap-1">
              <span className="badge-glow-dot"></span>
              <span>NEXT-GEN CYBER DEFENSE & SOC COMMAND</span>
            </span>
          </div>
        </div>

        {/* Anchor Links */}
        <div className="hidden xl:flex items-center gap-8 text-xs font-orbitron text-slate-300">
          <a href="#about" onClick={() => soundFx.playClick()} className="hover:text-[#00F0FF] transition-colors">About</a>
          <a href="#metrics" onClick={() => soundFx.playClick()} className="hover:text-[#00F0FF] transition-colors">Metrics</a>
          <a href="#modules" onClick={() => soundFx.playClick()} className="hover:text-[#00F0FF] transition-colors">Modules</a>
          <a href="#specs" onClick={() => soundFx.playClick()} className="hover:text-[#00F0FF] transition-colors">Specs</a>
          <a href="#faq" onClick={() => soundFx.playClick()} className="hover:text-[#00F0FF] transition-colors">FAQ</a>
          <a href="#sentinels" onClick={() => soundFx.playClick()} className="hover:text-[#00F0FF] transition-colors">Sentinels</a>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 font-mono">
          {isAuthenticated && (
            <button
              onClick={() => {
                soundFx.playClick();
                logout();
                addToast('info', 'Signed Out', 'You have been logged out of CYBERGUARD AI.');
              }}
              className="px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/40 hover:border-red-400 text-red-400 font-orbitron text-xs font-bold transition-all flex items-center gap-2 shadow-cyber-glow cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          )}

          <button
            onClick={() => { soundFx.playClick(); navigate('/login'); }}
            className="px-4 py-2.5 rounded-xl bg-[#0B1220] border border-purple-500/40 hover:border-[#00F0FF] text-xs text-slate-200 hover:text-white transition-all shadow-cyber-glow cursor-pointer"
          >
            Sign In
          </button>
          
          <button
            onClick={() => { soundFx.playClick(); navigate('/login'); }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-cyan-500 to-emerald-400 text-black font-extrabold text-xs shadow-cyber-glow hover:scale-105 transition-all font-orbitron cursor-pointer"
          >
            Login Portal
          </button>

          <button
            onClick={() => { soundFx.playClick(); navigate('/soc'); }}
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B1220] border border-cyan-500/40 hover:border-cyan-400 text-cyan-400 font-orbitron text-xs font-bold transition-all cursor-pointer"
          >
            <Swords className="w-4 h-4" />
            <span>Quest HQ</span>
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-24 px-6 max-w-7xl mx-auto text-center overflow-hidden">
        <div className="bg-grid"></div>

        <div className="relative z-10 space-y-6 max-w-4xl mx-auto">
          <div className="section-badge mx-auto">
            <span className="badge-glow-dot"></span>
            <span>CYBERGUARD AI DEFENSE COMMAND MATRIX</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white font-orbitron leading-none drop-shadow-[0_0_25px_rgba(168,85,247,0.5)]">
            CYBERGUARD AI
          </h1>
          <p className="text-xl md:text-2xl font-orbitron font-bold text-cyan-400 tracking-wider">
            NEXT-GENERATION AI CYBER DEFENSE OPERATING SYSTEM
          </p>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto font-sans leading-relaxed">
            Real-time phishing URL inspection, synthetic deepfake voice detection, UPI fraud shield, mobile APK permission auditor, and autonomous SOC incident playbooks.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
            <button
              onClick={() => { soundFx.playLaserScan(); navigate('/soc'); }}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-cyan-400 to-emerald-400 text-black font-extrabold text-sm shadow-cyber-glow hover:scale-105 transition-all flex items-center gap-2 font-orbitron cursor-pointer"
            >
              <Swords className="w-5 h-5" />
              <span>LAUNCH SOC COMMAND HQ</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => { soundFx.playLaserScan(); navigate('/simulation'); }}
              className="px-8 py-4 rounded-2xl bg-[#0B1220] border border-amber-500/50 hover:border-amber-400 text-amber-400 font-bold text-sm transition-all flex items-center gap-2 shadow-lg font-orbitron cursor-pointer"
            >
              <Radio className="w-5 h-5 text-amber-400 animate-pulse" />
              <span>ENTER THREAT WAR ROOM</span>
            </button>
          </div>
        </div>
      </section>

      {/* FEATURED CLICKABLE LOGIN PORTAL CARD */}
      <section className="py-8 px-6 max-w-7xl mx-auto" id="login-card">
        <div 
          onClick={() => {
            soundFx.playLaserScan();
            navigate('/login');
          }}
          className="glass-card p-8 md:p-10 rounded-3xl border-2 border-[#00E5FF]/60 hover:border-[#00E5FF] shadow-[0_0_40px_rgba(0,229,255,0.25)] hover:shadow-[0_0_60px_rgba(0,229,255,0.45)] transition-all cursor-pointer relative overflow-hidden group font-mono text-left"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#00E5FF]/20 via-purple-600/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-[#0F172A] border-2 border-[#00E5FF] text-[#00E5FF] flex items-center justify-center text-3xl shrink-0 shadow-[0_0_25px_rgba(0,229,255,0.4)] group-hover:scale-110 transition-transform">
                🔐
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/60 text-[11px] font-orbitron font-extrabold uppercase tracking-widest shadow-cyber-glow">
                    🛡️ CYBERGUARD AI LOGIN PORTAL
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold">
                    CLICK TO ACCESS SEPARATE LOGIN PAGE
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-black text-white font-orbitron group-hover:text-[#00E5FF] transition-colors">
                  CYBERGUARD AI AUTHENTICATION & ACCESS PORTAL
                </h2>

                <p className="text-sm text-slate-300 max-w-2xl font-sans leading-relaxed">
                  Click anywhere on this card to launch the dedicated CYBERGUARD AI Login Page. Access JWT Sign In, user account registration, hardware PIN factor verification, and CISO persona switching.
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300 pt-2">
                  <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-[#00E5FF]" /> Account Sign In / Sign Up
                  </span>
                  <span className="flex items-center gap-1.5 text-purple-400 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-purple-400" /> Hardware PIN Access
                  </span>
                  <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" /> SOC / CISO Persona Switch
                  </span>
                </div>
              </div>
            </div>

            <div className="shrink-0 w-full lg:w-auto">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  soundFx.playLaserScan();
                  navigate('/login');
                }}
                className="w-full lg:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#00E5FF] via-purple-600 to-emerald-400 text-black font-orbitron font-extrabold text-sm shadow-[0_0_25px_rgba(0,229,255,0.4)] group-hover:scale-105 transition-all flex items-center justify-center gap-3 cursor-pointer uppercase tracking-wider"
              >
                <span>OPEN SEPARATE LOGIN PAGE</span>
                <ArrowRight className="w-5 h-5 text-black" />
              </button>
            </div>
          </div>

          <div className="cyber-box-decor"></div>
        </div>
      </section>

      {/* ABOUT PLATFORM SECTION */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-purple-500/20" id="about">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="section-badge">🧠 ABOUT CYBERGUARD AI</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white font-orbitron leading-tight">
              Autonomous AI Cyber Defense & Incident Response Engine
            </h2>
            <p className="text-slate-300 text-base leading-relaxed font-sans">
              CYBERGUARD AI is an advanced multi-layered cybersecurity command platform powered by neural AI models. It unifies consumer threat protection with enterprise SOC incident monitoring, providing instant threat detection, forensic analysis, and automated mitigation.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed font-sans">
              Whether you are analyzing suspicious URLs, inspecting APK malware payloads, verifying deepfake audio authenticity, or orchestrating zero-trust SOAR playbooks, CyberGuard AI protects your digital ecosystem in real time.
            </p>

            {/* About Stats Grid */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="glass-card p-4 text-center">
                <div className="text-3xl font-black text-[#00F0FF] font-orbitron">24/7</div>
                <div className="text-xs text-slate-400 font-orbitron mt-1">Real-Time Defense</div>
              </div>
              <div className="glass-card p-4 text-center">
                <div className="text-3xl font-black text-purple-400 font-orbitron">12</div>
                <div className="text-xs text-slate-400 font-orbitron mt-1">Security Modules</div>
              </div>
              <div className="glass-card p-4 text-center">
                <div className="text-3xl font-black text-amber-400 font-orbitron">99.9%</div>
                <div className="text-xs text-slate-400 font-orbitron mt-1">Interception Rate</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="glass-card p-10 text-center space-y-4 relative overflow-hidden group">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-purple-500/10 border border-purple-500/40 text-purple-400 flex items-center justify-center text-4xl shadow-cyber-glow">
                🛡️
              </div>
              <h3 className="text-2xl font-black text-white font-orbitron">DETECT. PROTECT. DEFEND.</h3>
              <p className="text-xs text-slate-400 font-sans">Zero-Trust Security Matrix Active on Node Cluster.</p>
              <div className="cyber-box-decor"></div>
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORM METRICS SECTION */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-purple-500/20" id="metrics">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="section-badge">⚡ PLATFORM METRICS</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white font-orbitron">
            Real-Time Defense Capabilities
          </h2>
          <p className="text-slate-400 text-sm md:text-base font-sans">
            Enterprise-grade defense metrics powered by continuous neural threat scanning and automated SOAR playbooks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card p-8 text-center space-y-3 relative group">
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 font-bold text-[10px] border border-cyan-500/40 font-orbitron">INTERCEPTIONS</span>
            <div className="text-5xl my-2">🛡️</div>
            <div className="text-xs text-slate-400 font-orbitron">Threat Neutralized</div>
            <div className="text-3xl font-black text-cyan-400 font-orbitron">1.4M+</div>
            <span className="text-[10px] text-emerald-400 font-bold block">+25 XP per Threat Block</span>
          </div>

          <div className="glass-card p-8 text-center space-y-3 relative group">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 font-bold text-[10px] border border-amber-500/40 font-orbitron">ACCURACY</span>
            <div className="text-5xl my-2">⚡</div>
            <div className="text-xs text-slate-400 font-orbitron">AI Detection Precision</div>
            <div className="text-3xl font-black text-amber-400 font-orbitron">99.8%</div>
            <span className="text-[10px] text-emerald-400 font-bold block">Zero False Positives</span>
          </div>

          <div className="glass-card p-8 text-center space-y-3 relative group">
            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 font-bold text-[10px] border border-purple-500/40 font-orbitron">LATENCY</span>
            <div className="text-5xl my-2">⏱️</div>
            <div className="text-xs text-slate-400 font-orbitron">Interception Speed</div>
            <div className="text-3xl font-black text-purple-400 font-orbitron">&lt; 10ms</div>
            <span className="text-[10px] text-emerald-400 font-bold block">Instant SOAR Response</span>
          </div>

          <div className="glass-card p-8 text-center space-y-3 relative group">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] border border-emerald-500/40 font-orbitron">UPTIME</span>
            <div className="text-5xl my-2">🌐</div>
            <div className="text-xs text-slate-400 font-orbitron">Sentinel Uptime</div>
            <div className="text-3xl font-black text-emerald-400 font-orbitron">99.99%</div>
            <span className="text-[10px] text-emerald-400 font-bold block">Continuous Monitoring</span>
          </div>
        </div>
      </section>

      {/* 12 INTERACTIVE 3D FLIP MODULE CARDS SECTION */}
      <section id="modules" className="py-20 px-6 max-w-7xl mx-auto border-t border-purple-500/20">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="section-badge">💡 DEFENSE ARMORY & MODULES</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white font-orbitron">
            12 Security Modules
          </h2>
          <p className="text-slate-400 text-sm md:text-base font-sans">
            Choose any security module. Click a card to flip 180° and view specs or launch its standalone tool page!
          </p>

          {/* Search Box & Category Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 font-mono text-xs">
            <div className="flex items-center gap-2 bg-[#0B1220] p-1.5 rounded-2xl border border-purple-500/40 w-full sm:w-auto">
              <button
                onClick={() => { soundFx.playClick(); setActiveTabSector('ALL'); }}
                className={`px-4 py-2 rounded-xl transition-all font-orbitron font-bold cursor-pointer ${
                  activeTabSector === 'ALL' ? 'bg-[#00F0FF] text-black shadow-cyber-glow' : 'text-slate-400 hover:text-white'
                }`}
              >
                All Modules
              </button>
              <button
                onClick={() => { soundFx.playClick(); setActiveTabSector('SEC-01'); }}
                className={`px-4 py-2 rounded-xl transition-all font-orbitron font-bold cursor-pointer ${
                  activeTabSector === 'SEC-01' ? 'bg-cyan-500 text-black shadow-cyber-glow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Consumer Fraud
              </button>
              <button
                onClick={() => { soundFx.playClick(); setActiveTabSector('SEC-02'); }}
                className={`px-4 py-2 rounded-xl transition-all font-orbitron font-bold cursor-pointer ${
                  activeTabSector === 'SEC-02' ? 'bg-purple-500 text-black shadow-cyber-glow' : 'text-slate-400 hover:text-white'
                }`}
              >
                AI Forensics
              </button>
              <button
                onClick={() => { soundFx.playClick(); setActiveTabSector('SEC-03'); }}
                className={`px-4 py-2 rounded-xl transition-all font-orbitron font-bold cursor-pointer ${
                  activeTabSector === 'SEC-03' ? 'bg-emerald-500 text-black shadow-cyber-glow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Enterprise Ops
              </button>
            </div>

            {/* Search Input Bar */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search modules (e.g. AI, UPI, APK)..."
                className="w-full bg-[#0B1220] border border-purple-500/40 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] font-mono"
              />
            </div>
          </div>
        </div>

        {/* 3D FLIP CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCards
            .filter(c => !searchQuery || c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.description.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((card) => {
              const isFlipped = flippedCardId === card.id;
              return (
                <div key={card.id} className="domain-card-perspective h-80">
                  <div className={`domain-card-inner ${isFlipped ? 'is-flipped' : ''}`}>
                    
                    {/* CARD FRONT SIDE */}
                    <div 
                      onClick={() => { soundFx.playLaserScan(); setFlippedCardId(isFlipped ? null : card.id); }}
                      className="domain-card-front glass-card p-7 flex flex-col justify-between cursor-pointer relative overflow-hidden group"
                    >
                      <div className="space-y-4 text-left">
                        <div className="flex items-center justify-between">
                          <div className={`p-3.5 rounded-2xl border ${card.iconBgClass}`}>
                            {card.icon}
                          </div>
                          <span className={`px-3 py-1 rounded-full text-[10px] font-orbitron font-extrabold uppercase tracking-wider ${card.rarityBadgeClass}`}>
                            ✨ {card.rarity}
                          </span>
                        </div>

                        <div>
                          <h3 className={`text-xl font-bold text-white font-orbitron ${card.textColorClass} transition-colors flex items-center justify-between`}>
                            <span>{card.title}</span>
                          </h3>
                          <p className="text-xs text-slate-400 mt-2 leading-relaxed font-sans line-clamp-2">
                            {card.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-[#1E293B] text-[10px] font-orbitron text-cyan-400">
                        <span>Click to flip 🔄</span>
                        <span className="text-slate-400 font-mono">{card.powerStat}</span>
                      </div>
                      <div className="cyber-box-decor"></div>
                    </div>

                    {/* CARD BACK SIDE */}
                    <div 
                      className="domain-card-back glass-card p-7 flex flex-col justify-between text-left space-y-4"
                      onClick={() => { soundFx.playClick(); setFlippedCardId(null); }}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-bold text-white font-orbitron">{card.title}</h3>
                          <span className="text-[10px] text-purple-400 font-orbitron font-bold">Tap to return</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed font-sans">
                          {card.description}
                        </p>
                        <div className="bg-[#0B1220] p-3 rounded-xl border border-purple-500/30 space-y-1 text-[11px] font-mono text-slate-300">
                          {card.highlights.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-1.5">
                              <span className="text-cyan-400 font-bold">•</span>
                              <span>{item.replace('● ', '')}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(card);
                        }}
                        className={`w-full py-3 rounded-xl ${card.buttonClass} font-orbitron text-xs font-extrabold transition-all flex items-center justify-center gap-2 shadow-md uppercase tracking-wider cursor-pointer`}
                      >
                        <span>Launch Tool Page →</span>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
        </div>
      </section>

      {/* SYSTEM SPECIFICATIONS SECTION */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-purple-500/20" id="specs">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="section-badge">📋 SYSTEM SPECIFICATIONS</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white font-orbitron">
            Enterprise Security Specifications
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card p-7 text-center space-y-2">
            <div className="text-3xl my-1">⚡</div>
            <div className="text-xs text-purple-300 font-orbitron font-bold">Processing Speed</div>
            <div className="text-sm font-bold text-white font-sans">Sub-10ms Threat Audit</div>
          </div>
          <div className="glass-card p-7 text-center space-y-2">
            <div className="text-3xl my-1">🤖</div>
            <div className="text-xs text-purple-300 font-orbitron font-bold">AI Core</div>
            <div className="text-sm font-bold text-white font-sans">Gemini 1.5 Pro & Vision</div>
          </div>
          <div className="glass-card p-7 text-center space-y-2">
            <div className="text-3xl my-1">🔒</div>
            <div className="text-xs text-purple-300 font-orbitron font-bold">Encryption Standard</div>
            <div className="text-sm font-bold text-white font-sans">AES-256 Zero-Knowledge Vault</div>
          </div>
          <div className="glass-card p-7 text-center space-y-2">
            <div className="text-3xl my-1">🌐</div>
            <div className="text-xs text-purple-300 font-orbitron font-bold">Deployment Architecture</div>
            <div className="text-sm font-bold text-white font-sans">Cloud SOC & Mobile Guard</div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 px-6 max-w-5xl mx-auto border-t border-purple-500/20" id="faq">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="section-badge">❓ FREQUENTLY ASKED QUESTIONS</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white font-orbitron">
            Platform Capabilities FAQ
          </h2>
        </div>

        <div className="space-y-4">
          {[
            { q: "How does CyberGuard AI detect phishing URLs and rogue domains?", a: "Our URL scanner checks domain age, typosquatting patterns, SSL certificate validity, and real-time blacklists to score domain safety instantly." },
            { q: "How does the Deepfake Voice & Audio Scanner verify audio authenticity?", a: "It performs spectral frequency analysis and neural acoustic auditing to detect synthetic voice cloning, voice-baiting scams, and AI impersonation." },
            { q: "What protection does the UPI Payment Shield provide?", a: "It analyzes VPA handles against known money-mule accounts, flags suspicious QR payment codes, and blocks unauthorized debit requests." },
            { q: "Can CyberGuard AI integrate with existing Enterprise SOC / SIEM workflows?", a: "Yes, CyberGuard AI provides real-time WebSocket telemetry feeds, automated SOAR playbooks, and a multi-view persona switcher for Analysts and CISOs." }
          ].map((item, idx) => (
            <div key={idx} className="glass-card p-6 cursor-pointer" onClick={() => { soundFx.playClick(); setFaqOpenIndex(faqOpenIndex === idx ? null : idx); }}>
              <div className="flex items-center justify-between font-orbitron text-sm font-bold text-white">
                <span>{item.q}</span>
                <span className="text-cyan-400 text-lg">{faqOpenIndex === idx ? '−' : '+'}</span>
              </div>
              {faqOpenIndex === idx && (
                <p className="text-xs text-slate-300 pt-3 leading-relaxed font-sans border-t border-purple-500/20 mt-3">
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CYBER SENTINEL ENGINES SECTION */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-purple-500/20" id="sentinels">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="section-badge">🛡️ CYBER SENTINEL ENGINES</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white font-orbitron">
            Core Autonomous Sub-Systems
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { name: 'Sentinel Alpha', role: 'Phishing Interceptor', initials: 'SA' },
            { name: 'Voice Forensic AI', role: 'Deepfake Classifier', initials: 'VF' },
            { name: 'Sentinel SOC Grid', role: 'SIEM Threat Correlator', initials: 'SG' },
            { name: 'Gemini Copilot', role: 'Neural Companion Engine', initials: 'GC' }
          ].map((member, idx) => (
            <div key={idx} className="glass-card p-6 text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-purple-600 to-cyan-400 p-0.5 shadow-cyber-glow">
                <div className="w-full h-full bg-[#050811] rounded-full flex items-center justify-center font-orbitron font-bold text-white text-base">
                  {member.initials}
                </div>
              </div>
              <h3 className="font-orbitron font-bold text-white text-sm">{member.name}</h3>
              <p className="text-xs text-purple-300 font-mono">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-purple-500/30 bg-[#050811] py-12 px-6 text-xs font-mono text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-600 text-white">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <span className="font-black text-lg text-white font-orbitron">CYBERGUARD<span className="text-[#00F0FF]">AI</span></span>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-orbitron text-[11px]">
            <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
            <a href="#metrics" className="hover:text-cyan-400 transition-colors">Metrics</a>
            <a href="#modules" className="hover:text-cyan-400 transition-colors">Modules</a>
            <button onClick={() => { soundFx.playClick(); navigate('/soc'); }} className="hover:text-amber-400 transition-colors">Quest HQ</button>
            <button onClick={() => { soundFx.playClick(); navigate('/simulation'); }} className="hover:text-purple-400 transition-colors font-bold">War Room</button>
          </div>

          <p className="text-slate-500 font-sans">© 2026 CYBERGUARD AI. All rights reserved.</p>
        </div>
      </footer>

      {/* AUTHENTICATION MODAL */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-[#0F1420] border border-[#232D42] rounded-3xl p-8 shadow-2xl space-y-6 relative text-center font-mono"
            >
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white rounded-xl bg-[#161D2F]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-sky-600 via-cyan-500 to-emerald-400 text-slate-950 w-fit mx-auto shadow-cyber-glow">
                <ShieldAlert className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">CYBERGUARD AI AUTHENTICATION</h3>
                <p className="text-xs font-mono text-cyan-400 mt-1 uppercase">Zero-Trust Account Access Portal</p>
              </div>

              {/* Navigation Tabs */}
              <div className="flex rounded-2xl bg-[#161D2F] p-1 border border-[#232D42] font-mono text-xs">
                <button
                  onClick={() => { setAuthTab('signin'); setErrorMessage(null); }}
                  className={`flex-1 py-2 rounded-xl transition-all font-bold ${
                    authTab === 'signin' ? 'bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 shadow-cyber-glow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setAuthTab('signup'); setErrorMessage(null); }}
                  className={`flex-1 py-2 rounded-xl transition-all font-bold ${
                    authTab === 'signup' ? 'bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 shadow-cyber-glow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Sign Up
                </button>
                <button
                  onClick={() => { setAuthTab('presets'); setErrorMessage(null); }}
                  className={`flex-1 py-2 rounded-xl transition-all font-bold ${
                    authTab === 'presets' ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-cyber-glow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Demo
                </button>
              </div>

              {/* ERROR ALERT BADGE */}
              {errorMessage && (
                <div className="p-3 rounded-2xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-mono text-left flex items-start gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* 1. SIGN IN TAB */}
              {authTab === 'signin' && (
                <form onSubmit={handleSignIn} className="space-y-4 font-mono text-xs text-left">
                  <div className="space-y-1">
                    <label className="text-slate-400">Registered Email Address</label>
                    <div className="flex items-center gap-2 px-3 py-2.5 bg-[#161D2F] border border-[#232D42] rounded-xl focus-within:border-cyan-400">
                      <Mail className="w-4 h-4 text-slate-500" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. user@cyberguard.demo or your email"
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
                        placeholder="Enter account password"
                        className="w-full bg-transparent text-white focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-extrabold text-xs shadow-cyber-glow hover:scale-105 transition-all mt-2 disabled:opacity-50"
                  >
                    {loading ? 'VERIFYING CREDENTIALS...' : 'SIGN IN TO CYBERGUARD'}
                  </button>

                  <p className="text-[11px] text-slate-500 text-center pt-1">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => { setAuthTab('signup'); setErrorMessage(null); }}
                      className="text-cyan-400 font-bold hover:underline"
                    >
                      Sign Up here
                    </button>
                  </p>
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
                        placeholder="e.g. Surya Prakash"
                        className="w-full bg-transparent text-white focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400">Valid Email Address</label>
                    <div className="flex items-center gap-2 px-3 py-2.5 bg-[#161D2F] border border-[#232D42] rounded-xl focus-within:border-cyan-400">
                      <Mail className="w-4 h-4 text-slate-500" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. surya@example.com"
                        className="w-full bg-transparent text-white focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400">Create Password</label>
                    <div className="flex items-center gap-2 px-3 py-2.5 bg-[#161D2F] border border-[#232D42] rounded-xl focus-within:border-cyan-400">
                      <Lock className="w-4 h-4 text-slate-500" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Minimum 4 characters"
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
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-400 text-slate-950 font-extrabold text-xs shadow-cyber-glow hover:scale-105 transition-all mt-2 disabled:opacity-50"
                  >
                    {loading ? 'REGISTERING ACCOUNT...' : 'REGISTER & CREATE FREE ACCOUNT'}
                  </button>

                  <p className="text-[11px] text-slate-500 text-center pt-1">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => { setAuthTab('signin'); setErrorMessage(null); }}
                      className="text-cyan-400 font-bold hover:underline"
                    >
                      Sign In here
                    </button>
                  </p>
                </form>
              )}

              {/* 3. DEMO PRESETS TAB */}
              {authTab === 'presets' && (
                <div className="space-y-3 font-mono text-xs">
                  <p className="text-xs text-slate-400 font-sans">Instant single-click persona authentication:</p>

                  <button
                    onClick={() => handlePresetSelect('SECURITY_ANALYST')}
                    className="w-full p-3.5 rounded-2xl bg-[#161D2F] border border-amber-500/30 hover:border-amber-500 text-left transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                        <Terminal className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white font-sans">SOC Analyst Persona</p>
                        <p className="text-[10px] font-mono text-slate-400">analyst@cyberguard.demo • pass: password123</p>
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
                        <p className="text-xs font-bold text-white font-sans">Consumer User Persona</p>
                        <p className="text-[10px] font-mono text-slate-400">user@cyberguard.demo • pass: password123</p>
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
                        <p className="text-xs font-bold text-white font-sans">System Admin Persona</p>
                        <p className="text-[10px] font-mono text-slate-400">admin@cyberguard.demo • pass: password123</p>
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
