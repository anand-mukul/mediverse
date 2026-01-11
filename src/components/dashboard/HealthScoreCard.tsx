"use client";

import { TrendingUp, Info, TrendingDown, Minus } from "lucide-react";
import { toast } from "sonner";
import type { HealthScore } from "@/types/api";
import { MedicalCard } from "@/components/ui/medical-card";
import { cn } from "@/lib/utils";

interface HealthScoreCardProps {
  healthScore?: HealthScore | null;
  userName?: string;
}

export default function HealthScoreCard({ healthScore }: HealthScoreCardProps) {
  if (!healthScore) {
    return (
      <MedicalCard elevated className="overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="text-center space-y-2">
              <p className="text-muted-foreground">
                Health score data unavailable
              </p>
            </div>
          </div>
        </div>
      </MedicalCard>
    );
  }

  const { score, trend, factors } = healthScore;

  return (
    <MedicalCard elevated className="overflow-hidden">
      <div className="p-6 md:p-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left side - Score Circle */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <div
                className={cn(
                  "w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br flex items-center justify-center shadow-lg",
                  getScoreColor(score)
                )}
              >
                <span className="text-3xl md:text-4xl font-bold text-white">
                  {score}
                </span>
              </div>
              <div className="absolute -top-2 -right-2 bg-card rounded-full p-2 shadow-md border border-border">
                {getTrendIcon(trend)}
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Health Score
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                {getScoreMessage(score)}
              </p>
              <button
                onClick={() =>
                  toast.info("Health Score Calculation", {
                    description:
                      "Based on activity, vital signs, sleep quality, and lifestyle habits.",
                  })
                }
                className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                <Info className="h-4 w-4" />
                How is this calculated?
              </button>
            </div>
          </div>

          {/* Right side - Factor Breakdown */}
          <div className="grid grid-cols-3 gap-4 md:gap-6 w-full lg:w-auto">
            <div className="text-center space-y-1">
              <div className="text-xs text-muted-foreground uppercase tracking-wide">
                Activity
              </div>
              <div className="text-2xl font-bold text-foreground">
                {factors.activity}%
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${factors.activity}%` }}
                />
              </div>
            </div>

            <div className="text-center space-y-1">
              <div className="text-xs text-muted-foreground uppercase tracking-wide">
                Vitals
              </div>
              <div className="text-2xl font-bold text-foreground">
                {factors.vitals}%
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-secondary rounded-full"
                  style={{ width: `${factors.vitals}%` }}
                />
              </div>
            </div>

            <div className="text-center space-y-1">
              <div className="text-xs text-muted-foreground uppercase tracking-wide">
                Lifestyle
              </div>
              <div className="text-2xl font-bold text-foreground">
                {factors.lifestyle}%
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-success rounded-full"
                  style={{ width: `${factors.lifestyle}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MedicalCard>
  );
}

function getScoreColor(score: number) {
  if (score >= 90) return "from-success to-success/80";
  if (score >= 75) return "from-primary to-primary/80";
  if (score >= 60) return "from-warning to-warning/80";
  return "from-destructive to-destructive/80";
}

function getScoreMessage(score: number) {
  if (score >= 90) return "Excellent health status";
  if (score >= 75) return "Good overall health";
  if (score >= 60) return "Fair health, room for improvement";
  return "Needs attention, please consult your doctor";
}

function getTrendIcon(trend: string) {
  if (trend === "up") return <TrendingUp className="h-5 w-5 text-success" />;
  if (trend === "down")
    return <TrendingDown className="h-5 w-5 text-destructive" />;
  return <Minus className="h-5 w-5 text-muted-foreground" />;
}
