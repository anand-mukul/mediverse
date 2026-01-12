/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History, Clock, TrendingUp, Calendar } from "lucide-react";
import { format } from "date-fns";

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

interface SymptomHistoryProps {
  history: ExtendedSymptomAnalysis[];
  onSelectAnalysis: (analysis: ExtendedSymptomAnalysis) => void;
}

export default function SymptomHistory({
  history,
  onSelectAnalysis,
}: SymptomHistoryProps) {
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "emergency":
        return "bg-destructive/10 text-destructive";
      case "urgent":
        return "bg-orange-500/10 text-orange-600 dark:text-orange-400";
      case "routine":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
      case "monitor":
        return "bg-green-500/10 text-green-600 dark:text-green-400";
      default:
        return "bg-muted text-foreground";
    }
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5 text-blue-600" />
          Analysis History
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Your previous symptom analyses
        </p>
      </CardHeader>

      <CardContent>
        {history.length === 0 ? (
          <div className="text-center py-8">
            <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No history yet
            </h3>
            <p className="text-muted-foreground">
              Your symptom analyses will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {history.map((analysis) => (
              <button
                key={analysis.id}
                onClick={() => onSelectAnalysis(analysis)}
                className="w-full text-left p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      {format(analysis.timestamp, "MMM d")}
                    </span>
                  </div>

                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${getUrgencyColor(
                      analysis.analysis.urgency
                    )}`}
                  >
                    {analysis.analysis.urgency.toUpperCase()}
                  </span>
                </div>

                <p className="text-sm text-foreground/80 line-clamp-2 mb-3">
                  {analysis.symptoms}
                </p>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{format(analysis.timestamp, "h:mm a")}</span>
                  <div className="flex-1" />
                  <TrendingUp className="h-3 w-3" />
                  <span>View Analysis</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {history.length > 0 && (
          <div className="mt-6 pt-4 border-t border-border">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-xl font-bold text-foreground">
                  {history.length}
                </div>
                <div className="text-xs text-muted-foreground">
                  Total Analyses
                </div>
              </div>
              <div>
                <div className="text-xl font-bold text-foreground">
                  {
                    history.filter(
                      (h) =>
                        h.analysis.urgency === "emergency" ||
                        h.analysis.urgency === "urgent"
                    ).length
                  }
                </div>
                <div className="text-xs text-muted-foreground">
                  Urgent Cases
                </div>
              </div>
              <div>
                <div className="text-xl font-bold text-foreground">
                  {Math.round(
                    ((history.filter(
                      (h) =>
                        h.analysis.urgency === "monitor" ||
                        h.analysis.urgency === "routine"
                    ).length /
                      history.length) *
                      100) as any
                  )}
                  %
                </div>
                <div className="text-xs text-muted-foreground">Low Risk</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
