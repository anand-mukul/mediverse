"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Mic,
  Video,
  Phone,
  MessageSquare,
  Calendar,
  Activity,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function QuickActions() {
  const router = useRouter();

  const actions = [
    {
      icon: Mic,
      label: "Voice Diagnosis",
      description: "Describe symptoms by voice",
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
      onClick: () => {
        toast.info("Voice diagnosis feature coming soon");
        setTimeout(() => router.push("/voice"), 1000);
      },
    },
    {
      icon: Video,
      label: "Video Consultation",
      description: "Live doctor video call",
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      onClick: () => {
        toast.info("Opening video consultation booking");
        setTimeout(() => router.push("/consultation"), 1000);
      },
    },
    {
      icon: Phone,
      label: "Phone Consultation",
      description: "Speak with a doctor",
      color: "bg-gradient-to-r from-green-500 to-emerald-500",
      onClick: () => {
        toast.info("Scheduling phone consultation");
        setTimeout(() => router.push("/consultation"), 1000);
      },
    },
    {
      icon: MessageSquare,
      label: "Chat Support",
      description: "24/7 health queries",
      color: "bg-gradient-to-r from-orange-500 to-amber-500",
      onClick: () => {
        toast.info("Connecting to chat support...");
      },
    },
    {
      icon: Calendar,
      label: "Book Appointment",
      description: "Schedule clinic visit",
      color: "bg-gradient-to-r from-red-500 to-orange-500",
      onClick: () => {
        router.push("/consultation");
      },
    },
    {
      icon: Activity,
      label: "Health Dashboard",
      description: "View health metrics",
      color: "bg-gradient-to-r from-indigo-500 to-purple-500",
      onClick: () => {
        router.push("/dashboard");
      },
    },
  ];

  return (
    <Card className="mt-8 border-0 shadow-lg">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <p className="text-sm text-slate-600">
          Access additional healthcare services and support
        </p>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={action.onClick}
              className="h-28 flex flex-col items-center justify-center gap-3 hover:scale-[1.02] transition-transform border-2 hover:border-current"
            >
              <div
                className={`w-12 h-12 rounded-full ${action.color} flex items-center justify-center`}
              >
                <action.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-center">
                <div className="font-semibold text-slate-900">
                  {action.label}
                </div>
                <div className="text-xs text-slate-600">
                  {action.description}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
