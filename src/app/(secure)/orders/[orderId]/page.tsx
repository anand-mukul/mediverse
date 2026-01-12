"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Package, Truck, CheckCircle, Clock, MapPin } from "lucide-react"
import { pharmacyService } from "@/services/pharmacy.service"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { toast } from "sonner"
import type { Order } from "@/types/api"

export default function OrderDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const orderId = params.orderId as string

  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true)
        const orderData = await pharmacyService.trackOrder(orderId)
        setOrder(orderData)
      } catch (error) {
        console.error("Failed to load order:", error)
        toast.error("Failed to load order details")
      } finally {
        setLoading(false)
      }
    }

    if (orderId) {
      fetchOrder()
    }
  }, [orderId])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner size="lg" label="Loading order..." />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <Package className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">Order not found</h2>
        <Button onClick={() => router.push("/pharmacy")} className="mt-4 cursor-pointer">
          Back to Pharmacy
        </Button>
      </div>
    )
  }

  const statusIcons = {
    pending: <Clock className="h-5 w-5 text-warning" />,
    confirmed: <CheckCircle className="h-5 w-5 text-success" />,
    shipped: <Truck className="h-5 w-5 text-blue-500" />,
    delivered: <Package className="h-5 w-5 text-success" />,
    cancelled: <div className="h-5 w-5 text-destructive" />,
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => router.back()} className="cursor-pointer">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Order Details</h1>
                <p className="text-sm text-muted-foreground">Order #{order.id.slice(0, 8)}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Order Status */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {statusIcons[order.status]}
                Order Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold text-foreground capitalize">{order.status}</p>
                  <p className="text-sm text-muted-foreground">
                    Placed on {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                  {order.deliveryDate && (
                    <p className="text-sm text-muted-foreground">
                      Expected delivery: {new Date(order.deliveryDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{item.medication.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.medication.dosage} • {item.medication.category}
                      </p>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-foreground">Total Amount</span>
                  <span className="text-2xl font-bold text-foreground">${order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-foreground">
                <p>{order.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Button
              onClick={() => router.push("/pharmacy")}
              variant="outline"
              className="flex-1 cursor-pointer bg-transparent"
            >
              Continue Shopping
            </Button>
            <Button onClick={() => router.push("/dashboard")} className="flex-1 cursor-pointer">
              Go to Dashboard
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
