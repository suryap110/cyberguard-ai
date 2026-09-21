// Web Speech API Voice Synthesizer for CyberGuard AI

class VoiceSpeechSynthesizer {
  private synth: SpeechSynthesis | null = null;
  public enabled: boolean = true;
  private voice: SpeechSynthesisVoice | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoice();
    }
  }

  private initVoice() {
    if (!this.synth) return;
    const loadVoices = () => {
      const voices = this.synth?.getVoices() || [];
      // Select futuristic English voice if available
      this.voice = voices.find(v => v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Daniel') || v.lang.startsWith('en')) || voices[0] || null;
    };
    loadVoices();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = loadVoices;
    }
  }

  public speak(text: string, force: boolean = false) {
    if (!this.enabled && !force) return;
    if (!this.synth) return;

    try {
      this.synth.cancel(); // Stop any ongoing speech
      const cleanText = text.replace(/[*_#`~]/g, ''); // Remove Markdown formatting symbols
      const utterance = new SpeechSynthesisUtterance(cleanText);
      if (this.voice) utterance.voice = this.voice;
      utterance.rate = 1.05; // Slightly faster for AI feel
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      this.synth.speak(utterance);
    } catch (e) {
      console.warn('Voice speech synthesis error:', e);
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }
}

export const voiceSpeech = new VoiceSpeechSynthesizer();
