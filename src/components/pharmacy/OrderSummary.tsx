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
    <Card className="border-0 shadow-lg bg-gradient-to-b from-white to-slate-50">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Cost Breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-slate-600">Subtotal</span>
            <span className="font-medium">${totals.subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-600">Delivery Fee</span>
            <span
              className={
                totals.deliveryFee === 0 ? "text-green-600 font-medium" : ""
              }
            >
              {totals.deliveryFee === 0
                ? "FREE"
                : `$${totals.deliveryFee.toFixed(2)}`}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-600">Tax (8%)</span>
            <span className="font-medium">${totals.tax.toFixed(2)}</span>
          </div>

          <div className="pt-3 border-t border-slate-200">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-blue-600">${totals.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <Truck className="h-5 w-5 text-blue-600" />
            <div>
              <h5 className="font-semibold text-blue-900">
                Delivery Information
              </h5>
              <p className="text-sm text-blue-800">
                24-48 hour delivery • Trackable • Contactless
              </p>
            </div>
          </div>

          {totals.subtotal < 50 && (
            <div className="text-sm text-amber-700 bg-amber-50 p-2 rounded-lg">
              Add ${(50 - totals.subtotal).toFixed(2)} more for free delivery!
            </div>
          )}
        </div>

        {/* Security & Benefits */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Shield className="h-4 w-4 text-green-600" />
            <span>Secure payment & HIPAA compliant</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Clock className="h-4 w-4 text-blue-600" />
            <span>Pharmacist review for all orders</span>
          </div>
        </div>

        {/* Checkout Button */}
        <Button
          onClick={onCheckout}
          disabled={isCheckingOut}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-6 text-lg gap-3"
        >
          {isCheckingOut ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
          <p className="text-xs text-slate-500 mb-2">We accept</p>
          <div className="flex items-center justify-center gap-4">
            <div className="text-2xl">💳</div>
            <div className="text-2xl">🏦</div>
            <div className="text-2xl">📱</div>
            <div className="text-2xl">🍎</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
