import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, addMonths, subMonths, startOfWeek, endOfWeek } from "date-fns";

interface CompletedDay {
  date: string;
  workouts: string[];
}

interface ProgressCalendarProps {
  completedDays: CompletedDay[];
}

const ProgressCalendar = ({ completedDays }: ProgressCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = new Date();

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const isCompleted = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return completedDays.some(d => d.date === dateStr && d.workouts.length > 0);
  };

  return (
    <div className="calendar-card">
      <h2 className="text-xl font-semibold text-center mb-6 text-foreground">
        Training Progress Calendar
      </h2>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="nav-btn"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-lg font-medium">
          {format(currentMonth, "MMMM yyyy")}
        </span>
        <button 
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="nav-btn"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Week Days Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-sm text-muted-foreground font-medium py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const isToday = isSameDay(day, today);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const completed = isCompleted(day);

          return (
            <div
              key={index}
              className={`calendar-day ${isToday ? 'today' : ''} ${completed ? 'completed' : ''} ${!isCurrentMonth ? 'other-month' : ''}`}
            >
              {format(day, "d")}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressCalendar;
