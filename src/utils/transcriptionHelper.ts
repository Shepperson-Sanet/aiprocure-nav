
import { supabase } from '@/integrations/supabase/client';

export const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
  try {
    // Convert blob to base64
    const base64Audio = await blobToBase64(audioBlob);
    
    // Call the existing Supabase edge function
    const { data, error } = await supabase.functions.invoke('whisper-transcription', {
      body: { audio: base64Audio }
    });

    if (error) {
      console.error('Transcription error:', error);
      throw new Error('Failed to transcribe audio');
    }

    return data.text || '';
  } catch (error) {
    console.error('Error in transcription helper:', error);
    throw error;
  }
};

const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the data URL prefix to get just the base64 data
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
