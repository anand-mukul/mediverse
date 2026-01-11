/**
 * IoT Device Service
 * API endpoints:
 * - GET /iot/devices/:userId
 * - GET /iot/devices/:deviceId/readings
 * - POST /iot/devices/sync
 */

import { apiClient } from "@/lib/api-client";
import type { IoTDevice, DeviceReading } from "@/types/api";

export const iotService = {
  async getUserDevices(userId: string): Promise<IoTDevice[]> {
    return await apiClient.get<IoTDevice[]>(`/iot/devices/${userId}`);
  },

  async getDeviceById(deviceId: string): Promise<IoTDevice> {
    return await apiClient.get<IoTDevice>(`/iot/devices/details/${deviceId}`);
  },

  async getDeviceReadings(
    deviceId: string,
    startDate?: string,
    endDate?: string
  ): Promise<DeviceReading[]> {
    const params = new URLSearchParams();
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);

    const endpoint = `/iot/devices/${deviceId}/readings${
      params.toString() ? `?${params.toString()}` : ""
    }`;
    return await apiClient.get<DeviceReading[]>(endpoint);
  },

  async syncDevice(deviceId: string): Promise<IoTDevice> {
    return await apiClient.post<IoTDevice>("/iot/devices/sync", { deviceId });
  },

  async sendDeviceCommand(deviceId: string, command: string): Promise<void> {
    await apiClient.post(`/iot/devices/${deviceId}/command`, { command });
  },
};
