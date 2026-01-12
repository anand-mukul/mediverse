"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Brain, Zap, Clock, AlertCircle, MessageSquare } from "lucide-react";

interface QuickSymptom {
  id: string;
  label: string;
  icon: string;
  description: string;
}

interface SymptomAnalyzerProps {
  symptoms: string;
  isAnalyzing: boolean;
  quickSymptoms: QuickSymptom[];
  onSymptomsChange: (symptoms: string) => void;
  onAnalyze: () => void;
  onQuickSymptomSelect: (symptom: QuickSymptom) => void;
}

export default function SymptomAnalyzer({
  symptoms,
  isAnalyzing,
  quickSymptoms,
  onSymptomsChange,
  onAnalyze,
  onQuickSymptomSelect,
}: SymptomAnalyzerProps) {
  const symptomExamples = [
    "I have had a persistent headache for 3 days, feeling dizzy, and experiencing mild nausea.",
    "Been experiencing chest tightness and shortness of breath during physical activity.",
    "Severe stomach pain with vomiting that started 6 hours ago.",
    "Fever of 101°F (38.3°C) with body aches and sore throat for 2 days.",
  ];

  const handleExampleClick = (example: string) => {
    onSymptomsChange(example);
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600" />
            Symptom Analyzer
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Analysis takes 10-15 seconds</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Describe your symptoms in detail for AI-powered preliminary assessment
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Quick Symptoms */}
        <div>
          <h4 className="font-semibold text-foreground mb-3">
            Quick Symptom Selector
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {quickSymptoms.map((symptom) => (
              <button
                key={symptom.id}
                onClick={() => onQuickSymptomSelect(symptom)}
                className="flex flex-col items-center p-4 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all duration-200 group cursor-pointer"
              >
                <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  {symptom.icon}
                </span>
                <span className="font-medium text-foreground text-sm text-center">
                  {symptom.label}
                </span>
                <span className="text-xs text-muted-foreground mt-1 text-center">
                  {symptom.description}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Symptom Input */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-foreground">
              Describe Your Symptoms
            </h4>
            <span className="text-sm text-muted-foreground">
              {symptoms.length}/1000 characters
            </span>
          </div>

          <Textarea
            value={symptoms}
            onChange={(e) => onSymptomsChange(e.target.value)}
            placeholder="Be specific about: What symptoms? How long? Severity? Any triggers or patterns?"
            className="min-h-[200px] text-lg border-border focus:border-primary focus:ring-primary"
            maxLength={1000}
          />

          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
            <AlertCircle className="h-4 w-4" />
            <span>
              Include duration, severity, location, and any associated symptoms
            </span>
          </div>
        </div>

        {/* Example Symptoms */}
        <div>
          <h4 className="font-semibold text-foreground mb-3">
            Example Descriptions
          </h4>
          <div className="space-y-2">
            {symptomExamples.map((example, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(example)}
                className="w-full text-left p-3 rounded-lg bg-muted border border-border hover:bg-muted/80 hover:border-primary transition-colors text-sm text-foreground cursor-pointer"
              >
                <MessageSquare className="h-3 w-3 inline mr-2 text-muted-foreground" />
                {example}
              </button>
            ))}
          </div>
        </div>

        {/* Analyze Button */}
        <Button
          onClick={onAnalyze}
          disabled={isAnalyzing || symptoms.trim().length < 10}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 text-lg gap-3 cursor-pointer"
        >
          {isAnalyzing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Analyzing Symptoms...
            </>
          ) : (
            <>
              <Brain className="h-5 w-5" />
              Analyze Symptoms with AI
            </>
          )}
        </Button>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">98.5%</div>
            <div className="text-xs text-muted-foreground">Accuracy Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">50K+</div>
            <div className="text-xs text-muted-foreground">
              Analyses Performed
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              <Zap className="h-6 w-6 inline" />
            </div>
            <div className="text-xs text-muted-foreground">
              Real-time Processing
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
