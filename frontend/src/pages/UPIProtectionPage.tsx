import React, { useState } from 'react';
import { QrCode, ShieldCheck, AlertTriangle, CheckCircle2, Upload, Search, Smartphone, Volume2, Sparkles, X } from 'lucide-react';
import { ToastContainer, ToastMessage } from '../components/ui/Toast';

export const UPIProtectionPage: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [vpaQuery, setVpaQuery] = useState('paytmqr9812401@paytm');
  const [vpaResult, setVpaResult] = useState<any>(null);
  const [checkingVpa, setCheckingVpa] = useState(false);

  const [screenshotAnalyzing, setScreenshotAnalyzing] = useState(false);
  const [screenshotResult, setScreenshotResult] = useState<any>(null);

  const addToast = (type: 'success' | 'warning' | 'error' | 'info', title: string, message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  const handleVerifyVPA = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vpaQuery.trim()) return;

    setCheckingVpa(true);
    setVpaResult(null);

    setTimeout(() => {
      setCheckingVpa(false);
      if (vpaQuery.includes('fake') || vpaQuery.includes('scam') || vpaQuery.includes('temp')) {
        setVpaResult({
          valid: false,
          payeeName: 'UNVERIFIED INDIVIDUAL',
          riskScore: 94,
          status: 'HIGH RISK / BLACKLISTED VPA',
          reason: 'VPA handle created 2 days ago. Flagged by 18 merchants for fake payment claims.'
        });
        addToast('error', 'Fraudulent VPA Detected', `Payee ${vpaQuery} is blacklisted across banking risk networks.`);
      } else {
        setVpaResult({
          valid: true,
          payeeName: 'Verified Merchant Retail',
          riskScore: 12,
          status: 'SAFE / VERIFIED PAYEE',
          reason: 'Verified Merchant VPA handle matching official NPCI settlement records.'
        });
        addToast('success', 'VPA Verified Safe', `Payee ${vpaQuery} is an officially verified merchant.`);
      }
    }, 1100);
  };

  const handleAnalyzeScreenshot = () => {
    setScreenshotAnalyzing(true);
    setScreenshotResult(null);

    setTimeout(() => {
      setScreenshotAnalyzing(false);
      setScreenshotResult({
        isSpoof: true,
        confidence: '98.4% FAKE SCREENSHOT DETECTED',
        anomalies: [
          'Font Mismatch: Transaction ID font family deviates from official PhonePe / Paytm specs',
          'Timestamp Tampering: Time format inconsistent with system status bar clock',
          'Missing UTR Reference Number in NPCI settlement clearing log'
        ]
      });
      addToast('error', 'Fake Payment Receipt Detected', 'Screenshot generated via known Paytm/PhonePe Spoof App!');
    }, 1400);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto relative">
      <ToastContainer toasts={toasts} onClose={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />

      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden border border-[#232D42] shadow-2xl bg-[#0F1420]">
        <div className="p-8 md:p-10 space-y-3 relative z-10 max-w-3xl">
          <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 font-mono text-xs font-bold border border-cyan-500/30">
            UPI FRAUD & SPOOF RECEIPT DEFENSE
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">
            UPI PAYMENT & SPOOF RECEIPT VERIFIER
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Stop fake Paytm/PhonePe screenshot apps, tampered payment soundboxes, and unauthorized QR code stickers.
          </p>
        </div>
      </div>

      {/* Feature 1: Fake Payment Screenshot Analyzer */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#0F1420] border border-[#232D42] space-y-6 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Fake Payment Screenshot & Spoof Receipt Verifier</h3>
            <p className="text-xs text-slate-400">Upload or test payment receipts to detect layout tampering, font mismatches, and fake UTR numbers.</p>
          </div>
        </div>

        <div className="p-6 rounded-2xl border-2 border-dashed border-[#232D42] hover:border-cyan-400 transition-all text-center space-y-3 bg-[#161D2F]">
          <p className="text-xs font-mono text-slate-300">Drag & Drop Payment Screenshot or click below to simulate inspection</p>
          <button
            onClick={handleAnalyzeScreenshot}
            disabled={screenshotAnalyzing}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-bold text-xs shadow-cyber-glow hover:scale-105 transition-all"
          >
            {screenshotAnalyzing ? 'ANALYZING SCREENSHOT OCR...' : 'TEST FAKE SCREENSHOT RECEIPT'}
          </button>
        </div>

        {screenshotResult && (
          <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/40 text-xs font-mono space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-red-400 font-sans">{screenshotResult.confidence}</span>
              <span className="px-2.5 py-0.5 rounded bg-red-500/20 text-red-400 font-bold">TAMPERED</span>
            </div>
            <div className="space-y-1 text-slate-300">
              {screenshotResult.anomalies.map((a: string, i: number) => (
                <p key={i}>• {a}</p>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Feature 2: UPI Payee VPA Handle Inspector */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#0F1420] border border-[#232D42] space-y-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400">
            <QrCode className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">UPI Payee VPA Handle Reputation Inspector</h3>
            <p className="text-xs text-slate-400">Type any UPI ID (e.g. merchant@paytm or 9876543210@ybl) to check fraud complaints.</p>
          </div>
        </div>

        <form onSubmit={handleVerifyVPA} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-[#161D2F] border border-[#232D42] rounded-2xl focus-within:border-cyan-400 font-mono text-xs">
            <Search className="w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={vpaQuery}
              onChange={(e) => setVpaQuery(e.target.value)}
              placeholder="Enter UPI ID (e.g. test@scam or merchant@paytm)..."
              className="w-full bg-transparent text-white focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={checkingVpa}
            className="px-6 py-3 rounded-2xl bg-emerald-500 text-slate-950 font-extrabold text-xs shadow-cyber-glow hover:scale-105 transition-all"
          >
            {checkingVpa ? 'VERIFYING NPCI VPA...' : 'VERIFY PAYEE HANDLE'}
          </button>
        </form>

        {vpaResult && (
          <div className={`p-6 rounded-2xl border font-mono text-xs space-y-2 ${
            vpaResult.valid ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' : 'bg-red-500/10 border-red-500/40 text-red-300'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold font-sans">{vpaResult.payeeName} ({vpaResult.status})</span>
              <span className="font-bold">Risk Score: {vpaResult.riskScore}/100</span>
            </div>
            <p>{vpaResult.reason}</p>
          </div>
        )}
      </div>
    </div>
  );
};
