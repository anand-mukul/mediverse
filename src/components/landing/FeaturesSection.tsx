import { Zap, Shield, Bot, Brain, Clock, Users } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Zap,
      title: "Real-time Voice Commands",
      description:
        "Control your health ecosystem with natural voice commands. Book appointments and get instant advice.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Shield,
      title: "Emergency Response",
      description:
        "Instant emergency alerts with automated hospital connection and location sharing.",
      gradient: "from-red-500 to-orange-500",
    },
    {
      icon: Bot,
      title: "IoT Care Bots",
      description:
        "Smart home health bots that deliver medicines and monitor vitals.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Brain,
      title: "AI Diagnostics",
      description:
        "Lightning-fast medical analysis powered by advanced AI models.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Clock,
      title: "24/7 Monitoring",
      description:
        "Continuous health monitoring with real-time alerts and insights.",
      gradient: "from-yellow-500 to-amber-500",
    },
    {
      icon: Users,
      title: "Expert Network",
      description:
        "Access to a global network of healthcare specialists and professionals.",
      gradient: "from-indigo-500 to-purple-500",
    },
  ];

  return (
    <section className="py-20 bg-slate-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Revolutionary Healthcare Features
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Combining cutting-edge technology with medical expertise for better
            health outcomes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-6 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 hover:scale-[1.02]"
            >
              <div
                className={`mb-4 inline-flex p-3 bg-gradient-to-br ${feature.gradient} rounded-xl`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Integration Logos */}
        <div className="mt-20">
          <p className="text-center text-slate-400 mb-8">
            Trusted by leading healthcare institutions
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-center">
            {[
              "Hospital A",
              "Clinic B",
              "Lab C",
              "Pharma D",
              "Institute E",
              "Network F",
            ].map((name, index) => (
              <div
                key={index}
                className="text-center p-4 rounded-xl bg-slate-800/20 border border-slate-700/50"
              >
                <div className="text-sm font-medium text-slate-300">{name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
