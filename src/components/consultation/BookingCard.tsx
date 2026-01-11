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
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: "phone",
      label: "Phone Call",
      icon: Phone,
      color: "bg-green-100 text-green-600",
    },
    {
      id: "in-person",
      label: "In-Person",
      icon: Users,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  const formatDate = (date: Date) => {
    return format(date, "EEEE, MMMM d, yyyy");
  };

  return (
    <Card className="border-0 shadow-lg sticky top-24">
      <CardHeader>
        <CardTitle>Appointment Details</CardTitle>
        <p className="text-sm text-slate-600">
          Review and confirm your booking
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Selected Doctor */}
        {selectedDoctor ? (
          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
            <div className="flex items-start gap-4">
              <div className="text-3xl">👨‍⚕️</div>
              <div>
                <h4 className="font-semibold text-slate-900">
                  {selectedDoctor.name}
                </h4>
                <p className="text-sm text-slate-600">
                  {selectedDoctor.specialty}
                </p>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-slate-500" />
                    <span className="font-medium">
                      {formatDate(selectedDate)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-slate-500" />
                    <span className="font-medium">{selectedTimeSlot}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <User className="h-8 w-8 text-slate-400 mx-auto mb-2" />
            <p className="text-slate-600">Select a doctor to continue</p>
          </div>
        )}

        {/* Consultation Type */}
        <div>
          <h4 className="font-semibold text-slate-900 mb-3">
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
                  className={`
                    flex flex-col items-center p-3 rounded-xl border-2 transition-all
                    ${
                      isSelected
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200 hover:border-slate-300"
                    }
                  `}
                >
                  <div className={`p-2 rounded-lg ${type.color}`}>
                    <type.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium mt-2">{type.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Notes */}
        <div>
          <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <FileText className="h-5 w-5 text-slate-500" />
            Additional Notes
          </h4>
          <Textarea
            placeholder="Describe your symptoms, concerns, or questions for the doctor..."
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            className="min-h-[100px]"
          />
          <p className="text-xs text-slate-500 mt-2">
            Your notes will help the doctor prepare for your consultation
          </p>
        </div>

        {/* Cost Summary */}
        {selectedDoctor && (
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-slate-500" />
              Cost Summary
            </h4>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Consultation Fee</span>
                <span className="font-medium">
                  ${selectedDoctor.consultationFee}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Platform Fee</span>
                <span className="font-medium">$9.99</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Tax</span>
                <span className="font-medium">
                  ${(selectedDoctor.consultationFee * 0.08).toFixed(2)}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-blue-600">
                    $
                    {(
                      selectedDoctor.consultationFee +
                      9.99 +
                      selectedDoctor.consultationFee * 0.08
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
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 text-lg gap-3"
        >
          {isBooking ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Booking Appointment...
            </>
          ) : (
            "Confirm Appointment"
          )}
        </Button>

        {/* Disclaimer */}
        <div className="text-xs text-slate-500">
          <p>
            • Appointment can be cancelled up to 24 hours before scheduled time
          </p>
          <p>• Your payment will be securely processed</p>
          <p>• You&absp;ll receive confirmation via email and SMS</p>
        </div>
      </CardContent>
    </Card>
  );
}
