"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import IoTHeader from "@/components/iot/IoTHeader";
import DeviceGrid from "@/components/iot/DeviceGrid";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { iotService } from "@/services/iot.service";
import { authService } from "@/services/auth.service";
import type { IoTDevice } from "@/types/api";

export default function IoTControlPage() {
  const router = useRouter();
  const [devices, setDevices] = useState<IoTDevice[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDevice, setSelectedDevice] = useState<IoTDevice | null>(null);

  const fetchDevices = useCallback(async () => {
    try {
      setLoading(true);
      const user = authService.getStoredUser();
      if (!user) {
        toast.error("Authentication required");
        router.push("/login");
        return;
      }

      const data = await iotService.getUserDevices(user.id);
      setDevices(data);
      if (data.length > 0) setSelectedDevice(data[0]);
    } catch (error) {
      console.error("Failed to load devices:", error);
      toast.error("Failed to load devices");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchDevices();
  }, [fetchDevices]);

  const sendCommand = async (
    deviceId: string,
    command: string,
    label: string
  ) => {
    try {
      await iotService.sendDeviceCommand(deviceId, command);
      toast.success(`Command "${label}" sent successfully`);
      fetchDevices();
    } catch (error) {
      console.error("Failed to send command:", error);
      toast.error("Failed to send command");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <IoTHeader onRefresh={fetchDevices} />
        <div className="flex justify-center items-center min-h-[60vh]">
          <LoadingSpinner size="lg" label="Loading devices..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <IoTHeader onRefresh={fetchDevices} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            IoT Device Control
          </h1>
          <p className="text-base md:text-lg text-muted-foreground">
            Manage your connected health devices
          </p>
        </div>

        <DeviceGrid
          devices={devices}
          selectedDevice={selectedDevice}
          onDeviceSelect={setSelectedDevice}
          onSendCommand={sendCommand}
        />
      </main>
    </div>
  );
}
