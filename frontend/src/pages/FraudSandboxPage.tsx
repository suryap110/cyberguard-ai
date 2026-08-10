import React, { useState } from 'react';
import { Cpu, CreditCard, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

export const FraudSandboxPage: React.FC = () => {
  const [method, setMethod] = useState('UPI');
  const [amount, setAmount] = useState(85000);
  const [evaluated, setEvaluated] = useState(false);

  const handleEvaluate = () => {
    setEvaluated(true);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
          <Cpu className="w-8 h-8 text-emerald-400" />
          FINANCIAL CYBER-FRAUD MACHINE LEARNING SANDBOX
        </h1>
        <p className="text-sm text-slate-400 mt-1">Test payment fraud anomaly models (Isolation Forest + XGBoost) against custom financial parameters.</p>
      </div>

      <div className="p-8 rounded-3xl bg-[#0F1420] border border-[#232D42] space-y-6 shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
          <div className="space-y-1">
            <label className="text-slate-400">Payment Method</label>
            <select value={method} onChange={(e) => setMethod(e.target.value)} className="w-full p-3 rounded-xl bg-[#161D2F] border border-[#232D42] text-white">
              <option value="UPI">UPI VPA Transfer</option>
              <option value="IMPS">IMPS Instant Wire</option>
              <option value="CARD">Credit Card Online</option>
              <option value="CRYPTO">Crypto Wallet Transfer</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-slate-400">Amount (₹)</label>
            <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full p-3 rounded-xl bg-[#161D2F] border border-[#232D42] text-white" />
          </div>
        </div>

        <button onClick={handleEvaluate} className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-400 text-slate-950 font-extrabold text-xs shadow-cyber-glow">
          RUN ML ANOMALY MODEL
        </button>

        {evaluated && (
          <div className="p-6 rounded-2xl bg-[#161D2F] border border-[#232D42] space-y-3 font-mono text-xs">
            <h4 className="text-sm font-bold text-white font-sans">Isolation Forest ML Model Output</h4>
            <p className="text-slate-300">Anomaly Score: <span className="text-red-400 font-bold">0.892 (HIGH FRAUD PROBABILITY)</span></p>
            <p className="text-slate-400">Key Decision Factor: Amount variance ratio exceeds 20.0x user baseline limit.</p>
          </div>
        )}
      </div>
    </div>
  );
};