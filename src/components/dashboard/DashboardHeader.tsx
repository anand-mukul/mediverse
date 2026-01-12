"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ArrowLeft, Bell, RefreshCw, User, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

interface DashboardHeaderProps {
  userName: string;
  refreshData: () => void;
}

export default function DashboardHeader({
  userName,
  refreshData,
}: DashboardHeaderProps) {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshData();
    setIsRefreshing(false);
  };

  const handleEmergency = () => {
    router.push("/emergency");
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/")}
              className="hidden md:flex cursor-pointer"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Go back</span>
            </Button>

            <Button variant="ghost" size="icon" className="md:hidden cursor-pointer">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>

            <div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground">
                Health Dashboard
              </h1>
              <p className="text-sm text-muted-foreground hidden sm:block">
                Welcome back, {userName}
              </p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 md:gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="gap-2 hidden sm:flex bg-transparent cursor-pointer"
            >
              <RefreshCw
                className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
              <span className="hidden md:inline">Refresh</span>
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="relative bg-transparent  cursor-pointer"
              onClick={() => toast.info("Notifications feature coming soon")}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-destructive rounded-full" />
              <span className="sr-only">Notifications</span>
            </Button>

            <ThemeToggle />

            <Button
              variant="outline"
              size="icon"
              onClick={() => router.push("/profile")}
              className="hidden sm:flex cursor-pointer"
            >
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Button>

            <Button
              onClick={handleEmergency}
              variant="destructive"
              size="sm"
              className="font-semibold cursor-pointer"
            >
              <span className="hidden sm:inline">Emergency</span>
              <span className="sm:hidden">SOS</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
