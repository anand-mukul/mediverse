/**
 * Diagnostics Service
 * API endpoints:
 * - POST /diagnostics/analyze
 * - GET /diagnostics/history/:userId
 * - GET /diagnostics/guides
 */

import { apiClient } from "@/lib/api-client";
import type { SymptomAnalysis, HealthGuide } from "@/types/api";

export const diagnosticsService = {
  async analyzeSymptoms(
    symptoms: string,
    userId: string
  ): Promise<SymptomAnalysis> {
    return await apiClient.post<SymptomAnalysis>("/diagnostics/analyze", {
      symptoms,
      userId,
    });
  },

  async getAnalysisHistory(userId: string): Promise<SymptomAnalysis[]> {
    return await apiClient.get<SymptomAnalysis[]>(
      `/diagnostics/history/${userId}`
    );
  },

  async getHealthGuides(category?: string): Promise<HealthGuide[]> {
    const endpoint = category
      ? `/diagnostics/guides?category=${encodeURIComponent(category)}`
      : "/diagnostics/guides";
    return await apiClient.get<HealthGuide[]>(endpoint);
  },

  async getHealthGuideById(guideId: string): Promise<HealthGuide> {
    return await apiClient.get<HealthGuide>(`/diagnostics/guides/${guideId}`);
  },
};
