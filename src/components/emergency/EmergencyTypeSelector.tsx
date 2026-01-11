import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EmergencyType {
  id: string;
  label: string;
  icon: string;
  color: string;
  bgColor: string;
}

interface EmergencyTypeSelectorProps {
  emergencyTypes: EmergencyType[];
  selectedType: string;
  onSelectType: (type: string) => void;
}

export default function EmergencyTypeSelector({
  emergencyTypes,
  selectedType,
  onSelectType,
}: EmergencyTypeSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Emergency Type</CardTitle>
        <p className="text-sm text-slate-600">
          Choose the type of emergency to help responders prepare
        </p>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {emergencyTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => onSelectType(type.id)}
              className={`
                flex flex-col items-center justify-center p-6 rounded-2xl
                border-2 transition-all duration-200
                ${
                  selectedType === type.id
                    ? `border-red-500 shadow-lg scale-[1.02] ${type.bgColor}`
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }
                group
              `}
            >
              <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform">
                {type.icon}
              </div>
              <span
                className={`font-semibold ${
                  selectedType === type.id ? type.color : "text-slate-800"
                }`}
              >
                {type.label}
              </span>

              {selectedType === type.id && (
                <div className="mt-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
                </div>
              )}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
