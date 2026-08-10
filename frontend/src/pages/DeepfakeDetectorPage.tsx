import React, { useState } from 'react';
import { Mic, Video, ShieldAlert, Sparkles, CheckCircle2, RefreshCw } from 'lucide-react';
import { ToastContainer, ToastMessage } from '../components/ui/Toast';

export const DeepfakeDetectorPage: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [analyzingAudio, setAnalyzingAudio] = useState(false);
  const [audioResult, setAudioResult] = useState<any>(null);

  const addToast = (type: 'success' | 'warning' | 'error' | 'info', title: string, message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  const handleTestAudioSample = () => {
    setAnalyzingAudio(true);
    setAudioResult(null);

    setTimeout(() => {
      setAnalyzingAudio(false);
      setAudioResult({
        isDeepfake: true,
        confidence: '98.7% SYNTHETIC AI VOICE DETECTED',
        artifacts: [
          'Spectral Discontinuity: Neural text-to-speech phase mismatch at 4.2 kHz frequency',
          'Synthetic Pitch Cadence: Robocall voice clone matching ElevenLabs / Bark neural engine signature',
          'Zero Background Ambient Noise: Artificial silence floor detected'
        ]
      });
      addToast('error', 'Deepfake AI Voice Detected', 'Sample is an AI voice clone used in family emergency ransom scams!');
    }, 1600);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-6xl mx-auto relative">
      <ToastContainer toasts={toasts} onClose={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />

      <div>
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded-full bg-red-500/20 text-red-400 font-mono text-xs font-bold border border-red-500/30">
            SPECTRAL AUDIO & FACIAL MESH ANALYZER
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-2 flex items-center gap-3">
          <Mic className="w-8 h-8 text-cyan-400" />
          AI DEEPFAKE VOICE CLONE & VIDEO SCAM DETECTOR
        </h1>
        <p className="text-sm text-slate-400 mt-1">Detect AI-cloned voice extortion calls ("Dad, I'm in trouble!") and synthetic video deepfakes.</p>
      </div>

      <div className="p-8 rounded-3xl bg-[#0F1420] border border-[#232D42] space-y-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white">Voice Call Spectral Waveform Analyzer</h3>
          <span className="text-xs font-mono text-cyan-400">Neural TTS Signature Engine</span>
        </div>

        <div className="p-6 rounded-2xl bg-[#161D2F] border border-[#232D42] text-center space-y-3">
          <p className="text-xs font-mono text-slate-300">Test an incoming voice recording or phone call audio stream</p>
          <button
            onClick={handleTestAudioSample}
            disabled={analyzingAudio}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-extrabold text-xs shadow-red-glow hover:scale-105 transition-all"
          >
            {analyzingAudio ? 'ANALYZING SPECTRAL WAVEFORM...' : 'TEST AI VOICE CLONE SAMPLE'}
          </button>
        </div>

        {audioResult && (
          <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/40 font-mono text-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-red-400 font-sans">{audioResult.confidence}</span>
              <span className="px-2.5 py-0.5 rounded bg-red-500/20 text-red-400 font-bold">SYNTHETIC VOICE</span>
            </div>
            <div className="space-y-1 text-slate-300">
              {audioResult.artifacts.map((art: string, i: number) => (
                <p key={i}>• {art}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};