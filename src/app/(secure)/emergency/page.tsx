"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import EmergencyHeader from "@/components/emergency/EmergencyHeader";
import EmergencyWarningBanner from "@/components/emergency/EmergencyWarningBanner";
import EmergencyTypeSelector from "@/components/emergency/EmergencyTypeSelector";
import LocationInput from "@/components/emergency/LocationInput";
import EmergencyActiveState from "@/components/emergency/EmergencyActiveState";
import EmergencyContacts from "@/components/emergency/EmergencyContacts";
import { Button } from "@/components/ui/button";
import { emergencyService } from "@/services/emergency.service";
import { authService } from "@/services/auth.service";
import type { EmergencyRequest, EmergencyResponse } from "@/types/api";

const EMERGENCY_TYPES = [
  {
    id: "medical",
    label: "Medical Emergency",
    icon: "🏥",
    description: "Heart attack, stroke, severe injury",
    color: "text-red-700",
    bgColor: "bg-red-100",
  },
  {
    id: "ambulance",
    label: "Ambulance",
    icon: "🚑",
    description: "Need immediate transport",
    color: "text-blue-700",
    bgColor: "bg-blue-100",
  },
  {
    id: "fire",
    label: "Fire Emergency",
    icon: "🔥",
    description: "Fire or smoke detected",
    color: "text-orange-700",
    bgColor: "bg-orange-100",
  },
  {
    id: "police",
    label: "Police",
    icon: "👮",
    description: "Security emergency",
    color: "text-indigo-700",
    bgColor: "bg-indigo-100",
  },
];

interface ExtendedEmergencyResponse extends Omit<EmergencyResponse, "status"> {
  type: string;
  location: string;
  timestamp: string;
  status: "active" | "cancelled" | "completed";
}

export default function EmergencyPage() {
  const router = useRouter();
  const [emergencyType, setEmergencyType] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isTriggering, setIsTriggering] = useState(false);
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [emergencyResponse, setEmergencyResponse] =
    useState<ExtendedEmergencyResponse | null>(null);

  const triggerEmergency = async () => {
    if (!emergencyType) {
      toast.error("Please select an emergency type");
      return;
    }

    if (!location) {
      toast.error("Please provide your location");
      return;
    }

    const user = authService.getStoredUser();
    if (!user) {
      toast.error("Authentication required");
      router.push("/login");
      return;
    }

    setIsTriggering(true);
    toast.loading("Alerting emergency services...");

    try {
      const [lat, lng] = location.includes(",")
        ? location.split(",").map((s) => Number.parseFloat(s.trim()))
        : [0, 0];

      const request: EmergencyRequest = {
        type: emergencyType as EmergencyRequest["type"],
        location: {
          latitude: lat,
          longitude: lng,
          address: location,
        },
        description: description || "Emergency assistance needed",
        severity: "critical",
        contactPhone: user.phone || "",
      };

      const response = await emergencyService.createEmergencyRequest(request);

      const mappedStatus: "active" | "cancelled" | "completed" =
        response.status === "completed" ? "completed" : "active";

      const extendedResponse: ExtendedEmergencyResponse = {
        ...response,
        type: emergencyType,
        location: location,
        timestamp: new Date().toISOString(),
        status: mappedStatus,
      };

      setEmergencyResponse(extendedResponse);
      setEmergencyActive(true);

      toast.dismiss();
      toast.error("EMERGENCY ALERT ACTIVATED", {
        description:
          "Emergency services have been notified. Help is on the way.",
        duration: 10000,
      });
    } catch (err) {
      console.error("[v0] Emergency trigger error:", err);
      toast.dismiss();
      toast.error("Failed to trigger emergency", {
        description: "Please call 911 directly",
      });
    } finally {
      setIsTriggering(false);
    }
  };

  const cancelEmergency = () => {
    toast.success("Emergency cancelled", {
      description: "Emergency services have been notified",
    });
    setEmergencyActive(false);
    setEmergencyResponse(null);
    setEmergencyType("");
    setDescription("");
  };

  return (
    <div className="min-h-screen bg-background">
      <EmergencyHeader />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EmergencyWarningBanner />

        {!emergencyActive ? (
          <>
            <div className="space-y-6 mt-8">
              <EmergencyTypeSelector
                emergencyTypes={EMERGENCY_TYPES}
                selectedType={emergencyType}
                onSelectType={setEmergencyType}
              />

              <LocationInput
                location={location}
                onLocationUpdate={setLocation}
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Additional Details (Optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the emergency situation..."
                  className="w-full min-h-[100px] p-4 rounded-lg border border-border bg-background text-foreground"
                  maxLength={500}
                />
              </div>

              <EmergencyContacts />

              <Button
                onClick={triggerEmergency}
                disabled={isTriggering || !emergencyType || !location}
                variant="destructive"
                size="lg"
                className="w-full h-16 text-xl font-bold"
              >
                {isTriggering ? (
                  <span className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Triggering Emergency Response...
                  </span>
                ) : (
                  "⚠️ TRIGGER EMERGENCY RESPONSE"
                )}
              </Button>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mt-8">
                <div className="p-4 bg-card rounded-lg border border-border">
                  <div className="text-2xl font-bold text-destructive">911</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Emergency (US)
                  </div>
                </div>
                <div className="p-4 bg-card rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary">112</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Emergency (EU)
                  </div>
                </div>
                <div className="p-4 bg-card rounded-lg border border-border">
                  <div className="text-2xl font-bold text-success">999</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Emergency (UK)
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          emergencyResponse && (
            <EmergencyActiveState
              emergencyData={emergencyResponse}
              onCancel={cancelEmergency}
            />
          )
        )}

        <div className="mt-12 p-6 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-warning/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⚠️</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                Important Disclaimer
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>
                  • For life-threatening emergencies, always call your local
                  emergency number first
                </li>
                <li>
                  • This system complements but does not replace traditional
                  emergency services
                </li>
                <li>
                  • Location accuracy depends on device and network conditions
                </li>
                <li>
                  • Keep your emergency contact information updated regularly
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
