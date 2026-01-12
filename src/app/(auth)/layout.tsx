import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication - MediVerse",
  description: "Sign in or create your MediVerse account",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/40 to-background dark:via-muted/20">
      {children}
    </div>
  );
}
