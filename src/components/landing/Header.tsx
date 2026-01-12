/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  Stethoscope,
  Pill,
  Search,
  ChevronDown,
  Menu,
  X,
  Heart,
  Sparkles,
  Moon,
  Sun,
  LogIn,
  LogOut,
  User,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { authService } from "@/services/auth.service"
import { toast } from "sonner"

interface NavLinkProps {
  href: string
  children: React.ReactNode
}

interface MobileNavLinkProps extends NavLinkProps {
  onClick?: () => void
}

const Header = () => {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<any>(null)
  const { theme, setTheme } = useTheme()

  const services = [
    { name: "Consultation", icon: Stethoscope, href: "/consultation" },
    { name: "Pharmacy", icon: Pill, href: "/pharmacy" },
    { name: "Diagnostics", icon: Search, href: "/diagnostics" },
  ]

  useEffect(() => {
    const checkAuth = () => {
      const token = authService.getStoredToken()
      const storedUser = authService.getStoredUser()
      setIsAuthenticated(!!token)
      setUser(storedUser)
    }

    checkAuth()
    window.addEventListener("storage", checkAuth)
    return () => window.removeEventListener("storage", checkAuth)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleLogout = async () => {
    try {
      await authService.logout()
      setIsAuthenticated(false)
      setUser(null)
      toast.success("Logged out successfully")
      router.push("/")
    } catch (error) {
      toast.error("Logout failed")
    }
  }

  return (
    <header
      className={`fixed top-0 z-50 w-full backdrop-blur-xl transition-all duration-500
        ${
          scrolled
            ? "bg-white/80 border-b border-slate-200 shadow-lg shadow-cyan-500/10 dark:bg-slate-900/80 dark:border-slate-800 dark:shadow-cyan-500/5"
            : "bg-transparent border-transparent"
        }
      `}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-12 w-12">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 opacity-0 blur-lg transition group-hover:opacity-100" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700" />
              <div className="absolute inset-[2px] flex items-center justify-center rounded-lg bg-white dark:bg-slate-900">
                <Stethoscope className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
              </div>
            </div>

            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                MediVerse
              </h1>
              <p className="flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-400">
                <Sparkles className="h-3 w-3" />
                Intelligent Healthcare
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink href="/dashboard">Dashboard</NavLink>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 rounded-xl px-4 py-2 font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/50 dark:hover:text-white">
                  Services <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56 rounded-2xl border border-slate-200 bg-white/95 p-2 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/95">
                {services.map((s) => (
                  <DropdownMenuItem key={s.name} asChild>
                    <Link
                      href={s.href}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/50 dark:hover:text-white"
                    >
                      <s.icon className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                      {s.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <NavLink href="/voice">AI Assistant</NavLink>
            <NavLink href="/iot">IoT Control</NavLink>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="ml-2 rounded-xl cursor-pointer bg-slate-100 p-2.5 transition hover:scale-105 dark:bg-slate-800"
            >
              <Sun className="h-5 w-5 text-amber-400 dark:hidden" />
              <Moon className="hidden h-5 w-5 text-slate-300 dark:block" />
            </button>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-2 gap-2 rounded-xl cursor-pointer bg-transparent">
                    <User className="h-4 w-4" />
                    {user?.name || "User"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 rounded-xl">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={() => router.push("/login")}
                variant="outline"
                className="ml-2 gap-2 rounded-xl cursor-pointer"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Button>
            )}

            {/* Emergency */}
            <Button className="ml-2 rounded-xl cursor-pointer bg-gradient-to-r from-red-500 to-rose-600 px-6 text-white shadow-lg transition hover:scale-105">
              <Heart className="mr-2 h-4 w-4 animate-pulse" />
              Emergency
            </Button>
          </nav>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-xl cursor-pointer bg-slate-100 p-2 dark:bg-slate-800"
            >
              <Sun className="h-5 w-5 text-amber-400 dark:hidden" />
              <Moon className="hidden h-5 w-5 text-slate-300 dark:block" />
            </button>

            <button onClick={() => setIsMenuOpen((p) => !p)} className="rounded-xl bg-slate-100 p-2 dark:bg-slate-800">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            isMenuOpen ? "max-h-[600px] opacity-100 pb-6" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pt-4 space-y-2">
            <MobileNavLink href="/dashboard" onClick={() => setIsMenuOpen(false)}>
              Dashboard
            </MobileNavLink>

            {services.map((s) => (
              <MobileNavLink key={s.name} href={s.href} onClick={() => setIsMenuOpen(false)}>
                {s.name}
              </MobileNavLink>
            ))}

            <MobileNavLink href="/voice" onClick={() => setIsMenuOpen(false)}>
              AI Assistant
            </MobileNavLink>

            <MobileNavLink href="/iot" onClick={() => setIsMenuOpen(false)}>
              IoT Control
            </MobileNavLink>

            {isAuthenticated ? (
              <>
                <div className="px-4 py-2 text-sm text-slate-600 dark:text-slate-400">{user?.name || "User"}</div>
                <button
                  onClick={() => {
                    handleLogout()
                    setIsMenuOpen(false)
                  }}
                  className="w-full text-left block rounded-xl px-4 py-3 font-medium text-destructive transition hover:bg-slate-100 dark:hover:bg-slate-800/50"
                >
                  <LogOut className="h-4 w-4 inline mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  router.push("/login")
                  setIsMenuOpen(false)
                }}
                className="w-full text-left block rounded-xl px-4 py-3 font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/50 dark:hover:text-white"
              >
                <LogIn className="h-4 w-4 inline mr-2" />
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

const NavLink = ({ href, children }: NavLinkProps) => (
  <Link
    href={href}
    className="group relative rounded-xl px-4 py-2 font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
  >
    {children}
    <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-cyan-600 transition-all group-hover:w-3/4 dark:bg-cyan-400" />
  </Link>
)

const MobileNavLink = ({ href, children, onClick }: MobileNavLinkProps) => (
  <Link
    href={href}
    onClick={onClick}
    className="block rounded-xl px-4 py-3 font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/50 dark:hover:text-white"
  >
    {children}
  </Link>
)

export default Header
