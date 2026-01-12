/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Authentication Service
 * Handles user authentication, registration, and session management
 */

import { apiClient } from "@/lib/api-client";
import type { User, AuthCredentials, AuthResponse } from "@/types/api";

export const authService = {
  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<any>("/auth/login", credentials);

    const token = response.token || response.access_token;
    const user = response.user || response;

    if (token) {
      localStorage.setItem("auth_token", token);
      localStorage.setItem("user", JSON.stringify(user));
    }

    return {
      token,
      user: user as User,
    };
  },

  async register(
    userData: AuthCredentials & { name: string; phone?: string }
  ): Promise<AuthResponse> {
    const response = await apiClient.post<any>("/auth/register", userData);

    const token = response.token || response.access_token;
    const user = response.user || response;

    if (token) {
      localStorage.setItem("auth_token", token);
      localStorage.setItem("user", JSON.stringify(user));
    }

    return {
      token,
      user: user as User,
    };
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post("/auth/logout");
    } catch (error) {
      // Ignore errors on logout
      console.debug("Logout error (non-critical):", error);
    } finally {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
    }
  },

  async getCurrentUser(): Promise<User> {
    const user = await apiClient.get<User>("/auth/me");
    return user;
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

  getToken(): string | null {
    return this.getStoredToken();
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

  async verifyToken(): Promise<boolean> {
    try {
      const token = this.getStoredToken();
      if (!token) return false;

      await this.getCurrentUser();
      return true;
    } catch (error) {
      this.logout();
      return false;
    }
  },
};
