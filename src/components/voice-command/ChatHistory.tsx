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
  const formatTime = (date: Date) => format(date, "HH:mm");

  const getIntentColor = (intent: string) => {
    switch (intent) {
      case "emergency":
        return "bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400";
      case "book_appointment":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400";
      case "pharmacy":
        return "bg-purple-500/10 text-purple-600 border-purple-500/20 dark:text-purple-400";
      case "iot_command":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400";
      default:
        return "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "bg-red-600 text-white";
      case "high":
        return "bg-orange-500 text-white";
      case "medium":
        return "bg-amber-400 text-amber-950";
      case "low":
        return "bg-emerald-500 text-white";
      default:
        return "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200";
    }
  };

  return (
    <Card className="flex h-[600px] flex-col border-0 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
        <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
          <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Conversation History
        </CardTitle>

        {messages.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear All
          </Button>
        )}
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden p-0">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center p-8 text-center">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
              <Brain className="h-12 w-12 text-slate-400 dark:text-slate-500" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
              No conversations yet
            </h3>
            <p className="max-w-md text-slate-600 dark:text-slate-400">
              Start speaking or typing to interact with MediVerse AI. I can help
              with appointments, prescriptions, emergencies, and more.
            </p>
          </div>
        ) : (
          <div className="h-full space-y-4 overflow-y-auto p-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.type === "ai" && (
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                    <Brain className="h-4 w-4" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl p-4 text-sm
                    ${
                      message.type === "user"
                        ? "rounded-br-none bg-blue-600 text-white"
                        : message.type === "error"
                        ? "rounded-bl-none border border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400"
                        : "rounded-bl-none border border-slate-200 bg-slate-50 text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                    }`}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs opacity-80">
                      {message.type === "user" ? (
                        <User className="h-3 w-3" />
                      ) : message.type === "error" ? (
                        <AlertTriangle className="h-3 w-3" />
                      ) : (
                        <Brain className="h-3 w-3" />
                      )}
                      <span className="font-medium">
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

                  <p className="mb-3 leading-relaxed">{message.text}</p>

                  {message.type === "ai" && message.data && (
                    <div className="mt-3 space-y-2 border-t border-slate-200 pt-3 dark:border-slate-800">
                      <div className="flex flex-wrap gap-2">
                        <span
                          className={`rounded-full border px-2 py-1 text-xs ${getIntentColor(
                            message.data.intent
                          )}`}
                        >
                          {message.data.intent.replace("_", " ")}
                        </span>
                        <span
                          className={`rounded-full px-2 py-1 text-xs ${getUrgencyColor(
                            message.data.urgency
                          )}`}
                        >
                          {message.data.urgency}
                        </span>
                        <span className="rounded-full bg-slate-200 px-2 py-1 text-xs text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                          {Math.round(message.data.confidence * 100)}% confident
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {message.type === "user" && (
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">
                    <User className="h-4 w-4" />
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
