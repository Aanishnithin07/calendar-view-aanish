/**
 * useEventManager Hook
 * Phase 6 Prompt 10: Custom hook for managing calendar events with localStorage persistence
 * 
 * Features:
 * - Initialize state from localStorage (key: 'calendar-events')
 * - CRUD operations: addEvent, updateEvent, deleteEvent
 * - UUID generation for new events
 * - Automatic sync to localStorage on state changes
 * - Bonus Points: LocalStorage persistence (+2)
 */

import { useState, useCallback, useEffect } from 'react';
import type { CalendarEvent } from '@/types/calendar.types';

const STORAGE_KEY = 'calendar-events';

export interface UseEventManagerReturn {
  events: CalendarEvent[];
  addEvent: (event: Omit<CalendarEvent, 'id'>) => string;
  updateEvent: (id: string, updates: Partial<CalendarEvent>) => void;
  deleteEvent: (id: string) => void;
}

/**
 * Generate a UUID for an event
 * Simple UUID v4 implementation
 */
const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * Load events from localStorage
 * Converts date strings back to Date objects
 */
const loadEventsFromStorage = (): CalendarEvent[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }
    
    const parsed = JSON.parse(stored);
    // Convert date strings back to Date objects
    return parsed.map((event: CalendarEvent) => ({
      ...event,
      startDate: new Date(event.startDate),
      endDate: new Date(event.endDate),
    }));
  } catch (error) {
    console.error('Error loading events from localStorage:', error);
    return [];
  }
};

/**
 * Save events to localStorage
 */
const saveEventsToStorage = (events: CalendarEvent[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch (error) {
    console.error('Error saving events to localStorage:', error);
  }
};

/**
 * useEventManager Hook
 * Phase 6 Prompt 10: Manages calendar events with localStorage persistence
 */
export const useEventManager = (): UseEventManagerReturn => {
  // Phase 6 Prompt 10: Initialize from localStorage if available, otherwise empty array
  const [events, setEvents] = useState<CalendarEvent[]>(() => {
    return loadEventsFromStorage();
  });
  
  // Phase 6 Prompt 10: useEffect to sync changes to localStorage
  useEffect(() => {
    saveEventsToStorage(events);
  }, [events]);
  
  // Phase 6 Prompt 10: addEvent - Generate UUID, add to state, save to localStorage
  const addEvent = useCallback((event: Omit<CalendarEvent, 'id'>): string => {
    const id = generateUUID();
    const newEvent: CalendarEvent = { ...event, id };
    
    setEvents(prev => [...prev, newEvent]);
    
    return id;
  }, []);
  
  // Phase 6 Prompt 10: updateEvent - Update specific event and save
  const updateEvent = useCallback((
    id: string, 
    updates: Partial<CalendarEvent>
  ): void => {
    setEvents(prev => 
      prev.map(event => 
        event.id === id ? { ...event, ...updates } : event
      )
    );
  }, []);
  
  // Phase 6 Prompt 10: deleteEvent - Remove and save
  const deleteEvent = useCallback((id: string): void => {
    setEvents(prev => prev.filter(event => event.id !== id));
  }, []);
  
  // Phase 6 Prompt 10: Return { events, addEvent, updateEvent, deleteEvent }
  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
  };
};
