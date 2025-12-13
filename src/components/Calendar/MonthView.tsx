/**
 * MonthView Component
 * Phase 4 Prompt 8: Monthly calendar grid with day headers and CalendarCell components
 * 
 * Features:
 * - Uses getCalendarGrid to generate exactly 42 dates (6 weeks × 7 days)
 * - CSS Grid layout: grid grid-cols-7
 * - Day headers (Mon, Tue, Wed...) rendered at top
 * - Maps through grid dates to render CalendarCell for each
 * - Filters events prop to pass relevant events to each cell
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

/**
 * MonthView Component
 * Renders a monthly calendar with a 7-column grid layout
 */
export const MonthView: React.FC<MonthViewProps> = ({
  currentDate,
  events,
  onDateSelect,
  onEventClick,
  config,
  className = '',
}) => {
  const { firstDayOfWeek = 0 } = config;
  
  // Phase 4 Prompt 8: Use getCalendarGrid from utils to generate the days
  const dates = getCalendarGrid(currentDate, firstDayOfWeek);
  
  // Phase 4 Prompt 8: Generate day headers (Mon, Tue, Wed, etc.)
  const dayLabels = Array.from({ length: 7 }, (_, i) => {
    const dayIndex = (firstDayOfWeek + i) % 7;
    return getShortDayName(dayIndex, config.locale);
  });
  
  return (
    <div className={`${className}`} role="grid" aria-label="Month calendar view">
      {/* Phase 4 Prompt 8: Render Day Headers (Mon, Tue, Wed...) at the top */}
      <div className="grid grid-cols-7 gap-0 mb-2 border-b border-neutral-200">
        {dayLabels.map((label, index) => (
          <div
            key={`day-label-${index}`}
            className="text-center text-sm font-semibold text-neutral-700 py-3 border-r border-neutral-100 last:border-r-0"
            role="columnheader"
          >
            {label}
          </div>
        ))}
      </div>
      
      {/* Phase 4 Prompt 8: CSS Grid with grid grid-cols-7 */}
      <div className="grid grid-cols-7 gap-0 border-l border-t border-neutral-200">
        {/* Phase 4 Prompt 8: Map through grid dates and render CalendarCell for each */}
        {dates.map((date, index) => {
          // Phase 4 Prompt 8: Filter events prop to pass relevant events to each cell
          const dayEvents = getEventsForDate(events, date);
          const isToday = isSameDay(date, new Date());
          const isCurrentMonth = date.getMonth() === currentDate.getMonth();
          
          return (
            <CalendarCell
              key={`cell-${date.getTime()}-${index}`}
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
