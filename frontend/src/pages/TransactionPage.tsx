import React, { useState } from 'react';
import { CreditCard, ShieldAlert, CheckCircle2, AlertTriangle, ArrowUpRight, X, Plus, Sparkles, MapPin, Smartphone } from 'lucide-react';
import { Transaction } from '../types';
import { ToastContainer, ToastMessage } from '../components/ui/Toast';

export const TransactionPage: React.FC = () => {
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);
  const [showSimModal, setShowSimModal] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const [simAmount, setSimAmount] = useState('85000');
  const [simPayee, setSimPayee] = useState('UNKNOWN_BANK_REMITTANCE');
  const [simLocation, setSimLocation] = useState('Unknown Remote Proxy');
  const [simNewDevice, setSimNewDevice] = useState(true);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      txn_code: 'TXN-8291',
      amount: 85000.0,
      payee_name: 'UNKNOWN_BANK_REMITTANCE',
      payment_method: 'BANK_TRANSFER',
      status: 'BLOCKED',
      risk_score: 96,
      severity: 'CRITICAL',
      location: 'Chennai -> Remote Proxy IP',
      is_anomaly: true,
      ai_verdict: 'Amount (₹85,000) is 20x baseline average. Session initiated from unrecognized Linux Chrome fingerprint.',
      created_at: '2 min ago'
    },
    {
      id: '2',
      txn_code: 'TXN-4912',
      amount: 2500.0,
      payee_name: 'FreshFoods Supermarket',
      payment_method: 'UPI',
      status: 'PASSED',
      risk_score: 12,
      severity: 'SAFE',
      location: 'Chennai, IN',
      is_anomaly: false,
      ai_verdict: 'Normal transaction velocity matching historical behavioral profile.',
      created_at: '1 hour ago'
    },
    {
      id: '3',
      txn_code: 'TXN-3019',
      amount: 14500.0,
      payee_name: 'ElectroTech Retails',
      payment_method: 'CREDIT_CARD',
      status: 'PASSED',
      risk_score: 28,
      severity: 'SAFE',
      location: 'Chennai, IN',
      is_anomaly: false,
      ai_verdict: 'Verified merchant payment.',
      created_at: '3 hours ago'
    }
  ]);

  const addToast = (type: 'success' | 'warning' | 'error', title: string, message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  const handleSimulateTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(simAmount) || 5000;
    
    try {
      const res = await fetch('http://localhost:8000/api/transactions/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amountNum,
          payee_name: simPayee,
          location: simLocation,
          is_new_device: simNewDevice
        })
      });
      const data = await res.json();
      setTransactions(prev => [data, ...prev]);
      addToast(
        data.status === 'BLOCKED' ? 'error' : 'success',
        `Transaction ${data.txn_code} Evaluated`,
        `Risk Score: ${data.risk_score}/100 • Status: ${data.status}`
      );
    } catch (e) {
      const isHighRisk = amountNum > 20000 || simNewDevice;
      const riskScore = isHighRisk ? 92 : 15;
      const newTxn: Transaction = {
        id: Date.now().toString(),
        txn_code: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
        amount: amountNum,
        payee_name: simPayee,
        payment_method: 'UPI',
        status: isHighRisk ? 'BLOCKED' : 'PASSED',
        risk_score: riskScore,
        severity: isHighRisk ? 'CRITICAL' : 'SAFE',
        location: simLocation,
        is_anomaly: isHighRisk,
        ai_verdict: isHighRisk ? `Amount (₹${amountNum.toLocaleString()}) exceeds baseline by 5x from unrecognized IP.` : 'Normal payment.',
        created_at: 'Just now'
      };
      setTransactions(prev => [newTxn, ...prev]);
      addToast(
        isHighRisk ? 'error' : 'success',
        `Transaction ${newTxn.txn_code} Evaluated`,
        `Risk Score: ${riskScore}/100 • Status: ${newTxn.status}`
      );
    } finally {
      setShowSimModal(false);
    }
  };

  const toggleTxnStatus = (id: string) => {
    setTransactions(prev => prev.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === 'BLOCKED' ? 'PASSED' : 'BLOCKED';
        addToast('success', `Transaction ${t.txn_code} Updated`, `Status changed to ${nextStatus}`);
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-6xl mx-auto relative">
      <ToastContainer toasts={toasts} onClose={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
            <CreditCard className="w-8 h-8 text-emerald-400" />
            TRANSACTION SECURITY CENTER
          </h1>
          <p className="text-sm text-slate-400 mt-1">Real-time payment fraud prevention & anomaly detection telemetry.</p>
        </div>

        <button
          onClick={() => setShowSimModal(true)}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-400 text-slate-950 font-extrabold text-sm shadow-cyber-glow hover:scale-105 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Simulate Custom Transaction</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-5 rounded-3xl bg-[#0F1420] border border-[#232D42]">
          <span className="text-xs font-mono text-slate-400">Total Protected</span>
          <p className="text-2xl font-extrabold text-emerald-400 mt-1">₹1,24,500</p>
        </div>
        <div className="p-5 rounded-3xl bg-[#0F1420] border border-[#232D42]">
          <span className="text-xs font-mono text-slate-400">Transactions Analyzed</span>
          <p className="text-2xl font-extrabold text-white mt-1">{transactions.length} Total</p>
        </div>
        <div className="p-5 rounded-3xl bg-[#0F1420] border border-[#232D42]">
          <span className="text-xs font-mono text-slate-400">Suspicious Flagged</span>
          <p className="text-2xl font-extrabold text-amber-400 mt-1">
            {transactions.filter(t => t.risk_score >= 50).length} Flagged
          </p>
        </div>
        <div className="p-5 rounded-3xl bg-[#0F1420] border border-[#232D42]">
          <span className="text-xs font-mono text-slate-400">Fraud Attempts Intercepted</span>
          <p className="text-2xl font-extrabold text-red-400 mt-1">
            {transactions.filter(t => t.status === 'BLOCKED').length} Blocked
          </p>
        </div>
      </div>

      <div className="bg-[#0F1420] border border-[#232D42] rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-5 border-b border-[#232D42] flex items-center justify-between">
          <h3 className="text-base font-bold text-white">Recent Payment Telemetry</h3>
          <span className="text-xs font-mono text-cyan-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> Live AI Interception Active
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#232D42] text-[11px] font-mono text-slate-400 uppercase bg-[#161D2F]">
                <th className="p-4">Transaction Code</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Payee</th>
                <th className="p-4">Location</th>
                <th className="p-4">Status</th>
                <th className="p-4">Risk Score</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#232D42] text-xs font-mono">
              {transactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-[#161D2F] transition-all">
                  <td className="p-4 font-bold text-white">{txn.txn_code}</td>
                  <td className="p-4 text-white font-bold">₹{txn.amount.toLocaleString()}</td>
                  <td className="p-4 text-slate-300">{txn.payee_name}</td>
                  <td className="p-4 text-slate-400">{txn.location}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      txn.status === 'BLOCKED' ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {txn.status}
                    </span>
                  </td>
                  <td className={`p-4 font-bold ${txn.risk_score >= 75 ? 'text-red-400' : 'text-emerald-400'}`}>
                    {txn.risk_score}/100
                  </td>
                  <td className="p-4 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedTxn(txn)}
                      className="px-3 py-1 rounded-lg bg-sky-500/10 text-cyan-400 border border-sky-500/30 hover:bg-sky-500 hover:text-white transition-all flex items-center gap-1"
                    >
                      <span>Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => toggleTxnStatus(txn.id)}
                      className="px-3 py-1 rounded-lg bg-[#161D2F] text-slate-300 border border-[#232D42] hover:text-white transition-all"
                    >
                      {txn.status === 'BLOCKED' ? 'Unblock' : 'Block'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showSimModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md bg-[#0F1420] border border-[#232D42] rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#232D42] pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                Simulate Custom Payment Risk
              </h3>
              <button onClick={() => setShowSimModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSimulateTransaction} className="space-y-4 font-mono text-xs">
              <div className="space-y-1">
                <label className="text-slate-400">Transfer Amount (₹)</label>
                <input
                  type="number"
                  value={simAmount}
                  onChange={(e) => setSimAmount(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#161D2F] border border-[#232D42] text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">Payee Name / UPI VPA</label>
                <input
                  type="text"
                  value={simPayee}
                  onChange={(e) => setSimPayee(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#161D2F] border border-[#232D42] text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">Initiating Location</label>
                <input
                  type="text"
                  value={simLocation}
                  onChange={(e) => setSimLocation(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#161D2F] border border-[#232D42] text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#161D2F]">
                <span className="text-slate-300">Simulate Untrusted / New Device</span>
                <input
                  type="checkbox"
                  checked={simNewDevice}
                  onChange={(e) => setSimNewDevice(e.target.checked)}
                  className="w-4 h-4 accent-cyan-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-400 text-slate-950 font-extrabold text-sm shadow-cyber-glow hover:scale-105 transition-all"
              >
                EVALUATE FRAUD SCORE
              </button>
            </form>
          </div>
        </div>
      )}

      {selectedTxn && (
        <div className="fixed inset-y-0 right-0 w-full max-w-md bg-[#0F1420] border-l border-[#232D42] p-6 shadow-2xl z-50 flex flex-col justify-between animate-in slide-in-from-right">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#232D42] pb-4">
              <h3 className="text-lg font-bold text-white">TRANSACTION RISK BREAKDOWN</h3>
              <button onClick={() => setSelectedTxn(null)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#161D2F] space-y-2">
              <span className="text-xs font-mono text-slate-400">Code: {selectedTxn.txn_code}</span>
              <p className="text-3xl font-extrabold text-white">₹{selectedTxn.amount.toLocaleString()}</p>
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                selectedTxn.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'
              }`}>
                {selectedTxn.severity} RISK SCORE ({selectedTxn.risk_score}/100)
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between p-3 rounded-xl bg-[#161D2F]">
                <span className="text-slate-400">PAYEE:</span>
                <span className="text-white font-bold">{selectedTxn.payee_name}</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-[#161D2F]">
                <span className="text-slate-400">LOCATION:</span>
                <span className="text-white font-bold">{selectedTxn.location}</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-[#161D2F]">
                <span className="text-slate-400">DEVICE FINGERPRINT:</span>
                <span className="text-amber-400 font-bold">{selectedTxn.is_anomaly ? 'Unrecognized Proxy' : 'Trusted'}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-xs text-slate-300">
              <p className="font-bold text-cyan-400 mb-1 font-mono">CYBERGUARD AI Verdict:</p>
              <p>"{selectedTxn.ai_verdict}"</p>
            </div>
          </div>

          <button
            onClick={() => setSelectedTxn(null)}
            className="w-full py-3 rounded-xl bg-[#161D2F] border border-[#232D42] text-white font-bold text-xs"
          >
            Close Breakdown
          </button>
        </div>
      )}
    </div>
  );
};