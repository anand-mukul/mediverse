"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { authService } from "@/services/auth.service"
import LoadingDashboard from "@/components/dashboard/LoadingDashboard"

// Note: Metadata doesn't work in client components
const metadata = {
  title: "MediVerse - Dashboard",
  description: "Your personalized healthcare dashboard",
}

export default function SecureLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const verified = await authService.verifyToken()

        if (verified) {
          setIsAuthenticated(true)
        } else {
          // Redirect to login if not authenticated
          router.push("/login")
        }
      } catch (error) {
        console.error("Auth verification failed:", error)
        router.push("/login")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  // Show loading state while verifying auth
  if (isLoading) {
    return <LoadingDashboard />
  }

  // Render children only if authenticated
  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
