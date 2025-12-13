/**
 * WeekView Component
 * Phase 6 Prompt 12: 7-day horizontal layout with time slots (00:00 - 23:00)
 * 
 * Features:
 * - Header row with day name and date, highlighting isToday
 * - Time grid with time labels (12 AM - 11 PM) in left column
 * - 7 columns for each day
 * - Event positioning using absolute positioning based on start time
 * - Event height calculated from duration
 * - 80px (h-20) per hour slot
 * - border-neutral-200 for grid lines
 */

import React from 'react';
import type { CalendarEvent } from '@/types/calendar.types';
import {
  startOfWeek,
  addDays,
  isSameDay,
  formatDate,
} from '@/utils/date.utils';

/**
 * WeekView Props
 * Phase 6 Prompt 12 specification
 */
export interface WeekViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
}

/**
 * Generate time labels for 24 hours (12 AM - 11 PM)
 */
const generateTimeLabels = (): string[] => {
  return Array.from({ length: 24 }, (_, hour) => {
    const period = hour < 12 ? 'AM' : 'PM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour} ${period}`;
  });
};

/**
 * Calculate top position based on time (hours and minutes)
 * Each hour slot is 80px (h-20)
 */
const calculateTopPosition = (date: Date): number => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return (hours * 80) + (minutes * 80 / 60);
};

/**
 * Calculate height based on duration
 * Returns height in pixels
 */
const calculateHeight = (startDate: Date, endDate: Date): number => {
  const durationMs = endDate.getTime() - startDate.getTime();
  const durationHours = durationMs / (1000 * 60 * 60);
  return Math.max(durationHours * 80, 20); // Minimum 20px height
};

/**
 * Filter events for a specific day
 */
const getEventsForDay = (events: CalendarEvent[], date: Date): CalendarEvent[] => {
  return events.filter(event => {
    const eventDate = new Date(event.startDate);
    return eventDate.getFullYear() === date.getFullYear() &&
           eventDate.getMonth() === date.getMonth() &&
           eventDate.getDate() === date.getDate();
  });
};

/**
 * Format time as HH:MM AM/PM
 */
const formatEventTime = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours < 12 ? 'AM' : 'PM';
  const displayHour = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  return `${displayHour}:${minutes.toString().padStart(2, '0')} ${period}`;
};

/**
 * WeekView Component
 * Renders a 7-day week with time slots and positioned events
 */
export const WeekView: React.FC<WeekViewProps> = ({
  currentDate,
  events,
  onEventClick,
}) => {
  const today = new Date();
  
  // Phase 6 Prompt 12: Calculate the 7 days of the current week (Sunday to Saturday or Mon-Sun)
  const weekStart = startOfWeek(currentDate, 0); // Start on Sunday
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  
  const timeLabels = generateTimeLabels();
  
  return (
    <div className="week-view overflow-x-auto">
      {/* Phase 6 Prompt 12: Header Row showing Day Name and Date, highlighting isToday */}
      <div className="grid grid-cols-[80px_repeat(7,1fr)] border-b-2 border-neutral-300 sticky top-0 bg-white z-10">
        <div className="border-r border-neutral-200" /> {/* Empty corner cell */}
        {weekDates.map((date, index) => {
          const isToday = isSameDay(date, today);
          const dayName = formatDate(date, 'ddd'); // Mon, Tue, etc.
          const dayNumber = date.getDate();
          
          return (
            <div
              key={`header-${index}`}
              className={`text-center py-3 border-r border-neutral-200 last:border-r-0 ${
                isToday ? 'bg-primary-50' : ''
              }`}
            >
              <div className={`text-sm font-semibold uppercase ${
                isToday ? 'text-primary-600' : 'text-neutral-700'
              }`}>
                {dayName}
              </div>
              <div className={`text-2xl font-bold mt-1 ${
                isToday ? 'text-primary-500' : 'text-neutral-900'
              }`}>
                {isToday ? (
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-500 text-white">
                    {dayNumber}
                  </span>
                ) : (
                  dayNumber
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Phase 6 Prompt 12: Time Grid */}
      <div className="grid grid-cols-[80px_repeat(7,1fr)] relative">
        {/* Phase 6 Prompt 12: Left column - Time labels (12 AM - 11 PM) */}
        <div className="border-r border-neutral-200">
          {timeLabels.map((label, index) => (
            <div
              key={`time-${index}`}
              className="h-20 flex items-start justify-end pr-2 pt-1 text-xs text-neutral-500 font-medium border-b border-neutral-200"
            >
              {label}
            </div>
          ))}
        </div>
        
        {/* Phase 6 Prompt 12: Main area - 7 columns (one for each day) */}
        {weekDates.map((date, dayIndex) => {
          const dayEvents = getEventsForDay(events, date);
          
          return (
            <div
              key={`day-${dayIndex}`}
              className="relative border-r border-neutral-200 last:border-r-0"
            >
              {/* Hour grid lines */}
              {timeLabels.map((_, hourIndex) => (
                <div
                  key={`grid-${dayIndex}-${hourIndex}`}
                  className="h-20 border-b border-neutral-200"
                />
              ))}
              
              {/* Phase 6 Prompt 12: Event Positioning - absolute positioning with calculated top and height */}
              {dayEvents.map((event) => {
                const top = calculateTopPosition(event.startDate);
                const height = calculateHeight(event.startDate, event.endDate);
                
                return (
                  <div
                    key={event.id}
                    className="absolute left-1 right-1 rounded px-2 py-1 text-xs overflow-hidden cursor-pointer hover:opacity-90 transition-opacity shadow-sm"
                    style={{
                      top: `${top}px`,
                      height: `${height}px`,
                      backgroundColor: event.color || '#0ea5e9',
                      color: 'white',
                    }}
                    onClick={() => onEventClick?.(event)}
                    title={`${event.title}\n${formatEventTime(event.startDate)} - ${formatEventTime(event.endDate)}`}
                  >
                    <div className="font-semibold truncate">{event.title}</div>
                    {height > 30 && (
                      <div className="text-[10px] opacity-90 truncate">
                        {formatEventTime(event.startDate)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

WeekView.displayName = 'WeekView';
