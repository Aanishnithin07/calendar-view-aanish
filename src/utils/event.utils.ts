/**
 * Event Utility Functions
 * Utilities for managing and filtering calendar events
 */

import type { CalendarEvent } from '@/types/calendar.types';
import { isSameDay, isDateInRange, startOfDay, endOfDay } from './date.utils';

// ============================================
// Event Filtering
// ============================================

/**
 * Get events for a specific date
 */
export const getEventsForDate = (
  events: CalendarEvent[],
  date: Date
): CalendarEvent[] => {
  return events.filter(event => {
    const eventStart = startOfDay(event.startDate);
    const eventEnd = endOfDay(event.endDate);
    const targetDate = startOfDay(date);
    
    return isDateInRange(targetDate, eventStart, eventEnd);
  });
};

/**
 * Get events within a date range
 */
export const getEventsInRange = (
  events: CalendarEvent[],
  startDate: Date,
  endDate: Date
): CalendarEvent[] => {
  return events.filter(event => {
    // Check if event overlaps with the range
    return (
      event.startDate <= endDate &&
      event.endDate >= startDate
    );
  });
};

/**
 * Check if an event occurs on a specific date
 */
export const isEventOnDate = (event: CalendarEvent, date: Date): boolean => {
  return getEventsForDate([event], date).length > 0;
};

// ============================================
// Event Sorting
// ============================================

/**
 * Sort events by start date
 */
export const sortEventsByStartDate = (
  events: CalendarEvent[],
  ascending = true
): CalendarEvent[] => {
  return [...events].sort((a, b) => {
    const diff = a.startDate.getTime() - b.startDate.getTime();
    return ascending ? diff : -diff;
  });
};

/**
 * Sort events by duration
 */
export const sortEventsByDuration = (
  events: CalendarEvent[],
  ascending = true
): CalendarEvent[] => {
  return [...events].sort((a, b) => {
    const durationA = a.endDate.getTime() - a.startDate.getTime();
    const durationB = b.endDate.getTime() - b.startDate.getTime();
    const diff = durationA - durationB;
    return ascending ? diff : -diff;
  });
};

// ============================================
// Event Validation
// ============================================

/**
 * Validate event data
 */
export const isValidEvent = (event: Partial<CalendarEvent>): boolean => {
  if (!event.title || event.title.trim() === '') return false;
  if (!event.startDate || !event.endDate) return false;
  if (!(event.startDate instanceof Date) || !(event.endDate instanceof Date)) return false;
  if (isNaN(event.startDate.getTime()) || isNaN(event.endDate.getTime())) return false;
  if (event.startDate > event.endDate) return false;
  
  return true;
};

/**
 * Check if two events overlap
 */
export const doEventsOverlap = (
  event1: CalendarEvent,
  event2: CalendarEvent
): boolean => {
  return (
    event1.startDate <= event2.endDate &&
    event1.endDate >= event2.startDate
  );
};

// ============================================
// Event Transformation
// ============================================

/**
 * Calculate event duration in days
 */
export const getEventDurationInDays = (event: CalendarEvent): number => {
  const start = startOfDay(event.startDate);
  const end = startOfDay(event.endDate);
  const diff = end.getTime() - start.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
};

/**
 * Check if event is multi-day
 */
export const isMultiDayEvent = (event: CalendarEvent): boolean => {
  return !isSameDay(event.startDate, event.endDate);
};

/**
 * Check if event is all-day
 */
export const isAllDayEvent = (event: CalendarEvent): boolean => {
  return event.allDay === true;
};

// ============================================
// Event Color Utilities
// ============================================

/**
 * Get default event color if not specified
 */
export const getEventColor = (event: CalendarEvent): string => {
  return event.color || '#3b82f6'; // Default to blue
};

/**
 * Generate color for event category
 */
export const generateColorByCategory = (category: string): string => {
  const colors: Record<string, string> = {
    work: '#3b82f6',
    personal: '#10b981',
    meeting: '#f59e0b',
    reminder: '#8b5cf6',
    holiday: '#ef4444',
    default: '#6b7280',
  };
  
  return colors[category.toLowerCase()] || colors.default;
};

// ============================================
// Recurring Event Utilities
// ============================================

/**
 * Check if event is recurring
 */
export const isRecurringEvent = (event: CalendarEvent): boolean => {
  return event.recurring !== undefined;
};

/**
 * Generate recurring event instances for a date range
 * Note: Simplified implementation - can be extended for complex patterns
 */
export const expandRecurringEvent = (
  event: CalendarEvent,
  startDate: Date,
  endDate: Date
): CalendarEvent[] => {
  if (!isRecurringEvent(event) || !event.recurring) {
    return [event];
  }
  
  const instances: CalendarEvent[] = [];
  const { frequency, interval, count, endDate: recurringEndDate } = event.recurring;
  
  const currentDate = new Date(event.startDate);
  let instanceCount = 0;
  const maxDate = recurringEndDate || endDate;
  
  while (currentDate <= maxDate && (!count || instanceCount < count)) {
    if (currentDate >= startDate && currentDate <= endDate) {
      const duration = event.endDate.getTime() - event.startDate.getTime();
      instances.push({
        ...event,
        id: `${event.id}-${instanceCount}`,
        startDate: new Date(currentDate),
        endDate: new Date(currentDate.getTime() + duration),
      });
    }
    
    // Move to next occurrence
    switch (frequency) {
      case 'daily':
        currentDate.setDate(currentDate.getDate() + interval);
        break;
      case 'weekly':
        currentDate.setDate(currentDate.getDate() + (7 * interval));
        break;
      case 'monthly':
        currentDate.setMonth(currentDate.getMonth() + interval);
        break;
      case 'yearly':
        currentDate.setFullYear(currentDate.getFullYear() + interval);
        break;
    }
    
    instanceCount++;
    
    // Safety check to prevent infinite loops
    if (instanceCount > 1000) break;
  }
  
  return instances;
};

// ============================================
// Event Grouping
// ============================================

/**
 * Group events by date
 */
export const groupEventsByDate = (
  events: CalendarEvent[]
): Map<string, CalendarEvent[]> => {
  const grouped = new Map<string, CalendarEvent[]>();
  
  events.forEach(event => {
    const dateKey = startOfDay(event.startDate).toISOString().split('T')[0];
    const existing = grouped.get(dateKey) || [];
    grouped.set(dateKey, [...existing, event]);
  });
  
  return grouped;
};

/**
 * Get event count for a date
 */
export const getEventCountForDate = (
  events: CalendarEvent[],
  date: Date
): number => {
  return getEventsForDate(events, date).length;
};
