"use client";

import { Pill, Clock, User } from "lucide-react";
import { toast } from "sonner";
import type { Prescription } from "@/types/api";
import { MedicalCard } from "@/components/ui/medical-card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";

interface PrescriptionsCardProps {
  prescriptions: Prescription[];
  onViewPharmacy: () => void;
}

export default function PrescriptionsCard({
  prescriptions,
  onViewPharmacy,
}: PrescriptionsCardProps) {
  const handleRefill = (prescription: Prescription) => {
    toast.success(`Refill requested for ${prescription.medicationName}`, {
      description: "Your pharmacy will contact you within 24 hours.",
    });
  };

  const activePrescriptions = prescriptions.filter(
    (p) => p.status === "active"
  );

  return (
    <MedicalCard
      title="Active Prescriptions"
      description="Monitor your current medications"
      footer={
        activePrescriptions.length > 0 ? (
          <Button
            variant="outline"
            onClick={onViewPharmacy}
            className="w-full bg-transparent"
          >
            View All Prescriptions
          </Button>
        ) : undefined
      }
    >
      {activePrescriptions.length > 0 ? (
        <div className="space-y-3">
          {activePrescriptions.slice(0, 3).map((rx) => (
            <div
              key={rx.id}
              className={cn(
                "flex items-start justify-between p-4 rounded-lg border transition-colors",
                "hover:border-secondary/50 hover:bg-accent/50"
              )}
            >
              <div className="flex items-start gap-3 flex-1">
                <div className="p-2.5 bg-secondary/10 rounded-lg">
                  <Pill className="h-5 w-5 text-secondary" />
                </div>

                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-semibold text-foreground">
                      {rx.medicationName}
                    </h4>
                    {rx.refillsLeft < 2 && (
                      <StatusBadge status="warning">Low refills</StatusBadge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {rx.dosage} • {rx.frequency}
                  </p>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Duration: {rx.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {rx.doctorName}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 ml-2 flex-shrink-0">
                <div className="text-sm font-medium text-foreground">
                  {rx.refillsLeft} refills
                </div>
                {rx.refillsLeft > 0 && (
                  <Button
                    size="sm"
                    variant="default"
                    onClick={() => handleRefill(rx)}
                  >
                    Refill
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Pill}
          title="No active prescriptions"
          description="Your active medications will appear here"
          action={
            <Button onClick={onViewPharmacy} variant="outline">
              Browse Pharmacy
            </Button>
          }
        />
      )}
    </MedicalCard>
  );
}
