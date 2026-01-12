import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  History,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  Clock4,
} from "lucide-react";
import { format } from "date-fns";

interface CommandLog {
  id: string;
  deviceId: string;
  deviceName: string;
  command: string;
  timestamp: Date;
  status: "success" | "error" | "pending";
  response?: string;
}

interface CommandHistoryProps {
  commands: CommandLog[];
  onClear: () => void;
}

export default function CommandHistory({
  commands,
  onClear,
}: CommandHistoryProps) {
  const formatTime = (date: Date) => format(date, "HH:mm");

  const getStatusIcon = (status: CommandLog["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "error":
        return <XCircle className="h-4 w-4 text-destructive" />;
      case "pending":
        return (
          <Clock4 className="h-4 w-4 text-warning animate-spin" />
        );
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: CommandLog["status"]) => {
    switch (status) {
      case "success":
        return "bg-success/10 text-success border-success/20";
      case "error":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "pending":
        return "bg-warning/10 text-warning border-warning/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <History className="h-5 w-5 text-primary" />
          Command History
        </CardTitle>

        {commands.length > 0 && (
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

      <CardContent>
        {commands.length === 0 ? (
          <div className="text-center py-8">
            <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No commands yet
            </h3>
            <p className="text-muted-foreground">
              Send commands to your IoT devices to see history here
            </p>
          </div>
        ) : (
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {commands.map((cmd) => (
              <div
                key={cmd.id}
                className="p-4 rounded-xl border border-border bg-card
                           hover:border-primary/40 hover:bg-accent/40
                           transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(cmd.status)}
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {cmd.deviceName}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {cmd.command}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {formatTime(cmd.timestamp)}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(
                      cmd.status
                    )}`}
                  >
                    {cmd.status.charAt(0).toUpperCase() +
                      cmd.status.slice(1)}
                  </span>

                  {cmd.response && (
                    <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                      {cmd.response}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
