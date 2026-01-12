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
        return "bg-destructive/10 text-destructive border-destructive/30";
      case "urgent":
        return "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30";
      case "routine":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30";
      case "monitor":
        return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30";
      default:
        return "bg-muted text-foreground border-border";
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
        return "bg-destructive/10 text-destructive";
      case "medium":
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400";
      case "low":
        return "bg-green-500/10 text-green-600 dark:text-green-400";
      default:
        return "bg-muted text-foreground";
    }
  };

  const exportAnalysis = () => {
    const timestamp = analysis.timestamp || new Date();
    const safeDate =
      timestamp instanceof Date ? timestamp : new Date(timestamp);

    const analysisText = `
AI Symptom Analysis Report
Generated: ${format(safeDate, "PPP p")}
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
    a.download = `symptom-analysis-${format(safeDate, "yyyy-MM-dd-HH-mm")}.txt`;
    a.click();
  };

  const timestamp = analysis.timestamp || new Date();
  const safeDate = timestamp instanceof Date ? timestamp : new Date(timestamp);

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-green-600" />
            Analysis Results
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {format(safeDate, "PPP p")}
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
                  ? "text-destructive"
                  : analysis.analysis.urgency === "urgent"
                  ? "text-orange-600 dark:text-orange-400"
                  : analysis.analysis.urgency === "routine"
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-green-600 dark:text-green-400"
              }`}
            />
            <div>
              <h4 className="font-bold text-lg text-foreground">
                Urgency Assessment
              </h4>
              <p className="text-sm text-foreground/80">
                {getUrgencyLabel(analysis.analysis.urgency)}
              </p>
            </div>
          </div>
        </div>

        {/* Symptoms Summary */}
        <div className="p-4 bg-muted rounded-xl border border-border">
          <h4 className="font-semibold text-foreground mb-2">
            Symptoms Analyzed
          </h4>
          <p className="text-foreground/80">{analysis.symptoms}</p>
        </div>

        {/* Possible Conditions */}
        <div>
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            Possible Conditions (AI Assessment)
          </h4>

          <div className="space-y-4">
            {analysis.analysis.possibleConditions.map((condition, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h5 className="font-bold text-foreground text-lg">
                      {condition.condition}
                    </h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      {condition.description}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${getProbabilityColor(
                      condition.probability
                    )}`}
                  >
                    {condition.probability.toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div>
                    Confidence: {Math.round(condition.confidence * 100)}%
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${condition.confidence * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-blue-600" />
            Recommendations
          </h4>
          <ul className="space-y-2">
            {analysis.analysis.recommendations.map((rec, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-sm text-foreground/80"
              >
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                {rec}
              </li>
            ))}
          </ul>
        </div>

        {/* Next Steps */}
        <div>
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-orange-600" />
            Next Steps
          </h4>
          <ol className="space-y-2">
            {analysis.analysis.nextSteps.map((step, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-sm text-foreground/80"
              >
                <span className="font-bold text-primary">{index + 1}.</span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* Disclaimer */}
        <div className="p-4 bg-warning/10 border border-warning/30 rounded-xl">
          <p className="text-xs text-foreground/80 italic">
            {analysis.analysis.disclaimer}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            onClick={exportAnalysis}
            variant="outline"
            className="flex-1 cursor-pointer bg-transparent"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button
            onClick={onBookConsultation}
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
          >
            <Stethoscope className="h-4 w-4 mr-2" />
            Book Consultation
          </Button>
          <Button
            onClick={onClear}
            variant="outline"
            className="flex-1 cursor-pointer bg-transparent"
          >
            New Analysis
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
