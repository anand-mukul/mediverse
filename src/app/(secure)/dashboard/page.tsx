"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import HealthScoreCard from "@/components/dashboard/HealthScoreCard";
import MetricsGrid from "@/components/dashboard/MetricsGrid";
import AppointmentsCard from "@/components/dashboard/AppointmentsCard";
import PrescriptionsCard from "@/components/dashboard/PrescriptionsCard";
import QuickActions from "@/components/dashboard/QuickActions";
import LoadingDashboard from "@/components/dashboard/LoadingDashboard";
import { EmptyState } from "@/components/ui/empty-state";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { dashboardService } from "@/services/dashboard.service";
import { authService } from "@/services/auth.service";
import type { DashboardData } from "@/types/api";

export default function DashboardPage() {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const user = authService.getStoredUser();
      if (!user) {
        toast.error("Authentication required");
        router.push("/login");
        return;
      }

      const data = await dashboardService.getDashboardData(user.id);
      setDashboardData(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load dashboard data";
      setError(errorMessage);
      toast.error("Failed to load dashboard", {
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const refreshData = async () => {
    toast.info("Refreshing dashboard...");
    await fetchDashboardData();
    toast.success("Dashboard updated");
  };

  if (loading) {
    return <LoadingDashboard />;
  }

  if (error || !dashboardData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <EmptyState
          icon={AlertCircle}
          title="Failed to load dashboard"
          description={
            error || "An unexpected error occurred. Please try again."
          }
          action={
            <Button onClick={fetchDashboardData} size="lg">
              Retry
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        userName={dashboardData.user.name}
        refreshData={refreshData}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <HealthScoreCard
          healthScore={dashboardData.healthScore}
          userName={dashboardData.user.name}
        />

        <MetricsGrid metrics={dashboardData.metrics} />

        <div className="grid lg:grid-cols-2 gap-6">
          <AppointmentsCard
            appointments={dashboardData.appointments}
            onBookAppointment={() => router.push("/consultation")}
          />

          <PrescriptionsCard
            prescriptions={dashboardData.prescriptions}
            onViewPharmacy={() => router.push("/pharmacy")}
          />
        </div>

        <QuickActions />
      </main>
    </div>
  );
}
