"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import PharmacyHeader from "@/components/pharmacy/PharmacyHeader";
import SearchBar from "@/components/pharmacy/SearchBar";
import CategoryFilter from "@/components/pharmacy/CategoryFilter";
import MedicationGrid from "@/components/pharmacy/MedicationGrid";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { pharmacyService } from "@/services/pharmacy.service";
import type { Medication, CartItem } from "@/types/api";

const CATEGORIES = [
  "all",
  "pain relief",
  "antibiotic",
  "diabetes",
  "blood pressure",
  "digestive",
  "cholesterol",
  "allergy",
  "vitamins",
];

export default function PharmacyPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [medications, setMedications] = useState<Medication[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [prescriptionUploaded] = useState(false);

  const fetchMedications = useCallback(async () => {
    try {
      setLoading(true);
      const data = await pharmacyService.getMedications(
        selectedCategory === "all" ? undefined : selectedCategory,
        searchQuery || undefined
      );
      setMedications(data);
    } catch (error) {
      console.error("[v0] Failed to load medications:", error);
      toast.error("Failed to load medications");
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    fetchMedications();
  }, [fetchMedications]);

  const addToCart = (medication: Medication) => {
    if (!medication.inStock) {
      toast.error("Out of stock");
      return;
    }

    const existingItem = cart.find(
      (item) => item.medicationId === medication.id
    );

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.medicationId === medication.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { medicationId: medication.id, quantity: 1 }]);
    }

    toast.success("Added to cart");
  };

  const handleEmergency = () => {
    router.push("/emergency");
  };

  return (
    <div className="min-h-screen bg-background">
      <PharmacyHeader cartCount={cart.length} onEmergency={handleEmergency} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Pharmacy Services
          </h1>
          <p className="text-base md:text-lg text-muted-foreground">
            Order medications with fast, reliable delivery
          </p>
        </div>

        <div className="space-y-6">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          <CategoryFilter
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />

          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" label="Loading medications..." />
            </div>
          ) : (
            <MedicationGrid
              medications={medications}
              cart={cart}
              prescriptionUploaded={prescriptionUploaded}
              onAddToCart={addToCart}
            />
          )}
        </div>
      </main>
    </div>
  );
}
