"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface LocationInputProps {
  location: string;
  onLocationUpdate: (location: string) => void;
}

export default function LocationInput({
  location,
  onLocationUpdate,
}: LocationInputProps) {
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const getCurrentLocation = async () => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setIsGettingLocation(true);
    toast.info("Getting your location...");

    // Check for permissions
    navigator.permissions
      ?.query({ name: "geolocation" })
      .then((permissionStatus) => {
        if (permissionStatus.state === "denied") {
          toast.error(
            "Location access denied. Please enable location services in your browser settings."
          );
          setIsGettingLocation(false);
          return;
        }

        if (permissionStatus.state === "prompt") {
          toast.info("Please allow location access when prompted");
        }

        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const locationString = `${latitude.toFixed(6)}, ${longitude.toFixed(
              6
            )}`;
            onLocationUpdate(locationString);
            toast.success("Location detected successfully");
            setIsGettingLocation(false);
          },
          (error) => {
            console.error("Geolocation error:", error);
            let errorMessage = "Could not get location";

            switch (error.code) {
              case error.PERMISSION_DENIED:
                errorMessage =
                  "Location permission denied. Please enable in settings.";
                break;
              case error.POSITION_UNAVAILABLE:
                errorMessage = "Location information unavailable.";
                break;
              case error.TIMEOUT:
                errorMessage = "Location request timed out.";
                break;
            }

            toast.error(errorMessage);
            setIsGettingLocation(false);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      })
      .catch((error) => {
        console.error("Permission check error:", error);
        toast.error("Failed to check location permissions");
        setIsGettingLocation(false);
      });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-blue-600" />
          Your Location
        </CardTitle>
        <p className="text-sm text-slate-600">
          Share your location for faster emergency response
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex gap-3">
          <div className="flex-1">
            <Input
              placeholder="Enter address, city, or use GPS"
              value={location}
              onChange={(e) => onLocationUpdate(e.target.value)}
              className="h-12 text-lg"
            />
          </div>

          <Button
            onClick={getCurrentLocation}
            disabled={isGettingLocation}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white gap-3 px-6"
          >
            {isGettingLocation ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Navigation className="h-5 w-5" />
            )}
            Use GPS
          </Button>
        </div>

        {location && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              📍 Location saved: <span className="font-mono">{location}</span>
            </p>
          </div>
        )}

        <div className="text-sm text-slate-500">
          <p>• Location accuracy improves response time by up to 40%</p>
          <p>• Your location is only shared with emergency responders</p>
          <p>• GPS works best outdoors with clear sky view</p>
        </div>
      </CardContent>
    </Card>
  );
}
