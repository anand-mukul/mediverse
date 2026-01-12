"use client";

import { useState } from "react";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Heart,
  ArrowRight,
  Stethoscope,
} from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const links = {
    Product: [
      { name: "AI Diagnostics", href: "/diagnostics" },
      { name: "Virtual Consultations", href: "/consultation" },
      { name: "Health Monitoring", href: "/monitoring" },
      { name: "Pharmacy Integration", href: "/pharmacy" },
    ],
    Company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Blog", href: "/blog" },
      { name: "Press", href: "/press" },
    ],
    Resources: [
      { name: "Documentation", href: "/docs" },
      { name: "API Reference", href: "/api" },
      { name: "Support", href: "/support" },
      { name: "Community", href: "/community" },
    ],
    Legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "HIPAA Compliance", href: "/hipaa" },
      { name: "Security", href: "/security" },
    ],
  };

  const socials = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  return (
    <footer
      className="relative overflow-hidden border-t border-slate-200 bg-gradient-to-b from-slate-50 to-white
                       dark:border-slate-800 dark:from-slate-950 dark:to-slate-900"
    >
      <div className="container relative z-10 mx-auto px-6 py-16">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-2xl font-bold text-transparent">
                  MediVerse
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Intelligent Healthcare Ecosystem
                </p>
              </div>
            </div>

            <p className="mb-6 max-w-md text-slate-600 dark:text-slate-400">
              Transforming healthcare through artificial intelligence and
              innovative technology.
            </p>

            {/* Newsletter – FIXED UX */}
            <div
              className="mb-6 flex h-12 overflow-hidden rounded-xl border border-slate-300 bg-white
                            focus-within:ring-2 focus-within:ring-cyan-500
                            dark:border-slate-700 dark:bg-slate-800/50"
            >
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-transparent px-4 text-sm text-slate-900 outline-none
                           dark:text-white"
              />
              <button
                aria-label="Subscribe"
                className="flex cursor-pointer h-12 w-12 items-center justify-center bg-gradient-to-r
                           from-cyan-500 to-blue-500 text-white transition hover:opacity-90"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            {/* Socials */}
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="rounded-xl bg-slate-100 p-3 transition hover:scale-105
                             dark:bg-slate-800/50"
                >
                  <s.icon className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="mb-6 text-lg font-bold text-slate-900 dark:text-slate-100">
                {category}
              </h4>
              <ul className="space-y-3">
                {items.map((item, index) => {
                  const key = `${category}-${index}`;
                  return (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        onMouseEnter={() => setHoveredLink(key)}
                        onMouseLeave={() => setHoveredLink(null)}
                        className={`transition
                          ${
                            hoveredLink === key
                              ? "translate-x-2 text-cyan-500"
                              : "text-slate-600 dark:text-slate-400"
                          }`}
                      >
                        {item.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div
          className="flex flex-col items-center justify-between gap-6 border-t border-slate-200 pt-6
                        dark:border-slate-800 md:flex-row"
        >
          <p className="text-sm text-slate-600 dark:text-slate-400">
            © {new Date().getFullYear()} MediVerse. All rights reserved.
          </p>

          <span className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
            <Heart className="h-4 w-4 animate-pulse text-red-500" />
            Made for better healthcare
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
