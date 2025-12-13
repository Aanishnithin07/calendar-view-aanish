/**
 * Date Utility Functions
 * Production-grade date manipulation utilities with strict TypeScript
 */

import type { MonthName, WeekDay } from '@/types/calendar.types';

// ============================================
// Date Comparison Utilities
// ============================================

/**
 * Check if two dates are the same day (ignoring time)
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

/**
 * Check if date is today
 */
export const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date());
};

/**
 * Check if date is in the current month
 */
export const isCurrentMonth = (date: Date, referenceDate: Date): boolean => {
  return (
    date.getFullYear() === referenceDate.getFullYear() &&
    date.getMonth() === referenceDate.getMonth()
  );
};

/**
 * Check if date is a weekend (Saturday or Sunday)
 */
export const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

/**
 * Check if date falls within a range
 */
export const isDateInRange = (
  date: Date,
  startDate: Date,
  endDate: Date
): boolean => {
  const time = date.getTime();
  return time >= startDate.getTime() && time <= endDate.getTime();
};

// ============================================
// Date Formatting
// ============================================

/**
 * Get month name from month number (0-11)
 */
export const getMonthName = (month: number, locale = 'en-US'): MonthName => {
  const date = new Date(2000, month, 1);
  return date.toLocaleDateString(locale, { month: 'long' }) as MonthName;
};

/**
 * Get short month name (e.g., "Jan", "Feb")
 */
export const getShortMonthName = (month: number, locale = 'en-US'): string => {
  const date = new Date(2000, month, 1);
  return date.toLocaleDateString(locale, { month: 'short' });
};

/**
 * Get day name from day number (0-6, Sunday-Saturday)
 */
export const getDayName = (day: number, locale = 'en-US'): WeekDay => {
  const date = new Date(2000, 0, day + 2); // Jan 2, 2000 is Sunday
  return date.toLocaleDateString(locale, { weekday: 'long' }) as WeekDay;
};

/**
 * Get short day name (e.g., "Mon", "Tue")
 */
export const getShortDayName = (day: number, locale = 'en-US'): string => {
  const date = new Date(2000, 0, day + 2);
  return date.toLocaleDateString(locale, { weekday: 'short' });
};

/**
 * Format date to string with custom format support
 * Phase 2: Enhanced with format string support
 * 
 * @param date - The date to format
 * @param formatStr - Format string or preset ('short' | 'long' | 'numeric' | custom)
 * @param locale - Locale for formatting (default: 'en-US')
 * 
 * Supported format tokens:
 * - YYYY: 4-digit year (e.g., 2025)
 * - MM: 2-digit month (e.g., 01-12)
 * - DD: 2-digit day (e.g., 01-31)
 * - MMM: Short month name (e.g., Jan)
 * - MMMM: Full month name (e.g., January)
 * - ddd: Short day name (e.g., Mon)
 * - dddd: Full day name (e.g., Monday)
 */
