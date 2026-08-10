import React, { useState } from 'react';
import { Smartphone, ShieldCheck, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';
import { ToastContainer, ToastMessage } from '../components/ui/Toast';

export const SimGuardPage: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [simStatus, setSimStatus] = useState({
    carrier: 'Airtel India / Jio 5G Edge',
    imsiSerial: 'SIM-89912801923',
    status: 'ACTIVE & LOCKED',
    portLock: 'ENABLED',
    lastCarrierCheck: 'Just Now'
  });

  const addToast = (type: 'success' | 'warning' | 'error' | 'info', title: string, message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  const handleTogglePortLock = () => {
    setSimStatus(prev => ({
      ...prev,
      portLock: prev.portLock === 'ENABLED' ? 'DISABLED' : 'ENABLED'
    }));
    addToast('success', 'SIM Port Lock Updated', `Mobile carrier porting lock is now ${simStatus.portLock === 'ENABLED' ? 'DISABLED' : 'ENABLED'}.`);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-5xl mx-auto relative">
      <ToastContainer toasts={toasts} onClose={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />

      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
          <Smartphone className="w-8 h-8 text-cyan-400" />
          SIM SWAP & BANKING OTP INTERCEPTION DEFENSE
        </h1>
        <p className="text-sm text-slate-400 mt-1">Prevent unauthorized SIM swap porting requests and SMS OTP forwarding malware.</p>
      </div>

      <div className="p-8 rounded-3xl bg-[#0F1420] border border-[#232D42] space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#232D42] pb-4 font-mono text-xs">
          <div>
            <span className="text-slate-400">CARRIER BINDING</span>
            <p className="text-base font-bold text-white mt-0.5">{simStatus.carrier}</p>
            <p className="text-slate-500">IMSI Serial: {simStatus.imsiSerial}</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
            {simStatus.status}
          </span>
        </div>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-[#161D2F] font-mono text-xs">
          <div>
            <span className="text-slate-300 font-bold">Carrier Porting Lock Status</span>
            <p className="text-slate-400">Prevents unauthorized SIM re-issuance at store counters</p>
          </div>
          <button
            onClick={handleTogglePortLock}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              simStatus.portLock === 'ENABLED' ? 'bg-emerald-500 text-slate-950' : 'bg-red-500 text-white'
            }`}
          >
            {simStatus.portLock === 'ENABLED' ? 'PORT LOCK ACTIVE' : 'ENABLE PORT LOCK'}
          </button>
        </div>
      </div>
    </div>
  );
};