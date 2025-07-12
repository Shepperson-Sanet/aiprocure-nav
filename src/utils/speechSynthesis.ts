
export interface SpeechOptions {
  rate?: number;
  volume?: number;
  lang?: string;
}

export class SpeechSynthesisManager {
  private speechTimeoutRef: NodeJS.Timeout | null = null;
  private isSpeaking = false;
  private onSpeakingChange?: (speaking: boolean) => void;

  constructor(onSpeakingChange?: (speaking: boolean) => void) {
    this.onSpeakingChange = onSpeakingChange;
  }

  speak(text: string, options: SpeechOptions = {}): void {
    console.log('🗣️ Speaking:', text);
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported');
      return;
    }

    // Stop any current speech
    speechSynthesis.cancel();
    
    this.setSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = options.rate || 0.9;
    utterance.volume = options.volume || 0.8;
    
    // Set British accent
    const voices = speechSynthesis.getVoices();
    const britishVoice = voices.find(voice => 
      voice.lang.includes('en-GB') || 
      voice.name.toLowerCase().includes('british') ||
      voice.name.toLowerCase().includes('uk') ||
      voice.name.toLowerCase().includes('daniel') ||
      voice.name.toLowerCase().includes('serena')
    );
    
    if (britishVoice) {
      utterance.voice = britishVoice;
      console.log('🇬🇧 Using British voice:', britishVoice.name);
    } else {
      // Fallback to any English voice with British characteristics
      const englishVoice = voices.find(voice => voice.lang.startsWith('en-'));
      if (englishVoice) {
        utterance.voice = englishVoice;
        utterance.lang = 'en-GB';
        console.log('🇬🇧 Using fallback English voice with British accent:', englishVoice.name);
      }
    }
    
    utterance.onend = () => {
      console.log('✅ Speech ended');
      this.setSpeaking(false);
    };
    
    utterance.onerror = (error) => {
      console.error('❌ Speech error:', error);
      this.setSpeaking(false);
    };
    
    speechSynthesis.speak(utterance);
    
    // Safety timeout to ensure speaking state is reset
    if (this.speechTimeoutRef) {
      clearTimeout(this.speechTimeoutRef);
    }
    this.speechTimeoutRef = setTimeout(() => {
      console.log('⏰ Speech timeout reached, resetting speaking state');
      this.setSpeaking(false);
    }, text.length * 100 + 2000); // Estimate based on text length
  }

  stop(): void {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
    this.setSpeaking(false);
    
    if (this.speechTimeoutRef) {
      clearTimeout(this.speechTimeoutRef);
      this.speechTimeoutRef = null;
    }
  }

  private setSpeaking(speaking: boolean): void {
    this.isSpeaking = speaking;
    if (this.onSpeakingChange) {
      this.onSpeakingChange(speaking);
    }
  }

  getIsSpeaking(): boolean {
    return this.isSpeaking;
  }

  cleanup(): void {
    this.stop();
  }
}
