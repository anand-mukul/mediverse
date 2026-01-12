/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import PharmacyHeader from "@/components/pharmacy/PharmacyHeader"
import SearchBar from "@/components/pharmacy/SearchBar"
import CategoryFilter from "@/components/pharmacy/CategoryFilter"
import MedicationGrid from "@/components/pharmacy/MedicationGrid"
import ShoppingCart from "@/components/pharmacy/ShoppingCart"
import PrescriptionUpload from "@/components/pharmacy/PrescriptionUpload"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Button } from "@/components/ui/button"
import { pharmacyService } from "@/services/pharmacy.service"
import { authService } from "@/services/auth.service"
import type { Medication } from "@/types/api"

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
]

interface CartItemExtended {
  id: string
  name: string
  dosage: string
  price: number
  quantity: number
  requiresPrescription: boolean
  prescriptionApproved?: boolean
  medicationId: string
}

export default function PharmacyPageContent() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [medications, setMedications] = useState<Medication[]>([])
  const [cart, setCart] = useState<CartItemExtended[]>([])
  const [loading, setLoading] = useState(true)
  const [prescriptionUploaded, setPrescriptionUploaded] = useState(false)
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const fetchMedications = useCallback(async () => {
    try {
      setLoading(true)
      const data = await pharmacyService.getMedications(
        selectedCategory === "all" ? undefined : selectedCategory,
        searchQuery || undefined,
      )
      setMedications(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("[v0] Failed to load medications:", error)
      toast.error("Failed to load medications")
      setMedications([])
    } finally {
      setLoading(false)
    }
  }, [selectedCategory, searchQuery])

  useEffect(() => {
    fetchMedications()
  }, [fetchMedications])

  const addToCart = (medication: Medication) => {
    if (!medication.inStock) {
      toast.error("Out of stock")
      return
    }

    const existingItem = cart.find((item) => item.medicationId === medication.id)

    if (existingItem) {
      setCart(
        cart.map((item) => (item.medicationId === medication.id ? { ...item, quantity: item.quantity + 1 } : item)),
      )
      toast.success("Quantity updated")
    } else {
      const newItem: CartItemExtended = {
        id: medication.id,
        medicationId: medication.id,
        name: medication.name,
        dosage: medication.dosage || "Standard",
        price: medication.price,
        quantity: 1,
        requiresPrescription: medication.requiresPrescription,
        prescriptionApproved: false,
      }
      setCart([...cart, newItem])
      toast.success("Added to cart")
    }
  }

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter((item) => item.id !== itemId))
    toast.info("Removed from cart")
  }

  const updateQuantity = (itemId: string, delta: number) => {
    setCart(
      cart
        .map((item) => {
          if (item.id === itemId) {
            const newQuantity = item.quantity + delta
            return { ...item, quantity: Math.max(1, newQuantity) }
          }
          return item
        })
        .filter((item) => item.quantity > 0),
    )
  }

  const clearCart = () => {
    setCart([])
    toast.info("Cart cleared")
  }

  const handleEmergency = () => {
    router.push("/emergency")
  }

  const handleCheckout = async () => {
    const user = authService.getStoredUser()
    if (!user) {
      toast.error("Please login to checkout")
      router.push("/login")
      return
    }

    // Check if any items require prescription
    const requiresPrescription = cart.some((item) => item.requiresPrescription && !item.prescriptionApproved)

    if (requiresPrescription && !prescriptionUploaded) {
      toast.error("Please upload prescription for prescription medicines")
      return
    }

    if (cart.length === 0) {
      toast.error("Cart is empty")
      return
    }

    setIsCheckingOut(true)
    try {
      // Prepare order items
      const orderItems = cart.map((item) => ({
        medicationId: item.medicationId,
        quantity: item.quantity,
        prescriptionId: item.prescriptionApproved ? "approved" : undefined,
      }))

      // Default shipping address (in production, collect from user)
      const shippingAddress = {
        street: "123 Main Street",
        city: "Mumbai",
        state: "Maharashtra",
        zipCode: "400001",
        country: "India",
      }

      // Create order
      const order = await pharmacyService.createOrder(user.id, orderItems, shippingAddress)

      toast.success("Order placed successfully!", {
        description: `Order ID: ${order.id}`,
      })

      // Clear cart and redirect
      clearCart()
      router.push(`/orders/${order.id}`)
    } catch (error: any) {
      console.error("[v0] Checkout failed:", error)
      toast.error("Checkout failed", {
        description: error.message || "Please try again",
      })
    } finally {
      setIsCheckingOut(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <PharmacyHeader cartCount={cart.length} onEmergency={handleEmergency} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Pharmacy Services</h1>
          <p className="text-base md:text-lg text-muted-foreground">Order medications with fast, reliable delivery</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Medications */}
          <div className="lg:col-span-2 space-y-6">
            <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
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
                cart={cart.map((item) => ({ medicationId: item.medicationId, quantity: item.quantity }))}
                prescriptionUploaded={prescriptionUploaded}
                onAddToCart={addToCart}
              />
            )}
          </div>

          {/* Right Column - Cart & Prescription */}
          <div className="space-y-6">
            {/* Prescription Upload */}
            <PrescriptionUpload isUploaded={prescriptionUploaded} onUploadStatusChange={setPrescriptionUploaded} />

            {/* Shopping Cart */}
            <ShoppingCart
              cart={cart}
              prescriptionUploaded={prescriptionUploaded}
              onRemoveItem={removeFromCart}
              onUpdateQuantity={updateQuantity}
              onClearCart={clearCart}
            />

            {/* Checkout Button */}
            {cart.length > 0 && (
              <Button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg cursor-pointer"
              >
                {isCheckingOut ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  `Checkout (${cart.length} items)`
                )}
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
