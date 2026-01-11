/**
 * Pharmacy Service
 * API endpoints:
 * - GET /pharmacy/medications
 * - GET /pharmacy/medications/:id
 * - POST /pharmacy/orders
 * - GET /pharmacy/orders/:userId
 */

import { apiClient } from "@/lib/api-client";
import type { Medication, Order, CartItem, Prescription } from "@/types/api";

export const pharmacyService = {
  async getMedications(
    category?: string,
    search?: string
  ): Promise<Medication[]> {
    const params = new URLSearchParams();
    if (category) params.append("category", category);
    if (search) params.append("search", search);

    const endpoint = `/pharmacy/medications${
      params.toString() ? `?${params.toString()}` : ""
    }`;
    return await apiClient.get<Medication[]>(endpoint);
  },

  async getMedicationById(medicationId: string): Promise<Medication> {
    return await apiClient.get<Medication>(
      `/pharmacy/medications/${medicationId}`
    );
  },

  async getPrescriptions(userId: string): Promise<Prescription[]> {
    return await apiClient.get<Prescription[]>(
      `/pharmacy/prescriptions/${userId}`
    );
  },

  async uploadPrescription(userId: string, file: File): Promise<Prescription> {
    const formData = new FormData();
    formData.append("prescription", file);
    formData.append("userId", userId);

    const response = await fetch(
      `${apiClient["baseURL"]}/pharmacy/prescriptions/upload`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to upload prescription");
    }

    return await response.json();
  },

  async createOrder(
    userId: string,
    items: CartItem[],
    shippingAddress: unknown
  ): Promise<Order> {
    return await apiClient.post<Order>("/pharmacy/orders", {
      userId,
      items,
      shippingAddress,
    });
  },

  async getUserOrders(userId: string): Promise<Order[]> {
    return await apiClient.get<Order[]>(`/pharmacy/orders/${userId}`);
  },

  async trackOrder(orderId: string): Promise<Order> {
    return await apiClient.get<Order>(`/pharmacy/orders/track/${orderId}`);
  },
};
