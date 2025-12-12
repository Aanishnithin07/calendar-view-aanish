/**
 * WeekView Component
 * Displays a weekly calendar view
 */

import React from 'react';
import type { WeekViewProps } from '@/types/calendar.types';
import { CalendarCell } from './CalendarCell';
import {
  startOfWeek,
  addDays,
  getShortDayName,
  isSameDay,
} from '@/utils/date.utils';
import { getEventsForDate } from '@/utils/event.utils';

export const WeekView: React.FC<WeekViewProps> = ({
  currentDate,
  events,
  selectedDates,
  onDateSelect,
  onEventClick,
  config,
  className = '',
}) => {
  const { firstDayOfWeek = 0 } = config;
  
  // Get the start of the week
  const weekStart = startOfWeek(currentDate, firstDayOfWeek);
  
  // Generate 7 days starting from week start
  const weekDates = Array.from({ length: 7 }, (_, i) => 
    addDays(weekStart, i)
  );
  
  // Generate day labels
  const dayLabels = weekDates.map((date) => ({
    short: getShortDayName(date.getDay(), config.locale),
    date: date.getDate(),
  }));
  
  return (
    <div className={`week-view ${className}`} role="grid">
      {/* Day labels header with dates */}
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {dayLabels.map((label, index) => (
          <div
            key={`day-label-${index}`}
            className="calendar-day-label"
            role="columnheader"
          >
            <div className="text-xs font-semibold">{label.short}</div>
            <div className="text-lg font-bold mt-1">{label.date}</div>
          </div>
        ))}
      </div>
      
      {/* Week grid */}
      <div className="grid grid-cols-7 gap-px bg-gray-200 mt-px">
        {weekDates.map((date, index) => {
          const isSelected = selectedDates.some(selected => 
            isSameDay(selected, date)
          );
          
          const dayEvents = getEventsForDate(events, date);
          
          const calendarDate = {
            year: date.getFullYear(),
            month: date.getMonth(),
            day: date.getDate(),
            date: date,
            isToday: isSameDay(date, new Date()),
            isCurrentMonth: true, // In week view, all days are "current"
            isWeekend: date.getDay() === 0 || date.getDay() === 6,
            isDisabled: false,
            events: dayEvents,
          };
          
          return (
            <CalendarCell
              key={`cell-${index}`}
              date={calendarDate}
              isSelected={isSelected}
              onSelect={onDateSelect}
              onEventClick={onEventClick}
              className="min-h-[120px]"
            />
          );
        })}
      </div>
    </div>
  );
};

WeekView.displayName = 'WeekView';
