import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, MessageCircle, Zap, TrendingUp, Loader2, Volume2, VolumeX } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAzureTTS } from "@/hooks/useAzureTTS";

const AIBot = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content: "Hello! I'm Babatunde, your ProcureAI assistant. I can help you with vendor analysis, risk assessment, contract review, and procurement insights. How can I assist you today?",
      timestamp: "10:30 AM",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptionKey, setSubscriptionKey] = useState("");
  const [region] = useState("southafricanorth");
  
  const { speak, stop, isSpeaking, error: ttsError } = useAzureTTS({
    subscriptionKey,
    region
  });

  const aiCapabilities = [
    {
      title: "Vendor Analysis",
      description: "Analyze vendor proposals and financial health",
      icon: TrendingUp,
      color: "text-blue-400",
    },
    {
      title: "Risk Assessment",
      description: "Identify potential risks in vendor relationships",
      icon: Zap,
      color: "text-orange-400",
    },
    {
      title: "Contract Review",
      description: "Review contract terms and suggest improvements",
      icon: MessageCircle,
      color: "text-green-400",
    },
  ];

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = {
      id: messages.length + 1,
      type: "user",
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = message;
    setMessage("");
    setIsLoading(true);

    try {
      // Prepare conversation history for context
      const conversationHistory = messages
        .slice(-5) // Last 5 messages for context
        .map(msg => ({
          role: msg.type === "user" ? "user" : "assistant",
          content: msg.content
        }));

      console.log('Calling Babatunde chat function...');
      const { data, error } = await supabase.functions.invoke('babatunde-chat', {
        body: { 
          message: currentMessage,
          conversationHistory 
        }
      });

      if (error) {
        console.error('Error calling chat function:', error);
        throw error;
      }

      console.log('Received response from Babatunde:', data);

      const aiResponse = {
        id: messages.length + 2,
        type: "bot",
        content: data.reply || "I apologize, but I'm having trouble processing your request right now. Please try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, aiResponse]);

      // Auto-speak the AI response if Azure TTS is configured
      if (subscriptionKey && data.reply) {
        try {
          await speak(data.reply, { voice: 'en-GB-RyanNeural' });
        } catch (ttsErr) {
          console.log('TTS not available:', ttsErr);
        }
      }

    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorResponse = {
        id: messages.length + 2,
        type: "bot",
        content: "I'm sorry, I'm experiencing some technical difficulties. Please try again in a moment.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeakMessage = (content: string) => {
    if (!subscriptionKey.trim()) {
      alert('Please enter your Azure subscription key to enable text-to-speech');
      return;
    }
    speak(content, { voice: 'en-GB-RyanNeural' });
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold text-white">Babatunde - AI Procurement Assistant</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Get intelligent insights and assistance for your procurement processes
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {aiCapabilities.map((capability, index) => (
          <Card key={index} className="bg-slate-900/50 border-slate-700 hover:border-slate-600 transition-colors">
            <CardContent className="p-6 text-center">
              <capability.icon className={`w-12 h-12 mx-auto mb-4 ${capability.color}`} />
              <h3 className="text-lg font-semibold text-white mb-2">{capability.title}</h3>
              <p className="text-slate-400 text-sm">{capability.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-slate-900/50 border-slate-700 h-96">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-white">Babatunde - AI Chat Assistant</CardTitle>
              <CardDescription className="text-slate-400">Ask questions about procurement, vendors, and contracts</CardDescription>
            </div>
            {isSpeaking && (
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-blue-400 animate-pulse" />
                <span className="text-blue-400 text-sm">Speaking...</span>
                <Button
                  onClick={stop}
                  size="sm"
                  variant="outline"
                  className="border-slate-600 text-slate-300"
                >
                  <VolumeX className="w-3 h-3" />
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.type === "user" 
                    ? "bg-blue-600 text-white" 
                    : "bg-slate-800 text-slate-200"
                }`}>
                  <div className="flex items-start gap-2">
                    <div className="text-sm flex-1">{msg.content}</div>
                    {msg.type === "bot" && subscriptionKey && (
                      <Button
                        onClick={() => handleSpeakMessage(msg.content)}
                        size="sm"
                        variant="ghost"
                        className="h-auto p-1 text-slate-400 hover:text-blue-400"
                        disabled={isSpeaking}
                      >
                        <Volume2 className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                  <div className={`text-xs mt-1 ${
                    msg.type === "user" ? "text-blue-200" : "text-slate-400"
                  }`}>
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 text-slate-200 px-4 py-2 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Babatunde is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
              placeholder="Ask me anything about procurement..."
              disabled={isLoading}
            />
            <Button 
              onClick={handleSendMessage}
              disabled={isLoading || !message.trim()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIBot;
