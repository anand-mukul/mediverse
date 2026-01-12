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
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className=" cursor-pointer" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Pharmacy Services
              </h1>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Pill className="h-4 w-4 text-primary" />
                  <span>100+ Medications</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-success" />
                  <span>24–48h Delivery</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="relative gap-2 bg-transparent cursor-pointer"
              onClick={() => {
                document
                  .getElementById("cart-summary")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Cart</span>

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>

            <Button onClick={onEmergency} variant="destructive" size="sm" className="cursor-pointer">
              Emergency
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
