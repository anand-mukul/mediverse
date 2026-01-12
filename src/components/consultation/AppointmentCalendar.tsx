"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from "date-fns";

interface AppointmentCalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export default function AppointmentCalendar({
  selectedDate,
  onDateSelect,
}: AppointmentCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const isToday = (date: Date) => {
    const today = new Date();
    return format(date, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");
  };

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-foreground">
            <CalendarIcon className="h-5 w-5 text-primary" />
            Select Date
          </CardTitle>

          <div className="flex items-center gap-2">
            <button
              onClick={prevMonth}
              className="p-2 rounded-lg hover:bg-muted"
            >
              <ChevronLeft className="h-4 w-4 text-foreground" />
            </button>

            <span className="font-semibold text-foreground">
              {format(currentMonth, "MMMM yyyy")}
            </span>

            <button
              onClick={nextMonth}
              className="p-2 rounded-lg hover:bg-muted"
            >
              <ChevronRight className="h-4 w-4 text-foreground" />
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Days of week */}
        <div className="grid grid-cols-7 gap-1 mb-3">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-muted-foreground py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: monthStart.getDay() }).map((_, index) => (
            <div key={`empty-${index}`} className="h-10" />
          ))}

          {monthDays.map((day) => {
            const isSelected = isSameDay(day, selectedDate);
            const today = isToday(day);
            const weekend = isWeekend(day);
            const isPast = day < new Date() && !isToday(day);
            const isCurrentMonth = isSameMonth(day, currentMonth);

            return (
              <button
                key={day.toString()}
                onClick={() => !isPast && onDateSelect(day)}
                disabled={isPast}
                className={`
                  h-10 rounded-lg flex items-center justify-center text-sm font-medium relative
                  transition-all duration-200
                  ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-md"
                      : today
                      ? "bg-accent text-accent-foreground border border-border"
                      : weekend && !isPast
                      ? "bg-muted text-muted-foreground"
                      : isPast
                      ? "bg-muted/50 text-muted-foreground cursor-not-allowed"
                      : "bg-background text-foreground hover:bg-muted"
                  }
                  ${!isCurrentMonth ? "opacity-40" : ""}
                `}
              >
                {format(day, "d")}
                {today && !isSelected && (
                  <div className="absolute bottom-1 w-1 h-1 bg-primary rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-primary" />
              <span>Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-accent border border-border" />
              <span>Today</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-muted" />
              <span>Unavailable</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
