import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ShoppingCartIcon,
  Trash2,
  Plus,
  Minus,
  Shield,
  Package,
} from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  dosage: string;
  price: number;
  quantity: number;
  requiresPrescription: boolean;
  prescriptionApproved?: boolean;
}

interface ShoppingCartProps {
  cart: CartItem[];
  prescriptionUploaded: boolean;
  onRemoveItem: (itemId: string) => void;
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onClearCart: () => void;
}

export default function ShoppingCart({
  cart,
  prescriptionUploaded,
  onRemoveItem,
  onUpdateQuantity,
  onClearCart,
}: ShoppingCartProps) {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Card id="cart-summary" className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <ShoppingCartIcon className="h-5 w-5 text-blue-600" />
            Shopping Cart
            <span className="text-sm font-normal text-slate-600 ml-2">
              ({cart.length} items)
            </span>
          </CardTitle>

          {cart.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearCart}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {cart.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingCartIcon className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Your cart is empty
            </h3>
            <p className="text-slate-600">
              Add medications to get started with your order
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      {item.name}
                    </h4>
                    <p className="text-sm text-slate-600">{item.dosage}</p>

                    {item.requiresPrescription && (
                      <div className="flex items-center gap-2 mt-2">
                        <Shield className="h-4 w-4 text-blue-600" />
                        <span
                          className={`text-xs font-medium ${
                            item.prescriptionApproved
                              ? "text-green-600"
                              : prescriptionUploaded
                              ? "text-amber-600"
                              : "text-red-600"
                          }`}
                        >
                          {item.prescriptionApproved
                            ? "✓ Approved"
                            : prescriptionUploaded
                            ? "⏳ Under Review"
                            : "Prescription Required"}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-slate-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <div className="text-sm text-slate-600">
                      ${item.price.toFixed(2)} each
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                    >
                      <Minus className="h-3 w-3" />
                    </button>

                    <span className="w-8 text-center font-medium text-slate-900">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveItem(item.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}

            {/* Subtotal */}
            <div className="pt-4 border-t border-slate-200">
              <div className="flex justify-between items-center">
                <span className="text-slate-700">Subtotal</span>
                <span className="font-bold text-slate-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              {cart.some(
                (item) =>
                  item.requiresPrescription && !item.prescriptionApproved
              ) && (
                <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-amber-600" />
                    <span className="text-sm text-amber-800 font-medium">
                      Prescription review required before checkout
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
