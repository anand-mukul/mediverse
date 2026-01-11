"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Brain, Stethoscope, Activity, Zap, ChevronRight } from "lucide-react";

const HeroSection = () => {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const fullText = "MediVerse.AI";

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, []);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Diagnostics",
      description:
        "Advanced ML algorithms for accurate preliminary diagnoses and treatment recommendations.",
    },
    {
      icon: Stethoscope,
      title: "Global Health Network",
      description:
        "Connect with healthcare professionals worldwide, breaking geographical barriers.",
    },
    {
      icon: Activity,
      title: "Health Intelligence",
      description:
        "Comprehensive health tracking and predictive analytics for proactive wellness.",
    },
  ];

  return (
    <section className="relative py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Typing Animation */}
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {displayText}
              </span>
              {isTyping && (
                <span className="animate-pulse text-blue-400 ml-1">|</span>
              )}
            </h1>
            <p className="text-xl sm:text-2xl text-slate-300 mb-4">
              Innovate. Evolve. Cure.
            </p>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Where Medical Excellence Meets the Universe of Possibilities
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="mb-4 inline-flex p-3 bg-blue-500/10 rounded-xl">
                  <feature.icon className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-blue-300 mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-6 text-lg"
              asChild
            >
              <Link href="/dashboard">
                <Zap className="w-5 h-5 mr-2" />
                Get Started Free
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-blue-400 text-blue-300 hover:bg-blue-500/10 px-8 py-6 text-lg"
              asChild
            >
              <Link href="/demo">Schedule a Demo</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">98.5%</div>
              <div className="text-sm text-slate-400">Diagnostic Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-sm text-slate-400">AI Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">50K+</div>
              <div className="text-sm text-slate-400">Patients Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">1M+</div>
              <div className="text-sm text-slate-400">Data Points Analyzed</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
