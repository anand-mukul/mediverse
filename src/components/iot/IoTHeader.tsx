"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw, Wifi, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface IoTHeaderProps {
  onRefresh: () => void;
}

export default function IoTHeader({ onRefresh }: IoTHeaderProps) {
  const router = useRouter();

  const handleEmergency = () => {
    toast.error("Emergency services alerted!", {
      description: "IoT devices placed in emergency mode.",
      duration: 10000,
      action: {
        label: "Cancel",
        onClick: () => toast.info("Emergency mode cancelled"),
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
            <Button variant="ghost" size="icon" className="cursor-pointer" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <div>
              <h1 className="text-2xl font-bold text-foreground">
                IoT Control Panel
              </h1>
              <p className="text-sm text-muted-foreground">
                Manage your smart health devices and bots
              </p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={onRefresh}
              className="gap-2 bg-transparent cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh Status
            </Button>

            <Button
              variant="outline"
              className="gap-2 bg-success/10 text-success border-success/30 hover:bg-success/20 cursor-pointer"
            >
              <Wifi className="h-4 w-4" />
              Network: Strong
            </Button>

            <Button
              onClick={handleEmergency}
              variant="destructive"
              className="gap-2 cursor-pointer"
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
