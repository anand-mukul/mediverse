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
  metrics: HealthMetrics;
}

export default function MetricsGrid({ metrics }: MetricsGridProps) {
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
      value: `${metrics.heart_rate}`,
      unit: "bpm",
      status:
        metrics.heart_rate >= 60 && metrics.heart_rate <= 100
          ? "success"
          : "warning",
      statusText:
        metrics.heart_rate >= 60 && metrics.heart_rate <= 100
          ? "Normal"
          : "Check",
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
    {
      icon: Activity,
      title: "Blood Pressure",
      value: metrics.blood_pressure,
      unit: "mmHg",
      status: "success",
      statusText: "Optimal",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Thermometer,
      title: "Temperature",
      value: `${metrics.temperature}`,
      unit: "°F",
      status:
        metrics.temperature >= 97 && metrics.temperature <= 99
          ? "success"
          : "warning",
      statusText:
        metrics.temperature >= 97 && metrics.temperature <= 99
          ? "Normal"
          : "Check",
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      icon: TrendingUp,
      title: "Steps Today",
      value: metrics.steps_today.toLocaleString(),
      unit: "steps",
      status: metrics.steps_today >= 8000 ? "success" : "info",
      statusText: metrics.steps_today >= 8000 ? "Active" : "Low",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      icon: Droplets,
      title: "Oxygen Level",
      value: `${metrics.oxygen_level || 98}`,
      unit: "%",
      status: (metrics.oxygen_level || 98) >= 95 ? "success" : "error",
      statusText: (metrics.oxygen_level || 98) >= 95 ? "Excellent" : "Low",
      color: "text-info",
      bgColor: "bg-info/10",
    },
    {
      icon: Moon,
      title: "Sleep",
      value: `${metrics.sleep_hours || 7.5}`,
      unit: "hours",
      status: (metrics.sleep_hours || 0) >= 7 ? "success" : "warning",
      statusText: (metrics.sleep_hours || 0) >= 7 ? "Good" : "Low",
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
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
