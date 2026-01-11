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
  const isInCart = (medicationId: string) => {
    return cart.some((item) => item.medicationId === medicationId);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Available Medications
        </h2>
        <div className="text-sm text-slate-600 dark:text-slate-400">
          {medications.length} medications found
        </div>
      </div>

      {medications.length === 0 ? (
        <div className="text-center py-12">
          <Pill className="h-16 w-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            No medications found
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
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
                className="border-0 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{med.imageUrl}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                            {med.name}
                          </h3>
                          {med.brand && (
                            <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                              {med.brand}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {med.genericName}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      {med.discountedPrice ? (
                        <div>
                          <div className="text-sm text-slate-400 dark:text-slate-500 line-through">
                            ₹{med.price.toFixed(2)}
                          </div>
                          <div className="text-xl font-bold text-green-600 dark:text-green-400">
                            ₹{med.discountedPrice.toFixed(2)}
                          </div>
                        </div>
                      ) : (
                        <div className="text-xl font-bold text-slate-900 dark:text-slate-100">
                          ₹{med.price.toFixed(2)}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Dosage
                      </p>
                      <p className="font-medium text-slate-900 dark:text-slate-100">
                        {med.dosage}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Form
                      </p>
                      <p className="font-medium text-slate-900 dark:text-slate-100">
                        {med.form}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Category
                      </p>
                      <p className="font-medium text-slate-900 dark:text-slate-100">
                        {med.category}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Stock
                      </p>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            med.inStock ? "bg-green-500" : "bg-red-500"
                          }`}
                        />
                        <span className="font-medium text-slate-900 dark:text-slate-100">
                          {med.inStock
                            ? `${med.stockCount} left`
                            : "Out of stock"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-700 dark:text-slate-300 mb-4 line-clamp-2">
                    {med.description}
                  </p>

                  {/* Requirements */}
                  <div className="flex items-center gap-4 mb-4">
                    {med.requiresPrescription && (
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                          Prescription Required
                        </span>
                      </div>
                    )}

                    {!med.inStock && (
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                        <span className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                          Backorder Available
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        4.8 (256 reviews)
                      </span>
                    </div>

                    <Button
                      onClick={() => onAddToCart(med)}
                      disabled={
                        !med.inStock ||
                        (!canAddToCart && med.requiresPrescription)
                      }
                      className={`
                        gap-2
                        ${
                          inCart
                            ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                            : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        }
                      `}
                    >
                      {inCart ? (
                        <>
                          <Package className="h-4 w-4" />
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
