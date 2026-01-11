import { AlertTriangle, Shield, Ambulance, MapPin, Users } from "lucide-react";

export default function EmergencyWarningBanner() {
  return (
    <div className="p-6 bg-destructive/10 border border-destructive/20 rounded-lg">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-destructive/20 rounded-xl flex items-center justify-center">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-bold text-foreground mb-3">
            Emergency Alert System
          </h2>

          <p className="text-muted-foreground mb-4">
            This system will immediately trigger multiple emergency protocols:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-destructive/10 rounded-lg flex items-center justify-center">
                <Shield className="h-4 w-4 text-destructive" />
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  Alert Emergency Contacts
                </p>
                <p className="text-sm text-muted-foreground">
                  Via call, SMS, and email
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <MapPin className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Share Location</p>
                <p className="text-sm text-muted-foreground">
                  With first responders
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                <Ambulance className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  Dispatch Medical Response
                </p>
                <p className="text-sm text-muted-foreground">
                  Immediate assistance
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Users className="h-4 w-4 text-secondary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  Connect to Hospital
                </p>
                <p className="text-sm text-muted-foreground">
                  Nearest medical facility
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-card border border-destructive/30 rounded-lg">
            <p className="text-sm font-bold text-destructive">
              ⚠️ For life-threatening emergencies, always call 911 first.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
