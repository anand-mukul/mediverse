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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
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
                IoT Control Panel
              </h1>
              <p className="text-sm text-slate-600">
                Manage your smart health devices and bots
              </p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={onRefresh} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh Status
            </Button>

            <Button
              variant="outline"
              className="gap-2 border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
            >
              <Wifi className="h-4 w-4" />
              Network: Strong
            </Button>

            <Button
              onClick={handleEmergency}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white gap-2"
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
