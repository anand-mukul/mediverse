"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart, Pill, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

interface PharmacyHeaderProps {
  cartCount: number;
  onEmergency: () => void;
}

export default function PharmacyHeader({
  cartCount,
  onEmergency,
}: PharmacyHeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="hover:bg-slate-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Pharmacy Services
              </h1>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <Pill className="h-4 w-4 text-blue-600" />
                  <span>100+ Medications</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-green-600" />
                  <span>24-48h Delivery</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="relative gap-2"
              onClick={() => {
                document
                  .getElementById("cart-summary")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>

            <Button
              onClick={onEmergency}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white gap-2"
            >
              Emergency
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
