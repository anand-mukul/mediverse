import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication - MediVerse.AI",
  description: "Sign in or create your MediVerse.AI account",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {children}
    </div>
  );
}
