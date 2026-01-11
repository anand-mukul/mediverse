"use client"

import { useEffect, useState, useCallback } from "react"
import { authService } from "@/services/auth.service"
import type { User } from "@/types/api"

interface UseAuthReturn {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string, phone?: string) => Promise<void>
  logout: () => Promise<void>
  error: string | null
  clearError: () => void
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Verify auth on mount
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        setIsLoading(true)
        const verified = await authService.verifyToken()
        if (verified) {
          const currentUser = authService.getStoredUser()
          setUser(currentUser)
        }
      } catch (err) {
        console.error("Auth verification failed:", err)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    verifyAuth()
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    try {
      setError(null)
      setIsLoading(true)
      const response = await authService.login({ email, password })
      setUser(response.user)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed"
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const register = useCallback(async (email: string, password: string, name: string, phone?: string) => {
    try {
      setError(null)
      setIsLoading(true)
      const response = await authService.register({ email, password, name, phone })
      setUser(response.user)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Registration failed"
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      setError(null)
      setIsLoading(true)
      await authService.logout()
      setUser(null)
    } catch (err) {
      console.error("Logout error:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    error,
    clearError,
  }
}
