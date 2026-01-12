import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Phone,
  MapPin,
  Users,
  Clock,
  Ambulance,
  Shield,
  Heart,
} from "lucide-react";

interface EmergencyData {
  type: string;
  location: string;
  timestamp: string;
  status: "active" | "cancelled" | "completed";
}

interface EmergencyActiveStateProps {
  emergencyData: EmergencyData | null;
  onCancel: () => void;
}

export default function EmergencyActiveState({
  emergencyData,
  onCancel,
}: EmergencyActiveStateProps) {
  const getEmergencyTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      heart_attack: "Heart Attack",
      stroke: "Stroke",
      fall: "Severe Fall",
      breathing: "Breathing Problem",
      allergic: "Allergic Reaction",
      medical_emergency: "Medical Emergency",
    };
    return types[type] || type;
  };

  const emergencySteps = [
    {
      icon: Phone,
      title: "Emergency Contacts Alerted",
      description: "All contacts notified via call and SMS",
      status: "complete",
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      icon: MapPin,
      title: "Location Shared",
      description: "Coordinates sent to first responders",
      status: "complete",
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      icon: Users,
      title: "Nearest Hospital Alerted",
      description: "Emergency room prepared for arrival",
      status: "in-progress",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Ambulance,
      title: "Ambulance Dispatched",
      description: "Estimated arrival: 7-12 minutes",
      status: "in-progress",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Shield,
      title: "IoT Care Bot",
      description: "Delivering first-aid kit",
      status: "pending",
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      icon: Heart,
      title: "Medical Records",
      description: "Health data shared with ER",
      status: "pending",
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Emergency Alert Card */}
      <Card className="border-destructive/40 bg-gradient-to-r from-destructive/10 to-warning/10 overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-destructive to-warning" />

        <CardContent className="p-8">
          <div className="flex flex-col items-center text-center">
            {/* Animated Alert Icon */}
            <div className="relative mb-6">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-destructive to-warning flex items-center justify-center">
                <AlertTriangle className="h-16 w-16 text-destructive-foreground" />
              </div>
              <div className="absolute inset-0 rounded-full border-4 border-destructive/60 animate-ping opacity-75" />
              <div
                className="absolute inset-4 rounded-full border-4 border-destructive/40 animate-ping opacity-50"
                style={{ animationDelay: "0.5s" }}
              />
            </div>

            <h2 className="text-3xl font-bold text-destructive mb-3">
              EMERGENCY RESPONSE ACTIVATED
            </h2>

            <p className="text-lg text-foreground mb-2">
              Help is on the way. Please stay calm.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-4 max-w-md">
              <div className="p-4 bg-card rounded-xl border border-border">
                <p className="text-sm text-muted-foreground">Emergency Type</p>
                <p className="font-bold text-foreground">
                  {emergencyData
                    ? getEmergencyTypeLabel(emergencyData.type)
                    : "Medical Emergency"}
                </p>
              </div>

              <div className="p-4 bg-card rounded-xl border border-border">
                <p className="text-sm text-muted-foreground">Time Activated</p>
                <p className="font-bold text-foreground">
                  {emergencyData
                    ? new Date(emergencyData.timestamp).toLocaleTimeString()
                    : new Date().toLocaleTimeString()}
                </p>
              </div>
            </div>

            <div className="mt-6 w-full max-w-md p-4 bg-card/80 rounded-xl border border-border">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary animate-spin" />
                <div className="text-left">
                  <p className="font-semibold text-foreground">
                    Response Timeline
                  </p>
                  <p className="text-sm text-muted-foreground">
                    First responders typically arrive within 8-15 minutes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Response Progress */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">
            Emergency Response Progress
          </h3>

          <div className="space-y-4">
            {emergencySteps.map((step, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-xl border border-border"
              >
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${step.bgColor}`}
                >
                  <step.icon className={`h-6 w-6 ${step.color}`} />
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-foreground">{step.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {step.status === "complete" && (
                    <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
                  )}
                  {step.status === "in-progress" && (
                    <div className="w-3 h-3 bg-primary rounded-full animate-ping" />
                  )}
                  {step.status === "pending" && (
                    <div className="w-3 h-3 bg-muted rounded-full" />
                  )}

                  <span
                    className={`text-sm font-medium ${
                      step.status === "complete"
                        ? "text-success"
                        : step.status === "in-progress"
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step.status === "complete"
                      ? "✓ Complete"
                      : step.status === "in-progress"
                      ? "In Progress"
                      : "Pending"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Cancel Emergency Button */}
          <div className="mt-8 pt-6 border-t border-border">
            <Button
              onClick={onCancel}
              variant="outline"
              className="w-full border-destructive/40 text-destructive hover:bg-destructive/10 py-6 text-lg"
            >
              Cancel Emergency Response
            </Button>
            <p className="text-sm text-muted-foreground text-center mt-3">
              Only cancel if the emergency has been resolved
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
