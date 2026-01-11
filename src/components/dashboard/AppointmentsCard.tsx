/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Calendar, Clock, Video, MapPin } from "lucide-react";
import { toast } from "sonner";
import type { Appointment } from "@/types/api";
import { MedicalCard } from "@/components/ui/medical-card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";

interface AppointmentsCardProps {
  appointments?: Appointment[] | null;
  onBookAppointment: () => void;
}

export default function AppointmentsCard({
  appointments,
  onBookAppointment,
}: AppointmentsCardProps) {
  const items = appointments || [];

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Date TBA";
      }
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Date TBA";
    }
  };

  const handleReschedule = (appointment: Appointment) => {
    const doctorName =
      appointment.doctorName || (appointment as any).doctor_name || "Doctor";
    toast.info(`Rescheduling appointment with ${doctorName}`, {
      action: {
        label: "Confirm",
        onClick: () => toast.success("Appointment rescheduled"),
      },
    });
  };

  const getStatusVariant = (status: Appointment["status"]) => {
    switch (status) {
      case "confirmed":
        return "success";
      case "pending":
        return "warning";
      case "cancelled":
        return "error";
      default:
        return "info";
    }
  };

  const getAppointmentIcon = (type: Appointment["type"]) => {
    switch (type) {
      case "video":
        return Video;
      case "in-person":
        return MapPin;
      default:
        return Calendar;
    }
  };

  return (
    <MedicalCard
      title="Upcoming Appointments"
      description="Manage your scheduled consultations"
      footer={
        items.length > 0 ? (
          <Button
            variant="outline"
            onClick={onBookAppointment}
            className="w-full bg-transparent"
          >
            Book New Appointment
          </Button>
        ) : undefined
      }
    >
      {items.length > 0 ? (
        <div className="space-y-3">
          {items.slice(0, 3).map((apt) => {
            const Icon = getAppointmentIcon(apt.type);
            const doctorName =
              apt.doctorName || (apt as any).doctor_name || "Doctor";

            return (
              <div
                key={apt.id}
                className={cn(
                  "flex items-start justify-between p-4 rounded-lg border border-border transition-colors",
                  "hover:border-primary/50 hover:bg-accent/50 dark:hover:bg-accent/30"
                )}
              >
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2.5 bg-primary/10 dark:bg-primary/20 rounded-lg">
                    <Icon className="h-5 w-5 text-primary dark:text-primary" />
                  </div>

                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-semibold text-foreground dark:text-foreground">
                        {doctorName}
                      </h4>
                      <StatusBadge
                        status={getStatusVariant(apt.status)}
                        showDot={false}
                      >
                        {apt.status}
                      </StatusBadge>
                    </div>
                    <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                      {apt.specialty}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground dark:text-muted-foreground flex-wrap">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(apt.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {apt.time}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleReschedule(apt)}
                  className="ml-2 flex-shrink-0 text-foreground dark:text-foreground hover:bg-accent"
                >
                  Reschedule
                </Button>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={Calendar}
          title="No upcoming appointments"
          description="Schedule a consultation with a healthcare professional"
          action={
            <Button onClick={onBookAppointment} variant="default">
              Book Your First Appointment
            </Button>
          }
        />
      )}
    </MedicalCard>
  );
}
