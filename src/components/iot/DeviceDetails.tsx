"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Battery, Wifi, Thermometer, Droplets, Activity } from "lucide-react";
import type { IoTDevice } from "@/types/api";
import { cn } from "@/lib/utils";

interface DeviceDetailsProps {
  device: IoTDevice;
}

export default function DeviceDetails({ device }: DeviceDetailsProps) {
  const getDeviceSpecs = () => {
    switch (device.type) {
      case "bot":
        return [
          { label: "Model", value: "MedBot v2.1" },
          { label: "Processor", value: "Quad-core ARM" },
          { label: "Storage", value: "128GB SSD" },
          { label: "Connectivity", value: "WiFi 6, Bluetooth 5.2" },
        ];
      case "monitor":
        return [
          { label: "Model", value: "VitaTrack Pro" },
          { label: "Sensors", value: "ECG, SpO2, Temp" },
          { label: "Accuracy", value: "99.8%" },
          { label: "Connectivity", value: "WiFi, BLE" },
        ];
      case "sensor":
        return [
          { label: "Model", value: "AirSense 3000" },
          { label: "Range", value: "10-1000 ppm" },
          { label: "Resolution", value: "0.1 ppm" },
          { label: "Connectivity", value: "LoRa, WiFi" },
        ];
      default:
        return [];
    }
  };

  const getStatusDot = () => {
    switch (device.status) {
      case "online":
        return "bg-success";
      case "offline":
        return "bg-muted-foreground";
      case "busy":
        return "bg-warning";
      case "error":
        return "bg-destructive";
      default:
        return "bg-muted-foreground";
    }
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle>Device Details</CardTitle>
        <p className="text-sm text-muted-foreground">
          Real-time information and specifications
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Device Info */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">Device ID</div>
            <div className="font-mono text-sm text-foreground">
              {device.id}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">Status</div>
            <div className="flex items-center gap-2">
              <div
                className={cn("w-2 h-2 rounded-full", getStatusDot())}
              />
              <span className="text-sm font-medium capitalize text-foreground">
                {device.status}
              </span>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Current Metrics</h4>

          <MetricBar
            icon={<Battery className="h-5 w-5 text-success" />}
            label="Battery Level"
            value={`${device.battery}%`}
            percent={device.battery}
          />

          <MetricBar
            icon={<Wifi className="h-5 w-5 text-primary" />}
            label="Signal Strength"
            value={`${device.signalStrength}%`}
            percent={device.signalStrength}
          />

          {device.temperature !== undefined && (
            <MetricSimple
              icon={<Thermometer className="h-5 w-5 text-warning" />}
              label="Temperature"
              value={`${device.temperature}°C`}
            />
          )}

          {device.humidity !== undefined && (
            <MetricSimple
              icon={<Droplets className="h-5 w-5 text-info" />}
              label="Humidity"
              value={`${device.humidity}%`}
            />
          )}
        </div>

        {/* Specifications */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Specifications</h4>

          <div className="grid grid-cols-2 gap-3">
            {getDeviceSpecs().map((spec, index) => (
              <div
                key={index}
                className="p-3 rounded-lg bg-muted/50"
              >
                <div className="text-xs text-muted-foreground">
                  {spec.label}
                </div>
                <div className="text-sm font-medium text-foreground">
                  {spec.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Last Activity */}
        <div className="p-4 rounded-lg border border-border bg-accent/50">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-foreground">
              Last Activity
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            {device.lastActivity}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

/* ---------------- Helpers (no layout change) ---------------- */

function MetricBar({
  icon,
  label,
  value,
  percent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  percent: number;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary"
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="text-sm font-medium text-foreground">{value}</span>
      </div>
    </div>
  );
}

function MetricSimple({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  );
}
