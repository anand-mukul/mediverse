import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Trash2,
  Clock,
  Brain,
  User,
  AlertTriangle,
} from "lucide-react";
import { format } from "date-fns";

interface ChatMessage {
  id: string;
  type: "user" | "ai" | "error";
  text: string;
  timestamp: Date;
  data?: {
    intent: string;
    response: string;
    urgency: "low" | "medium" | "high" | "critical";
    confidence: number;
  };
}

interface ChatHistoryProps {
  messages: ChatMessage[];
  onClear: () => void;
}

export default function ChatHistory({ messages, onClear }: ChatHistoryProps) {
  const formatTime = (date: Date) => {
    return format(date, "HH:mm");
  };

  const getIntentColor = (intent: string) => {
    switch (intent) {
      case "emergency":
        return "bg-red-100 text-red-800 border-red-200";
      case "book_appointment":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pharmacy":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "iot_command":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "bg-red-500 text-white";
      case "high":
        return "bg-orange-500 text-white";
      case "medium":
        return "bg-yellow-500 text-white";
      case "low":
        return "bg-green-500 text-white";
      default:
        return "bg-slate-500 text-white";
    }
  };

  return (
    <Card className="h-[600px] flex flex-col border-0 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-4 border-b">
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-blue-600" />
          Conversation History
        </CardTitle>

        {messages.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="text-slate-500 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        )}
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden p-0">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center">
            <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mb-6">
              <Brain className="h-12 w-12 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              No conversations yet
            </h3>
            <p className="text-slate-600 max-w-md">
              Start speaking or typing to interact with MediVerse AI. I can help
              with appointments, prescriptions, emergencies, and more.
            </p>
          </div>
        ) : (
          <div className="h-full overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.type === "ai" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <Brain className="h-4 w-4 text-white" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    message.type === "user"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none"
                      : message.type === "error"
                      ? "bg-gradient-to-r from-red-100 to-red-50 border border-red-200 text-red-900 rounded-bl-none"
                      : "bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 text-slate-900 rounded-bl-none"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {message.type === "user" ? (
                        <User className="h-3 w-3" />
                      ) : message.type === "error" ? (
                        <AlertTriangle className="h-3 w-3" />
                      ) : (
                        <Brain className="h-3 w-3" />
                      )}
                      <span className="text-xs font-medium opacity-80">
                        {message.type === "user"
                          ? "You"
                          : message.type === "error"
                          ? "Error"
                          : "MediVerse AI"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs opacity-70">
                      <Clock className="h-3 w-3" />
                      {formatTime(message.timestamp)}
                    </div>
                  </div>

                  <p className="text-sm mb-3">{message.text}</p>

                  {message.type === "ai" && message.data && (
                    <div className="space-y-2 mt-3 pt-3 border-t border-slate-200">
                      <div className="flex flex-wrap gap-2">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${getIntentColor(
                            message.data.intent
                          )}`}
                        >
                          {message.data.intent.replace("_", " ")}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${getUrgencyColor(
                            message.data.urgency
                          )}`}
                        >
                          {message.data.urgency}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-800">
                          {Math.round(message.data.confidence * 100)}% confident
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {message.type === "user" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
