"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Battery, Wifi, Thermometer, Droplets, Activity } from "lucide-react";
import type { IoTDevice } from "@/types/api";

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

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle>Device Details</CardTitle>
        <p className="text-sm text-slate-600">
          Real-time information and specifications
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Device Info */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">Device ID</div>
            <div className="font-mono text-sm text-slate-900">{device.id}</div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">Status</div>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  device.status === "online"
                    ? "bg-green-500"
                    : device.status === "offline"
                    ? "bg-slate-500"
                    : device.status === "busy"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              />
              <span className="text-sm font-medium capitalize">
                {device.status}
              </span>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="space-y-4">
          <h4 className="font-semibold text-slate-900">Current Metrics</h4>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Battery className="h-5 w-5 text-green-600" />
                <span className="text-sm text-slate-700">Battery Level</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                    style={{ width: `${device.battery}%` }}
                  />
                </div>
                <span className="text-sm font-medium">{device.battery}%</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Wifi className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-slate-700">Signal Strength</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    style={{ width: `${device.signalStrength}%` }}
                  />
                </div>
                <span className="text-sm font-medium">
                  {device.signalStrength}%
                </span>
              </div>
            </div>

            {device.temperature && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Thermometer className="h-5 w-5 text-orange-600" />
                  <span className="text-sm text-slate-700">Temperature</span>
                </div>
                <span className="text-sm font-medium">
                  {device.temperature}°C
                </span>
              </div>
            )}

            {device.humidity && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Droplets className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-slate-700">Humidity</span>
                </div>
                <span className="text-sm font-medium">{device.humidity}%</span>
              </div>
            )}
          </div>
        </div>

        {/* Specifications */}
        <div className="space-y-4">
          <h4 className="font-semibold text-slate-900">Specifications</h4>

          <div className="grid grid-cols-2 gap-3">
            {getDeviceSpecs().map((spec, index) => (
              <div key={index} className="p-3 bg-slate-50 rounded-lg">
                <div className="text-xs text-slate-600">{spec.label}</div>
                <div className="text-sm font-medium text-slate-900">
                  {spec.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Last Activity */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-slate-900">
              Last Activity
            </span>
          </div>
          <p className="text-sm text-slate-700">{device.lastActivity}</p>
        </div>
      </CardContent>
    </Card>
  );
}
