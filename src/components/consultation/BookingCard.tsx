"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  User,
  Calendar,
  Clock,
  Video,
  Phone,
  Users,
  FileText,
  CreditCard,
} from "lucide-react";
import { format } from "date-fns";
import type { Doctor } from "@/types/api";

interface BookingCardProps {
  selectedDoctor: Doctor | null;
  selectedDate: Date;
  selectedTimeSlot: string;
  notes: string;
  consultationType: "video" | "in-person" | "phone";
  isBooking: boolean;
  onNotesChange: (notes: string) => void;
  onConsultationTypeChange: (type: "video" | "in-person" | "phone") => void;
  onBookAppointment: () => void;
}

export default function BookingCard({
  selectedDoctor,
  selectedDate,
  selectedTimeSlot,
  notes,
  consultationType,
  isBooking,
  onNotesChange,
  onConsultationTypeChange,
  onBookAppointment,
}: BookingCardProps) {
  const consultationTypes = [
    {
      id: "video",
      label: "Video Call",
      icon: Video,
      color: "bg-primary/10 text-primary",
    },
    {
      id: "phone",
      label: "Phone Call",
      icon: Phone,
      color: "bg-success/10 text-success",
    },
    {
      id: "in-person",
      label: "In-Person",
      icon: Users,
      color: "bg-accent text-accent-foreground",
    },
  ];

  const formatDate = (date: Date) => {
    return format(date, "EEEE, MMMM d, yyyy");
  };

  const platformFee = 99.99;
  const taxRate = 0.08;

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Appointment Details</CardTitle>
        <p className="text-sm text-muted-foreground">
          Review and confirm your booking
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Selected Doctor */}
        {selectedDoctor ? (
          <div className="p-4 rounded-xl border border-border bg-accent">
            <div className="flex items-start gap-4">
              <div className="text-3xl">{selectedDoctor.avatar}</div>
              <div>
                <h4 className="font-semibold text-foreground">
                  {selectedDoctor.name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {selectedDoctor.specialty}
                </p>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">
                      {formatDate(selectedDate)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">
                      {selectedTimeSlot}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl border border-border bg-muted text-center">
            <User className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">Select a doctor to continue</p>
          </div>
        )}

        {/* Consultation Type */}
        <div>
          <h4 className="font-semibold text-foreground mb-3">
            Consultation Type
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {consultationTypes.map((type) => {
              const isSelected = consultationType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() =>
                    onConsultationTypeChange(
                      type.id as "video" | "in-person" | "phone"
                    )
                  }
                  className={`flex flex-col items-center p-3 rounded-xl border transition-all
                    ${
                      isSelected
                        ? "border-primary bg-primary/10"
                        : "border-border hover:bg-muted"
                    }`}
                >
                  <div className={`p-2 rounded-lg ${type.color}`}>
                    <type.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium mt-2 text-foreground">
                    {type.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Notes */}
        <div>
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <FileText className="h-5 w-5 text-muted-foreground" />
            Additional Notes
          </h4>
          <Textarea
            placeholder="Describe your symptoms, concerns, or questions for the doctor..."
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            className="min-h-[100px]"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Your notes will help the doctor prepare for your consultation
          </p>
        </div>

        {/* Cost Summary */}
        {selectedDoctor && (
          <div className="p-4 rounded-xl border border-border bg-muted">
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              Cost Summary
            </h4>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Consultation Fee</span>
                <span className="font-medium text-foreground">
                  ₹{selectedDoctor.consultationFee}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Platform Fee</span>
                <span className="font-medium text-foreground">
                  ₹{platformFee}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (8%)</span>
                <span className="font-medium text-foreground">
                  ₹{(selectedDoctor.consultationFee * taxRate).toFixed(2)}
                </span>
              </div>

              <div className="pt-2 border-t border-border">
                <div className="flex justify-between font-bold text-lg">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">
                    ₹
                    {(
                      selectedDoctor.consultationFee +
                      platformFee +
                      selectedDoctor.consultationFee * taxRate
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Book Button */}
        <Button
          onClick={onBookAppointment}
          disabled={!selectedDoctor || !selectedTimeSlot || isBooking}
          className="w-full py-6 text-lg gap-3"
        >
          {isBooking ? (
            <>
              <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              Booking Appointment...
            </>
          ) : (
            "Confirm Appointment"
          )}
        </Button>

        {/* Disclaimer */}
        <div className="text-xs text-muted-foreground">
          <p>
            • Appointment can be cancelled up to 24 hours before scheduled time
          </p>
          <p>• Your payment will be securely processed</p>
          <p>• You&apos;ll receive confirmation via email and SMS</p>
        </div>
      </CardContent>
    </Card>
  );
}
