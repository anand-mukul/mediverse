import type React from "react";
import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google"
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

// const geistSans = Geist({
//   subsets: ["latin"],
// })
// const geistMono = Geist_Mono({
//   subsets: ["latin"],
// })

export const metadata: Metadata = {
  title: "MediVerse - Intelligent Health Ecosystem",
  description:
    "Where Medical Excellence Meets the Universe of Possibilities. AI-powered healthcare solutions for the modern world.",
  keywords: [
    "healthcare",
    "AI",
    "telemedicine",
    "medical diagnosis",
    "health tech",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
