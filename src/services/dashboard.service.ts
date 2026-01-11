/**
 * Dashboard Service
 * API endpoints: GET /health/dashboard/:userId
 */

import { apiClient } from "@/lib/api-client";
import type { DashboardData, HealthMetrics, HealthScore } from "@/types/api";

export const dashboardService = {
  async getDashboardData(userId: string): Promise<DashboardData> {
    try {
      const data = await apiClient.get<DashboardData>(
        `/health/dashboard/${userId}`
      );

      return {
        user: data.user,
        healthScore: data.healthScore || {
          score: 85,
          trend: "stable",
          lastUpdated: new Date().toISOString(),
          factors: { activity: 80, vitals: 85, lifestyle: 90 },
        },
        metrics: data.metrics || {
          heart_rate: 72,
          blood_pressure: "120/80",
          temperature: 37.0,
          steps_today: 0,
          oxygen_level: 98,
          sleep_hours: 0,
        },
        appointments: data.appointments || [],
        prescriptions: data.prescriptions || [],
        recentActivity: data.recentActivity || [],
      };
    } catch (error) {
      console.error("[v0] Dashboard data fetch error:", error);
      throw error;
    }
  },

  async getHealthMetrics(userId: string): Promise<HealthMetrics> {
    try {
      const metrics = await apiClient.get<HealthMetrics>(
        `/health/metrics/${userId}`
      );
      return metrics;
    } catch (error) {
      console.error("[v0] Health metrics fetch error:", error);
      // Return default metrics on error
      return {
        heart_rate: 72,
        blood_pressure: "120/80",
        temperature: 37.0,
        steps_today: 0,
        oxygen_level: 98,
        sleep_hours: 0,
      };
    }
  },

  async getHealthScore(userId: string): Promise<HealthScore> {
    try {
      const score = await apiClient.get<HealthScore>(`/health/score/${userId}`);
      return score;
    } catch (error) {
      console.error("[v0] Health score fetch error:", error);
      // Return default score on error
      return {
        score: 85,
        trend: "stable",
        lastUpdated: new Date().toISOString(),
        factors: {
          activity: 80,
          vitals: 85,
          lifestyle: 90,
        },
      };
    }
  },

  async syncHealthData(userId: string): Promise<void> {
    try {
      await apiClient.post(`/health/sync/${userId}`);
    } catch (error) {
      console.error("[v0] Health sync error:", error);
      throw error;
    }
  },
};
