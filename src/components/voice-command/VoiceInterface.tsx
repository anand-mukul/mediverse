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
      <Card className="overflow-hidden border-0 shadow-lg">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8">
          <div className="flex flex-col items-center text-white">
            <div
              className={`relative mb-6 ${
                isListening ? "animate-pulse" : ""
              }`}
            >
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30">
                <Brain className="h-16 w-16" />
              </div>
              {isListening && (
                <div className="absolute inset-0 animate-ping rounded-full border-4 border-blue-400 opacity-75" />
              )}
            </div>

            <h2 className="mb-2 text-3xl font-bold">MediVerse AI</h2>
            <p className="text-lg text-blue-100">
              {isListening
                ? "Listening..."
                : isProcessing
                ? "Processing..."
                : "Ready to assist you"}
            </p>
          </div>
        </div>

        <CardContent className="p-6">
          {/* Waveform */}
          {isListening && (
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-2">
                <Volume2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Voice Activity: {Math.round(audioLevel)}%
                </span>
              </div>
              <WaveformVisualizer audioLevel={audioLevel} />
            </div>
          )}

          {/* Voice Button */}
          <div className="mb-8 flex flex-col items-center gap-4">
            <Button
              onClick={onToggleListening}
              disabled={isProcessing}
              className={`h-24 w-24 rounded-full text-white shadow-lg
                ${
                  isListening
                    ? "bg-gradient-to-br from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                    : "bg-gradient-to-br from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                }
                ${isProcessing ? "cursor-not-allowed opacity-50" : ""}
              `}
            >
              {isListening ? (
                <MicOff className="h-8 w-8" />
              ) : (
                <Mic className="h-8 w-8" />
              )}
            </Button>

            <p className="text-center text-sm text-slate-600 dark:text-slate-400">
              {isListening
                ? "Click to stop listening"
                : "Click to start speaking"}
            </p>
          </div>

          {/* Live Transcript */}
          {transcript && (
            <div className="mb-6">
              <p className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                Live Transcript
              </p>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4
                              dark:border-slate-800 dark:bg-slate-900/50">
                <p className="text-slate-900 dark:text-slate-100">
                  {transcript}
                </p>
              </div>
            </div>
          )}

          {/* Quick Commands */}
          <div>
            <p className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-300">
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

      {/* Text Input Card */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
            Or type your command
          </h3>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* PERFECT HEIGHT ALIGNMENT */}
            <div className="flex h-12 gap-3">
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Type your health query or command..."
                className="flex-1 rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-900
                           placeholder-slate-500 outline-none
                           focus:ring-2 focus:ring-blue-500
                           dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
              <Button
                type="submit"
                disabled={!textInput.trim() || isProcessing}
                className="h-12 gap-2 bg-gradient-to-r from-blue-600 to-purple-600
                           hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <Send className="h-5 w-5" />
                Send
              </Button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Press Enter or click Send to process your command
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
