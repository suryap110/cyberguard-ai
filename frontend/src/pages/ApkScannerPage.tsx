import React, { useState } from 'react';
import { Smartphone, ShieldAlert, CheckCircle2, AlertTriangle, FileCode } from 'lucide-react';
import { ToastContainer, ToastMessage } from '../components/ui/Toast';

export const ApkScannerPage: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [scanning, setScanning] = useState(false);
  const [apkResult, setApkResult] = useState<any>(null);

  const addToast = (type: 'success' | 'warning' | 'error' | 'info', title: string, message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  const handleScanApk = () => {
    setScanning(true);
    setApkResult(null);

    setTimeout(() => {
      setScanning(false);
      setApkResult({
        isMalware: true,
        appName: 'Bank_KYC_Update_2026.apk',
        riskScore: 97,
        malwareType: 'Screen Share Remote Access Trojan (RAT)',
        permissionsAbused: [
          'BIND_ACCESSIBILITY_SERVICE: Used to steal banking passwords & PINs silently',
          'SYSTEM_ALERT_WINDOW: Draws invisible overlays over banking apps to harvest OTPs',
          'READ_SMS & RECEIVE_SMS: Intercepts SMS OTPs before user notification'
        ]
      });
      addToast('error', 'Malicious APK Intercepted', 'APK contains screen recording Trojan & Accessibility Service abuse!');
    }, 1500);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-5xl mx-auto relative">
      <ToastContainer toasts={toasts} onClose={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />

      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
          <FileCode className="w-8 h-8 text-red-400" />
          ANDROID APK MALWARE & SCREEN SHARE TROJAN INSPECTOR
        </h1>
        <p className="text-sm text-slate-400 mt-1">Scan suspicious APK files received via WhatsApp, SMS, or fake customer support links.</p>
      </div>

      <div className="p-8 rounded-3xl bg-[#0F1420] border border-[#232D42] space-y-6 shadow-2xl">
        <div className="p-6 rounded-2xl bg-[#161D2F] border border-[#232D42] text-center space-y-3">
          <p className="text-xs font-mono text-slate-300">Test a sample APK package received via WhatsApp/SMS</p>
          <button
            onClick={handleScanApk}
            disabled={scanning}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-extrabold text-xs shadow-red-glow"
          >
            {scanning ? 'INSPECTING APK PERMISSIONS...' : 'SCAN SAMPLE WHATSAPP APK'}
          </button>
        </div>

        {apkResult && (
          <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/40 font-mono text-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-red-400 font-sans">{apkResult.appName} ({apkResult.malwareType})</span>
              <span className="px-2.5 py-0.5 rounded bg-red-500/20 text-red-400 font-bold">{apkResult.riskScore}/100 RISK</span>
            </div>
            <div className="space-y-1 text-slate-300">
              {apkResult.permissionsAbused.map((p: string, i: number) => (
                <p key={i}>• {p}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
