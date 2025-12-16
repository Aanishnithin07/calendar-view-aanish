/**
 * CalendarCell Component
 * Phase 4 Prompt 7: Individual cell in the calendar grid representing a single day
 * 
 * Features:
 * - Fixed height (min-h-[120px]) for consistent grid layout
 * - Day number displayed in top right corner
 * - isToday indicator: circled number with bg-primary-500 text-white
 * - isCurrentMonth: gray out text (text-neutral-300) when false
 * - Event list with max 3 visible, '+X more' button for overflow
 * - React.memo wrapper for performance optimization
 */

import React, { useState } from 'react';
import type { CalendarEvent } from '@/types/calendar.types';

/**
 * CalendarCell Props
 * Phase 4 Prompt 7 specification
 */
export interface CalendarCellProps {
  date: Date;
  events: CalendarEvent[];
  isToday: boolean;
  isCurrentMonth: boolean;
  onEventClick?: (event: CalendarEvent) => void;
  onCellClick?: (date: Date) => void;
}

/**
 * CalendarCell Component
 * Renders a single day cell in the calendar grid
 * Wrapped with React.memo for performance optimization
 */
const CalendarCellComponent: React.FC<CalendarCellProps> = ({
  date,
  events,
  isToday,
  isCurrentMonth,
  onEventClick,
  onCellClick,
}) => {
  const [showAllEvents, setShowAllEvents] = useState(false);
  
  const dayNumber = date.getDate();
  const visibleEvents = showAllEvents ? events : events.slice(0, 3);
  const hasMoreEvents = events.length > 3;
  const hiddenEventsCount = events.length - 3;
  
  const handleCellClick = (): void => {
    if (onCellClick) {
      onCellClick(date);
    }
  };
  
  const handleEventClick = (event: CalendarEvent, e: React.MouseEvent): void => {
    e.stopPropagation();
    if (onEventClick) {
      onEventClick(event);
    }
  };
  
  const handleMoreClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
    setShowAllEvents(!showAllEvents);
  };
  
  return (
    <div
      className="min-h-[120px] border-r-2 border-b-2 border-neutral-300 p-3 hover:bg-primary-50 transition-all cursor-pointer overflow-hidden bg-white hover:shadow-inner"
      onClick={handleCellClick}
      role="gridcell"
      aria-label={`${date.toLocaleDateString()}, ${events.length} events`}
    >
      {/* Day number in top right */}
      <div className="flex justify-end mb-1">
        {isToday ? (
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-500 text-white text-sm font-semibold">
            {dayNumber}
          </div>
        ) : (
          <div
            className={`text-sm font-medium ${
              isCurrentMonth ? 'text-neutral-900' : 'text-neutral-300'
            }`}
          >
            {dayNumber}
          </div>
        )}
      </div>
      
      {/* Event list */}
      {events.length > 0 && (
        <div className="space-y-1">
          {visibleEvents.map((event) => (
            <div
              key={event.id}
              className="text-xs px-2 py-1 rounded truncate cursor-pointer hover:opacity-80 hover:scale-105 hover:shadow-md transition-all duration-150"
              style={{ backgroundColor: event.color || '#0ea5e9', color: 'white' }}
              onClick={(e) => handleEventClick(event, e)}
              title={event.title}
            >
              {event.title}
            </div>
          ))}
          
          {/* +X more button */}
          {hasMoreEvents && !showAllEvents && (
            <button
              className="text-xs text-primary-500 hover:text-primary-600 font-medium w-full text-left px-2 py-1 hover:bg-primary-50 rounded transition-colors"
              onClick={handleMoreClick}
              type="button"
            >
              +{hiddenEventsCount} more
            </button>
          )}
          
          {/* Show less button */}
          {showAllEvents && hasMoreEvents && (
            <button
              className="text-xs text-primary-500 hover:text-primary-600 font-medium w-full text-left px-2 py-1 hover:bg-primary-50 rounded transition-colors"
              onClick={handleMoreClick}
              type="button"
            >
              Show less
            </button>
          )}
        </div>
      )}
    </div>
  );
};

/**
 * Export with React.memo for performance optimization
 * Prevents unnecessary re-renders when props haven't changed
 */
export const CalendarCell = React.memo(CalendarCellComponent);

CalendarCell.displayName = 'CalendarCell';
