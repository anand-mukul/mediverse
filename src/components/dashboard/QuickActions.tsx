"use client";
import { MedicalCard } from "@/components/ui/medical-card";
import {
  Mic,
  Bot,
  Search,
  AlertTriangle,
  MessageSquare,
  Calendar,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function QuickActions() {
  const router = useRouter();

  const actions = [
    {
      icon: Mic,
      label: "Voice Assistant",
      description: "Voice commands",
      color: "text-primary",
      bgColor: "bg-primary/10",
      onClick: () => router.push("/voice"),
    },
    {
      icon: Search,
      label: "AI Diagnostics",
      description: "Symptom checker",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      onClick: () => router.push("/diagnostics"),
    },
    {
      icon: Calendar,
      label: "Consultations",
      description: "Book appointment",
      color: "text-info",
      bgColor: "bg-info/10",
      onClick: () => router.push("/consultation"),
    },
    {
      icon: Bot,
      label: "IoT Devices",
      description: "Manage devices",
      color: "text-success",
      bgColor: "bg-success/10",
      onClick: () => router.push("/iot"),
    },
    {
      icon: AlertTriangle,
      label: "Emergency",
      description: "Get help now",
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      onClick: () => {
        toast.error("Emergency mode activated");
        router.push("/emergency");
      },
    },
    {
      icon: MessageSquare,
      label: "Support",
      description: "24/7 assistance",
      color: "text-muted-foreground",
      bgColor: "bg-muted",
      onClick: () => toast.info("Support chat opening..."),
    },
  ];

  return (
    <MedicalCard
      title="Quick Actions"
      description="Access key features quickly"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={action.onClick}
            className={cn(
              "flex flex-col items-center justify-center gap-3 p-4 md:p-6",
              "rounded-lg border border-border bg-card",
              "hover:border-primary/50 hover:bg-accent/50",
              "transition-all duration-200 group",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            )}
          >
            <div
              className={cn(
                "p-3 rounded-full transition-transform group-hover:scale-110",
                action.bgColor
              )}
            >
              <action.icon className={cn("h-6 w-6", action.color)} />
            </div>
            <div className="text-center space-y-1">
              <div className="font-semibold text-sm text-foreground">
                {action.label}
              </div>
              <div className="text-xs text-muted-foreground">
                {action.description}
              </div>
            </div>
          </button>
        ))}
      </div>
    </MedicalCard>
  );
}
