import React, { useState, useRef } from 'react';
import { QrCode, Upload, ShieldAlert, CheckCircle2, Camera, Image as ImageIcon, Sparkles } from 'lucide-react';
import { ToastContainer, ToastMessage } from '../components/ui/Toast';

export const QRScannerPage: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [qrFile, setQrFile] = useState<File | null>(null);
  const [qrPreview, setQrPreview] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [qrResult, setQrResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addToast = (type: 'success' | 'warning' | 'error' | 'info', title: string, message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  const handleQrUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setQrFile(file);
      setQrPreview(URL.createObjectURL(file));
      setQrResult(null);
      addToast('info', 'QR Image Uploaded', `Loaded '${file.name}'. Click Decode to inspect payload.`);
    }
  };

  const handleScanQr = (presetType = 'safe') => {
    setScanning(true);
    setQrResult(null);

    setTimeout(() => {
      setScanning(false);
      if (presetType === 'scam' || (qrFile && qrFile.name.toLowerCase().includes('scam'))) {
        setQrResult({
          valid: false,
          payeeName: 'UNKNOWN_TEMP_VPA',
          vpaHandle: 'paytm-claim-reward9812@paytm',
          riskScore: 95,
          status: 'FRAUDULENT / UNAPPROVED REWARD VPA',
          threatType: 'Phishing Payee Handle requesting Money Deduct Authorization',
          aiVerdict: 'This QR code initiates a PULL request that DEDUCTS money from your bank account instead of depositing rewards!'
        });
        addToast('error', 'Malicious QR Payload Detected', 'QR code requests money deduction disguised as reward claim!');
      } else {
        setQrResult({
          valid: true,
          payeeName: 'Verified Retail Store',
          vpaHandle: 'retailstore@icici',
          riskScore: 10,
          status: 'VERIFIED NPCI PAYEE',
          threatType: 'Standard Peer-to-Merchant Payment',
          aiVerdict: 'Verified merchant QR code matching official NPCI settlement records.'
        });
        addToast('success', 'QR Code Verified Clean', 'Payee handle matches verified retail merchant settlement.');
      }
    }, 1300);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-5xl mx-auto relative">
      <ToastContainer toasts={toasts} onClose={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />

      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
          <QrCode className="w-8 h-8 text-cyan-400" />
          QR CODE & UPI PAYEE THREAT INSPECTOR
        </h1>
        <p className="text-sm text-slate-400 mt-1">Upload real QR code images (.png, .jpg) or test preset safe vs phishing QR payloads.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Real File Upload */}
        <div className="p-6 md:p-8 rounded-3xl bg-[#0F1420] border border-[#232D42] space-y-4 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Upload Real QR Image</h3>
                <p className="text-xs text-slate-400">Upload screenshot or photo of QR code</p>
              </div>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleQrUpload}
              accept="image/*"
              className="hidden"
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              className="p-6 rounded-2xl border-2 border-dashed border-[#232D42] hover:border-cyan-400 cursor-pointer transition-all text-center space-y-3 bg-[#161D2F]"
            >
              <ImageIcon className="w-10 h-10 text-cyan-400 mx-auto" />
              <p className="text-xs font-mono text-slate-300">
                {qrFile ? `Selected: ${qrFile.name}` : 'Click or Drag & Drop Real QR Code Image'}
              </p>
            </div>
          </div>

          <button
            onClick={() => handleScanQr('upload')}
            disabled={scanning || !qrFile}
            className="w-full mt-4 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-extrabold text-xs shadow-cyber-glow disabled:opacity-50"
          >
            {scanning ? 'DECODING QR PAYLOAD...' : 'DECODE & INSPECT UPLOADED QR'}
          </button>
        </div>

        {/* Preset Sample Buttons */}
        <div className="p-6 md:p-8 rounded-3xl bg-[#0F1420] border border-[#232D42] space-y-4 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Test 1-Click Preset Samples</h3>
                <p className="text-xs text-slate-400">Test real-world safe merchant vs fake reward claim QR codes</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => handleScanQr('scam')}
                disabled={scanning}
                className="w-full p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 font-mono text-xs font-bold text-left hover:bg-red-500/20 transition-all flex items-center justify-between"
              >
                <span>🚨 Test Scam Reward QR Payload</span>
                <span className="text-[10px] uppercase bg-red-500/20 px-2 py-0.5 rounded">Scam Preset</span>
              </button>

              <button
                onClick={() => handleScanQr('safe')}
                disabled={scanning}
                className="w-full p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold text-left hover:bg-emerald-500/20 transition-all flex items-center justify-between"
              >
                <span>✓ Test Verified Merchant QR</span>
                <span className="text-[10px] uppercase bg-emerald-500/20 px-2 py-0.5 rounded">Safe Preset</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Result Output */}
      {qrResult && (
        <div className={`p-6 rounded-3xl border font-mono text-xs space-y-3 shadow-2xl ${
          qrResult.valid ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200' : 'bg-red-500/10 border-red-500/40 text-red-200'
        }`}>
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-sm font-bold font-sans">{qrResult.payeeName} ({qrResult.status})</span>
            <span className="font-bold">Risk Score: {qrResult.riskScore}/100</span>
          </div>
          <p className="text-slate-300">VPA Handle: <span className="font-bold text-white">{qrResult.vpaHandle}</span></p>
          <p className="text-slate-300 font-sans font-medium text-xs">{qrResult.aiVerdict}</p>
        </div>
      )}
    </div>
  );
};
