/**
 * Emergency Service
 * API endpoints:
 * - POST /emergency/trigger
 * - GET /emergency/status/:requestId
 * - GET /emergency/contacts/:userId
 */

import { apiClient } from "@/lib/api-client";
import type {
  EmergencyRequest,
  EmergencyResponse,
  EmergencyContact,
} from "@/types/api";

export const emergencyService = {
  async createEmergencyRequest(
    request: EmergencyRequest
  ): Promise<EmergencyResponse> {
    const emergencyTriggerRequest = {
      user_id: request.user_id,
      type: request.type || "medical_emergency",
      location: request.location || undefined,
    };

    return await apiClient.post<EmergencyResponse>(
      "/emergency/trigger",
      emergencyTriggerRequest
    );
  },

  async getEmergencyStatus(requestId: string): Promise<EmergencyResponse> {
    return await apiClient.get<EmergencyResponse>(
      `/emergency/status/${requestId}`
    );
  },

  async getEmergencyContacts(userId: string): Promise<EmergencyContact[]> {
    return await apiClient.get<EmergencyContact[]>(
      `/emergency/contacts/${userId}`
    );
  },

  async addEmergencyContact(
    userId: string,
    contact: Omit<EmergencyContact, "id">
  ): Promise<EmergencyContact> {
    return await apiClient.post<EmergencyContact>(
      `/emergency/contacts/${userId}`,
      contact
    );
  },

  async updateEmergencyContact(
    contactId: string,
    contact: Partial<EmergencyContact>
  ): Promise<EmergencyContact> {
    return await apiClient.patch<EmergencyContact>(
      `/emergency/contacts/${contactId}`,
      contact
    );
  },

  async deleteEmergencyContact(contactId: string): Promise<void> {
    await apiClient.delete(`/emergency/contacts/${contactId}`);
  },
};
