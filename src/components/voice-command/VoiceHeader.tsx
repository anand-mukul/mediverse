/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, AlertTriangle, LogOut, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { authService } from "@/services/auth.service"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function VoiceHeader() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const storedUser = authService.getStoredUser()
    setUser(storedUser)
  }, [])

  const handleLogout = async () => {
    try {
      await authService.logout()
      toast.success("Logged out successfully")
      router.push("/login")
    } catch (error) {
      toast.error("Logout failed")
    }
  }

  const handleEmergency = () => {
    toast.error("Emergency services alerted!", {
      description: "Help is on the way. Stay calm.",
      duration: 10000,
      action: {
        label: "Cancel",
        onClick: () => toast.info("Emergency alert cancelled"),
      },
    })
    router.push("/emergency")
  }

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side */}
          <div className="flex items-center gap-4 cursor-pointer">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="cursor-pointer">
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <div>
              <h1 className="text-2xl font-bold text-foreground">Voice Command Center</h1>
              <p className="text-sm text-muted-foreground">Speak naturally to control your health ecosystem</p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2 cursor-pointer bg-transparent">
                    <User className="h-4 w-4" />
                    {user.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 rounded-xl" align="end">
                  <DropdownMenuItem asChild>
                    <button onClick={() => router.push("/dashboard")} className="w-full cursor-pointer">
                      Dashboard
                    </button>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <Button onClick={handleEmergency} variant="destructive" className="gap-2 cursor-pointer">
              <AlertTriangle className="h-5 w-5" />
              Emergency
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
