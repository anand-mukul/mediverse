import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MediVerse.AI - Dashboard",
  description: "Your personalized healthcare dashboard",
};

export default function SecureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
