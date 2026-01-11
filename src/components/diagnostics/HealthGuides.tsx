import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Heart, Shield, Thermometer } from "lucide-react";

export default function HealthGuides() {
  const guides = [
    {
      icon: <Heart className="h-5 w-5 text-red-600" />,
      title: "When to Seek Emergency Care",
      items: [
        "Chest pain or pressure",
        "Difficulty breathing",
        "Severe bleeding",
        "Sudden weakness or numbness",
        "Head injury with confusion",
      ],
      color: "bg-red-50 border-red-200",
    },
    {
      icon: <Thermometer className="h-5 w-5 text-orange-600" />,
      title: "Common Symptoms Guide",
      items: [
        "Fever over 102°F (38.9°C)",
        "Persistent vomiting",
        "Severe headache",
        "Abdominal pain",
        "Unexplained weight loss",
      ],
      color: "bg-orange-50 border-orange-200",
    },
    {
      icon: <Shield className="h-5 w-5 text-blue-600" />,
      title: "Prevention Tips",
      items: [
        "Wash hands frequently",
        "Stay hydrated",
        "Get adequate sleep",
        "Manage stress levels",
        "Regular check-ups",
      ],
      color: "bg-blue-50 border-blue-200",
    },
  ];

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-600" />
          Health Guides
        </CardTitle>
        <p className="text-sm text-slate-600">
          Quick reference for common health concerns
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {guides.map((guide, index) => (
          <div key={index} className={`p-4 rounded-xl border ${guide.color}`}>
            <div className="flex items-center gap-3 mb-3">
              {guide.icon}
              <h4 className="font-semibold text-slate-900">{guide.title}</h4>
            </div>

            <ul className="space-y-2">
              {guide.items.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className="text-sm text-slate-700 flex items-start gap-2"
                >
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="pt-4 border-t border-slate-200">
          <p className="text-sm text-slate-600">
            Note: These guides are for informational purposes only. Always
            consult with a healthcare professional for personalized advice.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
