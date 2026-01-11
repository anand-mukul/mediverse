/**
 * Authentication Service
 * Handles user authentication, registration, and session management
 */

import { apiClient } from "@/lib/api-client";
import type { User, AuthCredentials, AuthResponse } from "@/types/api";

export const authService = {
  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      "/auth/login",
      credentials
    );

    if (response.token) {
      localStorage.setItem("auth_token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
    }

    return response;
  },

  async register(
    userData: AuthCredentials & { name: string; phone?: string }
  ): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      "/auth/register",
      userData
    );

    if (response.token) {
      localStorage.setItem("auth_token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
    }

    return response;
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post("/auth/logout");
    } finally {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
    }
  },

  async getCurrentUser(): Promise<User> {
    return await apiClient.get<User>("/auth/me");
  },

  async updateProfile(userData: Partial<User>): Promise<User> {
    return await apiClient.patch<User>("/auth/profile", userData);
  },

  getStoredToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("auth_token");
    }
    return null;
  },

  getStoredUser(): User | null {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user");
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  },

  isAuthenticated(): boolean {
    return !!this.getStoredToken();
  },
};