export const formatDate = (
  date: Date,
  formatStr: string | 'short' | 'long' | 'numeric' = 'short',
  locale = 'en-US'
): string => {
  // Handle preset formats
  if (formatStr === 'long') {
    return date.toLocaleDateString(locale, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  
  if (formatStr === 'numeric') {
    return date.toLocaleDateString(locale);
  }
  
  if (formatStr === 'short') {
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
  
  // Handle custom format strings
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const dayOfWeek = date.getDay();
  
  const tokens: Record<string, string> = {
    'YYYY': year.toString(),
    'MM': String(month + 1).padStart(2, '0'),
    'DD': String(day).padStart(2, '0'),
    'MMM': getShortMonthName(month, locale),
    'MMMM': getMonthName(month, locale),
    'ddd': getShortDayName(dayOfWeek, locale),
    'dddd': getDayName(dayOfWeek, locale),
  };
  
  let result = formatStr;
  Object.keys(tokens).forEach(token => {
    result = result.replace(new RegExp(token, 'g'), tokens[token]);
  });
  
  return result;
};

// ============================================
// Date Manipulation
// ============================================

/**
 * Add days to a date
 */
export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Add months to a date
 */
export const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

/**
 * Add years to a date
 */
export const addYears = (date: Date, years: number): Date => {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
};

/**
 * Get start of day (00:00:00.000)
 */
export const startOfDay = (date: Date): Date => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
};

/**
 * Get end of day (23:59:59.999)
 */
export const endOfDay = (date: Date): Date => {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
};

/**
 * Get start of month
 */
export const startOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

/**
 * Get end of month
 */
export const endOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

/**
 * Get start of week
 */
export const startOfWeek = (date: Date, firstDayOfWeek = 0): Date => {
  const result = new Date(date);
  const day = result.getDay();
  const diff = (day < firstDayOfWeek ? 7 : 0) + day - firstDayOfWeek;
  result.setDate(result.getDate() - diff);
  return startOfDay(result);
};

/**
 * Get end of week
 */
export const endOfWeek = (date: Date, firstDayOfWeek = 0): Date => {
  const result = startOfWeek(date, firstDayOfWeek);
  result.setDate(result.getDate() + 6);
  return endOfDay(result);
};

// ============================================
// Calendar Grid Utilities
// ============================================

/**
 * Get number of days in month
 */
export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

/**
 * Get first day of month (0-6, Sunday-Saturday)
 */
export const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

/**
 * Get all dates for a month view (including padding from previous/next months)
 */
export const getMonthDates = (
  year: number,
  month: number,
  firstDayOfWeek = 0
): Date[] => {
  const dates: Date[] = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  // Add dates from previous month to fill first week
  const startPadding = (firstDay.getDay() - firstDayOfWeek + 7) % 7;
  for (let i = startPadding - 1; i >= 0; i--) {
    dates.push(addDays(firstDay, -i - 1));
  }
  
  // Add all dates in current month
  const daysInMonth = getDaysInMonth(year, month);
  for (let i = 0; i < daysInMonth; i++) {
    dates.push(new Date(year, month, i + 1));
  }
  
  // Add dates from next month to complete last week
  const endPadding = (7 - ((dates.length % 7) || 7)) % 7;
  for (let i = 1; i <= endPadding; i++) {
    dates.push(addDays(lastDay, i));
  }
  
  return dates;
};

/**
 * Get calendar grid - returns exactly 42 dates (6 weeks x 7 days) for Month View
 * Phase 2: Core calendar grid logic
 * 
 * @param date - The reference date (any date in the target month)
 * @param firstDayOfWeek - 0 for Sunday, 1 for Monday, etc. (default: 0)
 * @returns Array of exactly 42 dates representing the calendar grid
 * 
 * Algorithm:
 * 1. Find the first day of the current month
 * 2. Backtrack to the previous Monday/Sunday (based on locale)
 * 3. Fill forward to get exactly 42 dates (6 weeks)
 */
export const getCalendarGrid = (
  date: Date,
  firstDayOfWeek: number = 0
): Date[] => {
  const year = date.getFullYear();
  const month = date.getMonth();
  
  // Step 1: Get the first day of the current month
  const firstDayOfMonth = new Date(year, month, 1);
  
  // Step 2: Backtrack to the start of the week (Monday or Sunday based on locale)
  // Find how many days we need to go back
  const firstDayOfMonthWeekday = firstDayOfMonth.getDay();
  const daysToBacktrack = (firstDayOfMonthWeekday - firstDayOfWeek + 7) % 7;
  
  // Calculate the starting date of the grid
  const gridStartDate = new Date(firstDayOfMonth);
  gridStartDate.setDate(gridStartDate.getDate() - daysToBacktrack);
  
  // Step 3: Generate exactly 42 dates (6 weeks x 7 days)
  const calendarGrid: Date[] = [];
  for (let i = 0; i < 42; i++) {
    const currentDate = new Date(gridStartDate);
    currentDate.setDate(gridStartDate.getDate() + i);
    calendarGrid.push(currentDate);
  }
  
  return calendarGrid;
};

/**
 * Get week number of year (ISO 8601)
 */
export const getWeekNumber = (date: Date): number => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
};

// ============================================
// Date Validation
// ============================================

/**
 * Check if date is valid
 */
export const isValidDate = (date: Date): boolean => {
  return date instanceof Date && !isNaN(date.getTime());
};

/**
 * Check if date is disabled based on min/max dates
 */
export const isDateDisabled = (
  date: Date,
  minDate?: Date,
  maxDate?: Date,
  disabledDates?: Date[]
): boolean => {
  if (minDate && date < minDate) return true;
  if (maxDate && date > maxDate) return true;
  if (disabledDates?.some(d => isSameDay(d, date))) return true;
  return false;
};
