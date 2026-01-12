"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Battery,
  Wifi,
  MapPin,
  Thermometer,
  Droplets,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import type { IoTDevice } from "@/types/api";
import { cn } from "@/lib/utils";

interface DeviceCardProps {
  device: IoTDevice;
  isSelected: boolean;
  onSelect: () => void;
  onSendCommand: (command: string, label: string) => void;
}

export default function DeviceCard({
  device,
  isSelected,
  onSelect,
  onSendCommand,
}: DeviceCardProps) {
  const [showActions, setShowActions] = useState(false);

  const getStatusClasses = (status: string) => {
    switch (status) {
      case "online":
        return "bg-success/15 text-success";
      case "offline":
        return "bg-muted text-muted-foreground";
      case "busy":
        return "bg-warning/15 text-warning";
      case "error":
        return "bg-destructive/15 text-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "bot":
        return "🤖";
      case "monitor":
        return "📊";
      case "sensor":
        return "📡";
      case "assistant":
        return "🎤";
      default:
        return "📱";
    }
  };

  return (
    <Card
      onClick={onSelect}
      className={cn(
        "cursor-pointer border-2 transition-all duration-200 hover:shadow-lg",
        isSelected
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/50"
      )}
    >
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="text-4xl">{getDeviceIcon(device.type)}</div>

            <div>
              <h3 className="text-lg font-bold text-foreground">
                {device.name}
              </h3>

              <div className="flex items-center gap-2 mt-1">
                <span
                  className={cn(
                    "text-xs px-2 py-1 rounded-full font-medium",
                    getStatusClasses(device.status)
                  )}
                >
                  {device.status.charAt(0).toUpperCase() +
                    device.status.slice(1)}
                </span>

                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {device.location}
                </span>
              </div>
            </div>
          </div>

          <ChevronRight
            className={cn(
              "h-5 w-5 text-muted-foreground transition-transform",
              isSelected && "rotate-90"
            )}
          />
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          <Metric
            icon={<Battery className="h-4 w-4 text-success" />}
            value={`${device.battery}%`}
            label="Battery"
          />

          <Metric
            icon={<Wifi className="h-4 w-4 text-primary" />}
            value={`${device.signalStrength}%`}
            label="Signal"
          />

          {device.temperature !== undefined && (
            <Metric
              icon={<Thermometer className="h-4 w-4 text-warning" />}
              value={`${device.temperature}°C`}
              label="Temp"
            />
          )}

          {device.humidity !== undefined && (
            <Metric
              icon={<Droplets className="h-4 w-4 text-info" />}
              value={`${device.humidity}%`}
              label="Humidity"
            />
          )}
        </div>

        {/* Last Activity */}
        <div className="mb-4 p-3 rounded-lg border border-border bg-accent/50">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-foreground">
              {device.lastActivity}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 pt-4 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setShowActions(!showActions);
            }}
            className="w-full justify-between"
          >
            <span>Quick Actions</span>
            <ChevronRight
              className={cn(
                "h-4 w-4 transition-transform",
                showActions && "rotate-90"
              )}
            />
          </Button>

          {showActions && (
            <div className="mt-3 grid grid-cols-2 gap-2">
              {device.actions.map((action) => (
                <Button
                  key={action.id}
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSendCommand(action.command, action.label);
                  }}
                  className="bg-primary text-primary-foreground hover:opacity-90"
                >
                  <span className="mr-2">{action.icon}</span>
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

/* ---------------------------------- */
/* Small internal helper (no UI change) */
/* ---------------------------------- */
function Metric({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <div className="text-sm">
        <div className="font-semibold text-foreground">{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}
