
import { useState, useCallback, useRef, useEffect } from 'react';
import { AzureTTSManager, AzureTTSOptions } from '@/utils/azureTTS';

interface UseAzureTTSProps {
  subscriptionKey: string;
  region: string;
}

export const useAzureTTS = ({ subscriptionKey, region }: UseAzureTTSProps) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ttsManagerRef = useRef<AzureTTSManager | null>(null);

  useEffect(() => {
    if (subscriptionKey && region) {
      ttsManagerRef.current = new AzureTTSManager(
        subscriptionKey,
        region,
        setIsSpeaking
      );
    }

    return () => {
      if (ttsManagerRef.current) {
        ttsManagerRef.current.cleanup();
      }
    };
  }, [subscriptionKey, region]);

  const speak = useCallback(async (text: string, options?: AzureTTSOptions) => {
    if (!ttsManagerRef.current) {
      setError('Azure TTS not initialized. Please check your subscription key and region.');
      return;
    }

    try {
      setError(null);
      await ttsManagerRef.current.speak(text, options);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('TTS Error:', err);
    }
  }, []);

  const stop = useCallback(() => {
    if (ttsManagerRef.current) {
      ttsManagerRef.current.stop();
    }
  }, []);

  return {
    speak,
    stop,
    isSpeaking,
    error,
  };
};
