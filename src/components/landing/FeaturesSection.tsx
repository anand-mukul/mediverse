"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Zap,
  Shield,
  Bot,
  Brain,
  Clock,
  Users,
  ArrowRight,
  CheckCircle2,
  Star,
} from "lucide-react";

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function FeaturesSection() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const features = useMemo(
    () => [
      {
        icon: Zap,
        title: "Real-time Voice Commands",
        description:
          "Control your health ecosystem with natural voice commands.",
        gradient: "from-cyan-500 to-blue-500",
        stats: "99.9% Accuracy",
      },
      {
        icon: Shield,
        title: "Emergency Response",
        description:
          "Instant emergency alerts with automated hospital connection.",
        gradient: "from-red-500 to-rose-500",
        stats: "< 30s Response",
      },
      {
        icon: Bot,
        title: "IoT Care Bots",
        description:
          "Smart home health bots that deliver medicines and monitor vitals.",
        gradient: "from-purple-500 to-pink-500",
        stats: "24/7 Active",
      },
      {
        icon: Brain,
        title: "AI Diagnostics",
        description: "Lightning-fast medical analysis powered by advanced AI.",
        gradient: "from-blue-500 to-indigo-500",
        stats: "98.5% Precision",
      },
      {
        icon: Clock,
        title: "24/7 Monitoring",
        description: "Continuous health monitoring with real-time alerts.",
        gradient: "from-amber-500 to-orange-500",
        stats: "Real-time Data",
      },
      {
        icon: Users,
        title: "Expert Network",
        description: "Access to a global network of healthcare specialists.",
        gradient: "from-emerald-500 to-teal-500",
        stats: "10K+ Experts",
      },
    ],
    []
  );

  const partners = [
    "Johns Hopkins",
    "Mayo Clinic",
    "Cleveland",
    "Mass General",
    "Stanford Med",
    "UCLA Health",
  ];

  useEffect(() => {
    const handler = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });

    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <section className="relative overflow-hidden bg-neutral-50 py-32 text-neutral-900 transition-colors dark:bg-neutral-950 dark:text-white">
      {/* Mouse glow */}
      <motion.div
        className="pointer-events-none absolute h-[500px] w-[500px] rounded-full blur-3xl opacity-20
                   bg-gradient-to-br from-cyan-400 to-indigo-500
                   dark:from-cyan-400 dark:to-purple-600"
        animate={{ x: mouse.x - 250, y: mouse.y - 250 }}
        transition={{ type: "spring", damping: 30, stiffness: 120 }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-20 text-center">
          <h2 className="mb-6 text-5xl font-bold">
            Revolutionary{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Healthcare Features
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-neutral-600 dark:text-neutral-400">
            Cutting-edge technology combined with medical expertise
          </p>
        </div>

        {/* Features */}
        <motion.div
          className="mb-24 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="rounded-3xl border border-neutral-200 bg-white p-8 backdrop-blur-xl transition-shadow
                         hover:shadow-xl
                         dark:border-white/10 dark:bg-white/5 dark:hover:shadow-cyan-500/20"
            >
              <div
                className={`mb-6 inline-flex rounded-2xl bg-gradient-to-br ${f.gradient} p-4`}
              >
                <f.icon className="h-7 w-7 text-white" />
              </div>

              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-500 dark:text-cyan-400">
                <CheckCircle2 className="h-3 w-3" />
                {f.stats}
              </div>

              <h3 className="mb-4 text-2xl font-bold">{f.title}</h3>

              <p className="mb-6 text-neutral-600 dark:text-neutral-400">
                {f.description}
              </p>

              <button className="inline-flex items-center gap-2 font-semibold text-cyan-500 transition-all hover:gap-3 dark:text-cyan-400">
                Learn More <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Partners */}
        <div className="text-center">
          <p className="mb-4 text-lg font-semibold text-neutral-600 dark:text-neutral-400">
            Trusted by leading institutions
          </p>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {partners.map((name) => (
              <motion.div
                key={name}
                whileHover={{ scale: 1.05 }}
                className="rounded-2xl border border-neutral-200 bg-white p-6 backdrop-blur
                           dark:border-white/10 dark:bg-white/5"
              >
                <div className="mb-2 font-bold">{name}</div>
                <div className="flex justify-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
