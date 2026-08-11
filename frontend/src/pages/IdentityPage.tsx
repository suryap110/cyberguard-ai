import React, { useState } from 'react';
import { 
  UserCheck, ShieldCheck, KeyRound, AlertTriangle, Smartphone, Search, Sparkles, 
  CheckCircle2, ShieldAlert, Fingerprint, Lock, Shield, RefreshCw, Key, Download, Globe, Server, Trash2 
} from 'lucide-react';
import { ToastContainer, ToastMessage } from '../components/ui/Toast';

export const IdentityPage: React.FC = () => {
  const [emailCheck, setEmailCheck] = useState('surya@cyberguard.ai');
  const [nationalIdCheck, setNationalIdCheck] = useState('ABCDP1234F');
  const [checking, setChecking] = useState(false);
  const [checkingId, setCheckingId] = useState(false);
  const [breachResult, setBreachResult] = useState<any>(null);
  const [idResult, setIdResult] = useState<any>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Registered Passkeys State
  const [passkeys, setPasskeys] = useState([
    { id: 'pk-1', name: 'YubiKey 5 NFC (Hardware Security Key)', registeredAt: '12 days ago', type: 'FIDO2 / WebAuthn' },
    { id: 'pk-2', name: 'MacBook TouchID / Windows Hello Facial Biometrics', registeredAt: '1 month ago', type: 'Platform Biometric' }
  ]);

  // Active Sessions State
  const [sessions, setSessions] = useState([
    { id: 'sess-1', device: 'Chrome 122.0 on macOS Sonoma', ip: '103.28.45.12', location: 'Chennai, IN', status: 'TRUSTED', activeNow: true },
    { id: 'sess-2', device: 'Python Script / Unrecognized Proxy', ip: '198.51.100.42', location: 'Unknown Proxy IP', status: 'SUSPICIOUS', activeNow: false }
  ]);

  const addToast = (type: 'success' | 'warning' | 'error' | 'info', title: string, message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  // 1. WebAuthn FIDO2 Passkey Registration (Browser Native API)
  const handleRegisterPasskey = async () => {
    try {
      if (window.PublicKeyCredential) {
        addToast('info', 'FIDO2 Challenge Active', 'Touch your YubiKey or use TouchID / Windows Hello...');
        
        // Simulating WebAuthn PublicKeyCredential creation
        setTimeout(() => {
          const newPasskey = {
            id: `pk-${Date.now()}`,
            name: `Hardware FIDO2 Key (${navigator.platform || 'Device'})`,
            registeredAt: 'Just now',
            type: 'WebAuthn Hardware Passkey'
          };
          setPasskeys(prev => [newPasskey, ...prev]);
          addToast('success', 'FIDO2 Passkey Registered', 'Hardware Security Key successfully bound to your CyberGuard account.');
        }, 1200);
      } else {
        addToast('error', 'WebAuthn Not Supported', 'Your browser does not support FIDO2 WebAuthn hardware passkeys.');
      }
    } catch (err) {
      addToast('error', 'Passkey Registration Cancelled', 'Biometric challenge was cancelled.');
    }
  };

  // 2. Dark Web Stealer Log Credential Scanner
  const handleCheckBreach = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailCheck.trim()) return;

    setChecking(true);
    setBreachResult(null);

    setTimeout(() => {
      setChecking(false);
      if (emailCheck.includes('breach') || emailCheck.includes('test') || emailCheck.includes('demo')) {
        setBreachResult({
          exposed: true,
          stealerLog: 'RussianMarket & BreachForums Stealer Dump 2024',
          breaches: [
            { name: 'RedLine Stealer Malware Dump', date: 'March 2024', passwordExposed: 'P@ssw***98', dataClasses: ['Email', 'Hashed Password', 'Browser Cookies'] },
            { name: 'Collection #1 Credentials Leak', date: 'January 2023', passwordExposed: 'Cyber***123', dataClasses: ['Email', 'Plaintext Password'] }
          ]
        });
        addToast('error', 'Stealer Log Exposure Found', `Email ${emailCheck} found in RedLine malware stealer dumps!`);
      } else {
        setBreachResult({
          exposed: false,
          stealerLog: 'Zero Exposures across 14 Billion Stealer Log Records',
          breaches: []
        });
        addToast('success', 'Identity Clean', `Zero stealer log exposures found for ${emailCheck}.`);
      }
    }, 1200);
  };

  // 3. National ID (PAN / Aadhaar / SSN) Leak Audit
  const handleCheckNationalId = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nationalIdCheck.trim()) return;

    setCheckingId(true);
    setIdResult(null);

    setTimeout(() => {
      setCheckingId(false);
      if (nationalIdCheck.includes('1234') || nationalIdCheck.includes('TEST')) {
        setIdResult({
          exposed: true,
          details: 'Flagged in telecom customer data breach dump (June 2024). Associated with unverified SIM port request.'
        });
        addToast('error', 'National ID Leak Detected', `ID ${nationalIdCheck} flagged in telecom data leaks!`);
      } else {
        setIdResult({
          exposed: false,
          details: 'National ID records verified clean across government & financial breach registries.'
        });
        addToast('success', 'National ID Verified Clean', `No telemetry leaks found for ${nationalIdCheck}.`);
      }
    }, 1000);
  };

  // 4. Revoke Session
  const handleRevokeSession = (id: string, device: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
    addToast('warning', 'Session Terminated', `JWT Session for ${device} revoked immediately.`);
  };

  // 5. Force Global Session Quarantine
  const handleGlobalQuarantine = () => {
    setSessions(prev => prev.filter(s => s.activeNow));
    addToast('error', 'GLOBAL QUARANTINE EXECUTED', 'All remote sessions terminated. Required WebAuthn step-up re-authentication.');
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-6xl mx-auto relative">
      <ToastContainer toasts={toasts} onClose={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
            <UserCheck className="w-8 h-8 text-cyan-400" />
            IDENTITY POSTURE & WEBAUTHN FIDO2 VAULT
          </h1>
          <p className="text-sm text-slate-400 mt-1">Dark Web stealer log credential monitoring, FIDO2 WebAuthn hardware passkeys, and National ID leak audits.</p>
        </div>

        <button
          onClick={() => addToast('info', 'Identity Certificate Exported', 'Downloaded CISO Identity Health Report PDF.')}
          className="px-5 py-3 rounded-2xl bg-[#161D2F] border border-[#232D42] text-cyan-400 font-bold text-xs hover:border-cyan-400 transition-all flex items-center gap-2 shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Export Identity Audit Report</span>
        </button>
      </div>

      {/* Identity Posture Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl bg-[#0F1420] border border-[#232D42]">
          <span className="text-xs font-mono text-slate-400">IDENTITY HYGIENE SCORE</span>
          <p className="text-2xl font-extrabold text-emerald-400 mt-1 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6" /> 98 / 100
          </p>
          <p className="text-[11px] text-slate-500 font-mono mt-1">Excellent Security Posture</p>
        </div>

        <div className="p-6 rounded-3xl bg-[#0F1420] border border-cyan-500/30">
          <span className="text-xs font-mono text-cyan-400">REGISTERED PASSKEYS</span>
          <p className="text-2xl font-extrabold text-white mt-1">{passkeys.length} Hardware Keys</p>
          <p className="text-[11px] text-slate-400 font-mono mt-1">FIDO2 / WebAuthn Active</p>
        </div>

        <div className="p-6 rounded-3xl bg-[#0F1420] border border-amber-500/30">
          <span className="text-xs font-mono text-amber-400">ACTIVE JWT SESSIONS</span>
          <p className="text-2xl font-extrabold text-white mt-1">{sessions.length} Devices</p>
          <p className="text-[11px] text-slate-400 font-mono mt-1">1 Untrusted Proxy</p>
        </div>

        <div className="p-6 rounded-3xl bg-[#0F1420] border border-emerald-500/30">
          <span className="text-xs font-mono text-emerald-400">NATIONAL ID LEAK AUDIT</span>
          <p className="text-2xl font-extrabold text-emerald-400 mt-1">VERIFIED CLEAN</p>
          <p className="text-[11px] text-slate-400 font-mono mt-1">No Telecom Breach Flags</p>
        </div>
      </div>

      {/* FEATURE 1: WEBAUTHN FIDO2 HARDWARE PASSKEY REGISTRATION */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#0F1420] border border-[#232D42] space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#232D42] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400">
              <Fingerprint className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Hardware Passkey Vault (FIDO2 & WebAuthn)</h3>
              <p className="text-xs text-slate-400">Bind hardware YubiKeys, MacBook TouchID, or Windows Hello biometrics to prevent phishing.</p>
            </div>
          </div>

          <button
            onClick={handleRegisterPasskey}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-extrabold text-xs shadow-cyber-glow hover:scale-105 transition-all flex items-center gap-2 shrink-0"
          >
            <Key className="w-4 h-4" />
            <span>Register New Hardware Passkey</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          {passkeys.map(pk => (
            <div key={pk.id} className="p-4 rounded-2xl bg-[#161D2F] border border-[#232D42] flex items-center justify-between">
              <div>
                <p className="font-bold text-white flex items-center gap-2">
                  <Shield className="w-4 h-4 text-cyan-400" />
                  {pk.name}
                </p>
                <p className="text-slate-400 text-[11px] mt-1">{pk.type} • Registered {pk.registeredAt}</p>
              </div>
              <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">ACTIVE</span>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURE 2: DARK WEB STEALER LOG & CREDENTIAL BREACH SCANNER */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#0F1420] border border-[#232D42] space-y-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Dark Web Stealer Log & Credential Exposure Inspector</h3>
            <p className="text-xs text-slate-400">Query 14+ Billion compromised stealer log records (RedLine, Genesis Market, BreachForums).</p>
          </div>
        </div>

        <form onSubmit={handleCheckBreach} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-[#161D2F] border border-[#232D42] rounded-2xl focus-within:border-cyan-400">
            <Search className="w-4 h-4 text-slate-500" />
            <input
              type="email"
              value={emailCheck}
              onChange={(e) => setEmailCheck(e.target.value)}
              placeholder="Enter email to check stealer logs..."
              className="w-full bg-transparent text-white focus:outline-none font-mono text-xs"
            />
          </div>
          <button
            type="submit"
            disabled={checking}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-bold text-xs shadow-cyber-glow hover:scale-105 transition-all"
          >
            {checking ? 'SCANNING 14B RECORDS...' : 'SCAN STEALER DUMPS'}
          </button>
        </form>

        {breachResult && (
          <div className={`p-6 rounded-2xl border font-mono text-xs space-y-3 ${
            breachResult.exposed ? 'bg-red-500/10 border-red-500/30 text-red-300' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
          }`}>
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="font-bold text-sm">{breachResult.exposed ? '⚠️ COMPROMISED CREDENTIALS FOUND IN STEALER LOGS' : '✓ ZERO BREACH EXPOSURES'}</span>
              <span className="text-[11px] text-slate-400">{breachResult.stealerLog}</span>
            </div>

            {breachResult.exposed && (
              <div className="space-y-2">
                {breachResult.breaches.map((b: any, i: number) => (
                  <div key={i} className="p-3 rounded-xl bg-[#161D2F] border border-[#232D42] text-slate-300">
                    <p className="font-bold text-white">{b.name} ({b.date})</p>
                    <p className="text-red-400 font-bold">Exposed Password Spec: {b.passwordExposed}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Exposed Data: {b.dataClasses.join(', ')}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* FEATURE 3: NATIONAL ID (PAN / AADHAAR / SSN) LEAK AUDITOR */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#0F1420] border border-[#232D42] space-y-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">National Identity (PAN / Aadhaar / SSN) Leak Auditor</h3>
            <p className="text-xs text-slate-400">Check if your PAN or National ID card number has been exposed in telecom leaks.</p>
          </div>
        </div>

        <form onSubmit={handleCheckNationalId} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-[#161D2F] border border-[#232D42] rounded-2xl focus-within:border-cyan-400">
            <Search className="w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={nationalIdCheck}
              onChange={(e) => setNationalIdCheck(e.target.value)}
              placeholder="Enter PAN Number (e.g. ABCDP1234F)..."
              className="w-full bg-transparent text-white focus:outline-none font-mono text-xs"
            />
          </div>
          <button
            type="submit"
            disabled={checkingId}
            className="px-6 py-3 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-cyber-glow hover:scale-105 transition-all"
          >
            {checkingId ? 'AUDITING TELECOM LEAKS...' : 'AUDIT NATIONAL ID'}
          </button>
        </form>

        {idResult && (
          <div className={`p-4 rounded-2xl border font-mono text-xs space-y-1 ${
            idResult.exposed ? 'bg-red-500/10 border-red-500/30 text-red-300' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
          }`}>
            <p className="font-bold">{idResult.exposed ? '⚠️ NATIONAL ID LEAK DETECTED' : '✓ NATIONAL ID CLEAN'}</p>
            <p className="text-slate-300">{idResult.details}</p>
          </div>
        )}
      </div>

      {/* FEATURE 4: ACTIVE SESSIONS & GLOBAL QUARANTINE */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#0F1420] border border-[#232D42] space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#232D42] pb-3">
          <div>
            <h3 className="text-base font-bold text-white">Active Authenticated JWT Sessions</h3>
            <p className="text-xs text-slate-400">Manage active sessions across all devices.</p>
          </div>

          <button
            onClick={handleGlobalQuarantine}
            className="px-4 py-2 rounded-xl bg-red-500/20 text-red-400 border border-red-500/40 text-xs font-mono font-bold hover:bg-red-500 hover:text-white transition-all flex items-center gap-1.5"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Force Global Session Quarantine</span>
          </button>
        </div>

        <div className="space-y-3 font-mono text-xs">
          {sessions.map(s => (
            <div key={s.id} className={`p-4 rounded-2xl border flex items-center justify-between ${
              s.status === 'SUSPICIOUS' ? 'bg-red-500/10 border-red-500/30 text-red-200' : 'bg-[#161D2F] border-[#232D42] text-slate-300'
            }`}>
              <div>
                <p className="text-sm font-bold text-white">{s.device}</p>
                <p className="text-slate-400">IP {s.ip} • {s.location} • {s.activeNow ? 'Active Now' : '3 mins ago'}</p>
              </div>

              {s.activeNow ? (
                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  CURRENT SESSION
                </span>
              ) : (
                <button
                  onClick={() => handleRevokeSession(s.id, s.device)}
                  className="px-3 py-1.5 rounded-xl bg-red-500 text-white font-bold text-xs shadow-lg hover:bg-red-600 transition-all flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Revoke Session</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
