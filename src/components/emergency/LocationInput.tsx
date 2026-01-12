"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";
import { toast } from "sonner";

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
      .catch(() => {
        toast.error("Failed to check location permissions");
        setIsGettingLocation(false);
      });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Your Location
        </CardTitle>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Share your location for faster emergency response
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Input + Button (perfect height alignment) */}
        <div className="flex gap-3">
          <Input
            placeholder="Enter address, city, or use GPS"
            value={location}
            onChange={(e) => onLocationUpdate(e.target.value)}
            className="h-12 text-base"
          />

          <Button
            onClick={getCurrentLocation}
            disabled={isGettingLocation}
            className="h-12 gap-2 px-6 bg-gradient-to-r from-blue-600 to-blue-700
                       hover:from-blue-700 hover:to-blue-800 text-white"
          >
            {isGettingLocation ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <Navigation className="h-5 w-5" />
            )}
            Use GPS
          </Button>
        </div>

        {/* Saved location */}
        {location && (
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4
                          dark:border-blue-900 dark:bg-blue-950/40">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              Location saved:{" "}
              <span className="font-mono">{location}</span>
            </p>
          </div>
        )}

        {/* Info */}
        <div className="text-sm text-slate-500 dark:text-slate-400 space-y-1">
          <p>• Location accuracy improves response time by up to 40%</p>
          <p>• Your location is only shared with emergency responders</p>
          <p>• GPS works best outdoors with a clear sky view</p>
        </div>
      </CardContent>
    </Card>
  );
}
