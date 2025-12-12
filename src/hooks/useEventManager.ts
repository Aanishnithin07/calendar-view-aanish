/**
 * useEventManager Hook
 * Custom hook for managing calendar events (CRUD operations)
 */

import { useState, useCallback } from 'react';
import type { CalendarEvent } from '@/types/calendar.types';
import { 
  getEventsForDate, 
  getEventsInRange,
  sortEventsByStartDate,
  isValidEvent 
} from '@/utils/event.utils';

export interface UseEventManagerReturn {
  events: CalendarEvent[];
  addEvent: (event: Omit<CalendarEvent, 'id'>) => string;
  updateEvent: (id: string, updates: Partial<CalendarEvent>) => void;
  deleteEvent: (id: string) => void;
  getEventById: (id: string) => CalendarEvent | undefined;
  getEventsByDate: (date: Date) => CalendarEvent[];
  getEventsByDateRange: (startDate: Date, endDate: Date) => CalendarEvent[];
  clearAllEvents: () => void;
}

/**
 * Generate a unique ID for an event
 */
const generateEventId = (): string => {
  return `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const useEventManager = (
  initialEvents: CalendarEvent[] = []
): UseEventManagerReturn => {
  const [events, setEvents] = useState<CalendarEvent[]>(
    sortEventsByStartDate(initialEvents)
  );
  
  const addEvent = useCallback((event: Omit<CalendarEvent, 'id'>): string => {
    if (!isValidEvent(event)) {
      throw new Error('Invalid event data');
    }
    
    const id = generateEventId();
    const newEvent: CalendarEvent = { ...event, id };
    
    setEvents(prev => sortEventsByStartDate([...prev, newEvent]));
    
    return id;
  }, []);
  
  const updateEvent = useCallback((
    id: string, 
    updates: Partial<CalendarEvent>
  ): void => {
    setEvents(prev => {
      const updatedEvents = prev.map(event => {
        if (event.id === id) {
          const updated = { ...event, ...updates };
          if (!isValidEvent(updated)) {
            console.error('Invalid event update, skipping');
            return event;
          }
          return updated;
        }
        return event;
      });
      
      return sortEventsByStartDate(updatedEvents);
    });
  }, []);
  
  const deleteEvent = useCallback((id: string): void => {
    setEvents(prev => prev.filter(event => event.id !== id));
  }, []);
  
  const getEventById = useCallback((id: string): CalendarEvent | undefined => {
    return events.find(event => event.id === id);
  }, [events]);
  
  const getEventsByDate = useCallback((date: Date): CalendarEvent[] => {
    return getEventsForDate(events, date);
  }, [events]);
  
  const getEventsByDateRange = useCallback((
    startDate: Date, 
    endDate: Date
  ): CalendarEvent[] => {
    return getEventsInRange(events, startDate, endDate);
  }, [events]);
  
  const clearAllEvents = useCallback((): void => {
    setEvents([]);
  }, []);
  
  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventById,
    getEventsByDate,
    getEventsByDateRange,
    clearAllEvents,
  };
};
