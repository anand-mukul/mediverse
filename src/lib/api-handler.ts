"use client";

import { toast } from "sonner";

/**
 * Centralized API error handler for consistent error management across the application
 */
export class APIError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public originalError?: Error
  ) {
    super(message);
    this.name = "APIError";
  }
}

/**
 * Handle API responses with consistent error handling
 */
export async function handleAPIResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}`;

    try {
      const data = await response.json();
      errorMessage = data.detail || data.message || errorMessage;
    } catch {
      const text = await response.text();
      if (text) errorMessage = text;
    }

    throw new APIError(response.status, errorMessage);
  }

  try {
    return await response.json();
  } catch {
    return {} as T;
  }
}

/**
 * Fetch wrapper with error handling and logging
 */
export async function apiFetch<T>(
  url: string,
  options: RequestInit = {},
  showToast = true
): Promise<T> {
  try {
    console.log(`[API] ${options.method || "GET"} ${url}`);

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    const data = await handleAPIResponse<T>(response);
    console.log(`[API] Success: ${url}`, data);
    return data;
  } catch (error) {
    const apiError =
      error instanceof APIError
        ? error
        : new APIError(
            500,
            error instanceof Error ? error.message : "Unknown error"
          );

    console.error(`[API] Error: ${url}`, apiError);

    if (showToast) {
      toast.error("Error", {
        description: apiError.message,
      });
    }

    throw apiError;
  }
}

/**
 * Retry logic for failed requests
 */
export async function apiFetchWithRetry<T>(
  url: string,
  options: RequestInit = {},
  maxRetries = 3,
  delay = 1000
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await apiFetch<T>(url, options, i === maxRetries - 1);
    } catch (error) {
      if (i < maxRetries - 1) {
        console.log(`[API] Retrying ${url} (attempt ${i + 2}/${maxRetries})`);
        await new Promise((resolve) =>
          setTimeout(resolve, delay * Math.pow(2, i))
        );
      } else {
        throw error;
      }
    }
  }

  throw new APIError(500, "Max retries exceeded");
}
