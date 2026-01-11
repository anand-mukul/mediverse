"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Brain, Send, Volume2 } from "lucide-react";
import { useState } from "react";
import WaveformVisualizer from "./WaveformVisualizer";
import { toast } from "sonner";

interface VoiceInterfaceProps {
  isListening: boolean;
  transcript: string;
  audioLevel: number;
  isProcessing: boolean;
  onToggleListening: () => void;
  onTextCommand: (text: string) => void;
}

export default function VoiceInterface({
  isListening,
  transcript,
  audioLevel,
  isProcessing,
  onToggleListening,
  onTextCommand,
}: VoiceInterfaceProps) {
  const [textInput, setTextInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textInput.trim()) {
      onTextCommand(textInput);
      setTextInput("");
    }
  };

  const handleQuickCommand = (command: string) => {
    onTextCommand(command);
    toast.info(`Command sent: ${command}`);
  };

  return (
    <div className="space-y-6">
      {/* AI Avatar Card */}
      <Card className="border-0 shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8">
          <div className="flex flex-col items-center text-white">
            <div
              className={`relative mb-6 ${isListening ? "animate-pulse" : ""}`}
            >
              <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/30">
                <Brain className="w-16 h-16 text-white" />
              </div>
              {isListening && (
                <div className="absolute inset-0 rounded-full border-4 border-blue-400 animate-ping opacity-75" />
              )}
            </div>

            <h2 className="text-3xl font-bold mb-2">MediVerse AI</h2>
            <p className="text-blue-100 text-lg">
              {isListening
                ? "Listening..."
                : isProcessing
                ? "Processing..."
                : "Ready to assist you"}
            </p>
          </div>
        </div>

        <CardContent className="p-6">
          {/* Waveform Visualization */}
          {isListening && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Volume2 className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-slate-700">
                  Voice Activity: {Math.round(audioLevel)}%
                </span>
              </div>
              <WaveformVisualizer audioLevel={audioLevel} />
            </div>
          )}

          {/* Voice Button */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <Button
              onClick={onToggleListening}
              size="lg"
              className={`
                w-24 h-24 rounded-full text-white shadow-lg
                ${
                  isListening
                    ? "bg-gradient-to-br from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                    : "bg-gradient-to-br from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                }
                ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}
              `}
              disabled={isProcessing}
            >
              {isListening ? (
                <MicOff className="h-8 w-8" />
              ) : (
                <Mic className="h-8 w-8" />
              )}
            </Button>

            <p className="text-sm text-slate-600 text-center">
              {isListening
                ? "Click to stop listening"
                : "Click to start speaking"}
            </p>
          </div>

          {/* Live Transcript */}
          {transcript && (
            <div className="mb-6">
              <p className="text-sm font-medium text-slate-700 mb-2">
                Live Transcript
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <p className="text-slate-900">{transcript}</p>
              </div>
            </div>
          )}

          {/* Quick Commands */}
          <div>
            <p className="text-sm font-medium text-slate-700 mb-3">
              Try saying:
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  handleQuickCommand(
                    "I need an appointment with a cardiologist"
                  )
                }
                className="text-xs"
              >
                Book appointment
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickCommand("I have chest pain")}
                className="text-xs"
              >
                Check symptoms
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickCommand("Refill my prescription")}
                className="text-xs"
              >
                Refill medicine
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Text Input */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Or type your command
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Type your health query or command..."
                className="flex-1 bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button
                type="submit"
                disabled={!textInput.trim() || isProcessing}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white gap-2"
              >
                <Send className="h-5 w-5" />
                Send
              </Button>
            </div>

            <p className="text-xs text-slate-500">
              Press Enter or click Send to process your command
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
