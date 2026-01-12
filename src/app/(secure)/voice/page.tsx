"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import VoiceHeader from "@/components/voice-command/VoiceHeader";
import VoiceInterface from "@/components/voice-command/VoiceInterface";
import ChatHistory from "@/components/voice-command/ChatHistory";
import { voiceService } from "@/services/voice.service";
import { authService } from "@/services/auth.service";
import { getVoiceEngine } from "@/services/voice-engine.service";

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
  const [transcript, setTranscript] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const voiceEngine = getVoiceEngine({
    onTranscriptUpdate: setTranscript,
    onAudioLevelUpdate: setAudioLevel,
    onError: (error) => toast.error(error),
    onProcessing: setIsProcessing,
  });

  const handleToggleListening = useCallback(async () => {
    try {
      if (isListening) {
        voiceEngine.stopListening();
        setIsListening(false);

        // Process the recorded transcript
        const userTranscript = voiceEngine.getTranscript().trim();
        if (userTranscript) {
          await handleVoiceCommand(userTranscript);
        }
        voiceEngine.resetTranscript();
        setTranscript("");
      } else {
        if (!voiceEngine.isSupported()) {
          toast.error("Voice recognition not supported in your browser");
          return;
        }
        await voiceEngine.startListening();
        setIsListening(true);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Voice error occurred"
      );
      setIsListening(false);
    }
  }, [isListening, voiceEngine]);

  const handleVoiceCommand = async (text: string) => {
    const user = authService.getStoredUser();
    if (!user) {
      toast.error("Please login");
      router.push("/login");
      return;
    }

    setIsProcessing(true);
    try {
      // Add user message to chat
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        type: "user",
        text: text,
        timestamp: new Date(),
      };
      setChatHistory((prev) => [userMessage, ...prev]);

      const result = await voiceService.processVoiceQuery({ query: text });

      const chatMessage: ChatMessage = {
        id: result.id || `ai-${Date.now()}`,
        type: "ai",
        text: result.response,
        timestamp: new Date(result.timestamp || new Date()),
        data: {
          intent: result.action || "general",
          response: result.response,
          urgency: determineUrgency(result.action),
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
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        type: "error",
        text: "Failed to process your command. Please try again.",
        timestamp: new Date(),
      };
      setChatHistory((prev) => [errorMessage, ...prev]);
      toast.error("Failed to process command");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTextCommand = (text: string) => {
    handleVoiceCommand(text);
  };

  const determineUrgency = (
    action: string | undefined
  ): "low" | "medium" | "high" | "critical" => {
    if (!action) return "low";
    const urgencyMap: Record<string, "low" | "medium" | "high" | "critical"> = {
      emergency: "critical",
      urgent: "high",
      appointment: "medium",
      general: "low",
    };
    return urgencyMap[action.toLowerCase()] || "low";
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
            Communicate with your health assistant in real-time using voice
            commands
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <VoiceInterface
            isListening={isListening}
            transcript={transcript}
            audioLevel={audioLevel}
            isProcessing={isProcessing}
            onToggleListening={handleToggleListening}
            onTextCommand={handleTextCommand}
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
