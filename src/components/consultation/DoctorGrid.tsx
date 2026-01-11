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
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Available Doctors
        </h2>
        <div className="text-sm text-slate-600 dark:text-slate-400">
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
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                  : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
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
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                        {doctor.name}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {doctor.specialty}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        ₹{doctor.consultationFee}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        Consultation
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold text-slate-900 dark:text-slate-100">
                        {doctor.rating}
                      </span>
                    </div>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      ({(doctor.reviews ?? 0).toLocaleString()} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-4 line-clamp-2">
                {doctor.description}
              </p>

              {/* Details */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <div className="text-sm">
                    <div className="font-medium text-slate-900 dark:text-slate-100">
                      {doctor.experience} years
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Experience
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <div className="text-sm">
                    <div className="font-medium text-slate-900 dark:text-slate-100">
                      {doctor.languages.length} languages
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
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
                      doctor.available ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    {doctor.available ? "Available" : "Not Available"}
                  </span>
                </div>

                {doctor.available ? (
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Clock className="h-4 w-4" />
                    <span>Next: {doctor.nextAvailable}</span>
                  </div>
                ) : (
                  <div className="text-sm text-slate-500 dark:text-slate-400">
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
