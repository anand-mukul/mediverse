/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import { Pill, User, Clock, Repeat } from "lucide-react";
import type { HealthMetrics, Prescription } from "@/types/api";
import { MedicalCard } from "@/components/ui/medical-card";
import { SectionHeader } from "@/components/ui/section-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { toast } from "sonner";

interface MetricsGridProps {
  metrics?: HealthMetrics | null;
}

interface PrescriptionsCardProps {
  prescriptions?: Prescription[] | null;
  onViewPharmacy?: () => void;
}

const getStatusVariant = (
  status: string
): "success" | "warning" | "info" | "error" | "neutral" => {
  switch (status.toLowerCase()) {
    case "active":
      return "success";
    case "expired":
      return "error";
    case "pending":
      return "warning";
    default:
      return "neutral";
  }
};

const formatEndDate = (endDate?: string) => {
  if (!endDate) return "Ongoing";
  try {
    const date = new Date(endDate);
    if (isNaN(date.getTime())) return "Ongoing";
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return "Ongoing";
  }
};

const handleRefill = (rx: Prescription) => {
  toast.info(`Requesting refill for ${rx.medicationName}`, {
    action: {
      label: "Confirm",
      onClick: () => toast.success("Refill request submitted"),
    },
  });
};

export default function PrescriptionsCard({
  prescriptions,
  onViewPharmacy,
}: PrescriptionsCardProps) {
  const items = prescriptions || [];

  return (
    <MedicalCard
      title="Active Prescriptions"
      description="Your current medications"
      footer={
        items.length > 0 ? (
          <Button
            variant="outline"
            onClick={onViewPharmacy}
            className="w-full bg-transparent"
          >
            View All Medications
          </Button>
        ) : undefined
      }
    >
      {items.length > 0 ? (
        <div className="space-y-3">
          {items.slice(0, 3).map((rx) => {
            const medicationName =
              rx.medicationName ||
              (rx as any).medication_name ||
              (rx as any).medication ||
              "Medication";
            const doctorName =
              rx.doctorName ||
              (rx as any).doctor_name ||
              (rx as any).doctor ||
              "Doctor";
            const refillsLeft = rx.refillsLeft ?? (rx as any).refills_left ?? 0;
            const status = rx.status || "active";
            const dosage = rx.dosage || "";
            const frequency = rx.frequency || "";

            return (
              <div
                key={rx.id}
                className={cn(
                  "flex items-start justify-between p-4 rounded-lg border border-border transition-colors",
                  "hover:border-primary/50 hover:bg-accent/50 dark:hover:bg-accent/30"
                )}
              >
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2.5 bg-secondary/10 dark:bg-secondary/20 rounded-lg">
                    <Pill className="h-5 w-5 text-secondary dark:text-secondary" />
                  </div>

                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-semibold text-foreground dark:text-foreground">
                        {medicationName}
                      </h4>
                      <StatusBadge
                        status={getStatusVariant(status)}
                        showDot={false}
                      >
                        {status}
                      </StatusBadge>
                    </div>

                    <div className="space-y-1 text-sm text-muted-foreground dark:text-muted-foreground">
                      {dosage && frequency && (
                        <p>
                          {dosage} • {frequency}
                        </p>
                      )}
                      <p className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        Dr. {doctorName}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1 text-muted-foreground dark:text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        Ends {formatEndDate(rx.endDate)}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground dark:text-muted-foreground">
                        <Repeat className="h-3 w-3" />
                        {refillsLeft} refills
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRefill(rx);
                  }}
                  disabled={refillsLeft === 0}
                  className="ml-2 flex-shrink-0 text-foreground dark:text-foreground hover:bg-accent disabled:opacity-50"
                >
                  Refill
                </Button>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={Pill}
          title="No active prescriptions"
          description="Your prescription medications will appear here"
          action={
            onViewPharmacy ? (
              <Button onClick={onViewPharmacy} variant="default">
                Browse Medications
              </Button>
            ) : undefined
          }
        />
      )}
    </MedicalCard>
  );
}

export function MetricsGrid({ metrics }: MetricsGridProps) {
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
      icon: Pill,
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
      icon: User,
      title: "Blood Pressure",
      value: metrics.blood_pressure,
      unit: "mmHg",
      status: "success",
      statusText: "Optimal",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Clock,
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
      icon: Repeat,
      title: "Steps Today",
      value: metrics.steps_today.toLocaleString(),
      unit: "steps",
      status: metrics.steps_today >= 8000 ? "success" : "info",
      statusText: metrics.steps_today >= 8000 ? "Active" : "Low",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      icon: Pill,
      title: "Oxygen Level",
      value: `${metrics.oxygen_level || 98}`,
      unit: "%",
      status: (metrics.oxygen_level || 98) >= 95 ? "success" : "error",
      statusText: (metrics.oxygen_level || 98) >= 95 ? "Excellent" : "Low",
      color: "text-info",
      bgColor: "bg-info/10",
    },
    {
      icon: User,
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
