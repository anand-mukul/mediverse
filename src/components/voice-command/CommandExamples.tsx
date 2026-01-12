"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Mic,
  Calendar,
  Pill,
  Activity,
  Heart,
  Thermometer,
} from "lucide-react";

interface CommandExamplesProps {
  onSelectExample: (command: string) => void;
}

export default function CommandExamples({
  onSelectExample,
}: CommandExamplesProps) {
  const examples = [
    {
      category: "Appointments",
      icon: Calendar,
      commands: [
        "Book an appointment with a cardiologist",
        "Schedule a check-up for next week",
        "Cancel my appointment with Dr. Smith",
      ],
    },
    {
      category: "Health",
      icon: Heart,
      commands: [
        "I have chest pain and shortness of breath",
        "Check my heart rate history",
        "What are normal blood pressure readings?",
      ],
    },
    {
      category: "Pharmacy",
      icon: Pill,
      commands: [
        "Refill my prescription for Lisinopril",
        "Order medicine for headache",
        "Check if my prescription is ready",
      ],
    },
    {
      category: "Devices",
      icon: Activity,
      commands: [
        "Connect my smart watch",
        "Check my sleep data from last night",
        "Start a new health monitoring session",
      ],
    },
    {
      category: "Emergency",
      icon: Thermometer,
      commands: [
        "I need emergency help",
        "Call emergency services",
        "I'm feeling dizzy and nauseous",
      ],
    },
  ];

  return (
    <Card className="mt-8 border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mic className="h-5 w-5 text-primary" />
          Try These Commands
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Click any command to try it out
        </p>
      </CardHeader>

      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {examples.map((category) => (
            <div key={category.category} className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-muted rounded-lg">
                  <category.icon className="h-4 w-4 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground">
                  {category.category}
                </h4>
              </div>

              <div className="space-y-2">
                {category.commands.map((command, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-2 px-3 text-sm hover:bg-accent hover:border-primary/40"
                    onClick={() => onSelectExample(command)}
                  >
                    {command}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
