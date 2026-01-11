"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EmergencyHeader() {
  const router = useRouter();

  const call911 = () => {
    if (typeof window !== "undefined") {
      window.open("tel:911", "_self");
    }
  };

  return (
    <header className="sticky top-0 z-50 glass border-b border-destructive/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/dashboard")}
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Go back</span>
            </Button>

            <div>
              <h1 className="text-xl md:text-2xl font-bold text-destructive">
                Emergency Response
              </h1>
              <p className="text-sm text-muted-foreground hidden sm:block">
                Immediate medical assistance and emergency services
              </p>
            </div>
          </div>

          <Button
            onClick={call911}
            variant="destructive"
            className="gap-3 px-4 md:px-6"
          >
            <Phone className="h-5 w-5" />
            <div className="text-left">
              <div className="text-xs hidden md:block">Direct Call</div>
              <div className="text-lg font-bold">911</div>
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
}
