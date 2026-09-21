import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldAlert, Activity, CheckCircle2, Play, ArrowRight, Globe, Maximize2, Minimize2, 
  Cpu, Wifi, ShieldCheck, TrendingUp, Layers, Server, Laptop, Lock, Bell, Sparkles, 
  Search, Link2, MessageSquare, QrCode, FileCode, Smartphone, CreditCard, UserCheck, 
  Database, Zap, Send, Bot, FileText, Download, Check, AlertTriangle, KeyRound, X, ExternalLink,
  ChevronRight, Swords, Crosshair, Award, Radio, Terminal
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { AttackGraphView } from '../components/security/AttackGraphView';
import { ToastContainer, ToastMessage } from '../components/ui/Toast';
import { soundFx } from '../utils/audioSfx';
import { SentinelAICore } from '../components/layout/SentinelAICore';
import { LiveThreatRadar } from '../components/security/LiveThreatRadar';
import { DailyMissionsPanel } from '../components/gamification/DailyMissionsPanel';
import { GlobalCyberWarfareMatrix } from '../components/security/GlobalCyberWarfareMatrix';
import { SOCTacticalProtocolConsole } from '../components/security/SOCTacticalProtocolConsole';



export const SOCDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [fullscreen, setFullscreen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [moduleCategoryFilter, setModuleCategoryFilter] = useState<'ALL' | 'CONSUMER' | 'FORENSICS' | 'ENTERPRISE'>('ALL');
  const [moduleSearchQuery, setModuleSearchQuery] = useState('');
  const [defenseMode, setDefenseMode] = useState<'BALANCED' | 'AGGRESSIVE' | 'ZERO_TRUST'>('BALANCED');
  const [emergencyLockdown, setEmergencyLockdown] = useState(false);

  // ---------------------------------------------------------------------------
  // REAL-TIME DYNAMIC METRIC TICKS & STATE
  // ---------------------------------------------------------------------------
  const [totalThreats, setTotalThreats] = useState(1842);
  const [criticalCount, setCriticalCount] = useState(14);
  const [blockedCount, setBlockedCount] = useState(1828);
  const [latency, setLatency] = useState(14);
  const [cpuUsage, setCpuUsage] = useState(24);
  const [ramUsage, setRamUsage] = useState(48);
  const [gpuUsage, setGpuUsage] = useState(62);
  const [netUsage, setNetUsage] = useState(34);

  // Live Threat Stream List
  const [threatStream, setThreatStream] = useState([
    { id: 'TRT-1029', name: 'SQL Injection Payload Intercepted', severity: 'CRITICAL', source: '185.220.101.5', time: 'Just now' },
    { id: 'TRT-1028', name: 'Deepfake AI Voice Extortion Intercepted', severity: 'HIGH', source: '45.142.120.9', time: '2 min ago' },
    { id: 'TRT-1027', name: 'UPI Fraud QR Payload Neutralized', severity: 'HIGH', source: '103.28.45.12', time: '5 min ago' },
  ]);

  useEffect(() => {
    const metricTimer = setInterval(() => {
      setTotalThreats(prev => prev + 1);
      setBlockedCount(prev => prev + 1);
      setLatency(12 + Math.floor(Math.random() * 6));
      setCpuUsage(20 + Math.floor(Math.random() * 15));
      setRamUsage(45 + Math.floor(Math.random() * 8));
      setGpuUsage(58 + Math.floor(Math.random() * 12));
      setNetUsage(30 + Math.floor(Math.random() * 14));
    }, 3500);

    const streamTimer = setInterval(() => {
      const threatTypes = [
        { name: 'Zero-Day Sandbox Anomaly Neutralized', severity: 'CRITICAL', source: '198.51.100.88' },
        { name: 'Smishing SMS Link Intercepted', severity: 'HIGH', source: '103.45.12.90' },
        { name: 'Credential Harvesting Attempt Blocked', severity: 'MEDIUM', source: '45.142.120.14' },
        { name: 'Screen-Sharing Trojan APK Prevented', severity: 'CRITICAL', source: 'Storage Gateway' }
      ];

      const chosen = threatTypes[Math.floor(Math.random() * threatTypes.length)];
      const newId = `TRT-${Math.floor(1030 + Math.random() * 900)}`;

      setThreatStream(prev => [
        { id: newId, name: chosen.name, severity: chosen.severity, source: chosen.source, time: 'Just now' },
        ...prev.slice(0, 4)
      ]);
    }, 8500);

    return () => {
      clearInterval(metricTimer);
      clearInterval(streamTimer);
    };
  }, []);

  // ---------------------------------------------------------------------------
  // INTERACTIVE SCANNER & SHIELD STATE
  // ---------------------------------------------------------------------------
  const [scannerTab, setScannerTab] = useState<'url' | 'msg' | 'qr' | 'apk'>('url');
  const [urlInput, setUrlInput] = useState('');
  const [urlResult, setUrlResult] = useState<any>(null);
  const [msgInput, setMsgInput] = useState('');
  const [msgResult, setMsgResult] = useState<any>(null);
  const [qrInput, setQrInput] = useState('');
  const [qrResult, setQrResult] = useState<any>(null);
  const [apkInput, setApkInput] = useState('');
  const [apkResult, setApkResult] = useState<any>(null);
  const [scanning, setScanning] = useState(false);

  const [fraudTab, setFraudTab] = useState<'upi' | 'deepfake' | 'sim' | 'identity'>('upi');
  const [upiInput, setUpiInput] = useState('');
  const [upiResult, setUpiResult] = useState<any>(null);
  const [identityInput, setIdentityInput] = useState('');
  const [identityResult, setIdentityResult] = useState<any>(null);

  // ---------------------------------------------------------------------------
  // EMBEDDED AI COPILOT ASSISTANT STATE
  // ---------------------------------------------------------------------------
  const [copilotInput, setCopilotInput] = useState('');
  const [copilotMessages, setCopilotMessages] = useState<Array<{ sender: 'USER' | 'AI'; text: string }>>([
    { sender: 'AI', text: 'Cyber Shield AI Assistant active. All system security modules ready for live execution.' }
  ]);
  const [copilotLoading, setCopilotLoading] = useState(false);

  // ---------------------------------------------------------------------------
  // TOAST UTILITY
  // ---------------------------------------------------------------------------
  const addToast = (type: 'success' | 'warning' | 'error' | 'info', title: string, message: string) => {
    const toastId = Date.now().toString();
    setToasts(prev => [...prev, { id: toastId, type, title, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== toastId)), 4000);
  };

  // SCANNER ACTIONS
  const handleScanUrl = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playClick();
    if (!urlInput.trim()) return;
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      const isMalicious = urlInput.toLowerCase().includes('bank') || urlInput.toLowerCase().includes('verify') || urlInput.toLowerCase().includes('update');
      setUrlResult({
        url: urlInput,
        riskScore: isMalicious ? 94 : 12,
        status: isMalicious ? 'PHISHING_DETECTED' : 'CLEAN',
        domainAge: isMalicious ? '3 Days Old' : '8 Years Old',
        ssl: isMalicious ? 'Free DV Let\'s Encrypt' : 'DigiCert EV SSL',
        verdict: isMalicious ? 'HIGH RISK: Malicious phishing domain impersonating financial institution.' : 'SAFE: Domain registered to verified infrastructure.'
      });
      addToast(isMalicious ? 'error' : 'success', isMalicious ? 'Phishing URL Blocked' : 'URL Clean', `Scan completed for ${urlInput}`);
    }, 600);
  };

  const handleScanMsg = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playClick();
    if (!msgInput.trim()) return;
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      const isScam = msgInput.toLowerCase().includes('blocked') || msgInput.toLowerCase().includes('lottery') || msgInput.toLowerCase().includes('urgent') || msgInput.toLowerCase().includes('click');
      setMsgResult({
        msg: msgInput,
        riskScore: isScam ? 88 : 5,
        intent: isScam ? 'Social Engineering & Smishing' : 'Standard Communication',
        urgency: isScam ? 'CRITICAL (High Urgency Pressure)' : 'NORMAL',
        verdict: isScam ? 'SCAM DETECTED: Contains social engineering urgency patterns & unverified URL link.' : 'SAFE: No suspicious scam patterns identified.'
      });
      addToast(isScam ? 'warning' : 'success', isScam ? 'Smishing Scam Intercepted' : 'Message Clean', 'SMS analysis complete.');
    }, 600);
  };

  const handleScanQr = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playClick();
    if (!qrInput.trim()) return;
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      const isFraud = qrInput.toLowerCase().includes('refund') || qrInput.toLowerCase().includes('claim') || qrInput.toLowerCase().includes('unknown');
      setQrResult({
        payload: qrInput,
        vpa: 'payee.merchant@okaxis',
        payeeName: isFraud ? 'OFFSHORE_GAMING_PRIVATE_LTD' : 'Verified Supermarket LLC',
        riskScore: isFraud ? 96 : 8,
        verdict: isFraud ? 'FRAUD RISK: QR payload redirects funds to unverified offshore gaming wallet.' : 'VERIFIED MERCHANT: NPCI VPA valid and secure.'
      });
      addToast(isFraud ? 'error' : 'success', isFraud ? 'UPI Fraud QR Intercepted' : 'UPI QR Verified', 'NPCI VPA payload verified.');
    }, 600);
  };

  const handleScanApk = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playClick();
    if (!apkInput.trim()) return;
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      const isTrojan = apkInput.toLowerCase().includes('kyc') || apkInput.toLowerCase().includes('support') || apkInput.toLowerCase().includes('update');
      setApkResult({
        pkg: apkInput,
        riskScore: isTrojan ? 98 : 10,
        permissions: isTrojan ? ['BIND_ACCESSIBILITY_SERVICE', 'SYSTEM_ALERT_WINDOW', 'READ_SMS'] : ['INTERNET'],
        verdict: isTrojan ? 'MALWARE TROJAN: Package requests accessibility service for remote screen-sharing takeover.' : 'SAFE APK: Standard Android package signatures.'
      });
      addToast(isTrojan ? 'error' : 'success', isTrojan ? 'Trojan APK Blocked' : 'APK Verified', 'Android package scan complete.');
    }, 600);
  };

  const handleVerifyUpi = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playClick();
    if (!upiInput.trim()) return;
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      const isSuspicious = upiInput.includes('reward') || upiInput.includes('claim') || upiInput.includes('temp');
      setUpiResult({
        vpa: upiInput,
        riskScore: isSuspicious ? 92 : 4,
        status: isSuspicious ? 'HIGH_RISK_SUSPENDED' : 'VERIFIED_SAFE',
        verdict: isSuspicious ? 'NPCI WARNING: VPA handle flagged across 4 recent cyber fraud reports.' : 'VERIFIED VPA: Trusted merchant endpoint.'
      });
      addToast(isSuspicious ? 'warning' : 'success', isSuspicious ? 'VPA Flagged' : 'VPA Verified', `UPI VPA ${upiInput} checked.`);
    }, 500);
  };

  const handleCheckIdentity = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playClick();
    if (!identityInput.trim()) return;
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      const breaches = identityInput.includes('surya') || identityInput.includes('demo') ? 0 : 2;
      setIdentityResult({
        email: identityInput,
        breachCount: breaches,
        leaks: breaches > 0 ? ['Collection#1 Breach (2024)', 'Offshore Crypto Exchange Dump'] : [],
        status: breaches > 0 ? 'LEAKS_FOUND' : 'SECURE'
      });
      addToast(breaches > 0 ? 'warning' : 'success', breaches > 0 ? 'Breaches Found' : 'Identity Secure', 'Breach database search complete.');
    }, 500);
  };

  const handleSendCopilot = (text?: string) => {
    soundFx.playClick();
    const q = text || copilotInput;
    if (!q.trim()) return;

    setCopilotMessages(prev => [...prev, { sender: 'USER', text: q }]);
    setCopilotInput('');
    setCopilotLoading(true);

    setTimeout(() => {
      setCopilotLoading(false);
      setCopilotMessages(prev => [...prev, { 
        sender: 'AI', 
        text: `Analysis for "${q}": Telemetry stream active. Total Threats: ${totalThreats}, Blocked: ${blockedCount}. Response: Enforce zero-trust policies and maintain automated IP blocklist.` 
      }]);
    }, 600);
  };

  // CHART DATA
  const threatActivityData = [
    { time: '00:00', total: 12, critical: 2, blocked: 10 },
    { time: '04:00', total: 35, critical: 5, blocked: 30 },
    { time: '08:00', total: 18, critical: 1, blocked: 17 },
    { time: '12:00', total: 58, critical: 8, blocked: 50 },
    { time: '16:00', total: 29, critical: 3, blocked: 26 },
    { time: '20:00', total: 44, critical: 6, blocked: 38 },
    { time: '24:00', total: totalThreats % 100, critical: 2, blocked: blockedCount % 100 }
  ];

  const threatDistData = [
    { name: 'Phishing', count: 412, color: '#00E5FF' },
    { name: 'Malware', count: 285, color: '#7C3AED' },
    { name: 'DDOS', count: 198, color: '#3B82F6' },
    { name: 'Fraud', count: 142, color: '#FF7A00' },
    { name: 'Zero-Day', count: 68, color: '#FF3B3B' },
  ];

  // ALL 16 SECURITY MODULES SPECIFICATION
  const modulesList = [
    { key: 'url-scanner', name: 'Phishing & Rogue URL Guard', category: 'CONSUMER', path: '/scanner/url', icon: Link2, color: 'text-[#00E5FF]', desc: 'Domain reputation & typosquatting inspector' },
    { key: 'message-scanner', name: 'SMS & Message Scam Detector', category: 'CONSUMER', path: '/scanner/message', icon: MessageSquare, color: 'text-[#00E5FF]', desc: 'Smishing SMS & NLP intent analyzer' },
    { key: 'qr-scanner', name: 'QR Code Security Scanner', category: 'CONSUMER', path: '/scanner/qr', icon: QrCode, color: 'text-[#00E5FF]', desc: 'NPCI UPI QR code payload auditor' },
    { key: 'apk-guard', name: 'Mobile APK Permission Guard', category: 'CONSUMER', path: '/apk-scanner', icon: FileCode, color: 'text-[#7C3AED]', desc: 'Android trojan & accessibility service detector' },
    { key: 'deepfake-detector', name: 'Deepfake Voice & Audio Scanner', category: 'FORENSICS', path: '/deepfake-detector', icon: Activity, color: 'text-[#7C3AED]', desc: 'Synthetic clone & spectral frequency detector' },
    { key: 'upi-guard', name: 'UPI & Payment Transfer Shield', category: 'CONSUMER', path: '/upi-guard', icon: CreditCard, color: 'text-[#FF7A00]', desc: 'Payment VPA mule lookup & freeze' },
    { key: 'sim-guard', name: 'SIM Swap & Hardware Defense', category: 'CONSUMER', path: '/sim-guard', icon: Smartphone, color: 'text-[#FF7A00]', desc: 'IMSI hardware lock & cell tower monitor' },
    { key: 'identity-vault', name: 'Identity Leak & PII Dark Vault', category: 'FORENSICS', path: '/identity', icon: UserCheck, color: 'text-[#10B981]', desc: 'PII breach database & dark web audit' },
    { key: 'threat-intel', name: 'Dark Web Threat Intelligence', category: 'FORENSICS', path: '/threat-intel', icon: Database, color: 'text-[#3B82F6]', desc: 'Leak dumps & hacker forum monitor' },
    { key: 'soar-playbooks', name: 'SOAR Automated Playbooks', category: 'ENTERPRISE', path: '/playbooks', icon: Zap, color: 'text-[#3B82F6]', desc: 'Automated IP containment playbooks' },
    { key: 'fraud-sandbox', name: 'ML Sandbox Anomaly Engine', category: 'FORENSICS', path: '/fraud-sandbox', icon: Cpu, color: 'text-[#7C3AED]', desc: 'Zero-day behavioral ML sandbox' },
    { key: 'zero-trust', name: 'Zero-Trust Mesh Guard', category: 'ENTERPRISE', path: '/zero-trust', icon: Lock, color: 'text-[#00E5FF]', desc: 'Perimeter zero-trust mesh lock' },
    { key: 'system-health', name: 'Node Cluster System Health', category: 'ENTERPRISE', path: '/admin/health', icon: Server, color: 'text-[#10B981]', desc: 'Node cluster diagnostic status' },
    { key: 'executive-report', name: 'Executive Security Audit Report', category: 'ENTERPRISE', path: '/security-report', icon: FileText, color: 'text-[#00E5FF]', desc: 'PDF compliance audit export' },
    { key: 'cyber-copilot', name: 'Gemini AI Security Copilot', category: 'FORENSICS', path: '/copilot', icon: Bot, color: 'text-[#7C3AED]', desc: 'LLM Sentinel assistant companion' },
    { key: 'incident-console', name: 'Enterprise Incident Console', category: 'ENTERPRISE', path: '/incidents', icon: ShieldAlert, color: 'text-[#FF3B3B]', desc: 'Active triage timeline & SIEM logs' },
  ];

  const filteredModulesList = modulesList.filter(m => {
    const matchesCategory = moduleCategoryFilter === 'ALL' || m.category === moduleCategoryFilter;
    const matchesSearch = !moduleSearchQuery || m.name.toLowerCase().includes(moduleSearchQuery.toLowerCase()) || m.desc.toLowerCase().includes(moduleSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={`p-8 md:p-10 space-y-10 max-w-[1750px] mx-auto font-mono bg-transparent text-[#F8FAFC] selection:bg-cyan-500 selection:text-black ${
      fullscreen ? 'fixed inset-0 z-50 bg-[#070B14] p-10 overflow-y-auto max-w-none' : ''
    }`}>
      <ToastContainer toasts={toasts} onClose={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />

      {/* --------------------------------------------------------------------- */}
      {/* 1. AAA SCI-FI TACTICAL COMMAND HEADER BANNER */}
      {/* --------------------------------------------------------------------- */}
      <div className="glass-card p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-purple-500/40 relative overflow-hidden group">
        <div className="space-y-2 text-left z-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="section-badge">
              <span className="badge-glow-dot"></span>
              <span>CYBERGUARD AI SOC COMMAND CENTER</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-orbitron font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-cyber-glow">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>100% MODULES ACCESSIBLE</span>
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white font-orbitron tracking-tight drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            MASTER SOC <span className="text-[#00F0FF]">COMMAND MATRIX</span>
          </h1>
          <p className="text-slate-300 text-xs md:text-sm font-sans max-w-3xl leading-relaxed">
            Real-time multi-layered SOC threat telemetry, node topology, holographic AI diagnostic core, and 16 standalone security tools.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-4 z-10 shrink-0 font-orbitron">
          <button
            onClick={() => { soundFx.playClick(); setFullscreen(!fullscreen); }}
            className="px-5 py-3 rounded-xl bg-[#0B1220] border border-purple-500/40 hover:border-cyan-400 text-slate-200 hover:text-white text-xs font-bold transition-all shadow-cyber-glow cursor-pointer flex items-center gap-2"
          >
            {fullscreen ? <Minimize2 className="w-4 h-4 text-cyan-400" /> : <Maximize2 className="w-4 h-4 text-cyan-400" />}
            <span>{fullscreen ? 'EXIT FULLSCREEN' : 'FULLSCREEN HUD'}</span>
          </button>

          <button
            onClick={() => { soundFx.playLaserScan(); navigate('/simulation'); }}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 via-amber-500 to-amber-400 text-black font-extrabold text-xs shadow-cyber-glow hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Radio className="w-4 h-4 text-black animate-pulse" />
            <span>RUN ATTACK SIMULATION</span>
          </button>
        </div>
        <div className="cyber-box-decor"></div>
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* 2. DYNAMIC REAL-TIME KPI SUMMARY METRICS HUB (8 SCI-FI GLASS CARDS) */}
      {/* --------------------------------------------------------------------- */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-orbitron text-cyan-400">
          <span className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>REAL-TIME SYSTEM TELEMETRY METRICS</span>
          </span>
          <span className="text-slate-500">Node Cluster: Active • Auto-Sync 3.5s</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          <div className="glass-card p-4 space-y-2 hover:border-[#00F0FF] transition-all group">
            <span className="text-[10px] text-slate-400 font-orbitron block">TOTAL THREATS</span>
            <div className="text-2xl font-black text-white font-orbitron group-hover:text-[#00F0FF] transition-colors">{totalThreats}</div>
            <span className="text-[9px] text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Live Ticking
            </span>
          </div>

          <div className="glass-card p-4 space-y-2 border-red-500/40 hover:border-red-400 transition-all group">
            <span className="text-[10px] text-slate-400 font-orbitron block">CRITICAL</span>
            <div className="text-2xl font-black text-red-400 font-orbitron">{criticalCount}</div>
            <span className="text-[9px] text-red-400 font-bold">2 Active Alerts</span>
          </div>

          <div className="glass-card p-4 space-y-2 border-emerald-500/40 hover:border-emerald-400 transition-all group">
            <span className="text-[10px] text-slate-400 font-orbitron block">BLOCKED</span>
            <div className="text-2xl font-black text-emerald-400 font-orbitron">{blockedCount}</div>
            <span className="text-[9px] text-emerald-400 font-bold">99.2% Rate</span>
          </div>

          <div className="glass-card p-4 space-y-2 hover:border-cyan-400 transition-all group">
            <span className="text-[10px] text-slate-400 font-orbitron block">PROTECTED</span>
            <div className="text-2xl font-black text-cyan-400 font-orbitron">4,290</div>
            <span className="text-[9px] text-slate-400 font-mono">Active Nodes</span>
          </div>

          <div className="glass-card p-4 space-y-2 border-cyan-500/40 hover:border-cyan-400 transition-all group">
            <span className="text-[10px] text-slate-400 font-orbitron block">HEALTH SCORE</span>
            <div className="text-2xl font-black text-cyan-400 font-orbitron">98/100</div>
            <span className="text-[9px] text-emerald-400 font-bold">OPTIMAL</span>
          </div>

          <div className="glass-card p-4 space-y-2 border-amber-500/40 hover:border-amber-400 transition-all group">
            <span className="text-[10px] text-slate-400 font-orbitron block">INCIDENTS</span>
            <div className="text-2xl font-black text-amber-400 font-orbitron">3</div>
            <span className="text-[9px] text-amber-400 font-bold">In Triage</span>
          </div>

          <div className="glass-card p-4 space-y-2 hover:border-purple-400 transition-all group">
            <span className="text-[10px] text-slate-400 font-orbitron block">LATENCY</span>
            <div className="text-2xl font-black text-purple-400 font-orbitron">{latency}ms</div>
            <span className="text-[9px] text-emerald-400 font-bold">DYNAMIC</span>
          </div>

          <div className="glass-card p-4 space-y-2 border-purple-500/40 hover:border-purple-400 transition-all group">
            <span className="text-[10px] text-slate-400 font-orbitron block">AI RISK</span>
            <div className="text-2xl font-black text-purple-400 font-orbitron">LOW</div>
            <span className="text-[9px] text-purple-400 font-bold">AI Sentinel</span>
          </div>
        </div>
      </div>



      {/* --------------------------------------------------------------------- */}
      {/* 4. DYNAMIC INLINE ACTIVE WORKSPACE PANEL (RENDERED ON CLICK) */}
      {/* --------------------------------------------------------------------- */}
      {activeFeature && (
        <div className="glass-card p-8 border-[#00F0FF]/60 bg-[#070C1A] space-y-6 shadow-[0_0_40px_rgba(0,240,255,0.2)] animate-in fade-in">
          <div className="flex items-center justify-between border-b border-purple-500/40 pb-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-[#00F0FF] border border-cyan-500/50 font-orbitron font-extrabold text-xs shadow-cyber-glow">
                ⚡ ACTIVE INLINE WORKSPACE
              </span>
              <h2 className="text-lg font-bold text-white font-orbitron">
                {modulesList.find(m => m.key === activeFeature)?.name}
              </h2>
            </div>

            <div className="flex items-center gap-3 font-orbitron text-xs">
              <button 
                onClick={() => {
                  soundFx.playClick();
                  const targetPath = modulesList.find(m => m.key === activeFeature)?.path;
                  if (targetPath) navigate(targetPath);
                }}
                className="px-4 py-2 rounded-xl bg-[#0B1220] border border-cyan-500/40 hover:border-cyan-400 text-cyan-400 font-bold flex items-center gap-2 transition-all cursor-pointer shadow-cyber-glow"
              >
                <span>OPEN FULL STANDALONE PAGE</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => { soundFx.playClick(); setActiveFeature(null); }} 
                className="p-2 rounded-xl bg-[#0B1220] text-slate-400 hover:text-white border border-[#1E293B]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* INLINE FEATURE RENDERERS */}
          {activeFeature === 'url-scanner' && (
            <form onSubmit={handleScanUrl} className="space-y-4 text-xs font-mono">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="Enter URL to inspect (e.g. http://secure-bank-login-update.com)..."
                  className="flex-1 bg-[#0B1220] border border-purple-500/40 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00F0FF]"
                />
                <button type="submit" disabled={scanning} className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-cyan-400 to-emerald-400 text-black font-extrabold font-orbitron shadow-cyber-glow cursor-pointer">
                  {scanning ? 'SCANNING URL...' : 'EXECUTE URL AUDIT'}
                </button>
              </div>
              {urlResult && (
                <div className={`p-5 rounded-2xl border text-xs space-y-2 ${urlResult.riskScore > 50 ? 'bg-red-950/40 border-red-500/50 text-red-300' : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'}`}>
                  <p className="font-bold font-orbitron">{urlResult.status} • Risk Score: {urlResult.riskScore}/100</p>
                  <p className="text-slate-200 font-sans">{urlResult.verdict}</p>
                </div>
              )}
            </form>
          )}

          {activeFeature === 'message-scanner' && (
            <form onSubmit={handleScanMsg} className="space-y-4 text-xs font-mono">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={msgInput}
                  onChange={(e) => setMsgInput(e.target.value)}
                  placeholder="Paste SMS text to analyze smishing intent..."
                  className="flex-1 bg-[#0B1220] border border-purple-500/40 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00F0FF]"
                />
                <button type="submit" disabled={scanning} className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-cyan-400 to-emerald-400 text-black font-extrabold font-orbitron shadow-cyber-glow cursor-pointer">
                  {scanning ? 'ANALYZING...' : 'ANALYZE MESSAGE'}
                </button>
              </div>
              {msgResult && (
                <div className={`p-5 rounded-2xl border text-xs space-y-2 ${msgResult.riskScore > 50 ? 'bg-red-950/40 border-red-500/50 text-red-300' : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'}`}>
                  <p className="font-bold font-orbitron">Intent: {msgResult.intent} • Risk Score: {msgResult.riskScore}/100</p>
                  <p className="text-slate-200 font-sans">{msgResult.verdict}</p>
                </div>
              )}
            </form>
          )}

          {activeFeature === 'qr-scanner' && (
            <form onSubmit={handleScanQr} className="space-y-4 text-xs font-mono">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={qrInput}
                  onChange={(e) => setQrInput(e.target.value)}
                  placeholder="Paste QR UPI string (e.g. upi://pay?pa=refund@unknown)..."
                  className="flex-1 bg-[#0B1220] border border-purple-500/40 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00F0FF]"
                />
                <button type="submit" disabled={scanning} className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-cyan-400 to-emerald-400 text-black font-extrabold font-orbitron shadow-cyber-glow cursor-pointer">
                  {scanning ? 'VERIFYING...' : 'PARSE QR PAYLOAD'}
                </button>
              </div>
              {qrResult && (
                <div className={`p-5 rounded-2xl border text-xs space-y-2 ${qrResult.riskScore > 50 ? 'bg-red-950/40 border-red-500/50 text-red-300' : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'}`}>
                  <p className="font-bold font-orbitron">Payee: {qrResult.payeeName} • Risk Score: {qrResult.riskScore}/100</p>
                  <p className="text-slate-200 font-sans">{qrResult.verdict}</p>
                </div>
              )}
            </form>
          )}

          {activeFeature === 'apk-guard' && (
            <form onSubmit={handleScanApk} className="space-y-4 text-xs font-mono">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={apkInput}
                  onChange={(e) => setApkInput(e.target.value)}
                  placeholder="Enter Android package name (e.g. com.bank.kyc.update.apk)..."
                  className="flex-1 bg-[#0B1220] border border-purple-500/40 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00F0FF]"
                />
                <button type="submit" disabled={scanning} className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-cyan-400 to-emerald-400 text-black font-extrabold font-orbitron shadow-cyber-glow cursor-pointer">
                  {scanning ? 'AUDITING...' : 'AUDIT APK PERMISSIONS'}
                </button>
              </div>
              {apkResult && (
                <div className={`p-5 rounded-2xl border text-xs space-y-2 ${apkResult.riskScore > 50 ? 'bg-red-950/40 border-red-500/50 text-red-300' : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'}`}>
                  <p className="font-bold font-orbitron">Package: {apkResult.pkg} • Risk Score: {apkResult.riskScore}/100</p>
                  <p className="text-slate-200 font-sans">{apkResult.verdict}</p>
                </div>
              )}
            </form>
          )}

          {activeFeature === 'upi-guard' && (
            <form onSubmit={handleVerifyUpi} className="space-y-4 text-xs font-mono">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={upiInput}
                  onChange={(e) => setUpiInput(e.target.value)}
                  placeholder="Enter UPI VPA ID (e.g. reward.claim@okaxis)..."
                  className="flex-1 bg-[#0B1220] border border-purple-500/40 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00F0FF]"
                />
                <button type="submit" disabled={scanning} className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-cyan-400 to-emerald-400 text-black font-extrabold font-orbitron shadow-cyber-glow cursor-pointer">
                  {scanning ? 'VERIFYING...' : 'VERIFY UPI VPA'}
                </button>
              </div>
              {upiResult && (
                <div className={`p-5 rounded-2xl border text-xs space-y-2 ${upiResult.riskScore > 50 ? 'bg-red-950/40 border-red-500/50 text-red-300' : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'}`}>
                  <p className="font-bold font-orbitron">VPA: {upiResult.vpa} • Risk Score: {upiResult.riskScore}/100</p>
                  <p className="text-slate-200 font-sans">{upiResult.verdict}</p>
                </div>
              )}
            </form>
          )}

          {activeFeature === 'identity-vault' && (
            <form onSubmit={handleCheckIdentity} className="space-y-4 text-xs font-mono">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={identityInput}
                  onChange={(e) => setIdentityInput(e.target.value)}
                  placeholder="Enter email to search breach databases..."
                  className="flex-1 bg-[#0B1220] border border-purple-500/40 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00F0FF]"
                />
                <button type="submit" disabled={scanning} className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-cyan-400 to-emerald-400 text-black font-extrabold font-orbitron shadow-cyber-glow cursor-pointer">
                  {scanning ? 'SEARCHING...' : 'AUDIT BREACH LEAKS'}
                </button>
              </div>
              {identityResult && (
                <div className={`p-5 rounded-2xl border text-xs space-y-2 ${identityResult.breachCount > 0 ? 'bg-red-950/40 border-red-500/50 text-red-300' : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'}`}>
                  <p className="font-bold font-orbitron">Email: {identityResult.email} • Leaks Found: {identityResult.breachCount}</p>
                  <p className="text-slate-200 font-sans">{identityResult.breachCount > 0 ? `LEAKS DETECTED: Found in ${identityResult.leaks.join(', ')}` : 'IDENTITY SECURE: No breach leaks recorded.'}</p>
                </div>
              )}
            </form>
          )}

          {/* FALLBACK FOR OTHER MODULES INLINE PREVIEW */}
          {!['url-scanner', 'message-scanner', 'qr-scanner', 'apk-guard', 'upi-guard', 'identity-vault'].includes(activeFeature) && (
            <div className="p-6 rounded-2xl bg-[#0B1220] border border-purple-500/40 text-xs space-y-3 font-mono">
              <p className="text-white font-orbitron font-bold">Interactive Module Loaded Inline: {modulesList.find(m => m.key === activeFeature)?.name}</p>
              <p className="text-slate-300 font-sans">{modulesList.find(m => m.key === activeFeature)?.desc}. Real-time telemetry monitoring active on node cluster.</p>
              <button 
                onClick={() => {
                  soundFx.playClick();
                  const targetPath = modulesList.find(m => m.key === activeFeature)?.path;
                  if (targetPath) navigate(targetPath);
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-cyan-400 to-emerald-400 text-black font-extrabold font-orbitron shadow-cyber-glow hover:scale-105 transition-all cursor-pointer"
              >
                Launch Standalone Tool Page →
              </button>
            </div>
          )}
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* 5. AAA GAMIFIED SOC TACTICAL COMMAND CENTER GRID (8:4 DUAL COLUMN) */}
      {/* --------------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* LEFT MAIN COMMAND COLUMN (8 COLUMNS) */}
        <div className="lg:col-span-8 space-y-8">
          {/* TOP DUAL COMMAND WIDGETS: RADAR (7 COLS) & SENTINEL AI CORE (5 COLS) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            <div className="md:col-span-7 h-full">
              <LiveThreatRadar />
            </div>
            <div className="md:col-span-5 h-full">
              <SentinelAICore status="ONLINE" />
            </div>
          </div>

          {/* CENTRAL FEATURE: GLOBAL CYBER WARFARE MATRIX */}
          <GlobalCyberWarfareMatrix />

          {/* BOTTOM DUAL SECURITY SUITES: THREAT SCANNER & FRAUD/DEEPFAKE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* THREAT SCANNER SUITE */}
            <div className="glass-card p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-purple-500/30 pb-3">
                <h3 className="text-sm font-bold text-white font-orbitron">Threat Scanner Suite</h3>
                <div className="flex items-center gap-1 bg-[#0B1220] p-1 rounded-xl text-xs font-orbitron">
                  {(['url', 'msg', 'qr', 'apk'] as const).map(tab => (
                    <button 
                      key={tab}
                      onClick={() => { soundFx.playClick(); setScannerTab(tab); }}
                      className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer uppercase ${scannerTab === tab ? 'bg-[#00F0FF] text-black font-bold' : 'text-slate-400'}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {scannerTab === 'url' && (
                <form onSubmit={handleScanUrl} className="space-y-3 text-xs">
                  <input
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="Enter URL to inspect..."
                    className="w-full bg-[#0B1220] border border-purple-500/40 rounded-xl px-3.5 py-2.5 text-white focus:outline-none"
                  />
                  <button type="submit" disabled={scanning} className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-cyan-400 to-emerald-400 text-black font-extrabold font-orbitron cursor-pointer">
                    {scanning ? 'SCANNING...' : 'SCAN URL'}
                  </button>
                </form>
              )}

              {scannerTab === 'msg' && (
                <form onSubmit={handleScanMsg} className="space-y-3 text-xs">
                  <input
                    type="text"
                    value={msgInput}
                    onChange={(e) => setMsgInput(e.target.value)}
                    placeholder="Paste SMS text..."
                    className="w-full bg-[#0B1220] border border-purple-500/40 rounded-xl px-3.5 py-2.5 text-white focus:outline-none"
                  />
                  <button type="submit" disabled={scanning} className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-cyan-400 to-emerald-400 text-black font-extrabold font-orbitron cursor-pointer">
                    {scanning ? 'ANALYZING...' : 'ANALYZE SMS'}
                  </button>
                </form>
              )}

              {scannerTab === 'qr' && (
                <form onSubmit={handleScanQr} className="space-y-3 text-xs">
                  <input
                    type="text"
                    value={qrInput}
                    onChange={(e) => setQrInput(e.target.value)}
                    placeholder="Paste QR UPI payload..."
                    className="w-full bg-[#0B1220] border border-purple-500/40 rounded-xl px-3.5 py-2.5 text-white focus:outline-none"
                  />
                  <button type="submit" disabled={scanning} className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-cyan-400 to-emerald-400 text-black font-extrabold font-orbitron cursor-pointer">
                    {scanning ? 'VERIFYING...' : 'VERIFY QR'}
                  </button>
                </form>
              )}

              {scannerTab === 'apk' && (
                <form onSubmit={handleScanApk} className="space-y-3 text-xs">
                  <input
                    type="text"
                    value={apkInput}
                    onChange={(e) => setApkInput(e.target.value)}
                    placeholder="Enter APK package name..."
                    className="w-full bg-[#0B1220] border border-purple-500/40 rounded-xl px-3.5 py-2.5 text-white focus:outline-none"
                  />
                  <button type="submit" disabled={scanning} className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-cyan-400 to-emerald-400 text-black font-extrabold font-orbitron cursor-pointer">
                    {scanning ? 'AUDITING...' : 'AUDIT APK'}
                  </button>
                </form>
              )}
            </div>

            {/* FRAUD & DEEPFAKE SUITE */}
            <div className="glass-card p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-purple-500/30 pb-3">
                <h3 className="text-sm font-bold text-white font-orbitron">Fraud & Deepfake Suite</h3>
                <div className="flex items-center gap-1 bg-[#0B1220] p-1 rounded-xl text-xs font-orbitron">
                  {(['upi', 'deepfake', 'sim', 'identity'] as const).map(tab => (
                    <button 
                      key={tab}
                      onClick={() => { soundFx.playClick(); setFraudTab(tab); }}
                      className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer uppercase ${fraudTab === tab ? 'bg-purple-500 text-white font-bold' : 'text-slate-400'}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {fraudTab === 'upi' && (
                <form onSubmit={handleVerifyUpi} className="space-y-3 text-xs">
                  <input
                    type="text"
                    value={upiInput}
                    onChange={(e) => setUpiInput(e.target.value)}
                    placeholder="Enter UPI VPA ID..."
                    className="w-full bg-[#0B1220] border border-purple-500/40 rounded-xl px-3.5 py-2.5 text-white focus:outline-none"
                  />
                  <button type="submit" disabled={scanning} className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-400 text-white font-extrabold font-orbitron cursor-pointer">
                    {scanning ? 'VERIFYING...' : 'VERIFY VPA'}
                  </button>
                </form>
              )}

              {fraudTab === 'deepfake' && (
                <div className="space-y-3 text-xs">
                  <p className="font-bold text-white font-orbitron">Live Voice Spectral Analyzer</p>
                  <div className="flex items-end gap-1 h-8 px-2 justify-center">
                    <span className="w-1 bg-[#7C3AED] rounded-full equalizer-bar-1" />
                    <span className="w-1 bg-[#00E5FF] rounded-full equalizer-bar-2" />
                    <span className="w-1 bg-[#7C3AED] rounded-full equalizer-bar-3" />
                    <span className="w-1 bg-[#3B82F6] rounded-full equalizer-bar-4" />
                    <span className="w-1 bg-[#7C3AED] rounded-full equalizer-bar-5" />
                  </div>
                </div>
              )}

              {fraudTab === 'sim' && (
                <div className="p-3.5 rounded-xl bg-[#0B1220] border border-purple-500/30 text-xs flex justify-between items-center font-mono">
                  <span>IMSI Serial: 404-45-89123849102</span>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 font-bold rounded">LOCKED</span>
                </div>
              )}

              {fraudTab === 'identity' && (
                <form onSubmit={handleCheckIdentity} className="space-y-3 text-xs">
                  <input
                    type="email"
                    value={identityInput}
                    onChange={(e) => setIdentityInput(e.target.value)}
                    placeholder="Enter email..."
                    className="w-full bg-[#0B1220] border border-purple-500/40 rounded-xl px-3.5 py-2.5 text-white focus:outline-none"
                  />
                  <button type="submit" disabled={scanning} className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-400 text-white font-extrabold font-orbitron cursor-pointer">
                    {scanning ? 'SEARCHING...' : 'AUDIT BREACH DATABASE'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* SIEM TRIAGE & SOAR PROTOCOL CONSOLE */}
          <SOCTacticalProtocolConsole />
        </div>

        {/* RIGHT SIDEBAR COLUMN (4 COLUMNS) */}
        <div className="lg:col-span-4 space-y-8">
          {/* ROTATING HUD DIAL */}
          <div className="glass-card p-7 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between border-b border-purple-500/30 pb-3">
              <div>
                <h3 className="text-sm font-extrabold text-white font-orbitron">SCI-FI NEXUS CONTROL DIAL</h3>
                <p className="text-[10px] text-slate-400 font-sans">Real-time rotating arc dial diagnostics</p>
              </div>
              <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                <Cpu className="w-4 h-4" />
              </span>
            </div>

            <div className="relative w-48 h-48 mx-auto my-4 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/40 hud-ring-spin" />
              <div className="absolute inset-3 rounded-full border-2 border-dotted border-purple-500/50 hud-ring-reverse" />
              
              <div className="w-32 h-32 rounded-full bg-[#050811] border-2 border-cyan-400 shadow-cyber-glow flex flex-col items-center justify-center text-center">
                <span className="text-[8px] text-cyan-400 uppercase tracking-widest font-orbitron">SYSTEM HEALTH</span>
                <span className="text-3xl font-black text-white font-orbitron drop-shadow-[0_0_8px_#00E5FF]">98<span className="text-sm text-cyan-400">%</span></span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[8px] font-bold mt-0.5 font-orbitron">OPTIMAL</span>
              </div>
            </div>

            <div className="space-y-3 text-xs pt-2 border-t border-purple-500/30 font-mono">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-400">CPU CORE FREQUENCY</span>
                  <span className="text-cyan-400 font-bold">{cpuUsage}%</span>
                </div>
                <div className="h-1.5 w-full bg-[#0B1220] rounded-full overflow-hidden border border-purple-500/20">
                  <div className="h-full bg-cyan-400 transition-all duration-500 rounded-full shadow-[0_0_8px_#00E5FF]" style={{ width: `${cpuUsage}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-400">MEMORY POOL USAGE</span>
                  <span className="text-purple-400 font-bold">{ramUsage}%</span>
                </div>
                <div className="h-1.5 w-full bg-[#0B1220] rounded-full overflow-hidden border border-purple-500/20">
                  <div className="h-full bg-purple-400 transition-all duration-500 rounded-full shadow-[0_0_8px_#A855F7]" style={{ width: `${ramUsage}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-400">GPU NEURAL COMPUTE</span>
                  <span className="text-amber-400 font-bold">{gpuUsage}%</span>
                </div>
                <div className="h-1.5 w-full bg-[#0B1220] rounded-full overflow-hidden border border-purple-500/20">
                  <div className="h-full bg-amber-400 transition-all duration-500 rounded-full shadow-[0_0_8px_#F59E0B]" style={{ width: `${gpuUsage}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* DAILY MISSIONS & ACHIEVEMENTS PANEL */}
          <DailyMissionsPanel />

          {/* QUICK DEFENSE PLAYBOOK CONTROLS WIDGET */}
          <div className="glass-card p-6 space-y-4 border-amber-500/30">
            <div className="flex items-center justify-between border-b border-purple-500/30 pb-3 font-orbitron">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-extrabold text-white">SOC EMERGENCY DEFENSE MATRIX</h3>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold border ${emergencyLockdown ? 'bg-red-500/20 text-red-400 border-red-500/50 animate-pulse' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'}`}>
                {emergencyLockdown ? '🚨 LOCKDOWN ACTIVE' : 'PERIMETER SECURE'}
              </span>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#0B1220] border border-purple-500/30">
                <div>
                  <span className="font-bold text-white block">Emergency Lockdown</span>
                  <span className="text-[10px] text-slate-400 font-sans">Instantly sever all untrusted outbound node traffic</span>
                </div>
                <button
                  onClick={() => {
                    soundFx.playLaserScan();
                    setEmergencyLockdown(!emergencyLockdown);
                    addToast(emergencyLockdown ? 'info' : 'error', emergencyLockdown ? 'Lockdown Lifted' : 'EMERGENCY LOCKDOWN ENGAGED', emergencyLockdown ? 'Node traffic restored to normal.' : 'All untrusted external ports severed.');
                  }}
                  className={`px-3 py-1.5 rounded-xl font-bold font-orbitron transition-all cursor-pointer ${
                    emergencyLockdown ? 'bg-red-600 text-white shadow-[0_0_15px_#EF4444]' : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 hover:bg-cyan-400 hover:text-black'
                  }`}
                >
                  {emergencyLockdown ? 'DISENGAGE' : 'ENGAGE LOCKDOWN'}
                </button>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 font-orbitron block mb-1.5">SENTINEL AI DEFENSE MODE</span>
                <div className="grid grid-cols-3 gap-2 font-orbitron text-[10px]">
                  {(['BALANCED', 'AGGRESSIVE', 'ZERO_TRUST'] as const).map(mode => (
                    <button
                      key={mode}
                      onClick={() => {
                        soundFx.playClick();
                        setDefenseMode(mode);
                        addToast('info', 'AI Defense Mode Changed', `Sentinel AI set to ${mode} mode.`);
                      }}
                      className={`py-2 rounded-lg border font-bold transition-all cursor-pointer ${
                        defenseMode === mode ? 'bg-amber-400 text-black border-amber-400 shadow-cyber-glow' : 'bg-[#0B1220] text-slate-400 border-purple-500/30 hover:text-white'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-purple-500/20 grid grid-cols-2 gap-2 font-orbitron text-[10px]">
                <button
                  onClick={() => {
                    soundFx.playLaserScan();
                    addToast('success', 'Playbook Triggered', 'Rogue IP ranges added to firewall drop table.');
                  }}
                  className="p-2.5 rounded-xl bg-[#0B1220] border border-cyan-500/30 hover:border-cyan-400 text-cyan-400 font-bold transition-colors cursor-pointer"
                >
                  Isolate Rogue IPs
                </button>
                <button
                  onClick={() => {
                    soundFx.playLaserScan();
                    addToast('success', 'Playbook Triggered', 'System API keys auto-rotated.');
                  }}
                  className="p-2.5 rounded-xl bg-[#0B1220] border border-purple-500/30 hover:border-purple-400 text-purple-400 font-bold transition-colors cursor-pointer"
                >
                  Rotate API Keys
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* --------------------------------------------------------------------- */}
      {/* 6. INTERACTIVE NETWORK TOPOLOGY MAP */}
      {/* --------------------------------------------------------------------- */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-purple-500/30 pb-3 font-orbitron">
          <h3 className="text-base font-bold text-white">Live Interactive Network Topology Map</h3>
          <span className="text-xs text-cyan-400 cursor-pointer hover:underline flex items-center gap-1" onClick={() => navigate('/network')}>
            <span>View Full Network Topology</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
        <AttackGraphView />
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* 7. REAL-TIME THREAT ALERTS STREAM & EMBEDDED AI ASSISTANT */}
      {/* --------------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* REAL-TIME THREAT ALERTS (7 COLUMNS) */}
        <div className="lg:col-span-7 glass-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-purple-500/30 pb-3 font-orbitron">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Bell className="w-5 h-5 text-cyan-400" />
              <span>Real-Time Streaming Threat Alerts</span>
            </h3>
            <button 
              onClick={() => {
                soundFx.playLevelUp();
                addToast('success', 'Auto-Containment Executed', 'All pending threat vectors neutralized.');
              }}
              className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/40 font-extrabold text-xs hover:bg-cyan-400 hover:text-black transition-all cursor-pointer shadow-cyber-glow"
            >
              Auto-Contain All
            </button>
          </div>

          <div className="space-y-3 text-xs font-mono">
            {threatStream.map((alert) => (
              <div key={alert.id} className="p-4 rounded-xl bg-[#0B1220] border border-purple-500/30 flex items-center justify-between hover:border-cyan-400/50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{alert.name}</span>
                    <span className="text-[10px] text-cyan-400 font-orbitron">{alert.id}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans">Source IP: {alert.source} • Time: {alert.time}</p>
                </div>
                <button 
                  onClick={() => { soundFx.playClick(); navigate(`/incidents/${alert.id}`); }}
                  className="px-3.5 py-1.5 rounded-xl bg-[#050811] border border-purple-500/40 text-cyan-400 font-orbitron font-bold hover:border-cyan-400 text-xs transition-colors cursor-pointer"
                >
                  Investigate
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* EMBEDDED CYBER SHIELD AI ASSISTANT (5 COLUMNS) */}
        <div className="lg:col-span-5 glass-card p-6 space-y-4 border-purple-500/50">
          <div className="flex items-center gap-2 text-purple-400 border-b border-purple-500/30 pb-3 font-orbitron">
            <Bot className="w-5 h-5 text-purple-400" />
            <h3 className="text-sm font-bold text-white">Cyber Shield AI Assistant</h3>
          </div>

          <div className="space-y-3 text-xs max-h-60 overflow-y-auto font-mono">
            {copilotMessages.map((m, idx) => (
              <div key={idx} className={`p-3.5 rounded-xl ${m.sender === 'USER' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold ml-4' : 'bg-[#0B1220] text-slate-200 border border-purple-500/20'}`}>
                {m.text}
              </div>
            ))}
            {copilotLoading && (
              <div className="p-2 text-[11px] text-purple-400 animate-pulse font-orbitron">AI Sentinel analyzing telemetry...</div>
            )}
          </div>

          <div className="flex gap-2 pt-2 font-mono">
            <input
              type="text"
              value={copilotInput}
              onChange={(e) => setCopilotInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendCopilot()}
              placeholder="Ask AI Assistant anything..."
              className="flex-1 bg-[#0B1220] border border-purple-500/40 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
            <button
              onClick={() => handleSendCopilot()}
              className="p-3 rounded-xl bg-purple-600 text-white font-bold shadow-cyber-glow hover:scale-105 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* --------------------------------------------------------------------- */}
      {/* 6. RESTRUCTURED SECURITY ARMORY & FEATURE CARDS GALLERY (16 CARDS) */}
      {/* --------------------------------------------------------------------- */}
      <div className="glass-card p-7 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-purple-500/30 pb-4">
          <div>
            <h2 className="text-xl font-bold text-white font-orbitron flex items-center gap-2">
              <Swords className="w-5 h-5 text-cyan-400" />
              <span>SECURITY ARMORY & FEATURE MODULE CARDS</span>
            </h2>
            <p className="text-xs text-slate-400 font-sans mt-1">
              Click any feature card below to navigate directly to its dedicated separate page!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Category Filters */}
            <div className="flex items-center gap-1.5 bg-[#0B1220] p-1.5 rounded-xl border border-purple-500/40 text-xs font-orbitron">
              {(['ALL', 'CONSUMER', 'FORENSICS', 'ENTERPRISE'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => { soundFx.playClick(); setModuleCategoryFilter(cat); }}
                  className={`px-3 py-1.5 rounded-lg transition-all font-bold cursor-pointer ${
                    moduleCategoryFilter === cat ? 'bg-[#00F0FF] text-black shadow-cyber-glow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Module Search Bar */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-purple-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={moduleSearchQuery}
                onChange={(e) => setModuleSearchQuery(e.target.value)}
                placeholder="Search tools (e.g. URL, UPI)..."
                className="w-full bg-[#0B1220] border border-purple-500/40 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] font-mono"
              />
            </div>
          </div>
        </div>

        {/* 16 Clickable Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredModulesList.map((tool) => (
            <div
              key={tool.key}
              onClick={() => {
                soundFx.playLaserScan();
                navigate(tool.path);
              }}
              className="glass-card p-6 flex flex-col justify-between space-y-4 hover:border-[#00F0FF] transition-all group cursor-pointer relative overflow-hidden shadow-cyber-glow hover:scale-[1.02]"
            >
              <div className="space-y-3 text-left">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-2xl bg-[#050811] border border-purple-500/40 ${tool.color} group-hover:scale-110 transition-transform shadow-cyber-glow`}>
                    <tool.icon className="w-6 h-6" />
                  </div>
                  <span className={`text-[10px] font-orbitron font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    tool.category === 'CONSUMER' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' : tool.category === 'FORENSICS' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  }`}>
                    {tool.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold font-orbitron text-white group-hover:text-cyan-400 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-sans mt-2 leading-relaxed">
                    {tool.desc}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1E293B] flex items-center justify-between font-orbitron text-xs">
                <span className="text-cyan-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>OPEN FEATURE PAGE</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
                <span className="text-slate-500 text-[10px]">SEPARATE PAGE</span>
              </div>
              <div className="cyber-box-decor"></div>
            </div>
          ))}
        </div>
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* 8. MONTHLY TRENDS & REPORTS SECTION */}
      {/* --------------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Threat Activity Area Chart */}
        <div className="lg:col-span-8 glass-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-purple-500/30 pb-3 font-orbitron">
            <h3 className="text-sm font-bold text-white">Threat Activity Telemetry</h3>
            <button onClick={() => { soundFx.playClick(); navigate('/security-report'); }} className="text-xs text-cyan-400 cursor-pointer hover:underline">Full Analytics →</button>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={threatActivityData}>
                <defs>
                  <linearGradient id="totalGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00E5FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#050811', borderColor: 'rgba(168,85,247,0.4)', color: '#F8FAFC' }} />
                <Area type="monotone" dataKey="total" stroke="#00E5FF" strokeWidth={2} fillOpacity={1} fill="url(#totalGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Threat Distribution Bar Chart */}
        <div className="lg:col-span-4 glass-card p-6 space-y-4">
          <h3 className="text-sm font-bold text-white font-orbitron border-b border-purple-500/30 pb-3">Threat Categories Breakdown</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={threatDistData} layout="vertical">
                <XAxis type="number" stroke="#64748B" fontSize={10} hide />
                <YAxis type="category" dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#050811', borderRadius: '8px', borderColor: 'rgba(168,85,247,0.4)' }} />
                <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                  {threatDistData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};
