/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ConsultationHeader from "@/components/consultation/ConsultationHeader";
import DoctorGrid from "@/components/consultation/DoctorGrid";
import BookingCard from "@/components/consultation/BookingCard";
import AppointmentCalendar from "@/components/consultation/AppointmentCalendar";
import TimeSlotSelector from "@/components/consultation/TimeSlotSelector";
import SpecialtyFilter from "@/components/consultation/SpecialtyFilter";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { EmptyState } from "@/components/ui/empty-state";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { consultationService } from "@/services/consultation.service";
import { authService } from "@/services/auth.service";
import type { Doctor } from "@/types/api";

const SPECIALTIES = [
  "all",
  "cardiology",
  "neurology",
  "general medicine",
  "pediatrics",
  "dermatology",
  "orthopedics",
  "mental health",
  "gastroenterology",
];

export default function ConsultationPage() {
  const router = useRouter();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [notes, setNotes] = useState<string>("");
  const [consultationType, setConsultationType] = useState<
    "video" | "in-person" | "phone"
  >("video");
  const [specialtyFilter, setSpecialtyFilter] = useState<string>("all");
  const [isBooking, setIsBooking] = useState(false);

  const fetchDoctors = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await consultationService.getDoctors(
        specialtyFilter === "all" ? undefined : specialtyFilter
      );
      setDoctors(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to load doctors";
      setError(errorMessage);
      toast.error("Failed to load doctors", {
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  }, [specialtyFilter]);

  const fetchAvailableSlots = useCallback(async () => {
    if (!selectedDoctor) return;

    try {
      const dateStr = selectedDate.toISOString().split("T")[0];
      const slots = await consultationService.getAvailableSlots(
        selectedDoctor.id,
        dateStr
      );
      setAvailableSlots(slots.map((s) => s.time));
    } catch (error) {
      console.error("Failed to load slots:", error);
      toast.error("Failed to load available time slots");
    }
  }, [selectedDoctor, selectedDate]);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  useEffect(() => {
    if (selectedDoctor) {
      fetchAvailableSlots();
    }
  }, [selectedDoctor, fetchAvailableSlots]);

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setSelectedTimeSlot("");
    toast.info(`Selected: ${doctor.name}`, {
      description: doctor.specialty,
    });
  };

  const handleSpecialtyChange = (specialty: string) => {
    setSpecialtyFilter(specialty);
    setLoading(true);
    consultationService
      .getDoctors(specialty === "all" ? undefined : specialty)
      .then((data) => {
        setDoctors(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        toast.error("Failed to filter doctors");
      });
  };

  const bookAppointment = async () => {
    if (!selectedDoctor) {
      toast.error("Please select a doctor");
      return;
    }

    if (!selectedTimeSlot) {
      toast.error("Please select a time slot");
      return;
    }

    const user = authService.getStoredUser();
    if (!user) {
      toast.error("Please login to book an appointment");
      router.push("/login");
      return;
    }

    setIsBooking(true);

    const bookingPayload = {
      user_id: user.id,
      doctor_id: selectedDoctor.id,
      doctor_name: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      date: selectedDate.toISOString().split("T")[0],
      time: selectedTimeSlot,
      type: consultationType,
      notes: notes || "",
      status: "pending",
    };

    try {
      await consultationService.bookAppointment(bookingPayload as any);

      toast.success("Appointment booked successfully!", {
        description: `Your appointment with ${
          selectedDoctor.name
        } is confirmed for ${selectedDate.toLocaleDateString()} at ${selectedTimeSlot}`,
        duration: 5000,
        action: {
          label: "View Details",
          onClick: () => router.push("/dashboard"),
        },
      });

      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (err) {
      console.error("[v0] Booking error:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to book appointment";
      toast.error("Booking failed", {
        description: errorMessage,
      });
    } finally {
      setIsBooking(false);
    }
  };

  if (loading && doctors.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <ConsultationHeader />
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner size="lg" label="Loading doctors..." />
        </div>
      </div>
    );
  }

  if (error && doctors.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <ConsultationHeader />
        <div className="flex items-center justify-center min-h-[60vh] p-4">
          <EmptyState
            icon={AlertCircle}
            title="Failed to load doctors"
            description={error}
            action={
              <Button onClick={fetchDoctors} size="lg">
                Retry
              </Button>
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ConsultationHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Book Your Consultation
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Connect with top healthcare professionals for video, phone, or
            in-person consultations
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-6">
            <SpecialtyFilter
              specialties={SPECIALTIES}
              selectedSpecialty={specialtyFilter}
              onSelectSpecialty={handleSpecialtyChange}
            />

            <DoctorGrid
              doctors={doctors}
              selectedDoctor={selectedDoctor}
              onSelectDoctor={handleDoctorSelect}
            />
          </div>

          <div className="space-y-6">
            <AppointmentCalendar
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />

            <TimeSlotSelector
              timeSlots={availableSlots.length > 0 ? availableSlots : []}
              selectedTimeSlot={selectedTimeSlot}
              onTimeSelect={setSelectedTimeSlot}
              disabled={!selectedDoctor}
            />

            <BookingCard
              selectedDoctor={selectedDoctor}
              selectedDate={selectedDate}
              selectedTimeSlot={selectedTimeSlot}
              notes={notes}
              consultationType={consultationType}
              isBooking={isBooking}
              onNotesChange={setNotes}
              onConsultationTypeChange={setConsultationType}
              onBookAppointment={bookAppointment}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
