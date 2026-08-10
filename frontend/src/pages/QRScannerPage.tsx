import React, { useState } from 'react';
import { QrCode, ShieldAlert, CheckCircle2, Upload } from 'lucide-react';

export const QRScannerPage: React.FC = () => {
  const [payload, setPayload] = useState('upi://pay?pa=fake-bank-receiver@upi&am=85000&tn=UrgentVerify');
  const [scanned, setScanned] = useState(false);

  const handleScan = () => {
    setScanned(true);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
          <QrCode className="w-8 h-8 text-cyan-400" />
          QR CODE THREAT SCANNER
        </h1>
        <p className="text-sm text-slate-400 mt-1">Scan or upload payment QR codes to verify VPA recipient legitimacy and embedded URLs.</p>
      </div>

      <div className="p-8 rounded-3xl bg-[#0F1420] border border-[#232D42] space-y-6 text-center shadow-2xl">
        <div className="w-48 h-48 mx-auto border-2 border-dashed border-cyan-400/50 rounded-3xl flex flex-col items-center justify-center p-4 bg-[#161D2F] cursor-pointer hover:border-cyan-400 transition-all">
          <QrCode className="w-16 h-16 text-cyan-400 animate-pulse mb-2" />
          <p className="text-xs font-mono text-slate-300">Drag & Drop QR Image or Click to Scan</p>
        </div>

        <div className="max-w-md mx-auto space-y-2 text-left font-mono">
          <label className="text-xs text-slate-400">Decoded QR String Payload</label>
          <input
            type="text"
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
            className="w-full p-3 rounded-xl bg-[#161D2F] border border-[#232D42] text-xs text-white"
          />
        </div>

        <button
          onClick={handleScan}
          className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-extrabold text-sm shadow-cyber-glow hover:scale-105 transition-all"
        >
          INSPECT QR SECURITY
        </button>

        {scanned && (
          <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/30 text-left font-mono space-y-2">
            <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
              <ShieldAlert className="w-5 h-5" />
              <span>HIGH RISK VPA PAYEE DETECTED (RISK SCORE: 88/100)</span>
            </div>
            <p className="text-xs text-slate-300">
              The embedded UPI link directs payment to an unverified high-velocity VPA handle ('fake-bank-receiver@upi') registered 2 days ago. Exercise caution.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
