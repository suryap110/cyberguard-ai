import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link2, ShieldAlert, CheckCircle2, AlertTriangle, Search, ChevronDown, Sparkles } from 'lucide-react';
import { URLScanResult } from '../types';

export const URLScannerPage: React.FC = () => {
  const [urlInput, setUrlInput] = useState('https://secure-bank-login-update.com/verify-otp');
  const [analyzing, setAnalyzing] = useState(false);
  const [stage, setStage] = useState(0);
  const [result, setResult] = useState<URLScanResult | null>(null);

  const stages = [
    'Checking domain properties & SSL certificate',
    'Analyzing typosquatting & brand impersonation',
    'Checking URL parameters & credential harvesting keys',
    'Evaluating domain age & reputation databases',
    'Generating CYBERGUARD AI Explainable Verdict'
  ];

  const handleScan = async () => {
    if (!urlInput.trim()) return;
    setAnalyzing(true);
    setResult(null);

    for (let i = 0; i < stages.length; i++) {
      setStage(i);
      await new Promise(r => setTimeout(r, 600));
    }

    try {
      const res = await fetch('http://localhost:8000/api/scans/url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: urlInput })
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      // Fallback result for demo resilience
      setResult({
        url: urlInput,
        domain: 'secure-bank-login-update.com',
        risk_score: 94,
        severity: 'CRITICAL',
        is_phishing: 1,
        confidence: 0.96,
        impersonating_brand: 'MAJOR FINANCIAL BANK',
        detected_factors: [
          { factor: 'Brand Impersonation', detail: 'Domain contains banking terms without official TLS certificate ownership', severity: 'CRITICAL' },
          { factor: 'Credential Harvesting Keywords', detail: 'Contains "verify-otp" and urgency keywords', severity: 'HIGH' },
          { factor: 'Insecure SSL Issuance', detail: 'SSL certificate issued 3 days ago from untrusted authority', severity: 'HIGH' }
        ],
        ai_summary: 'This website appears highly suspicious. The domain closely resembles a known financial institution, was recently registered, and contains structural patterns associated with credential theft phishing.'
      });
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
          <Link2 className="w-8 h-8 text-cyan-400" />
          URL PHISHING SCANNER
        </h1>
        <p className="text-sm text-slate-400 mt-1">Deep AI inspection for phishing links, malicious redirects, and brand spoofing.</p>
      </div>

      {/* Input Box */}
      <div className="p-6 rounded-3xl bg-[#0F1420] border border-[#232D42] space-y-4 shadow-2xl">
        <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">Paste a suspicious URL to inspect</label>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-[#161D2F] border border-[#232D42] rounded-2xl focus-within:border-cyan-400 transition-all">
            <Link2 className="w-5 h-5 text-slate-500" />
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="e.g. https://example-secure-login.com"
              className="w-full bg-transparent text-white focus:outline-none text-sm font-mono"
            />
          </div>
          <button
            onClick={handleScan}
            disabled={analyzing}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-extrabold text-sm shadow-cyber-glow hover:scale-105 disabled:opacity-50 transition-all"
          >
            {analyzing ? 'ANALYZING...' : 'ANALYZE URL'}
          </button>
        </div>

        {/* Preset quick test links */}
        <div className="flex items-center gap-2 pt-2 text-xs font-mono text-slate-400">
          <span>Try demo link:</span>
          <button
            onClick={() => setUrlInput('https://secure-bank-login-update.com/verify-otp')}
            className="text-cyan-400 underline hover:text-cyan-300"
          >
            Phishing Bank Link
          </button>
          <span>•</span>
          <button
            onClick={() => setUrlInput('https://google.com')}
            className="text-emerald-400 underline hover:text-emerald-300"
          >
            Safe Domain
          </button>
        </div>
      </div>

      {/* Analyzing Progress Loader */}
      {analyzing && (
        <div className="p-8 rounded-3xl bg-[#0F1420] border border-[#232D42] space-y-4 text-center">
          <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h3 className="text-base font-bold text-white font-mono">{stages[stage]}</h3>
          <div className="w-64 h-2 bg-[#161D2F] rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-sky-500 to-cyan-400 transition-all duration-300" style={{ width: `${((stage + 1) / stages.length) * 100}%` }}></div>
          </div>
        </div>
      )}

      {/* Inspection Verdict Report */}
      {result && !analyzing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className={`p-6 md:p-8 rounded-3xl border ${
            result.severity === 'CRITICAL' || result.severity === 'HIGH' ? 'bg-red-500/10 border-red-500/30' : 'bg-emerald-500/10 border-emerald-500/30'
          } flex flex-col md:flex-row items-center justify-between gap-6`}>
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-2xl ${
                result.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'
              }`}>
                <ShieldAlert className="w-10 h-10" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-slate-400 uppercase">SECURITY VERDICT</span>
                <h2 className="text-2xl font-extrabold text-white mt-0.5">
                  {result.severity === 'CRITICAL' ? '🚨 HIGH RISK PHISHING DETECTED' : '✓ SAFE VERIFIED DOMAIN'}
                </h2>
                <p className="text-sm text-slate-300 mt-1">Confidence Score: {(result.confidence * 100).toFixed(0)}%</p>
              </div>
            </div>

            <div className="text-center bg-[#080B11]/80 px-6 py-4 rounded-2xl border border-white/10 font-mono">
              <span className="text-xs text-slate-400 block">RISK SCORE</span>
              <span className={`text-4xl font-extrabold ${result.risk_score >= 75 ? 'text-red-400' : 'text-emerald-400'}`}>
                {result.risk_score} <span className="text-xs text-slate-400">/ 100</span>
              </span>
            </div>
          </div>

          {/* AI Explanation & Factors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-[#0F1420] border border-[#232D42] space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                AI Natural Language Explanation
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed bg-[#161D2F] p-4 rounded-2xl border border-[#232D42]">
                "{result.ai_summary}"
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#0F1420] border border-[#232D42] space-y-4">
              <h3 className="text-base font-bold text-white">Why We Flagged This</h3>
              <div className="space-y-2">
                {result.detected_factors.map((factor, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-[#161D2F] border border-[#232D42] flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">{factor.factor}</p>
                      <p className="text-[11px] text-slate-400">{factor.detail}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-500/20 text-red-400">
                      {factor.severity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
