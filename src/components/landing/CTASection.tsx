"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Award,
  Clock,
  Shield,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [hoveredBenefit, setHoveredBenefit] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const benefits = [
    { text: "AI-powered diagnostic tools", icon: Sparkles },
    { text: "24/7 virtual consultations", icon: Clock },
    { text: "Secure health data management", icon: Shield },
    { text: "IoT device integration", icon: Zap },
    { text: "Real-time health monitoring", icon: TrendingUp },
    { text: "Global specialist network", icon: Award },
  ];

  const trustBadges = [
    { label: "No setup fees", icon: "💳" },
    { label: "Cancel anytime", icon: "🔄" },
    { label: "HIPAA compliant", icon: "🔒" },
    { label: "256-bit encryption", icon: "🛡️" },
  ];

  /* Intersection observer */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* Mouse tracking */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-32
                 bg-gradient-to-b from-slate-50 via-white to-slate-50
                 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
    >
      {/* Mouse-follow glow */}
      <div
        className="pointer-events-none absolute h-[600px] w-[600px] rounded-full blur-3xl opacity-20
                   bg-gradient-to-br from-cyan-400 via-blue-400 to-purple-500"
        style={{
          left: mousePosition.x - 300,
          top: mousePosition.y - 300,
        }}
      />

      <div className="container relative z-10 mx-auto max-w-6xl px-6">
        {/* Header */}
        <div
          className={`mb-16 text-center transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="mb-6 text-5xl font-bold text-slate-900 dark:text-slate-100">
            Ready to{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Transform Healthcare?
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-xl text-slate-600 dark:text-slate-400">
            Join thousands of healthcare providers using next-gen digital
            medicine
          </p>
        </div>

        {/* Content */}
        <div className="grid gap-12 md:grid-cols-2">
          {/* Benefits */}
          <ul className="space-y-4">
            {benefits.map((b, i) => (
              <li
                key={i}
                onMouseEnter={() => setHoveredBenefit(i)}
                onMouseLeave={() => setHoveredBenefit(null)}
                className={`flex items-center gap-4 rounded-2xl p-4 transition-all
                  ${
                    hoveredBenefit === i
                      ? "translate-x-2 bg-white/70 dark:bg-white/5"
                      : ""
                  }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500">
                  <b.icon className="h-5 w-5 text-white" />
                </div>

                <span className="flex-1 font-medium text-slate-800 dark:text-slate-100">
                  {b.text}
                </span>

                <ArrowRight className="h-5 w-5 text-cyan-500 dark:text-cyan-400" />
              </li>
            ))}
          </ul>

          {/* CTA Card */}
          <div
            className="rounded-3xl border border-slate-200 bg-white/70 p-10 shadow-2xl backdrop-blur-xl
                          dark:border-white/10 dark:bg-white/5"
          >
            <h3 className="mb-4 text-2xl font-bold text-slate-900 dark:text-slate-100">
              Start Your Journey Today
            </h3>

            <p className="mb-8 text-slate-600 dark:text-slate-400">
              Free trial. No credit card. Cancel anytime.
            </p>

            <Button className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 py-7 text-lg text-white">
              Start Free Trial
            </Button>
          </div>
        </div>

        {/* Trust */}
        <div className="mt-16 flex flex-wrap justify-center gap-6">
          {trustBadges.map((b, i) => (
            <div
              key={i}
              className="rounded-full bg-white/70 px-6 py-3 text-slate-600 backdrop-blur-sm
                         dark:bg-white/5 dark:text-slate-400"
            >
              {b.icon} {b.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
