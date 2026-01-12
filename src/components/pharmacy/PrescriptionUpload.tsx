"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface PrescriptionUploadProps {
  isUploaded: boolean;
  onUploadStatusChange: (status: boolean) => void;
}

export default function PrescriptionUpload({
  isUploaded,
  onUploadStatusChange,
}: PrescriptionUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];
    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type", {
        description: "Please upload PDF, JPEG, or PNG files only",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large", {
        description: "Maximum file size is 5MB",
      });
      return;
    }

    setIsUploading(true);
    setFileName(file.name);

    setTimeout(() => {
      setIsUploading(false);
      onUploadStatusChange(true);
      toast.success("Prescription uploaded successfully", {
        description: "Our pharmacists will review it within 2 hours",
      });
    }, 2000);
  };

  const handleRemove = () => {
    setFileName("");
    onUploadStatusChange(false);
    toast.info("Prescription removed");
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Prescription Upload
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Upload your prescription to order prescription medications
        </p>
      </CardHeader>

      <CardContent>
        {isUploaded ? (
          <div className="space-y-4">
            <div className="p-4 bg-success/10 border border-success/20 rounded-xl">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-success" />
                <div>
                  <h4 className="font-semibold text-success">
                    Prescription Uploaded
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {fileName} • Under review by pharmacists
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={handleRemove}
                className="border-destructive/40 text-destructive hover:bg-destructive/10"
              >
                Remove Prescription
              </Button>

              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Upload className="h-4 w-4 mr-2" />
                Upload New
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                />
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-8 border-2 border-dashed border-border rounded-xl text-center hover:border-primary transition-colors">
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />

              <div className="mb-4">
                <h4 className="font-semibold text-foreground mb-2">
                  Upload Your Prescription
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  PDF, JPEG, or PNG files up to 5MB
                </p>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <AlertCircle className="h-4 w-4" />
                  <span>Prescriptions are reviewed within 2 hours</span>
                </div>
              </div>

              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Choose File
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                    />
                  </>
                )}
              </Button>
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
              <h5 className="font-semibold text-primary mb-2">
                Why upload a prescription?
              </h5>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Required for prescription medications</li>
                <li>• Ensures safe and appropriate medication use</li>
                <li>• Allows pharmacists to review drug interactions</li>
                <li>• Required by law for controlled substances</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
