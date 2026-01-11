"use client";

import { cn } from "@/lib/utils";
import { MedicalCard } from "@/components/ui/medical-card";

interface SpecialtyFilterProps {
  specialties: string[];
  selectedSpecialty: string;
  onSelectSpecialty: (specialty: string) => void;
}

export default function SpecialtyFilter({
  specialties,
  selectedSpecialty,
  onSelectSpecialty,
}: SpecialtyFilterProps) {
  const getSpecialtyLabel = (specialty: string) => {
    return specialty === "all"
      ? "All Specialties"
      : specialty
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
  };

  return (
    <MedicalCard title="Filter by Specialty">
      <div className="flex flex-wrap gap-2">
        {specialties.map((specialty) => (
          <button
            key={specialty}
            onClick={() => onSelectSpecialty(specialty)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              selectedSpecialty === specialty
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-muted text-foreground hover:bg-accent hover:shadow-sm"
            )}
          >
            {getSpecialtyLabel(specialty)}
          </button>
        ))}
      </div>
    </MedicalCard>
  );
}
