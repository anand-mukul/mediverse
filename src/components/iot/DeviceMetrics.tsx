"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Wifi, Battery, Server, Signal } from "lucide-react";
import type { IoTDevice } from "@/types/api";

interface DeviceMetricsProps {
  devices: IoTDevice[];
}

export default function DeviceMetrics({ devices }: DeviceMetricsProps) {
  const onlineDevices = devices.filter((d) => d.status === "online").length;

  const averageBattery =
    devices.reduce((sum, d) => sum + d.battery, 0) / devices.length;

  const averageSignal =
    devices.reduce((sum, d) => sum + d.signalStrength, 0) / devices.length;

  const metrics = [
    {
      icon: Server,
      label: "Total Devices",
      value: devices.length.toString(),
      change: "+2 this month",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      barColor: "bg-primary",
    },
    {
      icon: Wifi,
      label: "Online Devices",
      value: `${onlineDevices}/${devices.length}`,
      change: "All systems operational",
      iconBg: "bg-success/10",
      iconColor: "text-success",
      barColor: "bg-success",
    },
    {
      icon: Battery,
      label: "Avg Battery",
      value: `${Math.round(averageBattery)}%`,
      change: "Sufficient for 12h",
      iconBg: "bg-warning/10",
      iconColor: "text-warning",
      barColor: "bg-warning",
    },
    {
      icon: Signal,
      label: "Signal Strength",
      value: `${Math.round(averageSignal)}%`,
      change: "Strong connection",
      iconBg: "bg-secondary/10",
      iconColor: "text-secondary",
      barColor: "bg-secondary",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <Card
          key={index}
          className="border-border shadow-sm hover:shadow-md transition-shadow"
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${metric.iconBg}`}>
                <metric.icon className={`h-6 w-6 ${metric.iconColor}`} />
              </div>

              <div className="text-right">
                <div className="text-2xl font-bold text-foreground">
                  {metric.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  {metric.change}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">
                {metric.label}
              </h3>

              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full ${metric.barColor}`}
                  style={{
                    width: metric.label.includes("Battery")
                      ? `${Math.round(averageBattery)}%`
                      : metric.label.includes("Signal")
                      ? `${Math.round(averageSignal)}%`
                      : metric.label.includes("Online")
                      ? `${(onlineDevices / devices.length) * 100}%`
                      : "100%",
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
