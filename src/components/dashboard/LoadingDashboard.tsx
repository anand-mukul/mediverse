import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Activity } from "lucide-react";

export default function LoadingDashboard() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex p-6 bg-primary/10 rounded-full animate-pulse">
            <Activity className="h-16 w-16 text-primary" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">
              Loading Your Dashboard
            </h2>
            <p className="text-muted-foreground">
              Fetching your health data securely...
            </p>
          </div>

          <LoadingSpinner size="lg" label="Loading dashboard data" />

          <div className="grid grid-cols-3 gap-4 pt-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2 animate-pulse">
                <div className="h-3 bg-muted rounded" />
                <div className="h-8 bg-muted rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
