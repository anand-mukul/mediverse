import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

const CTASection = () => {
  const benefits = [
    "AI-powered diagnostic tools",
    "24/7 virtual consultations",
    "Secure health data management",
    "IoT device integration",
    "Real-time health monitoring",
    "Global specialist network",
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-8 md:p-12 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 backdrop-blur-sm rounded-3xl border border-blue-500/20">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Ready to Transform Healthcare?
                </span>
              </h2>
              <p className="text-lg text-slate-300 mb-8">
                Join thousands of healthcare providers and patients experiencing
                the future of medicine
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div>
                <h3 className="text-xl font-semibold text-white mb-6">
                  What You Get
                </h3>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-900/50 p-6 rounded-xl border border-blue-500/20">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Start Today
                </h3>
                <p className="text-slate-300 mb-6">
                  Begin your journey with a free trial. No credit card required.
                </p>
                <div className="space-y-4">
                  <Button
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-6 text-lg"
                    asChild
                  >
                    <Link href="/signup">Start Free Trial</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-blue-400 text-blue-300 hover:bg-blue-500/10 py-6 text-lg"
                    asChild
                  >
                    <Link href="/demo">Schedule Enterprise Demo</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-slate-400">
                No setup fees • Cancel anytime • HIPAA compliant
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
