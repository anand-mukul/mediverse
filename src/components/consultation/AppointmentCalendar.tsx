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
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-blue-600" />
            Select Date
          </CardTitle>

          <div className="flex items-center gap-2">
            <button
              onClick={prevMonth}
              className="p-2 hover:bg-slate-100 rounded-lg"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <span className="font-semibold text-slate-900">
              {format(currentMonth, "MMMM yyyy")}
            </span>

            <button
              onClick={nextMonth}
              className="p-2 hover:bg-slate-100 rounded-lg"
            >
              <ChevronRight className="h-4 w-4" />
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
              className="text-center text-sm font-medium text-slate-500 py-2"
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
                  h-10 rounded-lg flex items-center justify-center text-sm font-medium
                  transition-all duration-200
                  ${
                    isSelected
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                      : today
                      ? "bg-blue-100 text-blue-700 border border-blue-200"
                      : weekend && !isPast
                      ? "bg-slate-50 text-slate-500"
                      : isPast
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                      : "bg-white text-slate-700 hover:bg-slate-100 hover:shadow-sm"
                  }
                  ${!isCurrentMonth ? "opacity-40" : ""}
                `}
              >
                {format(day, "d")}
                {today && !isSelected && (
                  <div className="absolute bottom-1 w-1 h-1 bg-blue-500 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 pt-4 border-t border-slate-200">
          <div className="flex items-center justify-center gap-6 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-gradient-to-r from-blue-600 to-purple-600" />
              <span>Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-blue-100 border border-blue-200" />
              <span>Today</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-slate-100" />
              <span>Unavailable</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
