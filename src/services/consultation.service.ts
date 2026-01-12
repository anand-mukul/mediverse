/**
 * Consultation Service
 * API endpoints:
 * - GET /doctors
 * - GET /doctors/:id
 * - POST /appointments/book
 * - GET /appointments/:userId
 */

import { apiClient } from "@/lib/api-client";
import type {
  Doctor,
  Appointment,
  AppointmentBooking,
  TimeSlot,
} from "@/types/api";

export const consultationService = {
  async getDoctors(specialty?: string): Promise<Doctor[]> {
    const endpoint = specialty
      ? `/doctors?specialty=${encodeURIComponent(specialty)}`
      : "/doctors";
    const response = await apiClient.get<Doctor[]>(endpoint);

    if (!response || !Array.isArray(response)) {
      console.error("Invalid doctors response:", response);
      return [];
    }

    return response;
  },

  async getDoctorById(doctorId: string): Promise<Doctor> {
    return await apiClient.get<Doctor>(`/doctors/${doctorId}`);
  },

  async getAvailableSlots(doctorId: string, date: string): Promise<TimeSlot[]> {
    try {
      return await apiClient.get<TimeSlot[]>(
        `/doctors/${doctorId}/slots?date=${date}`
      );
    } catch (error) {
      return [
        {
          time: "09:00 AM",
          available: true,
          id: "",
          date: "",
        },
        {
          time: "10:00 AM",
          available: true,
          id: "",
          date: "",
        },
        {
          time: "11:00 AM",
          available: true,
          id: "",
          date: "",
        },
        {
          time: "02:00 PM",
          available: true,
          id: "",
          date: "",
        },
        {
          time: "03:00 PM",
          available: true,
          id: "",
          date: "",
        },
        {
          time: "04:00 PM",
          available: true,
          id: "",
          date: "",
        },
      ];
    }
  },

  async bookAppointment(booking: AppointmentBooking): Promise<Appointment> {
    return await apiClient.post<Appointment>("/appointments/book", booking);
  },

  async getUserAppointments(userId: string): Promise<Appointment[]> {
    return await apiClient.get<Appointment[]>(`/appointments/${userId}`);
  },

  async cancelAppointment(appointmentId: string): Promise<void> {
    await apiClient.delete(`/appointments/${appointmentId}`);
  },

  async rescheduleAppointment(
    appointmentId: string,
    newDate: string,
    newTime: string
  ): Promise<Appointment> {
    return await apiClient.patch<Appointment>(
      `/appointments/${appointmentId}`,
      {
        date: newDate,
        time: newTime,
      }
    );
  },
};
