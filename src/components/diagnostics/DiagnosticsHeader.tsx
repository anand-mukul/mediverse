"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Brain, Activity } from "lucide-react";
import { useRouter } from "next/navigation";

interface DiagnosticsHeaderProps {
  onEmergency: () => void;
}

export default function DiagnosticsHeader({
  onEmergency,
}: DiagnosticsHeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer"
              onClick={() => router.push("/dashboard")}
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Go back</span>
            </Button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-foreground">
                  AI Diagnostics
                </h1>
                <p className="text-sm text-muted-foreground hidden sm:block">
                  Advanced symptom analysis and health insights
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="gap-2 hidden md:flex bg-transparent cursor-pointer"
            >
              <Activity className="h-4 w-4" />
              <span>AI Powered</span>
            </Button>

            <Button onClick={onEmergency} variant="destructive" size="sm" className="cursor-pointer">
              <span className="hidden sm:inline">Emergency</span>
              <span className="sm:hidden">SOS</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
