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
    <div className={`${className}`} role="grid">
      {/* Day labels header - Phase 4: 7-column grid */}
      <div className="grid grid-cols-7 gap-0 mb-2">
        {dayLabels.map((label, index) => (
          <div
            key={`day-label-${index}`}
            className="text-center text-sm font-semibold text-neutral-700 py-2"
            role="columnheader"
          >
            {label}
          </div>
        ))}
      </div>
      
      {/* Calendar grid - Phase 4: 7-column grid layout */}
      <div className="grid grid-cols-7 gap-0">
        {dates.map((date, index) => {
          const dayEvents = getEventsForDate(events, date);
          const isToday = isSameDay(date, new Date());
          const isCurrentMonth = date.getMonth() === currentDate.getMonth();
          
          return (
            <CalendarCell
              key={`cell-${index}`}
              date={date}
              events={dayEvents}
              isToday={isToday}
              isCurrentMonth={isCurrentMonth}
              onEventClick={onEventClick}
              onCellClick={onDateSelect}
            />
          );
        })}
      </div>
    </div>
  );
};

MonthView.displayName = 'MonthView';
