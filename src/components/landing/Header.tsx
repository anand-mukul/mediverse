"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Stethoscope, Pill, Search, ChevronDown, Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const services = [
    { name: "Consultation", icon: Stethoscope, href: "/consultation" },
    { name: "Pharmacy", icon: Pill, href: "/pharmacy" },
    { name: "Diagnostics", icon: Search, href: "/diagnostics" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border backdrop-blur-md bg-background/95 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg" />
              <div className="absolute inset-[2px] bg-background rounded flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                MediVerse
              </h1>
              <p className="text-xs text-muted-foreground">
                Intelligent Healthcare
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/dashboard"
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              Dashboard
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-foreground/80 hover:text-primary hover:bg-primary/10"
                >
                  Services
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 bg-background/95 backdrop-blur-md border border-border">
                {services.map((service) => (
                  <DropdownMenuItem key={service.name} asChild>
                    <Link
                      href={service.href}
                      className="flex items-center space-x-3 cursor-pointer"
                    >
                      <service.icon className="w-4 h-4 text-primary" />
                      <span>{service.name}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/voice"
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              AI Assistant
            </Link>

            <Link
              href="/iot"
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              IoT Control
            </Link>

            <ThemeToggle />

            <Button variant="destructive" size="sm" className="ml-4">
              Emergency
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border mt-2">
            <div className="flex flex-col space-y-3">
              <Link
                href="/dashboard"
                className="text-foreground/80 hover:text-primary px-4 py-2 rounded-lg hover:bg-primary/10"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <div className="px-4 py-2">
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Services
                </p>
                <div className="space-y-2">
                  {services.map((service) => (
                    <Link
                      key={service.name}
                      href={service.href}
                      className="flex items-center space-x-3 text-foreground/80 hover:text-primary px-4 py-2 rounded-lg hover:bg-primary/10"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <service.icon className="w-4 h-4" />
                      <span>{service.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                href="/voice"
                className="text-foreground/80 hover:text-primary px-4 py-2 rounded-lg hover:bg-primary/10"
                onClick={() => setIsMenuOpen(false)}
              >
                AI Assistant
              </Link>
              <Link
                href="/iot"
                className="text-foreground/80 hover:text-primary px-4 py-2 rounded-lg hover:bg-primary/10"
                onClick={() => setIsMenuOpen(false)}
              >
                IoT Control
              </Link>
              <Button
                variant="destructive"
                className="mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Emergency
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
