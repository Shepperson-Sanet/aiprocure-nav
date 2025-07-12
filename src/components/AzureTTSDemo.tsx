
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAzureTTS } from '@/hooks/useAzureTTS';
import { Volume2, VolumeX, AlertCircle } from 'lucide-react';

const AzureTTSDemo = () => {
  const [text, setText] = useState("Welcome to the Lovable candidate interview platform. This recording will begin shortly. Please ensure you're ready. Thank you.");
  const [voice, setVoice] = useState('en-GB-RyanNeural');
  const [subscriptionKey, setSubscriptionKey] = useState('');
  const [region, setRegion] = useState('southafricanorth');

  const { speak, stop, isSpeaking, error } = useAzureTTS({
    subscriptionKey,
    region
  });

  const handleSpeak = () => {
    if (!subscriptionKey.trim()) {
      alert('Please enter your Azure subscription key');
      return;
    }
    speak(text, { voice });
  };

  const voices = [
    { value: 'en-GB-RyanNeural', label: 'Ryan (British Male)' },
    { value: 'en-GB-SoniaNeural', label: 'Sonia (British Female)' },
    { value: 'en-GB-LibbyNeural', label: 'Libby (British Female)' },
    { value: 'en-GB-AbbiNeural', label: 'Abbi (British Female)' },
    { value: 'en-GB-AlfieNeural', label: 'Alfie (British Male)' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card className="bg-slate-900/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Volume2 className="w-5 h-5" />
            Azure Text-to-Speech Demo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-slate-300">Azure Subscription Key</label>
              <Input
                type="password"
                placeholder="Enter your Azure subscription key"
                value={subscriptionKey}
                onChange={(e) => setSubscriptionKey(e.target.value)}
                className="bg-slate-800/50 border-slate-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-300">Region</label>
              <Input
                placeholder="e.g., southafricanorth"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="bg-slate-800/50 border-slate-600 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-300">Voice</label>
            <Select value={voice} onValueChange={setVoice}>
              <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                {voices.map((v) => (
                  <SelectItem key={v.value} value={v.value} className="text-white hover:bg-slate-700">
                    {v.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-300">Text to Speak</label>
            <textarea
              className="w-full h-24 p-3 bg-slate-800/50 border border-slate-600 rounded-md text-white resize-none"
              placeholder="Enter text to convert to speech..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500/30 rounded-md">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span className="text-red-400 text-sm">{error}</span>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              onClick={handleSpeak}
              disabled={isSpeaking || !text.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Volume2 className="w-4 h-4 mr-2" />
              {isSpeaking ? 'Speaking...' : 'Speak'}
            </Button>
            <Button
              onClick={stop}
              disabled={!isSpeaking}
              variant="outline"
              className="border-slate-600 text-slate-300"
            >
              <VolumeX className="w-4 h-4 mr-2" />
              Stop
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AzureTTSDemo;
