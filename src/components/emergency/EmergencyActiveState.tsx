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
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: MapPin,
      title: "Location Shared",
      description: "Coordinates sent to first responders",
      status: "complete",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: Users,
      title: "Nearest Hospital Alerted",
      description: "Emergency room prepared for arrival",
      status: "in-progress",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: Ambulance,
      title: "Ambulance Dispatched",
      description: "Estimated arrival: 7-12 minutes",
      status: "in-progress",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: Shield,
      title: "IoT Care Bot",
      description: "Delivering first-aid kit",
      status: "pending",
      color: "text-amber-600",
      bgColor: "bg-amber-100",
    },
    {
      icon: Heart,
      title: "Medical Records",
      description: "Health data shared with ER",
      status: "pending",
      color: "text-amber-600",
      bgColor: "bg-amber-100",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Emergency Alert Card */}
      <Card className="border-red-300 bg-gradient-to-r from-red-50 to-orange-50 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-500 to-orange-500" />

        <CardContent className="p-8">
          <div className="flex flex-col items-center text-center">
            {/* Animated Alert Icon */}
            <div className="relative mb-6">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                <AlertTriangle className="h-16 w-16 text-white" />
              </div>
              <div className="absolute inset-0 rounded-full border-4 border-red-400 animate-ping opacity-75" />
              <div
                className="absolute inset-4 rounded-full border-4 border-red-300 animate-ping opacity-50"
                style={{ animationDelay: "0.5s" }}
              />
            </div>

            <h2 className="text-3xl font-bold text-red-700 mb-3">
              EMERGENCY RESPONSE ACTIVATED
            </h2>

            <p className="text-lg text-slate-700 mb-2">
              Help is on the way. Please stay calm.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-4 max-w-md">
              <div className="p-4 bg-white rounded-xl border border-slate-200">
                <p className="text-sm text-slate-600">Emergency Type</p>
                <p className="font-bold text-slate-900">
                  {emergencyData
                    ? getEmergencyTypeLabel(emergencyData.type)
                    : "Medical Emergency"}
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200">
                <p className="text-sm text-slate-600">Time Activated</p>
                <p className="font-bold text-slate-900">
                  {emergencyData
                    ? new Date(emergencyData.timestamp).toLocaleTimeString()
                    : new Date().toLocaleTimeString()}
                </p>
              </div>
            </div>

            <div className="mt-6 w-full max-w-md p-4 bg-white/80 rounded-xl border border-slate-200">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-blue-600 animate-spin" />
                <div className="text-left">
                  <p className="font-semibold text-slate-900">
                    Response Timeline
                  </p>
                  <p className="text-sm text-slate-600">
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
          <h3 className="text-lg font-semibold text-slate-900 mb-6">
            Emergency Response Progress
          </h3>

          <div className="space-y-4">
            {emergencySteps.map((step, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-xl border border-slate-200"
              >
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${step.bgColor}`}
                >
                  <step.icon className={`h-6 w-6 ${step.color}`} />
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-slate-900">{step.title}</p>
                  <p className="text-sm text-slate-600">{step.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  {step.status === "complete" && (
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  )}
                  {step.status === "in-progress" && (
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping" />
                  )}
                  {step.status === "pending" && (
                    <div className="w-3 h-3 bg-slate-300 rounded-full" />
                  )}

                  <span
                    className={`text-sm font-medium ${
                      step.status === "complete"
                        ? "text-green-600"
                        : step.status === "in-progress"
                        ? "text-blue-600"
                        : "text-slate-400"
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
          <div className="mt-8 pt-6 border-t border-slate-200">
            <Button
              onClick={onCancel}
              variant="outline"
              className="w-full border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 py-6 text-lg"
            >
              Cancel Emergency Response
            </Button>
            <p className="text-sm text-slate-500 text-center mt-3">
              Only cancel if the emergency has been resolved
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
