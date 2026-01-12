"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pill, Shield, AlertTriangle, Package, Star } from "lucide-react";
import type { Medication, CartItem } from "@/types/api";

interface MedicationGridProps {
  medications: Medication[];
  cart: CartItem[];
  prescriptionUploaded: boolean;
  onAddToCart: (medication: Medication) => void;
}

export default function MedicationGrid({
  medications,
  cart,
  prescriptionUploaded,
  onAddToCart,
}: MedicationGridProps) {
  const isInCart = (medicationId: string) =>
    cart.some((item) => item.medicationId === medicationId);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          Available Medications
        </h2>
        <div className="text-sm text-muted-foreground">
          {medications.length} medications found
        </div>
      </div>

      {medications.length === 0 ? (
        <div className="text-center py-12">
          <Pill className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No medications found
          </h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {medications.map((med) => {
            const inCart = isInCart(med.id);
            const canAddToCart =
              !med.requiresPrescription || prescriptionUploaded;

            return (
              <Card
                key={med.id}
                className="border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{med.imageUrl}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-foreground">
                            {med.name}
                          </h3>
                          {med.brand && (
                            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                              {med.brand}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {med.genericName}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      {med.discountedPrice ? (
                        <>
                          <div className="text-sm line-through text-muted-foreground">
                            ₹{med.price.toFixed(2)}
                          </div>
                          <div className="text-xl font-bold text-success">
                            ₹{med.discountedPrice.toFixed(2)}
                          </div>
                        </>
                      ) : (
                        <div className="text-xl font-bold text-foreground">
                          ₹{med.price.toFixed(2)}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    {[
                      ["Dosage", med.dosage],
                      ["Form", med.form],
                      ["Category", med.category],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <p className="text-muted-foreground">{label}</p>
                        <p className="font-medium text-foreground">{value}</p>
                      </div>
                    ))}

                    <div>
                      <p className="text-muted-foreground">Stock</p>
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            med.inStock ? "bg-success" : "bg-destructive"
                          }`}
                        />
                        <span className="font-medium text-foreground">
                          {med.inStock
                            ? `${med.stockCount} left`
                            : "Out of stock"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {med.description}
                  </p>

                  {/* Requirements */}
                  <div className="flex items-center gap-4 mb-4 text-sm font-medium">
                    {med.requiresPrescription && (
                      <div className="flex items-center gap-2 text-primary">
                        <Shield className="h-4 w-4" />
                        Prescription Required
                      </div>
                    )}

                    {!med.inStock && (
                      <div className="flex items-center gap-2 text-warning">
                        <AlertTriangle className="h-4 w-4" />
                        Backorder Available
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-warning text-warning" />
                      4.8 (256 reviews)
                    </div>

                    <Button
                      onClick={() => onAddToCart(med)}
                      disabled={
                        !med.inStock ||
                        (!canAddToCart && med.requiresPrescription)
                      }
                      className={
                        inCart
                          ? "bg-success text-success-foreground hover:bg-success/90"
                          : "bg-primary text-primary-foreground hover:bg-primary/90"
                      }
                    >
                      {inCart ? (
                        <>
                          <Package className="h-4 w-4 mr-2" />
                          Added to Cart
                        </>
                      ) : (
                        "Add to Cart"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
