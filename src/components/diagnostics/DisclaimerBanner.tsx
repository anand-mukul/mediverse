import { AlertTriangle, Shield, Stethoscope } from "lucide-react";

export default function DisclaimerBanner() {
  return (
    <div className="p-6 bg-warning/10 border border-warning/20 rounded-lg">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-warning/20 rounded-xl flex items-center justify-center">
            <AlertTriangle className="h-6 w-6 text-warning-foreground" />
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <h2 className="text-xl font-bold text-foreground">
            Important Medical Disclaimer
          </h2>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-warning-foreground mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                This AI-powered analysis is for{" "}
                <strong>informational purposes only</strong> and{" "}
                <strong>does not constitute medical advice</strong>, diagnosis,
                or treatment.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Stethoscope className="h-5 w-5 text-warning-foreground mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                <strong>
                  Always consult with qualified healthcare professionals
                </strong>{" "}
                for accurate diagnosis and personalized treatment plans.
              </p>
            </div>
          </div>

          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm font-semibold text-destructive">
              ⚠️ For life-threatening emergencies, call your local emergency
              number immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
