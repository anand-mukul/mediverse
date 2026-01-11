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
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Voice Command Center
              </h1>
              <p className="text-sm text-muted-foreground">
                Speak naturally to control your health ecosystem
              </p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Button
              onClick={handleEmergency}
              variant="destructive"
              className="gap-2"
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
