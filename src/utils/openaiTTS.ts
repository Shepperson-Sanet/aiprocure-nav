import { supabase } from '@/integrations/supabase/client';

export interface OpenAITTSOptions {
  voice?: 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer';
}

export class OpenAITTSManager {
  private currentAudio: HTMLAudioElement | null = null;
  private isSpeaking = false;
  private onSpeakingChange?: (speaking: boolean) => void;

  constructor(onSpeakingChange?: (speaking: boolean) => void) {
    this.onSpeakingChange = onSpeakingChange;
  }

  async speak(text: string, options: OpenAITTSOptions = {}): Promise<void> {
    console.log('🗣️ OpenAI TTS Speaking:', text);
    
    try {
      this.stop(); // Stop any current audio
      this.setSpeaking(true);

      const { data, error } = await supabase.functions.invoke('openai-tts', {
        body: { 
          text, 
          voice: options.voice || 'nova'  // Professional female voice for Lucy
        }
      });

      if (error) {
        console.error('❌ TTS error:', error);
        throw error;
      }

      console.log('✅ TTS response received');

      // Convert base64 to blob and create audio URL
      const audioData = atob(data.audioContent);
      const audioArray = new Uint8Array(audioData.length);
      for (let i = 0; i < audioData.length; i++) {
        audioArray[i] = audioData.charCodeAt(i);
      }
      
      const audioBlob = new Blob([audioArray], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);

      // Create and play audio
      this.currentAudio = new Audio(audioUrl);
      
      this.currentAudio.onended = () => {
        console.log('✅ TTS playback ended');
        this.setSpeaking(false);
        if (audioUrl) {
          URL.revokeObjectURL(audioUrl);
        }
      };
      
      this.currentAudio.onerror = (error) => {
        console.error('❌ Audio playback error:', error);
        this.setSpeaking(false);
        if (audioUrl) {
          URL.revokeObjectURL(audioUrl);
        }
      };

      await this.currentAudio.play();
      console.log('🎵 TTS playback started');

    } catch (error) {
      console.error('❌ TTS error:', error);
      this.setSpeaking(false);
      throw error;
    }
  }

  stop(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
    this.setSpeaking(false);
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
