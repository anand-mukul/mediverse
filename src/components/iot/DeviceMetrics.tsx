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
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: Wifi,
      label: "Online Devices",
      value: `${onlineDevices}/${devices.length}`,
      change: "All systems operational",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: Battery,
      label: "Avg Battery",
      value: `${Math.round(averageBattery)}%`,
      change: "Sufficient for 12h",
      color: "text-amber-600",
      bgColor: "bg-amber-100",
    },
    {
      icon: Signal,
      label: "Signal Strength",
      value: `${Math.round(averageSignal)}%`,
      change: "Strong connection",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <Card
          key={index}
          className="border-0 shadow-sm hover:shadow-md transition-shadow"
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${metric.bgColor}`}>
                <metric.icon className={`h-6 w-6 ${metric.color}`} />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-slate-900">
                  {metric.value}
                </div>
                <div className="text-xs text-slate-500">{metric.change}</div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-slate-900">{metric.label}</h3>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${metric.bgColor.replace(
                    "bg-",
                    "bg-gradient-to-r from-"
                  )} to-white`}
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
