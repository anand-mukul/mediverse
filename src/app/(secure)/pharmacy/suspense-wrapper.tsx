"use client";

import { Suspense } from "react";
import PharmacyPageContent from "./pharmacy-content";

export function PharmacySuspenseWrapper() {
  return (
    <Suspense fallback={null}>
      <PharmacyPageContent />
    </Suspense>
  );
}
