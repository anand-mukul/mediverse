"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Clock, Globe, Award, CheckCircle } from "lucide-react";
import type { Doctor } from "@/types/api";

interface DoctorGridProps {
  doctors: Doctor[];
  selectedDoctor: Doctor | null;
  onSelectDoctor: (doctor: Doctor) => void;
}

export default function DoctorGrid({
  doctors,
  selectedDoctor,
  onSelectDoctor,
}: DoctorGridProps) {
  const safeDoctors = doctors ?? [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          Available Doctors
        </h2>
        <div className="text-sm text-muted-foreground">
          {safeDoctors.length} doctors found
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {safeDoctors.map((doctor) => (
          <Card
            key={doctor.id}
            className={`
              border-2 cursor-pointer transition-all duration-200 hover:shadow-lg
              ${
                selectedDoctor?.id === doctor.id
                  ? "border-primary bg-accent"
                  : "border-border hover:border-muted-foreground/40"
              }
              ${!doctor.available ? "opacity-70" : ""}
            `}
            onClick={() => doctor.available && onSelectDoctor(doctor)}
          >
            <CardContent className="p-6">
              {/* Doctor Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="text-5xl flex-shrink-0">{doctor.avatar}</div>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">
                        {doctor.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {doctor.specialty}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-foreground">
                        ₹{doctor.consultationFee}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Consultation
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-warning fill-warning" />
                      <span className="font-semibold text-foreground">
                        {doctor.rating}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({(doctor.reviews ?? 0).toLocaleString()} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-foreground/80 mb-4 line-clamp-2">
                {doctor.description}
              </p>

              {/* Details */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-primary" />
                  <div className="text-sm">
                    <div className="font-medium text-foreground">
                      {doctor.experience} years
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Experience
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-success" />
                  <div className="text-sm">
                    <div className="font-medium text-foreground">
                      {doctor.languages.length} languages
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {doctor.languages.join(", ")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      doctor.available ? "bg-success" : "bg-destructive"
                    }`}
                  />
                  <span className="text-sm font-medium text-foreground">
                    {doctor.available ? "Available" : "Not Available"}
                  </span>
                </div>

                {doctor.available ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Next: {doctor.nextAvailable}</span>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    Back: {doctor.nextAvailable}
                  </div>
                )}
              </div>

              {/* Select Button */}
              <Button
                variant={
                  selectedDoctor?.id === doctor.id ? "default" : "outline"
                }
                className={`w-full mt-4 gap-2 ${
                  !doctor.available ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!doctor.available}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectDoctor(doctor);
                }}
              >
                {selectedDoctor?.id === doctor.id ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    Selected
                  </>
                ) : (
                  "Select Doctor"
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
