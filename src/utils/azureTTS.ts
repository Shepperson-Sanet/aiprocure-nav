
import * as speechsdk from 'microsoft-cognitiveservices-speech-sdk';

export interface AzureTTSOptions {
  voice?: string;
  rate?: string;
  pitch?: string;
}

export class AzureTTSManager {
  private synthesizer: speechsdk.SpeechSynthesizer | null = null;
  private isSpeaking = false;
  private onSpeakingChange?: (speaking: boolean) => void;

  constructor(
    private subscriptionKey: string,
    private region: string,
    onSpeakingChange?: (speaking: boolean) => void
  ) {
    this.onSpeakingChange = onSpeakingChange;
  }

  private initializeSynthesizer(): void {
    if (!this.synthesizer) {
      const speechConfig = speechsdk.SpeechConfig.fromSubscription(
        this.subscriptionKey,
        this.region
      );
      speechConfig.speechSynthesisOutputFormat = speechsdk.SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3;
      
      const audioConfig = speechsdk.AudioConfig.fromDefaultSpeakerOutput();
      this.synthesizer = new speechsdk.SpeechSynthesizer(speechConfig, audioConfig);
    }
  }

  async speak(text: string, options: AzureTTSOptions = {}): Promise<void> {
    console.log('🗣️ Azure TTS Speaking:', text);
    
    try {
      this.stop(); // Stop any current speech
      this.setSpeaking(true);
      this.initializeSynthesizer();

      if (!this.synthesizer) {
        throw new Error('Failed to initialize speech synthesizer');
      }

      // Create SSML with British voice
      const voice = options.voice || 'en-GB-RyanNeural';
      const rate = options.rate || '0.9';
      const pitch = options.pitch || 'medium';
      
      const ssml = `
        <speak version='1.0' xml:lang='en-GB'>
          <voice name='${voice}'>
            <prosody rate='${rate}' pitch='${pitch}'>
              ${text}
            </prosody>
          </voice>
        </speak>
      `;

      return new Promise((resolve, reject) => {
        if (!this.synthesizer) {
          reject(new Error('Synthesizer not initialized'));
          return;
        }

        this.synthesizer.speakSsmlAsync(
          ssml,
          (result) => {
            console.log('✅ Azure TTS synthesis completed');
            this.setSpeaking(false);
            resolve();
          },
          (error) => {
            console.error('❌ Azure TTS error:', error);
            this.setSpeaking(false);
            reject(error);
          }
        );
      });

    } catch (error) {
      console.error('❌ Azure TTS error:', error);
      this.setSpeaking(false);
      throw error;
    }
  }

  stop(): void {
    if (this.synthesizer) {
      this.synthesizer.close();
      this.synthesizer = null;
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
