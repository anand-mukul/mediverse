"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Truck, Shield, Clock } from "lucide-react";

interface OrderSummaryProps {
  totals: {
    subtotal: number;
    deliveryFee: number;
    tax: number;
    total: number;
  };
  isCheckingOut: boolean;
  onCheckout: () => void;
}

export default function OrderSummary({
  totals,
  isCheckingOut,
  onCheckout,
}: OrderSummaryProps) {
  return (
    <Card className="border border-border shadow-sm bg-card">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Cost Breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium text-foreground">
              ₹{totals.subtotal.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Delivery Fee</span>
            <span
              className={
                totals.deliveryFee === 0
                  ? "text-success font-medium"
                  : "text-foreground"
              }
            >
              {totals.deliveryFee === 0
                ? "FREE"
                : `₹${totals.deliveryFee.toFixed(2)}`}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax (8%)</span>
            <span className="font-medium text-foreground">
              ₹{totals.tax.toFixed(2)}
            </span>
          </div>

          <div className="pt-3 border-t border-border">
            <div className="flex justify-between text-lg font-bold">
              <span className="text-foreground">Total</span>
              <span className="text-primary">₹{totals.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <Truck className="h-5 w-5 text-primary" />
            <div>
              <h5 className="font-semibold text-foreground">
                Delivery Information
              </h5>
              <p className="text-sm text-muted-foreground">
                24–48 hour delivery • Trackable • Contactless
              </p>
            </div>
          </div>

          {totals.subtotal < 500 && (
            <div className="text-sm text-warning bg-warning/10 p-2 rounded-lg">
              Add ₹{(500 - totals.subtotal).toFixed(2)} more for free delivery!
            </div>
          )}
        </div>

        {/* Security & Benefits */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-success" />
            <span>Secure payment & HIPAA compliant</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-primary" />
            <span>Pharmacist review for all orders</span>
          </div>
        </div>

        {/* Checkout Button */}
        <Button
          onClick={onCheckout}
          disabled={isCheckingOut}
          className="w-full bg-success text-success-foreground hover:bg-success/90 py-6 text-lg gap-3"
        >
          {isCheckingOut ? (
            <>
              <div className="w-5 h-5 border-2 border-success-foreground border-t-transparent rounded-full animate-spin" />
              Processing Order...
            </>
          ) : (
            <>
              <CreditCard className="h-5 w-5" />
              Proceed to Checkout
            </>
          )}
        </Button>

        {/* Payment Methods */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-2">We accept</p>
          <div className="flex items-center justify-center gap-4 text-2xl">
            <span>💳</span>
            <span>🏦</span>
            <span>📱</span>
            <span>🍎</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
