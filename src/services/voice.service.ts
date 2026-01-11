/**
 * Voice Assistant Service
 * API endpoints:
 * - POST /voice/query
 * - GET /voice/history/:userId
 */

import { apiClient } from "@/lib/api-client";
import type { VoiceCommand, VoiceQuery } from "@/types/api";

export const voiceService = {
  async processVoiceQuery(query: VoiceQuery): Promise<VoiceCommand> {
    try {
      return await apiClient.post<VoiceCommand>("/voice/query", query);
    } catch (error) {
      return {
        id: String(Date.now()),
        command: query.query,
        response:
          "I'm sorry, I couldn't process your request. Please try again.",
        timestamp: new Date().toISOString(),
        successful: false,
        action: undefined,
      };
    }
  },

  async getVoiceHistory(userId: string): Promise<VoiceCommand[]> {
    try {
      return await apiClient.get<VoiceCommand[]>(`/voice/history/${userId}`);
    } catch {
      return [];
    }
  },

  async clearVoiceHistory(userId: string): Promise<void> {
    try {
      await apiClient.delete(`/voice/history/${userId}`);
    } catch {
      // Silent failure
    }
  },
};
