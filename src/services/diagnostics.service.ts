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
    const symptomArray = symptoms
      .split(/[,\n]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (symptomArray.length === 0) {
      throw new Error("Please provide at least one symptom");
    }

    const requestBody = {
      user_id: userId,
      symptoms: symptomArray,
    };

    return await apiClient.post<SymptomAnalysis>(
      "/diagnostics/analyze",
      requestBody
    );
  },

  async getAnalysisHistory(userId: string): Promise<SymptomAnalysis[]> {
    try {
      return await apiClient.get<SymptomAnalysis[]>(
        `/diagnostics/history/${userId}`
      );
    } catch (error) {
      console.error("Failed to fetch analysis history:", error);
      return [];
    }
  },

  async getHealthGuides(category?: string): Promise<HealthGuide[]> {
    try {
      const endpoint = category
        ? `/diagnostics/guides?category=${encodeURIComponent(category)}`
        : "/diagnostics/guides";
      return await apiClient.get<HealthGuide[]>(endpoint);
    } catch (error) {
      console.error("Failed to fetch health guides:", error);
      return [];
    }
  },

  async getHealthGuideById(guideId: string): Promise<HealthGuide> {
    return await apiClient.get<HealthGuide>(`/diagnostics/guides/${guideId}`);
  },
};
