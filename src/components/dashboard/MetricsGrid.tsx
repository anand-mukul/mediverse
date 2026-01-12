import type React from "react";
import {
  Heart,
  Activity,
  Thermometer,
  TrendingUp,
  Droplets,
  Moon,
} from "lucide-react";
import type { HealthMetrics } from "@/types/api";
import { MedicalCard } from "@/components/ui/medical-card";
import { SectionHeader } from "@/components/ui/section-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";

interface MetricsGridProps {
  metrics?: HealthMetrics | null;
}

export default function MetricsGrid({ metrics }: MetricsGridProps) {
  if (!metrics) {
    return (
      <div>
        <SectionHeader
          title="Vital Metrics"
          description="Real-time health monitoring data"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[...Array(6)].map((_, i) => (
            <MedicalCard key={i} interactive>
              <div className="space-y-3">
                <div className="h-12 bg-muted rounded-lg" />
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-24" />
                  <div className="h-6 bg-muted rounded w-16" />
                </div>
              </div>
            </MedicalCard>
          ))}
        </div>
      </div>
    );
  }

  const safeMetrics = {
    heart_rate: metrics.heart_rate || 72,
    blood_pressure: metrics.blood_pressure || "120/80",
    temperature: metrics.temperature || 98.6,
    steps_today: metrics.steps_today ?? 0,
    oxygen_level: metrics.oxygen_level ?? 98,
    sleep_hours: metrics.sleep_hours ?? 7.5,
  };

  const metricCards: Array<{
    icon: React.ElementType;
    title: string;
    value: string;
    unit: string;
    status: "success" | "warning" | "info" | "error" | "neutral";
    statusText: string;
    color: string;
    bgColor: string;
  }> = [
    {
      icon: Heart,
      title: "Heart Rate",
      value: `${safeMetrics.heart_rate}`,
      unit: "bpm",
      status:
        safeMetrics.heart_rate >= 60 && safeMetrics.heart_rate <= 100
          ? "success"
          : "warning",
      statusText:
        safeMetrics.heart_rate >= 60 && safeMetrics.heart_rate <= 100
          ? "Normal"
          : "Check",
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
    {
      icon: Activity,
      title: "Blood Pressure",
      value: safeMetrics.blood_pressure,
      unit: "mmHg",
      status: "success",
      statusText: "Optimal",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Thermometer,
      title: "Temperature",
      value: `${safeMetrics.temperature}`,
      unit: "°F",
      status:
        safeMetrics.temperature >= 97 && safeMetrics.temperature <= 99
          ? "success"
          : "warning",
      statusText:
        safeMetrics.temperature >= 97 && safeMetrics.temperature <= 99
          ? "Normal"
          : "Check",
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      icon: TrendingUp,
      title: "Steps Today",
      value: safeMetrics.steps_today.toLocaleString(),
      unit: "steps",
      status: safeMetrics.steps_today >= 8000 ? "success" : "info",
      statusText: safeMetrics.steps_today >= 8000 ? "Active" : "Low",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      icon: Droplets,
      title: "Oxygen Level",
      value: `${safeMetrics.oxygen_level}`,
      unit: "%",
      status: safeMetrics.oxygen_level >= 95 ? "success" : "error",
      statusText: safeMetrics.oxygen_level >= 95 ? "Excellent" : "Low",
      color: "text-info",
      bgColor: "bg-info/10",
    },
    {
      icon: Moon,
      title: "Sleep",
      value: `${safeMetrics.sleep_hours}`,
      unit: "hours",
      status: safeMetrics.sleep_hours >= 7 ? "success" : "warning",
      statusText: safeMetrics.sleep_hours >= 7 ? "Good" : "Low",
      color: "text-info",
      bgColor: "bg-info/10",
    },
  ];

  return (
    <div>
      <SectionHeader
        title="Vital Metrics"
        description="Real-time health monitoring data"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {metricCards.map((metric, index) => (
          <MedicalCard key={index} interactive className="group">
            <div className="flex items-start justify-between mb-4">
              <div className={cn("p-3 rounded-xl", metric.bgColor)}>
                <metric.icon className={cn("h-6 w-6", metric.color)} />
              </div>
              <StatusBadge status={metric.status}>
                {metric.statusText}
              </StatusBadge>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{metric.title}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-foreground">
                  {metric.value}
                </p>
                <span className="text-sm text-muted-foreground">
                  {metric.unit}
                </span>
              </div>
            </div>
          </MedicalCard>
        ))}
      </div>
    </div>
  );
}
