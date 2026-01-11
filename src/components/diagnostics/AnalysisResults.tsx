"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Stethoscope,
  Calendar,
  FileText,
  TrendingUp,
  CheckCircle,
  Clock,
  Download,
} from "lucide-react";
import { format } from "date-fns";

interface SymptomAnalysis {
  id: string;
  symptoms: string; // Changed from string[] to string to match what's being passed
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

interface AnalysisResultsProps {
  analysis: SymptomAnalysis;
  onClear: () => void;
  onBookConsultation: () => void;
}

export default function AnalysisResults({
  analysis,
  onClear,
  onBookConsultation,
}: AnalysisResultsProps) {
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "emergency":
        return "bg-red-100 text-red-800 border-red-200";
      case "urgent":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "routine":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "monitor":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const getUrgencyLabel = (urgency: string) => {
    switch (urgency) {
      case "emergency":
        return "Emergency - Seek Immediate Care";
      case "urgent":
        return "Urgent - See Doctor Within 24 Hours";
      case "routine":
        return "Routine - Schedule Appointment Soon";
      case "monitor":
        return "Monitor - Watch for Changes";
      default:
        return "Assessment Needed";
    }
  };

  const getProbabilityColor = (probability: string) => {
    switch (probability) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const exportAnalysis = () => {
    // In a real app, this would generate a PDF or download the analysis
    const analysisText = `
AI Symptom Analysis Report
Generated: ${format(analysis.timestamp, "PPP p")}
---
Symptoms: ${analysis.symptoms}
---
Urgency Level: ${getUrgencyLabel(analysis.analysis.urgency)}
---
Possible Conditions:
${analysis.analysis.possibleConditions
  .map(
    (c) =>
      `• ${c.condition} (${c.probability} probability, ${Math.round(
        c.confidence * 100
      )}% confidence)
  ${c.description}`
  )
  .join("\n")}
---
Recommendations:
${analysis.analysis.recommendations.map((r) => `• ${r}`).join("\n")}
---
Next Steps:
${analysis.analysis.nextSteps.map((s) => `• ${s}`).join("\n")}
---
${analysis.analysis.disclaimer}
    `;

    const blob = new Blob([analysisText], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `symptom-analysis-${format(
      analysis.timestamp,
      "yyyy-MM-dd-HH-mm"
    )}.txt`;
    a.click();
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-green-600" />
            Analysis Results
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Clock className="h-4 w-4" />
            {format(analysis.timestamp, "PPP p")}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Urgency Level */}
        <div
          className={`p-4 rounded-xl border ${getUrgencyColor(
            analysis.analysis.urgency
          )}`}
        >
          <div className="flex items-center gap-3">
            <AlertTriangle
              className={`h-6 w-6 ${
                analysis.analysis.urgency === "emergency"
                  ? "text-red-600"
                  : analysis.analysis.urgency === "urgent"
                  ? "text-orange-600"
                  : analysis.analysis.urgency === "routine"
                  ? "text-blue-600"
                  : "text-green-600"
              }`}
            />
            <div>
              <h4 className="font-bold text-lg">Urgency Assessment</h4>
              <p className="text-sm">
                {getUrgencyLabel(analysis.analysis.urgency)}
              </p>
            </div>
          </div>
        </div>

        {/* Symptoms Summary */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
          <h4 className="font-semibold text-slate-900 mb-2">
            Symptoms Analyzed
          </h4>
          <p className="text-slate-700">{analysis.symptoms}</p>
        </div>

        {/* Possible Conditions */}
        <div>
          <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            Possible Conditions (AI Assessment)
          </h4>

          <div className="space-y-4">
            {analysis.analysis.possibleConditions.map((condition, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h5 className="font-bold text-slate-900 text-lg">
                      {condition.condition}
                    </h5>
                    <p className="text-sm text-slate-600 mt-1">
                      {condition.description}
                    </p>
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${getProbabilityColor(
                        condition.probability
                      )}`}
                    >
                      {condition.probability.toUpperCase()} PROBABILITY
                    </span>
                    <div className="text-sm font-bold text-slate-900 mt-1">
                      {Math.round(condition.confidence * 100)}% Confidence
                    </div>
                  </div>
                </div>

                {/* Confidence Bar */}
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      condition.probability === "high"
                        ? "bg-gradient-to-r from-red-500 to-orange-500"
                        : condition.probability === "medium"
                        ? "bg-gradient-to-r from-yellow-500 to-amber-500"
                        : "bg-gradient-to-r from-green-500 to-emerald-500"
                    }`}
                    style={{ width: `${condition.confidence * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              Immediate Recommendations
            </h4>
            <ul className="space-y-2">
              {analysis.analysis.recommendations.map((rec, index) => (
                <li
                  key={index}
                  className="text-sm text-blue-800 flex items-start gap-2"
                >
                  <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  {rec}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-green-50 rounded-xl border border-green-200">
            <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-green-600" />
              Recommended Next Steps
            </h4>
            <ul className="space-y-2">
              {analysis.analysis.nextSteps.map((step, index) => (
                <li
                  key={index}
                  className="text-sm text-green-800 flex items-start gap-2"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
          <Button
            onClick={onBookConsultation}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white gap-2"
          >
            <Calendar className="h-4 w-4" />
            Book Consultation
          </Button>

          <Button
            onClick={exportAnalysis}
            variant="outline"
            className="border-purple-300 text-purple-600 hover:bg-purple-50 hover:text-purple-700 gap-2 bg-transparent"
          >
            <Download className="h-4 w-4" />
            Export Report
          </Button>

          <Button
            onClick={onClear}
            variant="outline"
            className="border-slate-300 text-slate-600 hover:bg-slate-50 hover:text-slate-700 bg-transparent"
          >
            New Analysis
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
