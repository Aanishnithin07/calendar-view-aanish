/**
 * useCalendar Hook
 * Custom hook for managing calendar state and navigation
 */

import { useState, useCallback } from 'react';
import type { CalendarConfig, CalendarViewType } from '@/types/calendar.types';
import { addMonths, addDays } from '@/utils/date.utils';

export interface UseCalendarOptions {
  initialDate?: Date;
  config?: CalendarConfig;
}

export interface UseCalendarReturn {
  currentDate: Date;
  selectedDates: Date[];
  viewType: CalendarViewType;
  config: CalendarConfig;
  goToToday: () => void;
  goToDate: (date: Date) => void;
  nextPeriod: () => void;
  previousPeriod: () => void;
  selectDate: (date: Date) => void;
  clearSelection: () => void;
  setViewType: (type: CalendarViewType) => void;
}

const DEFAULT_CONFIG: CalendarConfig = {
  locale: 'en-US',
  firstDayOfWeek: 0,
  showWeekNumbers: false,
  highlightToday: true,
  allowMultipleSelection: false,
};

export const useCalendar = (
  options: UseCalendarOptions = {}
): UseCalendarReturn => {
  const { initialDate = new Date(), config = {} } = options;
  
  const [currentDate, setCurrentDate] = useState<Date>(initialDate);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [viewType, setViewType] = useState<CalendarViewType>('month');
  
  const mergedConfig: CalendarConfig = { ...DEFAULT_CONFIG, ...config };
  
  const goToToday = useCallback((): void => {
    setCurrentDate(new Date());
  }, []);
  
  const goToDate = useCallback((date: Date): void => {
    setCurrentDate(date);
  }, []);
  
  const nextPeriod = useCallback((): void => {
    setCurrentDate(prev => {
      switch (viewType) {
        case 'month':
          return addMonths(prev, 1);
        case 'week':
          return addDays(prev, 7);
        case 'day':
          return addDays(prev, 1);
        default:
          return prev;
      }
    });
  }, [viewType]);
  
  const previousPeriod = useCallback((): void => {
    setCurrentDate(prev => {
      switch (viewType) {
        case 'month':
          return addMonths(prev, -1);
        case 'week':
          return addDays(prev, -7);
        case 'day':
          return addDays(prev, -1);
        default:
          return prev;
      }
    });
  }, [viewType]);
  
  const selectDate = useCallback((date: Date): void => {
    setSelectedDates(prev => {
      if (mergedConfig.allowMultipleSelection) {
        const isAlreadySelected = prev.some(d => d.getTime() === date.getTime());
        if (isAlreadySelected) {
          return prev.filter(d => d.getTime() !== date.getTime());
        }
        return [...prev, date];
      }
      return [date];
    });
  }, [mergedConfig.allowMultipleSelection]);
  
  const clearSelection = useCallback((): void => {
    setSelectedDates([]);
  }, []);
  
  return {
    currentDate,
    selectedDates,
    viewType,
    config: mergedConfig,
    goToToday,
    goToDate,
    nextPeriod,
    previousPeriod,
    selectDate,
    clearSelection,
    setViewType,
  };
};
