/**
 * Dashboard Service
 * API endpoints: GET /health/dashboard/:userId
 */

import { apiClient } from "@/lib/api-client";
import type { DashboardData, HealthMetrics, HealthScore } from "@/types/api";

export const dashboardService = {
  async getDashboardData(userId: string): Promise<DashboardData> {
    return await apiClient.get<DashboardData>(`/health/dashboard/${userId}`);
  },

  async getHealthMetrics(userId: string): Promise<HealthMetrics> {
    return await apiClient.get<HealthMetrics>(`/health/metrics/${userId}`);
  },

  async getHealthScore(userId: string): Promise<HealthScore> {
    return await apiClient.get<HealthScore>(`/health/score/${userId}`);
  },

  async syncHealthData(userId: string): Promise<void> {
    await apiClient.post(`/health/sync/${userId}`);
  },
};
