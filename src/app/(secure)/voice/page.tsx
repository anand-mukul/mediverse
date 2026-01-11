"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import VoiceHeader from "@/components/voice-command/VoiceHeader";
import VoiceInterface from "@/components/voice-command/VoiceInterface";
import ChatHistory from "@/components/voice-command/ChatHistory";
import { voiceService } from "@/services/voice.service";
import { authService } from "@/services/auth.service";

interface ChatMessage {
  id: string;
  type: "user" | "ai" | "error";
  text: string;
  timestamp: Date;
  data?: {
    intent: string;
    response: string;
    urgency: "low" | "medium" | "high" | "critical";
    confidence: number;
  };
}

export default function VoiceCommandPage() {
  const router = useRouter();
  const [isListening, setIsListening] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  // const [audioLevel, setAudioLevel] = useState(0)

  const handleVoiceCommand = async (text: string) => {
    const user = authService.getStoredUser();
    if (!user) {
      toast.error("Please login");
      router.push("/login");
      return;
    }

    setIsProcessing(true);
    try {
      const result = await voiceService.processVoiceQuery({ query: text });

      const chatMessage: ChatMessage = {
        id: result.id,
        type: "ai",
        text: result.response,
        timestamp: new Date(result.timestamp),
        data: {
          intent: result.action || "general",
          response: result.response,
          urgency: "low",
          confidence: 0.8,
        },
      };

      setChatHistory((prev) => [chatMessage, ...prev]);
      toast.success("Command processed");

      if (result.action === "navigate") {
        setTimeout(() => router.push(result.response), 1000);
      }
    } catch (err) {
      console.error("Voice command error:", err);
      toast.error("Failed to process command");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <VoiceHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Voice Assistant
          </h1>
          <p className="text-base md:text-lg text-muted-foreground">
            Control your health services with voice commands
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <VoiceInterface
            isListening={isListening}
            transcript=""
            audioLevel={0}
            isProcessing={isProcessing}
            onToggleListening={() => setIsListening(!isListening)}
            onTextCommand={handleVoiceCommand}
          />

          <ChatHistory
            messages={chatHistory}
            onClear={() => setChatHistory([])}
          />
        </div>
      </main>
    </div>
  );
}
