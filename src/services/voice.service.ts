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
    return await apiClient.post<VoiceCommand>("/voice/query", query);
  },

  async getVoiceHistory(userId: string): Promise<VoiceCommand[]> {
    return await apiClient.get<VoiceCommand[]>(`/voice/history/${userId}`);
  },

  async clearVoiceHistory(userId: string): Promise<void> {
    await apiClient.delete(`/voice/history/${userId}`);
  },
};
