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
  const formatTime = (date: Date) => {
    return format(date, "HH:mm");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "pending":
        return <Clock4 className="h-4 w-4 text-amber-500 animate-spin" />;
      default:
        return <Clock className="h-4 w-4 text-slate-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800 border-green-200";
      case "error":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5 text-blue-600" />
          Command History
        </CardTitle>

        {commands.length > 0 && (
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

      <CardContent>
        {commands.length === 0 ? (
          <div className="text-center py-8">
            <History className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              No commands yet
            </h3>
            <p className="text-slate-600">
              Send commands to your IoT devices to see history here
            </p>
          </div>
        ) : (
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {commands.map((cmd) => (
              <div
                key={cmd.id}
                className="p-4 rounded-xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(cmd.status)}
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        {cmd.deviceName}
                      </h4>
                      <p className="text-sm text-slate-600">{cmd.command}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="h-3 w-3" />
                    {formatTime(cmd.timestamp)}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                      cmd.status
                    )}`}
                  >
                    {cmd.status.charAt(0).toUpperCase() + cmd.status.slice(1)}
                  </span>

                  {cmd.response && (
                    <p className="text-xs text-slate-600 truncate max-w-[200px]">
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
