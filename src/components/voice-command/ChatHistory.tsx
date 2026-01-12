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
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "book_appointment":
        return "bg-primary/10 text-primary border-primary/20";
      case "pharmacy":
        return "bg-secondary/10 text-secondary-foreground border-secondary/20";
      case "iot_command":
        return "bg-success/10 text-success border-success/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "bg-destructive text-destructive-foreground";
      case "high":
        return "bg-warning text-warning-foreground";
      case "medium":
        return "bg-accent text-accent-foreground";
      case "low":
        return "bg-success text-success-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="h-[600px] flex flex-col border-0 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-border">
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Conversation History
        </CardTitle>

        {messages.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        )}
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden p-0">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
              <Brain className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No conversations yet
            </h3>
            <p className="text-muted-foreground max-w-md">
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
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Brain className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    message.type === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : message.type === "error"
                      ? "bg-destructive/10 border border-destructive/20 text-destructive rounded-bl-none"
                      : "bg-muted border border-border text-foreground rounded-bl-none"
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
                    <div className="space-y-2 mt-3 pt-3 border-t border-border">
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
                        <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                          {Math.round(message.data.confidence * 100)}% confident
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {message.type === "user" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-foreground flex items-center justify-center">
                    <User className="h-4 w-4 text-background" />
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
