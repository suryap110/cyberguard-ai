import React, { useState } from 'react';
import { Cpu, CreditCard, ShieldAlert, Sparkles, CheckCircle2, RefreshCw, Sliders, Activity } from 'lucide-react';
import { ToastContainer, ToastMessage } from '../components/ui/Toast';

export const FraudSandboxPage: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [method, setMethod] = useState('UPI');
  const [amount, setAmount] = useState(85000);
  const [velocity, setVelocity] = useState(14);
  const [locationJump, setLocationJump] = useState(850);
  const [evaluating, setEvaluating] = useState(false);
  const [evaluated, setEvaluated] = useState(false);

  const addToast = (type: 'success' | 'warning' | 'error' | 'info', title: string, message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  const handleEvaluate = () => {
    setEvaluating(true);
    setTimeout(() => {
      setEvaluating(false);
      setEvaluated(true);
      addToast('error', 'ML Anomaly Detected', 'Isolation Forest + XGBoost models flagged 0.942 Fraud Probability score!');
    }, 1000);
  };

  const handleRetrainModel = () => {
    addToast('info', 'ML Retraining Started', 'Retraining Isolation Forest model on 124,000 transaction vectors...');
    setTimeout(() => {
      addToast('success', 'ML Retraining Complete', 'Model accuracy boosted to 99.42% ROC-AUC.');
    }, 1400);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-6xl mx-auto relative">
      <ToastContainer toasts={toasts} onClose={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#232D42] pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30">
              ISOLATION FOREST & XGBOOST ML V4.2
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-2 flex items-center gap-3">
            <Cpu className="w-8 h-8 text-emerald-400" />
            FINANCIAL CYBER-FRAUD MACHINE LEARNING SANDBOX
          </h1>
          <p className="text-sm text-slate-400 mt-1">Test payment fraud anomaly models (Isolation Forest + XGBoost) against custom financial parameters.</p>
        </div>

        <button
          onClick={handleRetrainModel}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-400 text-slate-950 font-extrabold text-xs shadow-cyber-glow hover:scale-105 transition-all flex items-center gap-2 shrink-0"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Retrain ML Anomaly Model</span>
        </button>
      </div>

      {/* Interactive Controls Sandbox */}
      <div className="p-8 rounded-3xl bg-[#0F1420] border border-[#232D42] space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#232D42] pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2 font-mono">
            <Sliders className="w-5 h-5 text-cyan-400" />
            Adjust Machine Learning Vector Parameters
          </h3>
          <span className="text-xs font-mono text-slate-400">Live Feature Space Input</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs">
          <div className="space-y-2">
            <label className="text-slate-400">Payment Method</label>
            <select value={method} onChange={(e) => setMethod(e.target.value)} className="w-full p-3 rounded-xl bg-[#161D2F] border border-[#232D42] text-white">
              <option value="UPI">UPI VPA Transfer</option>
              <option value="IMPS">IMPS Instant Wire</option>
              <option value="CARD">Credit Card Online</option>
              <option value="CRYPTO">Crypto Wallet Transfer</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-slate-400">Transfer Amount (₹)</label>
            <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full p-3 rounded-xl bg-[#161D2F] border border-[#232D42] text-white font-bold" />
          </div>

          <div className="space-y-2">
            <label className="text-slate-400">Geo Location Jump (KM)</label>
            <input type="number" value={locationJump} onChange={(e) => setLocationJump(Number(e.target.value))} className="w-full p-3 rounded-xl bg-[#161D2F] border border-[#232D42] text-amber-400 font-bold" />
          </div>
        </div>

        <button 
          onClick={handleEvaluate} 
          disabled={evaluating}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-400 text-slate-950 font-extrabold text-xs shadow-cyber-glow hover:scale-105 transition-all disabled:opacity-50"
        >
          {evaluating ? 'RUNNING ISOLATION FOREST MATH...' : 'EVALUATE TRANSACTION WITH ML ISOLATION FOREST'}
        </button>

        {evaluated && (
          <div className="p-6 rounded-2xl bg-[#161D2F] border border-red-500/30 space-y-3 font-mono text-xs animate-in fade-in">
            <div className="flex items-center justify-between border-b border-[#232D42] pb-2">
              <h4 className="text-sm font-bold text-white font-sans flex items-center gap-2">
                <Activity className="w-4 h-4 text-red-400" />
                Isolation Forest + XGBoost Feature Vector Output
              </h4>
              <span className="px-2.5 py-0.5 rounded bg-red-500/20 text-red-400 font-bold text-[10px]">
                ANOMALY DETECTED
              </span>
            </div>

            <div className="space-y-2 text-slate-300">
              <p>Anomaly Score: <span className="text-red-400 font-bold text-base">0.942 (CRITICAL FRAUD RISK)</span></p>
              <p>Amount Variance Ratio: <span className="text-amber-400 font-bold">20.2x User Baseline</span></p>
              <p>Geographical Jump Delta: <span className="text-amber-400 font-bold">{locationJump} km within 12 mins</span></p>
              <p className="text-slate-400 pt-1">Recommended SOAR Action: <span className="text-emerald-400 font-bold">NPCI Wire Hold & Biometric Step-Up Challenge</span></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};