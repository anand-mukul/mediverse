/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ApiError } from "./api-client"

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode = 400,
    public details?: unknown,
  ) {
    super(message)
    this.name = "AppError"
  }
}

export function handleApiError(error: unknown): string {
  if (error instanceof AppError) {
    return error.message
  }

  if (error instanceof Error) {
    // Check if it's a JSON error
    if ("statusCode" in error) {
      const apiError = error as ApiError
      return apiError.message || "An error occurred"
    }
    return error.message || "An unexpected error occurred"
  }

  return "An unexpected error occurred"
}

export function isUnauthorizedError(error: unknown): boolean {
  if (error instanceof AppError) {
    return error.statusCode === 401 || error.statusCode === 403
  }
  if ("statusCode" in (error as any)) {
    return (error as any).statusCode === 401 || (error as any).statusCode === 403
  }
  return false
}

export function isNetworkError(error: unknown): boolean {
  if (error instanceof Error) {
    return (
      error.message.includes("Network") || error.message.includes("Failed to fetch") || error.message.includes("CORS")
    )
  }
  return false
}

export function isServerError(error: unknown): boolean {
  if ("statusCode" in (error as any)) {
    return (error as any).statusCode >= 500
  }
  return false
}

export function getErrorMessage(error: unknown): string {
  if (isNetworkError(error)) {
    return "Network connection error. Please check your internet connection."
  }
  if (isServerError(error)) {
    return "Server error. Please try again later."
  }
  if (isUnauthorizedError(error)) {
    return "Your session has expired. Please log in again."
  }
  return handleApiError(error)
}
