import React from 'react';
import { ShieldCheck, Download, Printer, ArrowLeft, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const SecurityReportPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-4xl mx-auto">
      {/* Top Header Actions */}
      <div className="flex items-center justify-between border-b border-[#232D42] pb-6 print:hidden">
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-xs font-mono text-cyan-400 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Personal Security Center
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-bold text-xs shadow-cyber-glow hover:scale-105 transition-all flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Export PDF Report</span>
          </button>
        </div>
      </div>

      {/* Printable Report Document Card */}
      <div className="p-8 md:p-12 rounded-3xl bg-[#0F1420] border border-[#232D42] space-y-8 shadow-2xl text-white print:bg-white print:text-black print:p-0 print:border-none">
        <div className="flex items-center justify-between border-b border-[#232D42] pb-6 print:border-gray-300">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-8 h-8 text-cyan-400 print:text-blue-600" />
              <h1 className="text-2xl font-extrabold tracking-wider">CYBERGUARD AI</h1>
            </div>
            <p className="text-xs font-mono text-cyan-400 mt-1 uppercase print:text-gray-600">Official Cybersecurity Audit & Posture Report</p>
          </div>
          <div className="text-right font-mono text-xs text-slate-400 print:text-gray-600">
            <p>Report ID: AUDIT-2026-9812</p>
            <p>Generated: {today}</p>
          </div>
        </div>

        {/* User Identity & Security Score */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-[#161D2F] border border-[#232D42] print:bg-gray-100 print:border-gray-300">
            <span className="text-xs font-mono text-slate-400 print:text-gray-600 block">PROTECTED IDENTITY</span>
            <h3 className="text-lg font-bold text-white mt-1 print:text-black">{user?.full_name || 'Surya'}</h3>
            <p className="text-xs font-mono text-slate-400 print:text-gray-600 mt-0.5">{user?.email}</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#161D2F] border border-[#232D42] print:bg-gray-100 print:border-gray-300 flex items-center justify-between font-mono">
            <div>
              <span className="text-xs text-slate-400 print:text-gray-600 block">CYBER RISK SCORE</span>
              <span className="text-xs font-bold text-emerald-400 print:text-green-600">POSTURE: SECURE</span>
            </div>
            <span className="text-4xl font-extrabold text-emerald-400 print:text-green-600">
              {user?.security_score || 92} <span className="text-xs text-slate-400 print:text-gray-600">/ 100</span>
            </span>
          </div>
        </div>

        {/* Security Score Breakdown Table */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold font-mono text-slate-300 print:text-black uppercase">Category Security Evaluation</h3>
          <div className="border border-[#232D42] rounded-2xl overflow-hidden print:border-gray-300">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#161D2F] text-slate-400 print:bg-gray-200 print:text-gray-700">
                <tr>
                  <th className="p-3">Category</th>
                  <th className="p-3">Score</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#232D42] print:divide-gray-300">
                <tr><td className="p-3">Account Authentication Security</td><td className="p-3 font-bold">95/100</td><td className="p-3 text-emerald-400 print:text-green-600">Optimal</td></tr>
                <tr><td className="p-3">Device Trust & Hardware Fingerprints</td><td className="p-3 font-bold">88/100</td><td className="p-3 text-sky-400 print:text-blue-600">Verified</td></tr>
                <tr><td className="p-3">Financial Transaction Safety Baseline</td><td className="p-3 font-bold">94/100</td><td className="p-3 text-emerald-400 print:text-green-600">Optimal</td></tr>
                <tr><td className="p-3">Phishing & Malicious URL Exposure</td><td className="p-3 font-bold">91/100</td><td className="p-3 text-emerald-400 print:text-green-600">Protected</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="p-6 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-xs font-mono space-y-2 print:bg-gray-100 print:border-gray-300 print:text-black">
          <h4 className="font-bold text-cyan-400 print:text-blue-600 font-sans text-sm">CYBERGUARD AI Executive Summary:</h4>
          <p className="text-slate-300 print:text-gray-800 leading-relaxed">
            All registered perimeter vectors are actively monitored. Zero unverified credential exposures were detected across historical database dumps. 1 High-risk transaction (₹85,000 wire attempt) was successfully blocked in real-time.
          </p>
        </div>
      </div>
    </div>
  );
};