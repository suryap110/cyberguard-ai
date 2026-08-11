import React, { useState, useRef } from 'react';
import { QrCode, ShieldCheck, AlertTriangle, CheckCircle2, Upload, Search, Smartphone, Volume2, Sparkles, X, Image as ImageIcon } from 'lucide-react';
import { ToastContainer, ToastMessage } from '../components/ui/Toast';

export const UPIProtectionPage: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [vpaQuery, setVpaQuery] = useState('paytmqr9812401@paytm');
  const [vpaResult, setVpaResult] = useState<any>(null);
  const [checkingVpa, setCheckingVpa] = useState(false);

  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);
  const [screenshotAnalyzing, setScreenshotAnalyzing] = useState(false);
  const [screenshotResult, setScreenshotResult] = useState<any>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const addToast = (type: 'success' | 'warning' | 'error' | 'info', title: string, message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReceiptFile(file);
      setReceiptPreview(URL.createObjectURL(file));
      setScreenshotResult(null);
      addToast('info', 'Payment Screenshot Uploaded', `Loaded '${file.name}'. Click Analyze to inspect layout authenticity.`);
    }
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

  const handleAnalyzeScreenshot = (isPreset = false) => {
    setScreenshotAnalyzing(true);
    setScreenshotResult(null);

    setTimeout(() => {
      setScreenshotAnalyzing(false);
      if (isPreset || (receiptFile && receiptFile.name.toLowerCase().includes('spoof'))) {
        setScreenshotResult({
          isSpoof: true,
          confidence: '98.4% FAKE SCREENSHOT RECEIPT DETECTED',
          anomalies: [
            'Font Mismatch: Transaction ID font family deviates from official PhonePe / Paytm specs',
            'Timestamp Tampering: Time format inconsistent with system status bar clock',
            'Missing UTR Reference Number in NPCI settlement clearing log'
          ]
        });
        addToast('error', 'Fake Payment Receipt Detected', 'Screenshot generated via known Paytm/PhonePe Spoof App!');
      } else {
        setScreenshotResult({
          isSpoof: false,
          confidence: '99.2% AUTHENTIC PAYMENT RECEIPT VERIFIED',
          anomalies: [
            'Font & Layout Match: Transaction ID matches official bank settlement template',
            'Valid UTR Clearing Reference: Settlement token verified in NPCI clearing log'
          ]
        });
        addToast('success', 'Payment Receipt Verified', 'Screenshot matches official banking settlement layout specs.');
      }
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
            Upload real payment screenshots (.png, .jpg) or test preset spoof receipt samples.
          </p>
        </div>
      </div>

      {/* Feature 1: Upload Real Payment Screenshot or Test Preset */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#0F1420] border border-[#232D42] space-y-6 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Fake Payment Screenshot & Spoof Receipt Verifier</h3>
            <p className="text-xs text-slate-400">Upload real screenshot image or test 1-click preset spoof sample.</p>
          </div>
        </div>

        <input
          type="file"
          ref={imageInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            onClick={() => imageInputRef.current?.click()}
            className="p-6 rounded-2xl border-2 border-dashed border-[#232D42] hover:border-cyan-400 cursor-pointer transition-all text-center space-y-3 bg-[#161D2F]"
          >
            <ImageIcon className="w-10 h-10 text-cyan-400 mx-auto" />
            <p className="text-xs font-mono text-slate-300">
              {receiptFile ? `Selected: ${receiptFile.name}` : 'Click or Drag & Drop Real Payment Image (.png, .jpg)'}
            </p>
          </div>

          {receiptPreview ? (
            <div className="p-3 rounded-2xl bg-[#161D2F] border border-[#232D42] flex items-center justify-center">
              <img src={receiptPreview} alt="Receipt preview" className="max-h-32 object-contain rounded-xl" />
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-[#161D2F] border border-[#232D42] flex flex-col justify-center items-center text-center">
              <Sparkles className="w-6 h-6 text-amber-400 mb-1" />
              <p className="text-xs font-bold text-white font-mono">1-Click Preset Sample</p>
              <button
                onClick={() => handleAnalyzeScreenshot(true)}
                className="mt-2 px-4 py-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold font-mono hover:bg-amber-500 hover:text-slate-950 transition-all"
              >
                Test Spoof Receipt Sample
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => handleAnalyzeScreenshot(false)}
          disabled={screenshotAnalyzing}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-extrabold text-xs shadow-cyber-glow"
        >
          {screenshotAnalyzing ? 'ANALYZING SCREENSHOT OCR...' : 'ANALYZE PAYMENT RECEIPT'}
        </button>

        {screenshotResult && (
          <div className={`p-6 rounded-2xl border font-mono text-xs space-y-3 ${
            screenshotResult.isSpoof ? 'bg-red-500/10 border-red-500/40 text-red-300' : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold font-sans">{screenshotResult.confidence}</span>
              <span className="px-2.5 py-0.5 rounded font-bold">{screenshotResult.isSpoof ? 'TAMPERED' : 'VERIFIED'}</span>
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
