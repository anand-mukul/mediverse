import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram, Heart } from "lucide-react";

const Footer = () => {
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
    <footer className="border-t border-blue-500/20 bg-slate-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">MediVerse.AI</h3>
                <p className="text-sm text-slate-400">
                  Intelligent Healthcare Ecosystem
                </p>
              </div>
            </div>
            <p className="text-slate-300 mb-6 max-w-md">
              Transforming healthcare through artificial intelligence and
              innovative technology for better patient outcomes.
            </p>
            <div className="flex space-x-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2 bg-slate-800/50 rounded-lg hover:bg-blue-500/10 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-slate-300 hover:text-blue-400" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-lg font-semibold text-white mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-slate-400 hover:text-blue-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} MediVerse.AI. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <span className="text-sm text-slate-400 flex items-center">
                <Heart className="w-4 h-4 text-red-400 mr-2" />
                Made for better healthcare
              </span>
              <span className="text-sm text-green-400 px-3 py-1 bg-green-400/10 rounded-full">
                HIPAA Compliant
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
