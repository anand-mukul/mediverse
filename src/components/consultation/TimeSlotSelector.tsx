"use client";

import { MedicalCard } from "@/components/ui/medical-card";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { EmptyState } from "@/components/ui/empty-state";

interface TimeSlotSelectorProps {
  timeSlots: string[];
  selectedTimeSlot: string;
  onTimeSelect: (time: string) => void;
  disabled?: boolean;
}

export default function TimeSlotSelector({
  timeSlots,
  selectedTimeSlot,
  onTimeSelect,
  disabled,
}: TimeSlotSelectorProps) {
  if (disabled || timeSlots.length === 0) {
    return (
      <MedicalCard>
        <EmptyState
          icon={Clock}
          title={disabled ? "Select a doctor first" : "No slots available"}
          description={
            disabled
              ? "Choose a doctor to view available time slots"
              : "Please select a different date"
          }
        />
      </MedicalCard>
    );
  }

  return (
    <MedicalCard
      title="Select Time Slot"
      description="All times are in your local timezone"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {timeSlots.map((time) => {
            const isSelected = selectedTimeSlot === time;

            return (
              <button
                key={time}
                onClick={() => onTimeSelect(time)}
                className={cn(
                  "py-3 rounded-lg text-sm font-medium transition-all",
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-foreground hover:bg-accent hover:shadow-sm border border-border"
                )}
              >
                {time}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-primary" />
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-muted border border-border" />
            <span>Available</span>
          </div>
        </div>
      </div>
    </MedicalCard>
  );
}
