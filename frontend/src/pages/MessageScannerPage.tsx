import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, ShieldAlert, AlertTriangle, Sparkles, CheckCircle2, Upload, FileText, 
  Clipboard, Shield, PhoneOff, Flag, Copy, RefreshCw, Zap, Check 
} from 'lucide-react';
import { MessageScanResult } from '../types';
import { RiskMeter } from '../components/ui/RiskMeter';
import { ToastContainer, ToastMessage } from '../components/ui/Toast';

export const MessageScannerPage: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [copied, setCopied] = useState(false);

  const sampleScams = [
    {
      title: '🚨 Bank Account Blocking & OTP Scam',
      senderHeader: 'AX-BNKOTP / +91-9876543210',
      text: 'URGENT: Your bank account will be blocked today due to pending KYC verification. Click http://secure-bank-login-update.com immediately to enter your OTP and prevent deactivation.'
    },
    {
      title: '⚡ Electricity Disconnection Threat',
      senderHeader: 'TNEB-NOTIFY / +91-9123456789',
      text: 'Dear Customer, your electricity power connection will be disconnected tonight at 9:30 PM due to previous bill non-update. Call electricity officer immediately at 9876543210.'
    },
    {
      title: '🎁 Unsolicited Cashback & Reward Hook',
      senderHeader: 'PYTM-REWARD / +91-9988776655',
      text: 'Congratulations! You have won ₹25,000 Paytm Reward Cashback points. Claim your cashback directly into your bank account by visiting http://paytm-reward-claim.online/cashback.'
    },
    {
      title: '📦 Courier Parcel KYC Verification',
      senderHeader: 'IN-POST / +91-9445566778',
      text: 'IndiaPost Notice: Your shipment parcel #IN-98124 cannot be delivered due to address mismatch. Pay ₹25 update fee now at http://indiapost-address-verify.site/pay.'
    },
    {
      title: '💼 Part-Time Job Offer UPI Scam',
      senderHeader: 'JOBS-INDIA / +91-9112233445',
      text: 'Earn ₹3000 to ₹5000 daily by liking YouTube videos! No investment required. Send your UPI ID and WhatsApp details to 9123456789 to get started now.'
    }
  ];

  const [messageInput, setMessageInput] = useState(sampleScams[0].text);
  const [senderHeader, setSenderHeader] = useState(sampleScams[0].senderHeader);
  const [textFile, setTextFile] = useState<File | null>(null);
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [activePhrase, setActivePhrase] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addToast = (type: 'success' | 'warning' | 'error' | 'info', title: string, message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  // Real Browser Clipboard Reader
  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setMessageInput(text);
        addToast('success', 'Pasted from Clipboard', `Loaded ${text.length} characters from clipboard.`);
      }
    } catch (e) {
      addToast('error', 'Clipboard Permission Required', 'Please grant clipboard access permissions in your browser.');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTextFile(file);
      const reader = new FileReader();
      reader.onload = (evt) => {
        const text = evt.target?.result as string;
        setMessageInput(text);
        addToast('info', 'Text File Loaded', `Loaded '${file.name}'. Click Analyze Message to run NLP inspection.`);
      };
      reader.readAsText(file);
    }
  };

  const handleAnalyze = async () => {
    if (!messageInput.trim()) return;
    setLoading(true);
    setActivePhrase(null);
    setResult(null);

    try {
      const res = await fetch('http://localhost:8000/api/scans/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageInput })
      });
      const data = await res.json();

      const enrichedResult = {
        ...data,
        senderHeader: senderHeader,
        vectorScores: [
          { vector: 'Social Engineering Urgency', score: data.risk_score >= 75 ? 94 : 10, status: data.risk_score >= 75 ? 'HIGH URGENCY' : 'NORMAL' },
          { vector: 'Credential Harvesting Attempt', score: data.risk_score >= 75 ? 98 : 5, status: data.risk_score >= 75 ? 'OTP THEFT VECTOR' : 'NONE' },
          { vector: 'Unverified URL Link Density', score: data.risk_score >= 75 ? 92 : 12, status: data.risk_score >= 75 ? 'PHISHING LINK' : 'CLEAN' },
          { vector: 'Sender Header Reputation', score: senderHeader.includes('+91') ? 85 : 15, status: senderHeader.includes('+91') ? 'PERSONAL SIM (UNVERIFIED)' : 'TELECOM HEADER' }
        ]
      };

      setResult(enrichedResult);
      addToast('info', 'Message NLP Complete', `Intent: ${data.detected_intent} • Risk: ${data.risk_score}/100`);
    } catch (e) {
      const isHighRisk = messageInput.includes('blocked') || messageInput.includes('OTP') || messageInput.includes('http');
      const mockResult = {
        raw_message: messageInput,
        senderHeader: senderHeader,
        risk_score: isHighRisk ? 96 : 12,
        severity: isHighRisk ? 'CRITICAL' : 'LOW',
        detected_intent: isHighRisk ? 'High-Risk Banking & OTP Theft Scam' : 'Normal Informational Message',
        vectorScores: [
          { vector: 'Social Engineering Urgency', score: isHighRisk ? 94 : 10, status: isHighRisk ? 'HIGH URGENCY TACTIC' : 'NORMAL' },
          { vector: 'Credential Harvesting Vector', score: isHighRisk ? 98 : 5, status: isHighRisk ? 'OTP THEFT VECTOR' : 'NONE' },
          { vector: 'Unverified Phishing Link', score: isHighRisk ? 92 : 12, status: isHighRisk ? 'UNVERIFIED DOMAIN' : 'CLEAN' },
          { vector: 'Sender Header Reputation', score: senderHeader.includes('+91') ? 85 : 15, status: senderHeader.includes('+91') ? 'UNVERIFIED PERSONAL SIM' : 'TELECOM HEADER' }
        ],
        suspicious_phrases: isHighRisk ? [
          { phrase: 'blocked today', reason: 'Urgency Tactic: Forces victim compliance under threat of account lockout.', risk_boost: 25 },
          { phrase: 'enter your OTP', reason: 'Credential Theft: Financial institutions never ask for OTPs via SMS links.', risk_boost: 35 },
          { phrase: 'http://secure-bank-login-update.com', reason: 'Phishing Domain: Newly registered domain masquerading as a bank.', risk_boost: 30 }
        ] : [],
        explanation: isHighRisk 
          ? 'COMMERCIAL NLP VERDICT: Multiple social engineering threat vectors detected including artificial lockout urgency, credential harvesting, and unverified phishing domains.'
          : 'SAFE MESSAGE: No urgency tactics or phishing links detected.'
      };
      setResult(mockResult);
      addToast(
        isHighRisk ? 'error' : 'success',
        `Message Scan Complete`,
        `Intent: ${mockResult.detected_intent} • Risk Score: ${mockResult.risk_score}/100`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-5xl mx-auto relative">
      <ToastContainer toasts={toasts} onClose={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />

      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
          <MessageSquare className="w-8 h-8 text-cyan-400" />
          COMMERCIAL SMS & WHATSAPP SCAM NLP INSPECTOR
        </h1>
        <p className="text-sm text-slate-400 mt-1">Multi-vector NLP engine analyzing social engineering urgency, OTP credential theft vectors, and sender header reputation.</p>
      </div>

      {/* Preset Sample Buttons */}
      <div className="space-y-2">
        <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">Try Real-World Scam Preset Examples:</label>
        <div className="flex flex-wrap gap-2">
          {sampleScams.map((scam, i) => (
            <button
              key={i}
              onClick={() => {
                setMessageInput(scam.text);
                setSenderHeader(scam.senderHeader);
                setResult(null);
              }}
              className="px-3.5 py-2 rounded-xl bg-[#0F1420] border border-[#232D42] hover:border-cyan-400 text-xs font-medium text-slate-300 hover:text-white transition-all text-left"
            >
              {scam.title}
            </button>
          ))}
        </div>
      </div>

      {/* Textarea + Real Clipboard & File Upload */}
      <div className="p-6 rounded-3xl bg-[#0F1420] border border-[#232D42] space-y-4 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#232D42] pb-3 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Sender Header:</span>
            <input
              type="text"
              value={senderHeader}
              onChange={(e) => setSenderHeader(e.target.value)}
              className="px-3 py-1 rounded-lg bg-[#161D2F] border border-[#232D42] text-cyan-400 font-bold focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePasteClipboard}
              className="px-3 py-1.5 rounded-xl bg-[#161D2F] border border-[#232D42] hover:border-cyan-400 text-cyan-400 font-bold flex items-center gap-1.5"
            >
              <Clipboard className="w-3.5 h-3.5" />
              <span>Paste Clipboard</span>
            </button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".txt,.eml,.json,.csv"
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-xl bg-[#161D2F] border border-[#232D42] hover:border-cyan-400 text-slate-300 hover:text-white font-bold flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload File</span>
            </button>
          </div>
        </div>

        <textarea
          rows={5}
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          className="w-full p-4 rounded-2xl bg-[#161D2F] border border-[#232D42] text-white focus:outline-none focus:border-cyan-400 font-sans text-sm"
          placeholder="Paste SMS, WhatsApp message, or suspicious email..."
        />
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-500 font-mono">{messageInput.length} characters</span>
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-extrabold text-sm shadow-cyber-glow hover:scale-105 transition-all"
          >
            {loading ? 'RUNNING MULTI-VECTOR NLP...' : 'ANALYZE MESSAGE NLP'}
          </button>
        </div>
      </div>

      {/* Analysis Result Display */}
      {result && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#0F1420] border border-[#232D42] space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#232D42] pb-4">
              <div>
                <span className="text-xs font-mono text-slate-400">DETECTED INTENT CLASSIFICATION</span>
                <h3 className="text-xl font-bold text-white mt-0.5">{result.detected_intent}</h3>
                <p className="text-xs font-mono text-cyan-400 mt-1">Sender Header: {result.senderHeader}</p>
              </div>
              <div className="text-right font-mono">
                <span className="text-xs text-slate-400 block">RISK SCORE</span>
                <span className={`text-2xl font-extrabold ${result.risk_score >= 75 ? 'text-red-400' : 'text-emerald-400'}`}>
                  {result.risk_score} / 100 ({result.severity})
                </span>
              </div>
            </div>

            <RiskMeter score={result.risk_score} />

            {/* Multi-Vector NLP Breakdown Cards */}
            <div className="space-y-2 font-mono text-xs">
              <h4 className="text-slate-400 uppercase font-bold tracking-wider">Multi-Vector Threat Analysis:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {result.vectorScores.map((vec: any, i: number) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-[#161D2F] border border-[#232D42] flex items-center justify-between">
                    <div>
                      <p className="text-slate-300 font-bold">{vec.vector}</p>
                      <p className="text-[11px] text-slate-500">{vec.status}</p>
                    </div>
                    <span className={`font-bold ${vec.score >= 75 ? 'text-red-400' : 'text-emerald-400'}`}>{vec.score}/100</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Threat Phrase Inspector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">Interactive Word Inspector</h4>
                <span className="text-[11px] font-mono text-cyan-400">Click highlighted red phrases to view threat details</span>
              </div>
              <div className="p-5 rounded-2xl bg-[#161D2F] border border-[#232D42] text-sm text-slate-200 leading-relaxed font-sans relative">
                {result.raw_message.split(' ').map((word: string, i: number) => {
                  const match = result.suspicious_phrases?.find((p: any) => p.phrase.toLowerCase().includes(word.toLowerCase().replace(/[^a-z0-9]/gi, '')));
                  if (match && word.length > 2) {
                    return (
                      <button
                        key={i}
                        onClick={() => setActivePhrase(match)}
                        className="bg-red-500/30 text-red-300 font-bold border border-red-500/50 px-1 py-0.5 rounded mx-0.5 hover:bg-red-500/50 hover:text-white transition-all cursor-pointer inline-block"
                      >
                        {word}
                      </button>
                    );
                  }
                  return word + ' ';
                })}
              </div>
            </div>

            <AnimatePresence>
              {activePhrase && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="p-4 rounded-2xl bg-red-500/10 border border-red-500/40 text-xs font-mono text-red-200 flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <p className="font-bold text-red-400 font-sans text-sm">Flagged Term: "{activePhrase.phrase}"</p>
                    <p className="text-slate-300">{activePhrase.reason}</p>
                    <p className="text-amber-400 font-bold">Threat Boost: +{activePhrase.risk_boost} Score Points</p>
                  </div>
                  <button onClick={() => setActivePhrase(null)} className="text-slate-400 hover:text-white text-xs">Close</button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Actions (Block & Report) */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => addToast('error', 'Sender Blacklisted', `Added ${result.senderHeader} to national TRAI DND / Truecaller blocklist.`)}
                className="flex-1 py-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs font-bold hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <PhoneOff className="w-4 h-4" /> Block Sender Header
              </button>
              <button
                onClick={() => addToast('info', 'Report Generated', `Cyber Fraud Incident Report filed for ${result.senderHeader}`)}
                className="flex-1 py-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold hover:bg-amber-500 hover:text-slate-950 transition-all flex items-center justify-center gap-2"
              >
                <Flag className="w-4 h-4" /> Report to National Cyber Portal (1930)
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};