"use client";

import DeviceCard from "./DeviceCard";
import type { IoTDevice } from "@/types/api";

interface DeviceGridProps {
  devices: IoTDevice[];
  selectedDevice: IoTDevice | null;
  onDeviceSelect: (device: IoTDevice) => void;
  onSendCommand: (deviceId: string, command: string, label: string) => void;
}

export default function DeviceGrid({
  devices,
  selectedDevice,
  onDeviceSelect,
  onSendCommand,
}: DeviceGridProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Connected Devices</h2>
        <div className="text-sm text-slate-600">
          {devices.length} devices •{" "}
          {devices.filter((d) => d.status === "online").length} online
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {devices.map((device) => (
          <DeviceCard
            key={device.id}
            device={device}
            isSelected={selectedDevice?.id === device.id}
            onSelect={() => onDeviceSelect(device)}
            onSendCommand={(command, label) =>
              onSendCommand(device.id, command, label)
            }
          />
        ))}
      </div>
    </div>
  );
}
