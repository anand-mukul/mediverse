"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from '@/components/ui/button';
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
        return "bg-red-100 text-red-800";
      case "urgent":
        return "bg-orange-100 text-orange-800";
      case "routine":
        return "bg-blue-100 text-blue-800";
      case "monitor":
        return "bg-green-100 text-green-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5 text-blue-600" />
          Analysis History
        </CardTitle>
        <p className="text-sm text-slate-600">Your previous symptom analyses</p>
      </CardHeader>

      <CardContent>
        {history.length === 0 ? (
          <div className="text-center py-8">
            <History className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              No history yet
            </h3>
            <p className="text-slate-600">
              Your symptom analyses will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {history.map((analysis) => (
              <button
                key={analysis.id}
                onClick={() => onSelectAnalysis(analysis)}
                className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-slate-500" />
                    <span className="text-sm font-medium text-slate-900">
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

                <p className="text-sm text-slate-700 line-clamp-2 mb-3">
                  {analysis.symptoms}
                </p>

                <div className="flex items-center gap-2 text-xs text-slate-500">
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
          <div className="mt-6 pt-4 border-t border-slate-200">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-xl font-bold text-slate-900">
                  {history.length}
                </div>
                <div className="text-xs text-slate-600">Total Analyses</div>
              </div>
              <div>
                <div className="text-xl font-bold text-slate-900">
                  {
                    history.filter(
                      (h) =>
                        h.analysis.urgency === "emergency" ||
                        h.analysis.urgency === "urgent"
                    ).length
                  }
                </div>
                <div className="text-xs text-slate-600">Urgent Cases</div>
              </div>
              <div>
                <div className="text-xl font-bold text-slate-900">
                  {Math.round(
                    (history.filter(
                      (h) =>
                        h.analysis.urgency === "monitor" ||
                        h.analysis.urgency === "routine"
                    ).length /
                      history.length) *
                      100
                  )}
                  %
                </div>
                <div className="text-xs text-slate-600">Low Risk</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
