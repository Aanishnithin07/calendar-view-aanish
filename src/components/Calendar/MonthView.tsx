/**
 * MonthView Component
 * Displays a monthly calendar grid
 * Phase 2: Using getCalendarGrid for consistent 42-date layout
 */

import React from 'react';
import type { MonthViewProps } from '@/types/calendar.types';
import { CalendarCell } from './CalendarCell';
import {
  getCalendarGrid,
  getShortDayName,
  isSameDay,
} from '@/utils/date.utils';
import { getEventsForDate } from '@/utils/event.utils';

export const MonthView: React.FC<MonthViewProps> = ({
  currentDate,
  events,
  selectedDates,
  onDateSelect,
  onEventClick,
  config,
  className = '',
}) => {
  const { firstDayOfWeek = 0 } = config;
  
  // Phase 2: Get exactly 42 dates (6 weeks x 7 days) for the month grid
  const dates = getCalendarGrid(currentDate, firstDayOfWeek);
  
  // Generate day labels (Sun, Mon, Tue, etc.)
  const dayLabels = Array.from({ length: 7 }, (_, i) => {
    const dayIndex = (firstDayOfWeek + i) % 7;
    return getShortDayName(dayIndex, config.locale);
  });
  
  return (
    <div className={`month-view ${className}`} role="grid">
      {/* Day labels header */}
      <div className="calendar-grid">
        {dayLabels.map((label, index) => (
          <div
            key={`day-label-${index}`}
            className="calendar-day-label"
            role="columnheader"
          >
            {label}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="calendar-grid">
        {dates.map((date, index) => {
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
            isCurrentMonth: date.getMonth() === currentDate.getMonth(),
            isWeekend: date.getDay() === 0 || date.getDay() === 6,
            isDisabled: false, // TODO: Implement with config.minDate, maxDate, disabledDates
            events: dayEvents,
          };
          
          return (
            <CalendarCell
              key={`cell-${index}`}
              date={calendarDate}
              isSelected={isSelected}
              onSelect={onDateSelect}
              onEventClick={onEventClick}
            />
          );
        })}
      </div>
    </div>
  );
};

MonthView.displayName = 'MonthView';
