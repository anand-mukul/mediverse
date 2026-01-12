"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Stethoscope,
  Activity,
  Zap,
  ChevronRight,
  Sparkles,
  ArrowRight,
} from "lucide-react";

type Particle = {
  left: string;
  top: string;
  duration: string;
  delay: string;
};

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isVisible, setIsVisible] = useState(false);

  const fullText = "MediVerse";

  useEffect(() => {
    setIsVisible(true);
    let index = 0;

    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();

      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    particlesRef.current = Array.from({ length: 20 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: `${5 + Math.random() * 10}s`,
      delay: `${Math.random() * 5}s`,
    }));
  }, []);

  /* ---------------- DATA ---------------- */

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Diagnostics",
      description: "Advanced ML algorithms for accurate preliminary diagnoses.",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      icon: Stethoscope,
      title: "Global Health Network",
      description: "Connect with healthcare professionals worldwide.",
      gradient: "from-blue-500 to-purple-500",
    },
    {
      icon: Activity,
      title: "Health Intelligence",
      description: "Predictive analytics for proactive wellness.",
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  const stats = [
    { value: "98.5%", label: "Diagnostic Accuracy" },
    { value: "24/7", label: "AI Support" },
    { value: "50K+", label: "Patients Served" },
    { value: "1M+", label: "Data Points Analyzed" },
  ];

  /* ---------------- RENDER ---------------- */

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900"
    >
      {/* Mouse-follow glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%,
            rgba(6,182,212,0.2),
            transparent 50%)`,
        }}
      />

      {/* Floating particles */}
      {particlesRef.current.map((p, i) => (
        <div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-cyan-400/30"
          style={{
            left: p.left,
            top: p.top,
            animation: `float ${p.duration} ease-in-out infinite`,
            animationDelay: p.delay,
          }}
        />
      ))}

      <div className="container relative z-10 mx-auto max-w-6xl px-6 py-24">
        {/* Hero text */}
        <div
          className={`mb-16 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 backdrop-blur">
            <Sparkles className="h-4 w-4 text-cyan-500" />
            <span className="text-sm font-medium text-cyan-500">
              AI-Powered Healthcare Platform
            </span>
          </div>

          <h1 className="mb-6 text-6xl font-bold md:text-7xl lg:text-8xl">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              {displayText}
            </span>
            {isTyping && (
              <span className="ml-1 animate-pulse text-cyan-400">|</span>
            )}
          </h1>

          <p className="mb-4 text-3xl font-bold text-slate-800 dark:text-slate-100">
            Innovate. Evolve. Cure.
          </p>

          <p className="mx-auto max-w-3xl text-xl text-slate-600 dark:text-slate-400">
            Where Medical Excellence Meets the Universe of Possibilities
          </p>
        </div>

        {/* Features */}
        <div className="mb-16 grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-3xl border border-slate-200 bg-white/70 p-8 backdrop-blur-xl transition-all hover:-translate-y-2 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900/60"
            >
              <div
                className={`mb-6 inline-flex rounded-2xl bg-gradient-to-br ${f.gradient} p-4`}
              >
                <f.icon className="h-8 w-8 text-white" />
              </div>

              <h3 className="mb-3 text-xl font-bold text-slate-800 dark:text-slate-100">
                {f.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                {f.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mb-20 flex flex-col justify-center gap-4 sm:flex-row">
          <Button className="rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 px-8 py-7 text-lg text-white shadow-xl transition hover:scale-105">
            <Zap className="mr-2 h-5 w-5" />
            Get Started Free
            <ChevronRight className="ml-1 h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            className="rounded-2xl border-cyan-500/50 px-8 py-7 text-lg text-cyan-500 hover:bg-cyan-500/10"
          >
            Schedule a Demo
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-4xl font-bold text-transparent">
                {s.value}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
