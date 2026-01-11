"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { authService } from "@/services/auth.service"
import { toast } from "sonner"
import { Loader2, AlertCircle } from "lucide-react"
import { getErrorMessage } from "@/lib/error-handler"

export default function SignupForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  })

  const validateForm = (): string | null => {
    if (!formData.name || !formData.email || !formData.password) {
      return "Please fill in all required fields"
    }

    if (!formData.email.includes("@")) {
      return "Please enter a valid email"
    }

    if (formData.password.length < 8) {
      return "Password must be at least 8 characters long"
    }

    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match"
    }

    // Check password strength
    if (!/[A-Z]/.test(formData.password)) {
      return "Password must contain at least one uppercase letter"
    }

    if (!/[a-z]/.test(formData.password)) {
      return "Password must contain at least one lowercase letter"
    }

    if (!/\d/.test(formData.password)) {
      return "Password must contain at least one digit"
    }

    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setIsLoading(true)

    try {
      await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone || undefined,
      })
      toast.success("Account created successfully!")
      router.push("/dashboard")
    } catch (err) {
      const message = getErrorMessage(err)
      setError(message)
      toast.error(message)
      console.error("Registration error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Fill in your details to get started</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 flex gap-2 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
            <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone (Optional)</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password *</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              disabled={isLoading}
              required
              minLength={8}
            />
            <p className="text-xs text-muted-foreground">At least 8 characters, 1 uppercase, 1 lowercase, 1 digit</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password *</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              disabled={isLoading}
              required
              minLength={8}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
