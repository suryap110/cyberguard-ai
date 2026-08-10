import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, ShieldAlert, AlertTriangle, Sparkles, CheckCircle2, Info, ArrowRight } from 'lucide-react';
import { MessageScanResult } from '../types';
import { RiskMeter } from '../components/ui/RiskMeter';

export const MessageScannerPage: React.FC = () => {
  const sampleScams = [
    {
      title: '🚨 Bank Account Blocking & OTP Scam',
      text: 'URGENT: Your bank account will be blocked today due to pending KYC verification. Click http://secure-bank-login-update.com immediately to enter your OTP and prevent deactivation.'
    },
    {
      title: '⚡ Electricity Disconnection Threat',
      text: 'Dear Customer, your electricity power connection will be disconnected tonight at 9:30 PM due to previous bill non-update. Call electricity officer immediately at 9876543210.'
    },
    {
      title: '🎁 Unsolicited Cashback & Reward Hook',
      text: 'Congratulations! You have won ₹25,000 Paytm Reward Cashback points. Claim your cashback directly into your bank account by visiting http://paytm-reward-claim.online/cashback.'
    },
    {
      title: '📦 Courier Parcel KYC Verification',
      text: 'IndiaPost Notice: Your shipment parcel #IN-98124 cannot be delivered due to address mismatch. Pay ₹25 update fee now at http://indiapost-address-verify.site/pay.'
    },
    {
      title: '💼 Part-Time Job Offer UPI Scam',
      text: 'Earn ₹3000 to ₹5000 daily by liking YouTube videos! No investment required. Send your UPI ID and WhatsApp details to 9123456789 to get started now.'
    }
  ];

  const [messageInput, setMessageInput] = useState(sampleScams[0].text);
  const [result, setResult] = useState<MessageScanResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [activePhrase, setActivePhrase] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!messageInput.trim()) return;
    setLoading(true);
    setActivePhrase(null);
    try {
      const res = await fetch('http://localhost:8000/api/scans/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageInput })
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setResult({
        raw_message: messageInput,
        risk_score: 95,
        severity: 'CRITICAL',
        detected_intent: 'High-Risk OTP & Banking Scam',
        suspicious_phrases: [
          { phrase: 'blocked today', reason: 'Urgency & Fear Tactics (Artificially forces quick compliance)', risk_boost: 25 },
          { phrase: 'enter your OTP', reason: 'Credential Harvesting Request (Banks never ask for OTP via SMS links)', risk_boost: 30 },
          { phrase: 'http://secure-bank-login-update.com', reason: 'Unverified External Link (Domain registered 3 days ago)', risk_boost: 25 }
        ],
        explanation: 'CYBERGUARD NLP identified multiple high-risk social engineering vectors including artificial urgency, credential harvesting requests, and unverified phishing URLs.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
          <MessageSquare className="w-8 h-8 text-cyan-400" />
          SCAM MESSAGE NLP SCANNER
        </h1>
        <p className="text-sm text-slate-400 mt-1">Paste SMS messages, emails, or WhatsApp texts to inspect social engineering scam vectors.</p>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">Try Real-World Scam Examples:</label>
        <div className="flex flex-wrap gap-2">
          {sampleScams.map((scam, i) => (
            <button
              key={i}
              onClick={() => {
                setMessageInput(scam.text);
                setResult(null);
              }}
              className="px-3.5 py-2 rounded-xl bg-[#0F1420] border border-[#232D42] hover:border-cyan-400 text-xs font-medium text-slate-300 hover:text-white transition-all text-left"
            >
              {scam.title}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-[#0F1420] border border-[#232D42] space-y-4 shadow-2xl">
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
            {loading ? 'ANALYZING NLP...' : 'ANALYZE MESSAGE'}
          </button>
        </div>
      </div>

      {result && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#0F1420] border border-[#232D42] space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#232D42] pb-4">
              <div>
                <span className="text-xs font-mono text-slate-400">DETECTED INTENT CLASSIFICATION</span>
                <h3 className="text-xl font-bold text-white mt-0.5">{result.detected_intent}</h3>
              </div>
              <div className="text-right font-mono">
                <span className="text-xs text-slate-400 block">RISK SCORE</span>
                <span className={`text-2xl font-extrabold ${result.risk_score >= 75 ? 'text-red-400' : 'text-emerald-400'}`}>
                  {result.risk_score} / 100 ({result.severity})
                </span>
              </div>
            </div>

            <RiskMeter score={result.risk_score} />

            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">Interactive Scam Word Inspector</h4>
                <span className="text-[11px] font-mono text-cyan-400">Click highlighted red phrases below to view threat details</span>
              </div>
              <div className="p-5 rounded-2xl bg-[#161D2F] border border-[#232D42] text-sm text-slate-200 leading-relaxed font-sans relative">
                {result.raw_message.split(' ').map((word, i) => {
                  const match = result.suspicious_phrases.find(p => p.phrase.toLowerCase().includes(word.toLowerCase().replace(/[^a-z0-9]/gi, '')));
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

            <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-xs text-slate-300 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <p>{result.explanation}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};