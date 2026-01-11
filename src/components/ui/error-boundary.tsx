"use client"

import type React from "react"
import { Component, type ReactNode } from "react"
import { AlertCircle } from "lucide-react"
import { Button } from "./button"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo)
  }

  reset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex min-h-screen items-center justify-center px-4">
            <div className="w-full max-w-md space-y-4 rounded-lg border border-destructive bg-destructive/10 p-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-6 w-6 text-destructive" />
                <h2 className="text-lg font-semibold">Something went wrong</h2>
              </div>
              <p className="text-sm text-muted-foreground">{this.state.error?.message}</p>
              <Button onClick={this.reset} className="w-full">
                Try again
              </Button>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}
