"use client";

import { authService } from "@/services/auth.service";

export function isAuthenticated(): boolean {
  const user = authService.getStoredUser();
  return !!user;
}

export function requireAuth() {
  const user = authService.getStoredUser();
  if (!user) {
    throw new Error("Not authenticated");
  }
  return user;
}

export function isTokenExpired(token: string): boolean {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return true;

    const payload = JSON.parse(atob(parts[1]));
    if (!payload.exp) return false;

    return Date.now() >= payload.exp * 1000;
  } catch {
    return true;
  }
}
