import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white">
      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          <FeaturesSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
