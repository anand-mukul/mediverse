"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function VoiceHeader() {
  const router = useRouter();

  const handleEmergency = () => {
    toast.error("Emergency services alerted!", {
      description: "Help is on the way. Stay calm.",
      duration: 10000,
      action: {
        label: "Cancel",
        onClick: () => toast.info("Emergency alert cancelled"),
      },
    });
    router.push("/emergency");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="hover:bg-slate-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Voice Command Center
              </h1>
              <p className="text-sm text-slate-600">
                Speak naturally to control your health ecosystem
              </p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Button
              onClick={handleEmergency}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-red-500/25 gap-2"
            >
              <AlertTriangle className="h-5 w-5" />
              Emergency
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
