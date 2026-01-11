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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500 text-green-50 dark:bg-green-600 dark:text-green-50";
      case "offline":
        return "bg-slate-500 text-slate-50 dark:bg-slate-600 dark:text-slate-50";
      case "busy":
        return "bg-yellow-500 text-yellow-50 dark:bg-yellow-600 dark:text-yellow-50";
      case "error":
        return "bg-red-500 text-red-50 dark:bg-red-600 dark:text-red-50";
      default:
        return "bg-slate-500 text-slate-50 dark:bg-slate-600 dark:text-slate-50";
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
      className={cn(
        "border-2 cursor-pointer transition-all duration-200 hover:shadow-lg",
        "dark:bg-card dark:border-border",
        isSelected
          ? "border-primary bg-primary/5 dark:bg-primary/10"
          : "border-border hover:border-primary/50"
      )}
      onClick={onSelect}
    >
      <CardContent className="p-6">
        {/* Device Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="text-4xl">{getDeviceIcon(device.type)}</div>
            <div>
              <h3 className="text-lg font-bold text-foreground dark:text-foreground">
                {device.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={cn(
                    "text-xs px-2 py-1 rounded-full font-medium",
                    getStatusColor(device.status)
                  )}
                >
                  {device.status.charAt(0).toUpperCase() +
                    device.status.slice(1)}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground dark:text-muted-foreground">
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

        {/* Device Metrics */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Battery className="h-4 w-4 text-green-600 dark:text-green-500" />
            <div className="text-sm">
              <div className="font-semibold text-foreground dark:text-foreground">
                {device.battery}%
              </div>
              <div className="text-xs text-muted-foreground dark:text-muted-foreground">
                Battery
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Wifi className="h-4 w-4 text-blue-600 dark:text-blue-500" />
            <div className="text-sm">
              <div className="font-semibold text-foreground dark:text-foreground">
                {device.signalStrength}%
              </div>
              <div className="text-xs text-muted-foreground dark:text-muted-foreground">
                Signal
              </div>
            </div>
          </div>

          {device.temperature && (
            <div className="flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-orange-600 dark:text-orange-500" />
              <div className="text-sm">
                <div className="font-semibold text-foreground dark:text-foreground">
                  {device.temperature}°C
                </div>
                <div className="text-xs text-muted-foreground dark:text-muted-foreground">
                  Temp
                </div>
              </div>
            </div>
          )}

          {device.humidity && (
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-blue-600 dark:text-blue-500" />
              <div className="text-sm">
                <div className="font-semibold text-foreground dark:text-foreground">
                  {device.humidity}%
                </div>
                <div className="text-xs text-muted-foreground dark:text-muted-foreground">
                  Humidity
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Last Activity */}
        <div className="mb-4 p-3 bg-accent/50 dark:bg-accent/30 rounded-lg border border-border">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-muted-foreground dark:text-muted-foreground" />
            <span className="text-sm text-foreground dark:text-foreground">
              {device.lastActivity}
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-4 pt-4 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setShowActions(!showActions);
            }}
            className="w-full justify-between text-foreground dark:text-foreground hover:bg-accent"
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
                  className={cn(action.color, "text-white hover:opacity-90")}
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
