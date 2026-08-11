import React, { useState } from 'react';
import { 
  CreditCard, ShieldAlert, CheckCircle2, AlertTriangle, ArrowUpRight, 
  X, Plus, Sparkles, Trash2, Edit3, Filter, Search, RefreshCw, Activity, Check, AlertCircle,
  Lock, Wallet, ArrowDownRight, Download, Share2, Keypad
} from 'lucide-react';
import { Transaction } from '../types';
import { ToastContainer, ToastMessage } from '../components/ui/Toast';

export const TransactionPage: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);
  const [receiptTxn, setReceiptTxn] = useState<Transaction | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'BLOCKED' | 'ERRORS' | 'PASSED'>('ALL');

  // Real Bank Account Balance State
  const [userBalance, setUserBalance] = useState(145280.00);

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pendingTxnData, setPendingTxnData] = useState<any>(null);
  const [upiPin, setUpiPin] = useState(['', '', '', '', '', '']);
  const [editingTxn, setEditingTxn] = useState<Transaction | null>(null);

  // Form State for Add / Edit
  const [formAmount, setFormAmount] = useState('4500');
  const [formPayee, setFormPayee] = useState('merchant@paytm');
  const [formMethod, setFormMethod] = useState('UPI');
  const [formCategory, setFormCategory] = useState('Shopping & Retail');
  const [formLocation, setFormLocation] = useState('Chennai, TN (Trusted Device)');

  // Full Commercial Transactions Ledger
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'txn-1',
      txn_code: 'UPI/4281093182',
      amount: 85000.0,
      payee_name: 'UNKNOWN_CRYPTO_REMITTANCE@ybl',
      payment_method: 'UPI',
      status: 'BLOCKED',
      risk_score: 96,
      severity: 'CRITICAL',
      location: 'Chennai -> Remote Proxy IP',
      is_anomaly: true,
      ai_verdict: 'ERR_AMOUNT_EXCEEDS_BASELINE_20X: Amount (₹85,000) is 20x baseline limit. Initiated from unrecognized Linux Chrome proxy.',
      created_at: '2 min ago'
    },
    {
      id: 'txn-2',
      txn_code: 'UPI/4912084122',
      amount: 2500.0,
      payee_name: 'FreshFoods Supermarket@okicici',
      payment_method: 'UPI',
      status: 'PASSED',
      risk_score: 12,
      severity: 'SAFE',
      location: 'Chennai, IN',
      is_anomaly: false,
      ai_verdict: 'NORMAL_SETTLEMENT: Velocity matches historical user profile.',
      created_at: '1 hour ago'
    },
    {
      id: 'txn-3',
      txn_code: 'CARD/3019482910',
      amount: 14500.0,
      payee_name: 'ElectroTech Retails (Credit Card)',
      payment_method: 'CREDIT_CARD',
      status: 'PASSED',
      risk_score: 28,
      severity: 'SAFE',
      location: 'Chennai, IN',
      is_anomaly: false,
      ai_verdict: 'VERIFIED_MERCHANT: Valid PCI-DSS merchant terminal.',
      created_at: '3 hours ago'
    },
    {
      id: 'txn-4',
      txn_code: 'IMPS/9812491028',
      amount: 45000.0,
      payee_name: 'EXCHANGE_SUSPECT_WALLET',
      payment_method: 'IMPS_WIRE',
      status: 'BLOCKED',
      risk_score: 91,
      severity: 'CRITICAL',
      location: 'Unknown VPN Gateway',
      is_anomaly: true,
      ai_verdict: 'ERR_UNRECOGNIZED_VPN_PROXY: Rapid successive transfer attempt to unverified crypto wallet.',
      created_at: '5 hours ago'
    }
  ]);

  const addToast = (type: 'success' | 'warning' | 'error' | 'info', title: string, message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  // STEP 1: Initiate Payment Form Submit (Opens UPI 6-Digit PIN Pad)
  const handleInitiatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(formAmount) || 1000;
    
    if (amountNum > userBalance) {
      addToast('error', 'Insufficient Account Balance', `Your bank balance is ₹${userBalance.toLocaleString()}, cannot process ₹${amountNum.toLocaleString()}.`);
      return;
    }

    setPendingTxnData({
      amount: amountNum,
      payee: formPayee,
      method: formMethod,
      category: formCategory,
      location: formLocation
    });

    setShowAddModal(false);
    setUpiPin(['', '', '', '', '', '']);
    setShowPinModal(true);
  };

  // STEP 2: Confirm UPI Security PIN & Process AI Interception
  const handleConfirmUpiPin = () => {
    if (upiPin.join('').length < 6) {
      addToast('warning', 'Invalid UPI PIN', 'Please enter your complete 6-digit UPI security PIN.');
      return;
    }

    setShowPinModal(false);
    const amountNum = pendingTxnData.amount;
    const isHighRisk = amountNum > 20000 || pendingTxnData.payee.includes('unknown') || pendingTxnData.payee.includes('crypto');
    const riskScore = isHighRisk ? (amountNum > 70000 ? 96 : 88) : 12;

    const newTxn: Transaction = {
      id: `txn-${Date.now()}`,
      txn_code: `${pendingTxnData.method}/${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      amount: amountNum,
      payee_name: pendingTxnData.payee,
      payment_method: pendingTxnData.method,
      status: isHighRisk ? 'BLOCKED' : 'PASSED',
      risk_score: riskScore,
      severity: isHighRisk ? 'CRITICAL' : 'SAFE',
      location: pendingTxnData.location,
      is_anomaly: isHighRisk,
      ai_verdict: isHighRisk 
        ? `ERR_ANOMALY_SPIKE: Amount (₹${amountNum.toLocaleString()}) exceeds baseline limit. Intercepted by CYBERGUARD AI.`
        : 'NORMAL_SETTLEMENT: Authenticated via UPI 6-Digit PIN. Passed NPCI clearance.',
      created_at: 'Just now'
    };

    setTransactions(prev => [newTxn, ...prev]);

    if (!isHighRisk) {
      setUserBalance(prev => prev - amountNum);
      addToast('success', 'Payment Successful', `₹${amountNum.toLocaleString()} sent to ${pendingTxnData.payee}. Updated balance: ₹${(userBalance - amountNum).toLocaleString()}`);
    } else {
      addToast('error', 'FRAUD INTERCEPTED & FROZEN', `CYBERGUARD AI blocked ₹${amountNum.toLocaleString()} transfer to ${pendingTxnData.payee}. Money protected!`);
    }

    setReceiptTxn(newTxn);
  };

  // UPDATE TRANSACTION (Edit)
  const handleUpdateTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTxn) return;

    const amountNum = parseFloat(formAmount) || editingTxn.amount;
    const updated: Transaction = {
      ...editingTxn,
      amount: amountNum,
      payee_name: formPayee,
      payment_method: formMethod,
      location: formLocation
    };

    setTransactions(prev => prev.map(t => t.id === editingTxn.id ? updated : t));
    setEditingTxn(null);
    addToast('success', `Transaction ${updated.txn_code} Updated`, `Details modified in ledger.`);
  };

  // DELETE TRANSACTION
  const handleDeleteTransaction = (id: string, code: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
    if (selectedTxn?.id === id) setSelectedTxn(null);
    addToast('warning', 'Transaction Record Deleted', `${code} removed from ledger.`);
  };

  // TOGGLE BLOCK / UNBLOCK STATUS
  const handleToggleStatus = (id: string) => {
    setTransactions(prev => prev.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === 'BLOCKED' ? 'PASSED' : 'BLOCKED';
        if (nextStatus === 'PASSED') {
          setUserBalance(b => b - t.amount);
        } else {
          setUserBalance(b => b + t.amount);
        }
        addToast(
          nextStatus === 'BLOCKED' ? 'error' : 'success',
          `Status Override: ${t.txn_code}`,
          `Status updated to ${nextStatus}`
        );
        return { 
          ...t, 
          status: nextStatus,
          severity: nextStatus === 'BLOCKED' ? 'CRITICAL' : 'SAFE'
        };
      }
      return t;
    }));
  };

  // Open Edit Modal
  const openEditModal = (txn: Transaction) => {
    setEditingTxn(txn);
    setFormAmount(txn.amount.toString());
    setFormPayee(txn.payee_name);
    setFormMethod(txn.payment_method);
    setFormLocation(txn.location);
  };

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.payee_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.txn_code.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (filterStatus === 'BLOCKED') return t.status === 'BLOCKED';
    if (filterStatus === 'ERRORS') return t.is_anomaly;
    if (filterStatus === 'PASSED') return t.status === 'PASSED';
    return true;
  });

  const totalAmount = transactions.reduce((acc, t) => acc + t.amount, 0);
  const blockedAmount = transactions.filter(t => t.status === 'BLOCKED').reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto relative">
      <ToastContainer toasts={toasts} onClose={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />

      {/* Header & Live Bank Balance Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
            <CreditCard className="w-8 h-8 text-emerald-400" />
            COMMERCIAL UPI & BANKING TRANSACTIONS PORTAL
          </h1>
          <p className="text-sm text-slate-400 mt-1">Send payments with 6-digit UPI PIN security, inspect official bank receipts, and monitor AI fraud interception.</p>
        </div>

        {/* Live Bank Account Balance Card */}
        <div className="p-5 rounded-3xl bg-gradient-to-r from-sky-500/20 via-cyan-500/10 to-emerald-500/20 border border-cyan-500/30 flex items-center gap-5 shadow-2xl shrink-0">
          <div className="p-3.5 rounded-2xl bg-cyan-500/20 text-cyan-400 shadow-cyber-glow">
            <Wallet className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">HDFC Savings Bank Account</span>
            <p className="text-2xl font-extrabold text-white font-mono mt-0.5">₹{userBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
          </div>
          <button
            onClick={() => {
              setFormAmount('2500');
              setFormPayee('merchant@okicici');
              setShowAddModal(true);
            }}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-400 text-slate-950 font-extrabold text-xs shadow-cyber-glow hover:scale-105 transition-all flex items-center gap-1.5 ml-2"
          >
            <Plus className="w-4 h-4" />
            <span>Send Money</span>
          </button>
        </div>
      </div>

      {/* Stats Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl bg-[#0F1420] border border-[#232D42]">
          <span className="text-xs font-mono text-slate-400">Total Telemetry Volume</span>
          <p className="text-2xl font-extrabold text-white mt-1">₹{totalAmount.toLocaleString()}</p>
          <p className="text-[11px] text-slate-500 font-mono mt-1">{transactions.length} Total Payments</p>
        </div>

        <div className="p-6 rounded-3xl bg-[#0F1420] border border-red-500/30 bg-red-500/5">
          <span className="text-xs font-mono text-red-400 font-bold">Fraud Money Protected</span>
          <p className="text-2xl font-extrabold text-red-400 mt-1">₹{blockedAmount.toLocaleString()}</p>
          <p className="text-[11px] text-red-300 font-mono mt-1">{transactions.filter(t => t.status === 'BLOCKED').length} Transfers Blocked</p>
        </div>

        <div className="p-6 rounded-3xl bg-[#0F1420] border border-amber-500/30">
          <span className="text-xs font-mono text-amber-400">Anomaly Error Logs</span>
          <p className="text-2xl font-extrabold text-amber-400 mt-1">{transactions.filter(t => t.is_anomaly).length} Errors</p>
          <p className="text-[11px] text-slate-400 font-mono mt-1">AI Risk Alerts</p>
        </div>

        <div className="p-6 rounded-3xl bg-[#0F1420] border border-emerald-500/30">
          <span className="text-xs font-mono text-emerald-400">Cleared Payments</span>
          <p className="text-2xl font-extrabold text-emerald-400 mt-1">{transactions.filter(t => t.status === 'PASSED').length} Settled</p>
          <p className="text-[11px] text-slate-400 font-mono mt-1">NPCI Verified</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0F1420] border border-[#232D42] p-4 rounded-2xl font-mono text-xs">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Search className="w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Payee or UTR Code..."
            className="bg-transparent text-white focus:outline-none w-full sm:w-64"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-slate-400 uppercase">Filter:</span>
          {(['ALL', 'BLOCKED', 'ERRORS', 'PASSED'] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1 rounded-lg transition-all ${
                filterStatus === s ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-[#161D2F] text-slate-400 border border-[#232D42]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-[#0F1420] border border-[#232D42] rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-5 border-b border-[#232D42] flex items-center justify-between">
          <h3 className="text-base font-bold text-white">Live Commercial Transactions Ledger ({filteredTransactions.length})</h3>
          <span className="text-xs font-mono text-cyan-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> Real-Time AI Interception Active
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-mono text-xs">
            <thead>
              <tr className="border-b border-[#232D42] text-[11px] text-slate-400 uppercase bg-[#161D2F]">
                <th className="p-4">UTR / Transaction Code</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Payee Name / VPA</th>
                <th className="p-4">Method</th>
                <th className="p-4">Location</th>
                <th className="p-4">Status</th>
                <th className="p-4">Risk Score</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#232D42]">
              {filteredTransactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-[#161D2F] transition-all">
                  <td className="p-4 font-bold text-white flex items-center gap-2">
                    <span className={`p-1.5 rounded-lg ${txn.status === 'BLOCKED' ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                      {txn.status === 'BLOCKED' ? <ArrowDownRight className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
                    </span>
                    {txn.txn_code}
                  </td>
                  <td className="p-4 text-white font-bold">₹{txn.amount.toLocaleString('en-IN')}</td>
                  <td className="p-4 text-slate-300">{txn.payee_name}</td>
                  <td className="p-4 text-cyan-400">{txn.payment_method}</td>
                  <td className="p-4 text-slate-400">{txn.location}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      txn.status === 'BLOCKED' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {txn.status}
                    </span>
                  </td>
                  <td className={`p-4 font-bold ${txn.risk_score >= 75 ? 'text-red-400' : 'text-emerald-400'}`}>
                    {txn.risk_score}/100
                  </td>
                  <td className="p-4 text-right flex items-center justify-end gap-2">
                    <button
                      onClick={() => setReceiptTxn(txn)}
                      title="View Official Receipt"
                      className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-slate-950 font-bold transition-all text-[11px]"
                    >
                      Receipt
                    </button>
                    <button
                      onClick={() => setSelectedTxn(txn)}
                      title="Inspect Process Stepper"
                      className="px-2 py-1 rounded-lg bg-sky-500/10 text-cyan-400 border border-sky-500/30 hover:bg-sky-500 hover:text-white transition-all text-[11px]"
                    >
                      Process
                    </button>
                    <button
                      onClick={() => openEditModal(txn)}
                      title="Edit Details"
                      className="p-1.5 rounded-lg bg-[#161D2F] text-slate-400 hover:text-white border border-[#232D42]"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleToggleStatus(txn.id)}
                      title="Override Status"
                      className="px-2 py-1 rounded-lg bg-[#161D2F] text-amber-400 border border-[#232D42] text-[10px]"
                    >
                      {txn.status === 'BLOCKED' ? 'Unblock' : 'Block'}
                    </button>
                    <button
                      onClick={() => handleDeleteTransaction(txn.id, txn.txn_code)}
                      title="Delete Record"
                      className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/30"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: INITIATE PAYMENT FORM */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md bg-[#0F1420] border border-[#232D42] rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#232D42] pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Wallet className="w-5 h-5 text-cyan-400" />
                Initiate UPI Payment
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleInitiatePayment} className="space-y-4 font-mono text-xs">
              <div className="space-y-1">
                <label className="text-slate-400">Transfer Amount (₹)</label>
                <input
                  type="number"
                  value={formAmount}
                  onChange={(e) => setFormAmount(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#161D2F] border border-[#232D42] text-white focus:outline-none focus:border-cyan-400 text-lg font-bold"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">Payee Name / UPI VPA Handle</label>
                <input
                  type="text"
                  value={formPayee}
                  onChange={(e) => setFormPayee(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#161D2F] border border-[#232D42] text-white focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">Payment Category</label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#161D2F] border border-[#232D42] text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="Shopping & Retail">Shopping & Retail</option>
                  <option value="Crypto & Investment">Crypto & Foreign Wallet</option>
                  <option value="Utility Bill Payment">Utility Bill Payment</option>
                  <option value="Friend & Family Remittance">Friend & Family Remittance</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-400 text-slate-950 font-extrabold text-sm shadow-cyber-glow hover:scale-105 transition-all mt-2"
              >
                PROCEED TO ENTER 6-DIGIT UPI PIN ➔
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: 6-DIGIT UPI SECURITY PIN KEYPAD */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-sm bg-[#0F1420] border border-[#232D42] rounded-3xl p-6 shadow-2xl space-y-6 text-center">
            <div className="p-3.5 rounded-2xl bg-cyan-500/10 text-cyan-400 w-fit mx-auto border border-cyan-500/30">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">Enter 6-Digit UPI PIN</h3>
              <p className="text-xs text-slate-400 mt-1">Paying <span className="text-white font-bold">₹{pendingTxnData?.amount?.toLocaleString()}</span> to <span className="text-cyan-400 font-bold">{pendingTxnData?.payee}</span></p>
            </div>

            {/* 6 PIN Display Circles */}
            <div className="flex justify-center gap-3">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <div
                  key={index}
                  className={`w-10 h-12 rounded-xl border flex items-center justify-center font-bold text-lg font-mono transition-all ${
                    upiPin[index] ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400 shadow-cyber-glow' : 'bg-[#161D2F] border-[#232D42] text-slate-600'
                  }`}
                >
                  {upiPin[index] ? '•' : ''}
                </div>
              ))}
            </div>

            {/* Onscreen Keypad 1-9 */}
            <div className="grid grid-cols-3 gap-3 font-mono text-sm">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '✓'].map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    if (key === 'C') {
                      setUpiPin(['', '', '', '', '', '']);
                    } else if (key === '✓') {
                      handleConfirmUpiPin();
                    } else {
                      const firstEmpty = upiPin.findIndex(p => p === '');
                      if (firstEmpty !== -1) {
                        const newPin = [...upiPin];
                        newPin[firstEmpty] = key;
                        setUpiPin(newPin);
                      }
                    }
                  }}
                  className={`p-3.5 rounded-2xl font-bold transition-all ${
                    key === '✓' 
                      ? 'bg-gradient-to-r from-emerald-500 to-cyan-400 text-slate-950 font-extrabold shadow-cyber-glow' 
                      : key === 'C'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : 'bg-[#161D2F] text-white hover:bg-[#232D42] border border-[#232D42]'
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: OFFICIAL BANK PAYMENT RECEIPT */}
      {receiptTxn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md bg-[#0F1420] border border-[#232D42] rounded-3xl p-6 shadow-2xl space-y-4 text-center font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[#232D42] pb-3">
              <span className="text-slate-400 font-bold uppercase">Official Bank Payment Receipt</span>
              <button onClick={() => setReceiptTxn(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className={`p-4 rounded-2xl border space-y-2 ${
              receiptTxn.status === 'BLOCKED' ? 'bg-red-500/10 border-red-500/30 text-red-300' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
            }`}>
              <span className="text-xs text-slate-400 uppercase">Transaction Status</span>
              <h2 className="text-2xl font-extrabold font-sans">
                {receiptTxn.status === 'BLOCKED' ? 'FROZEN BY CYBERGUARD' : 'PAID SUCCESSFULLY'}
              </h2>
              <p className="text-3xl font-extrabold text-white">₹{receiptTxn.amount.toLocaleString('en-IN')}</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#161D2F] border border-[#232D42] space-y-2 text-left text-slate-300">
              <p><span className="text-slate-500">Payee VPA:</span> <span className="text-white font-bold">{receiptTxn.payee_name}</span></p>
              <p><span className="text-slate-500">UTR Ref No:</span> <span className="text-cyan-400 font-bold">{receiptTxn.txn_code}</span></p>
              <p><span className="text-slate-500">Payment Method:</span> {receiptTxn.payment_method}</p>
              <p><span className="text-slate-500">Date & Time:</span> {receiptTxn.created_at}</p>
              <p><span className="text-slate-500">AI Risk Score:</span> <span className="font-bold">{receiptTxn.risk_score}/100</span></p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => addToast('info', 'Receipt Saved', `Downloaded PDF receipt for ${receiptTxn.txn_code}`)}
                className="flex-1 py-3 rounded-2xl bg-[#161D2F] border border-[#232D42] text-white font-bold flex items-center justify-center gap-1.5 hover:border-cyan-400"
              >
                <Download className="w-4 h-4" /> Download PDF
              </button>
              <button
                onClick={() => setReceiptTxn(null)}
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-extrabold shadow-cyber-glow"
              >
                Close Receipt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PROCESS STEPPER DRAWER */}
      {selectedTxn && (
        <div className="fixed inset-y-0 right-0 w-full max-w-lg bg-[#0F1420] border-l border-[#232D42] p-6 shadow-2xl z-50 flex flex-col justify-between overflow-y-auto font-mono text-xs">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#232D42] pb-4">
              <div>
                <span className="text-cyan-400 font-bold text-xs">{selectedTxn.txn_code}</span>
                <h3 className="text-lg font-bold text-white font-sans">SETTLEMENT & ERROR PROCESSOR</h3>
              </div>
              <button onClick={() => setSelectedTxn(null)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-[#161D2F] space-y-2 border border-[#232D42]">
              <span className="text-slate-400">Transfer Amount:</span>
              <p className="text-3xl font-extrabold text-white font-mono">₹{selectedTxn.amount.toLocaleString()}</p>
            </div>

            <div className="space-y-3">
              <h4 className="text-slate-300 font-bold uppercase font-sans text-xs">Real Settlement Execution Steps:</h4>
              
              <div className="space-y-2 border-l-2 border-[#232D42] pl-4 ml-2">
                <div className="relative">
                  <span className="absolute -left-[21px] top-0 w-3 h-3 rounded-full bg-emerald-400"></span>
                  <p className="font-bold text-white">Step 1: Device & Geo Fingerprint Verification</p>
                  <p className="text-slate-400 text-[11px]">{selectedTxn.location}</p>
                </div>

                <div className="relative pt-2">
                  <span className="absolute -left-[21px] top-2 w-3 h-3 rounded-full bg-emerald-400"></span>
                  <p className="font-bold text-white">Step 2: Payee VPA Handle Lookup</p>
                  <p className="text-slate-400 text-[11px]">{selectedTxn.payee_name}</p>
                </div>

                <div className="relative pt-2">
                  <span className={`absolute -left-[21px] top-2 w-3 h-3 rounded-full ${
                    selectedTxn.is_anomaly ? 'bg-red-500 animate-ping' : 'bg-emerald-400'
                  }`}></span>
                  <p className="font-bold text-white">Step 3: AI Isolation Forest ML Anomaly Assessment</p>
                  <p className="text-amber-400 text-[11px]">Score: {selectedTxn.risk_score} / 100</p>
                </div>

                <div className="relative pt-2">
                  <span className={`absolute -left-[21px] top-2 w-3 h-3 rounded-full ${
                    selectedTxn.status === 'BLOCKED' ? 'bg-red-500' : 'bg-emerald-400'
                  }`}></span>
                  <p className="font-bold text-white">Step 4: NPCI Core Settlement Action</p>
                  <p className={selectedTxn.status === 'BLOCKED' ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
                    {selectedTxn.status === 'BLOCKED' ? 'INTERCEPTED & FROZEN' : 'CLEARED FOR SETTLEMENT'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setSelectedTxn(null)}
            className="w-full mt-6 py-3 rounded-xl bg-[#161D2F] border border-[#232D42] text-white font-bold text-xs"
          >
            Close Settlement Breakdown
          </button>
        </div>
      )}
    </div>
  );
};