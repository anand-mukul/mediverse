"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone, Video, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ConsultationHeader() {
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

            <div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground">
                Medical Consultation
              </h1>
              <p className="text-sm text-muted-foreground hidden sm:block">
                Book appointments with healthcare professionals
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm text- cursor-pointer">
                <Video className="h-4 w-4 text-primary" />
                <span>Video</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                <Phone className="h-4 w-4 text-success" />
                <span>Phone</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                <Users className="h-4 w-4 text-accent-foreground" />
                <span>In-Person</span>
              </div>
            </div>

            <Button
              onClick={() => router.push("/emergency")}
              variant="destructive"
              size="sm"
              className="cursor-pointer"
            >
              <span className="hidden sm:inline">Emergency</span>
              <span className="sm:hidden">SOS</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
