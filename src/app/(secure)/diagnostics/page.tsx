"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import DiagnosticsHeader from "@/components/diagnostics/DiagnosticsHeader";
import DisclaimerBanner from "@/components/diagnostics/DisclaimerBanner";
import SymptomAnalyzer from "@/components/diagnostics/SymptomAnalyzer";
import AnalysisResults from "@/components/diagnostics/AnalysisResults";
import SymptomHistory from "@/components/diagnostics/SymptomHistory";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { diagnosticsService } from "@/services/diagnostics.service";
import { authService } from "@/services/auth.service";

interface ExtendedSymptomAnalysis {
  id: string;
  symptoms: string;
  timestamp: Date;
  analysis: {
    possibleConditions: Array<{
      condition: string;
      probability: "high" | "medium" | "low";
      confidence: number;
      description: string;
    }>;
    urgency: "emergency" | "urgent" | "routine" | "monitor";
    recommendations: string[];
    nextSteps: string[];
    disclaimer: string;
  };
}

export default function DiagnosticsPage() {
  const router = useRouter();
  const [symptoms, setSymptoms] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] =
    useState<ExtendedSymptomAnalysis | null>(null);
  const [analysisHistory, setAnalysisHistory] = useState<
    ExtendedSymptomAnalysis[]
  >([]);
  const [loading, setLoading] = useState(true);

  const quickSymptoms = [
    { id: "1", label: "Headache", icon: "🤕", description: "Head pain" },
    { id: "2", label: "Fever", icon: "🤒", description: "High temperature" },
    { id: "3", label: "Cough", icon: "😷", description: "Persistent cough" },
    { id: "4", label: "Fatigue", icon: "😴", description: "Extreme tiredness" },
    { id: "5", label: "Nausea", icon: "🤢", description: "Feeling sick" },
    { id: "6", label: "Body Ache", icon: "💪", description: "Muscle pain" },
  ];

  const fetchAnalysisHistory = useCallback(async () => {
    try {
      setLoading(true);
      const user = authService.getStoredUser();
      if (!user) {
        toast.error("Authentication required");
        router.push("/login");
        return;
      }

      const history = await diagnosticsService.getAnalysisHistory(user.id);
      const transformedHistory: ExtendedSymptomAnalysis[] = history.map(
        (item) => ({
          id: item.id,
          symptoms: Array.isArray(item.symptoms)
            ? item.symptoms.join(", ")
            : item.symptoms,
          timestamp: new Date(item.analyzedAt),
          analysis: {
            possibleConditions: item.possibleConditions.map((cond) => ({
              condition: cond.name,
              probability:
                cond.probability > 0.7
                  ? ("high" as const)
                  : cond.probability > 0.4
                  ? ("medium" as const)
                  : ("low" as const),
              confidence: cond.probability,
              description: cond.description,
            })),
            urgency:
              item.urgencyLevel === "critical"
                ? ("emergency" as const)
                : item.urgencyLevel === "high"
                ? ("urgent" as const)
                : item.urgencyLevel === "medium"
                ? ("routine" as const)
                : ("monitor" as const),
            recommendations: item.recommendations,
            nextSteps: [
              "Consult with a healthcare professional",
              "Monitor symptoms",
              "Follow recommendations",
            ],
            disclaimer:
              "This is an AI-generated assessment and not a substitute for professional medical advice.",
          },
        })
      );
      setAnalysisHistory(transformedHistory);
    } catch (error) {
      console.error("[v0] History fetch error:", error);
      toast.error("Failed to load analysis history");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchAnalysisHistory();
  }, [fetchAnalysisHistory]);

  const analyzeSymptoms = async () => {
    if (symptoms.trim().length === 0) {
      toast.error("Please describe your symptoms");
      return;
    }

    const user = authService.getStoredUser();
    if (!user) {
      toast.error("Please login to analyze symptoms");
      router.push("/login");
      return;
    }

    setIsAnalyzing(true);
    toast.loading("Analyzing your symptoms...", {
      description: "AI is processing your health information",
    });

    try {
      const analysis = await diagnosticsService.analyzeSymptoms(
        symptoms,
        user.id
      );

      const transformedAnalysis: ExtendedSymptomAnalysis = {
        id: analysis.id,
        symptoms: Array.isArray(analysis.symptoms)
          ? analysis.symptoms.join(", ")
          : symptoms,
        timestamp: new Date(analysis.analyzedAt),
        analysis: {
          possibleConditions: analysis.possibleConditions.map((cond) => ({
            condition: cond.name,
            probability:
              cond.probability > 0.7
                ? ("high" as const)
                : cond.probability > 0.4
                ? ("medium" as const)
                : ("low" as const),
            confidence: cond.probability,
            description: cond.description,
          })),
          urgency:
            analysis.urgencyLevel === "critical"
              ? ("emergency" as const)
              : analysis.urgencyLevel === "high"
              ? ("urgent" as const)
              : analysis.urgencyLevel === "medium"
              ? ("routine" as const)
              : ("monitor" as const),
          recommendations: analysis.recommendations,
          nextSteps: [
            "Consult with a healthcare professional",
            "Monitor symptoms",
            "Follow recommendations",
          ],
          disclaimer:
            "This is an AI-generated assessment and not a substitute for professional medical advice.",
        },
      };

      setCurrentAnalysis(transformedAnalysis);
      setAnalysisHistory((prev) => [transformedAnalysis, ...prev]);

      toast.dismiss();
      toast.success("Analysis complete!", {
        description: "Preliminary assessment ready for review",
      });

      // Alert if urgent or emergency
      if (
        transformedAnalysis.analysis.urgency === "emergency" ||
        transformedAnalysis.analysis.urgency === "urgent"
      ) {
        toast.error("URGENT: Seek immediate medical attention", {
          description: "Your symptoms require urgent evaluation",
          duration: 10000,
        });
      }
    } catch (error) {
      console.error("[v0] Analysis error:", error);
      toast.dismiss();
      toast.error("Analysis failed", {
        description:
          error instanceof Error ? error.message : "Please try again",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleEmergency = () => {
    toast.error("EMERGENCY ALERT", {
      description: "Redirecting to emergency services...",
      duration: 5000,
    });
    router.push("/emergency");
  };

  const clearAnalysis = () => {
    setCurrentAnalysis(null);
    setSymptoms("");
    toast.info("Analysis cleared");
  };

  const handleQuickSymptomSelect = (symptom: {
    id: string;
    label: string;
    icon: string;
    description: string;
  }) => {
    const symptomText = symptoms.trim()
      ? `${symptoms}\n${symptom.label}: ${symptom.description}`
      : `${symptom.label}: ${symptom.description}`;
    setSymptoms(symptomText);
  };

  return (
    <div className="min-h-screen bg-background">
      <DiagnosticsHeader onEmergency={handleEmergency} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DisclaimerBanner />

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mt-8">
          <div className="lg:col-span-2 space-y-6">
            <SymptomAnalyzer
              symptoms={symptoms}
              isAnalyzing={isAnalyzing}
              quickSymptoms={quickSymptoms}
              onSymptomsChange={setSymptoms}
              onAnalyze={analyzeSymptoms}
              onQuickSymptomSelect={handleQuickSymptomSelect}
            />

            {currentAnalysis && (
              <AnalysisResults
                analysis={currentAnalysis}
                onClear={clearAnalysis}
                onBookConsultation={() => router.push("/consultation")}
              />
            )}
          </div>

          <div className="space-y-6">
            {loading ? (
              <div className="flex justify-center py-12">
                <LoadingSpinner size="lg" label="Loading history..." />
              </div>
            ) : (
              <SymptomHistory
                history={analysisHistory}
                onSelectAnalysis={setCurrentAnalysis}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
