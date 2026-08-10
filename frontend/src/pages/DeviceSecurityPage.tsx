import React, { useState } from 'react';
import { Smartphone, Monitor, ShieldAlert, CheckCircle2, Plus, X } from 'lucide-react';
import { ToastContainer, ToastMessage } from '../components/ui/Toast';

export const DeviceSecurityPage: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [devices, setDevices] = useState([
    { id: '1', name: "MacBook Pro 16\"", type: "Desktop", os: "macOS Sonoma", location: "Chennai, IN", status: "TRUSTED", icon: Monitor },
    { id: '2', name: "Samsung Galaxy S24 Ultra", type: "Mobile", os: "Android 15", location: "Chennai, IN", status: "TRUSTED", icon: Smartphone },
    { id: '3', name: "Unknown Linux Proxy", type: "Desktop", os: "Ubuntu 22.04", location: "Unknown IP 198.51.100.42", status: "SUSPICIOUS", icon: Monitor }
  ]);

  const addToast = (type: 'success' | 'warning' | 'error', title: string, message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  const handleRevoke = (id: string, name: string) => {
    setDevices(prev => prev.filter(d => d.id !== id));
    addToast('warning', 'Device Revoked', `${name} access has been terminated.`);
  };

  const handleMarkTrusted = (id: string, name: string) => {
    setDevices(prev => prev.map(d => d.id === id ? { ...d, status: 'TRUSTED' } : d));
    addToast('success', 'Device Verified', `${name} is now marked as trusted.`);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-5xl mx-auto relative">
      <ToastContainer toasts={toasts} onClose={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
            <Smartphone className="w-8 h-8 text-cyan-400" />
            TRUSTED DEVICE CENTER
          </h1>
          <p className="text-sm text-slate-400 mt-1">Manage hardware fingerprints, mobile biometric binding, and revoke untrusted devices.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {devices.map((d) => (
          <div key={d.id} className={`p-6 rounded-3xl border flex flex-col justify-between ${
            d.status === 'SUSPICIOUS' ? 'bg-red-500/10 border-red-500/30' : 'bg-[#0F1420] border-[#232D42]'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-[#161D2F] text-cyan-400">
                  <d.icon className="w-6 h-6" />
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  d.status === 'TRUSTED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {d.status}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mb-1">{d.name}</h3>
              <p className="text-xs font-mono text-slate-400">{d.os} • {d.location}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#232D42] flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">Active 2m ago</span>
              {d.status === 'SUSPICIOUS' ? (
                <div className="flex gap-2">
                  <button onClick={() => handleMarkTrusted(d.id, d.name)} className="px-2.5 py-1 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs">Trust</button>
                  <button onClick={() => handleRevoke(d.id, d.name)} className="px-2.5 py-1 rounded-lg bg-red-500 text-white font-bold text-xs">Revoke</button>
                </div>
              ) : (
                <button onClick={() => handleRevoke(d.id, d.name)} className="text-xs text-slate-400 hover:text-red-400 font-mono">Remove</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
