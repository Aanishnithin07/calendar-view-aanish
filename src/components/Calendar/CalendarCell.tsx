/**
 * CalendarCell Component
 * Individual cell in the calendar grid representing a single day
 */

import React from 'react';
import type { CalendarCellProps } from '@/types/calendar.types';
import { formatDate } from '@/utils/date.utils';

export const CalendarCell: React.FC<CalendarCellProps> = ({
  date,
  isSelected,
  onSelect,
  onEventClick,
  className = '',
}) => {
  const handleClick = (): void => {
    if (!date.isDisabled) {
      onSelect(date.date);
    }
  };
  
  const handleEventClick = (event: React.MouseEvent, eventId: string): void => {
    event.stopPropagation();
    const clickedEvent = date.events.find(e => e.id === eventId);
    if (clickedEvent && onEventClick) {
      onEventClick(clickedEvent);
    }
  };
  
  const baseStyles = 'calendar-cell relative';
  const todayStyles = date.isToday ? 'calendar-cell-today' : '';
  const selectedStyles = isSelected ? 'calendar-cell-selected' : '';
  const disabledStyles = date.isDisabled ? 'calendar-cell-disabled' : '';
  const otherMonthStyles = !date.isCurrentMonth ? 'text-gray-400' : 'text-gray-900';
  const weekendStyles = date.isWeekend && !date.isDisabled ? 'bg-gray-50' : '';
  
  const combinedClassName = [
    baseStyles,
    todayStyles,
    selectedStyles,
    disabledStyles,
    otherMonthStyles,
    weekendStyles,
    className,
  ].filter(Boolean).join(' ');
  
  return (
    <div
      className={combinedClassName}
      onClick={handleClick}
      role="gridcell"
      aria-selected={isSelected}
      aria-disabled={date.isDisabled}
      aria-label={formatDate(date.date, 'long')}
    >
      {/* Date number */}
      <div className="text-sm font-medium mb-1">
        {date.day}
      </div>
      
      {/* Event indicators */}
      {date.events.length > 0 && (
        <div className="space-y-1">
          {date.events.slice(0, 3).map((event) => (
            <div
              key={event.id}
              className="text-xs px-1 py-0.5 rounded truncate cursor-pointer hover:opacity-80 transition-opacity"
              style={{ backgroundColor: event.color || '#3b82f6', color: 'white' }}
              onClick={(e) => handleEventClick(e, event.id)}
              title={event.title}
            >
              {event.title}
            </div>
          ))}
          {date.events.length > 3 && (
            <div className="text-xs text-gray-500 px-1">
              +{date.events.length - 3} more
            </div>
          )}
        </div>
      )}
      
      {/* Today indicator */}
      {date.isToday && (
        <div className="absolute top-1 right-1">
          <span className="flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
        </div>
      )}
    </div>
  );
};

CalendarCell.displayName = 'CalendarCell';
