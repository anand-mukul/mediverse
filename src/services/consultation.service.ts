/**
 * Consultation Service
 * API endpoints:
 * - GET /consultations/doctors
 * - GET /consultations/doctors/:id
 * - POST /consultations/appointments
 * - GET /consultations/appointments/:userId
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
      ? `/consultations/doctors?specialty=${encodeURIComponent(specialty)}`
      : "/consultations/doctors";
    return await apiClient.get<Doctor[]>(endpoint);
  },

  async getDoctorById(doctorId: string): Promise<Doctor> {
    return await apiClient.get<Doctor>(`/consultations/doctors/${doctorId}`);
  },

  async getAvailableSlots(doctorId: string, date: string): Promise<TimeSlot[]> {
    return await apiClient.get<TimeSlot[]>(
      `/consultations/doctors/${doctorId}/slots?date=${date}`
    );
  },

  async bookAppointment(booking: AppointmentBooking): Promise<Appointment> {
    return await apiClient.post<Appointment>(
      "/consultations/appointments",
      booking
    );
  },

  async getUserAppointments(userId: string): Promise<Appointment[]> {
    return await apiClient.get<Appointment[]>(
      `/consultations/appointments/${userId}`
    );
  },

  async cancelAppointment(appointmentId: string): Promise<void> {
    await apiClient.delete(`/consultations/appointments/${appointmentId}`);
  },

  async rescheduleAppointment(
    appointmentId: string,
    newDate: string,
    newTime: string
  ): Promise<Appointment> {
    return await apiClient.patch<Appointment>(
      `/consultations/appointments/${appointmentId}`,
      {
        date: newDate,
        time: newTime,
      }
    );
  },
};
