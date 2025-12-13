/**
 * useCalendar Hook
 * Custom hook for managing calendar state and navigation
 * Phase 2: Structured with state and handlers for performance
 */

import { useState, useCallback } from 'react';
import type { ViewType } from '@/types/calendar.types';
import { addMonths, addDays } from '@/utils/date.utils';

/**
 * Options for initializing the useCalendar hook
 */
export interface UseCalendarOptions {
  initialDate?: Date;
  initialView?: ViewType;
}

/**
 * Calendar state
 */
export interface CalendarState {
  currentDate: Date;
  view: ViewType;
}

/**
 * Calendar handlers (all memoized with useCallback)
 */
export interface CalendarHandlers {
  nextMonth: () => void;
  prevMonth: () => void;
  nextWeek: () => void;
  prevWeek: () => void;
  goToToday: () => void;
  setView: (view: ViewType) => void;
}

/**
 * Return type for useCalendar hook
 * Phase 2: Returns { state, handlers } structure
 */
export interface UseCalendarReturn {
  state: CalendarState;
  handlers: CalendarHandlers;
}

/**
 * useCalendar - Custom hook for calendar state management
 * Phase 2: Performance optimized with useCallback
 * 
 * @param options - Initial configuration
 * @returns Object with state and handlers
 * 
 * @example
 * const { state, handlers } = useCalendar({
 *   initialDate: new Date(),
 *   initialView: 'month'
 * });
 */
export const useCalendar = (
  options: UseCalendarOptions = {}
): UseCalendarReturn => {
  const { initialDate = new Date(), initialView = 'month' } = options;
  
  // State management
  const [currentDate, setCurrentDate] = useState<Date>(initialDate);
  const [view, setView] = useState<ViewType>(initialView);
  
  // Handler: Navigate to next month
  // Performance: Memoized with useCallback to prevent unnecessary re-renders
  const nextMonth = useCallback((): void => {
    setCurrentDate(prev => addMonths(prev, 1));
  }, []);
  
  // Handler: Navigate to previous month
  // Performance: Memoized with useCallback to prevent unnecessary re-renders
  const prevMonth = useCallback((): void => {
    setCurrentDate(prev => addMonths(prev, -1));
  }, []);
  
  // Handler: Navigate to next week
  // Performance: Memoized with useCallback to prevent unnecessary re-renders
  const nextWeek = useCallback((): void => {
    setCurrentDate(prev => addDays(prev, 7));
  }, []);
  
  // Handler: Navigate to previous week
  // Performance: Memoized with useCallback to prevent unnecessary re-renders
  const prevWeek = useCallback((): void => {
    setCurrentDate(prev => addDays(prev, -7));
  }, []);
  
  // Handler: Navigate to today's date
  // Performance: Memoized with useCallback to prevent unnecessary re-renders
  const goToToday = useCallback((): void => {
    setCurrentDate(new Date());
  }, []);
  
  // Handler: Change view type (month/week)
  // Performance: Memoized with useCallback to prevent unnecessary re-renders
  const handleSetView = useCallback((newView: ViewType): void => {
    setView(newView);
  }, []);
  
  // Phase 2: Return structured state and handlers
  return {
    state: {
      currentDate,
      view,
    },
    handlers: {
      nextMonth,
      prevMonth,
      nextWeek,
      prevWeek,
      goToToday,
      setView: handleSetView,
    },
  };
};
