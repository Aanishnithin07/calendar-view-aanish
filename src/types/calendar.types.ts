/**
 * Core Calendar Type Definitions
 * Strict TypeScript types for Calendar Component Library
 * Phase 2: Core type definitions for calendar functionality
 */

// ============================================
// Event Types
// ============================================

/**
 * CalendarEvent - Core event type for calendar items
 * All fields are strictly typed for type safety
 */
export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  color: string;
  category?: string;
  allDay?: boolean;
  recurring?: RecurringPattern;
  metadata?: Record<string, unknown>;
}

export interface RecurringPattern {
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number;
  endDate?: Date;
  count?: number;
  daysOfWeek?: number[]; // 0-6, Sunday-Saturday
  dayOfMonth?: number;
  monthOfYear?: number;
}

// ============================================
// Calendar View Types
// ============================================

/**
 * ViewType - Supported calendar view types
 * Phase 2: month and week views
 */
export type ViewType = 'month' | 'week';

/**
 * CalendarViewType - Alias for ViewType (backwards compatibility)
 */
export type CalendarViewType = ViewType | 'day';

export interface CalendarDate {
  year: number;
  month: number; // 0-11
  day: number;
  date: Date;
  isToday: boolean;
  isCurrentMonth: boolean;
  isWeekend: boolean;
  isDisabled: boolean;
  events: CalendarEvent[];
}

export interface CalendarWeek {
  weekNumber: number;
  days: CalendarDate[];
}

export interface CalendarMonth {
  year: number;
  month: number; // 0-11
  monthName: string;
  weeks: CalendarWeek[];
}

// ============================================
// Calendar Configuration
// ============================================

export interface CalendarConfig {
  locale?: string;
  firstDayOfWeek?: number; // 0-6, Sunday-Saturday
  showWeekNumbers?: boolean;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  highlightToday?: boolean;
  allowMultipleSelection?: boolean;
}

// ============================================
// Calendar State
// ============================================

export interface CalendarState {
  currentDate: Date;
  selectedDates: Date[];
  viewType: CalendarViewType;
  events: CalendarEvent[];
  config: CalendarConfig;
}

// ============================================
// Component Props
// ============================================

/**
 * CalendarViewProps - Main calendar component props
 * Phase 2: Includes CRUD operations for events
 */
export interface CalendarViewProps {
  initialDate?: Date;
  events: CalendarEvent[];
  onEventAdd: (event: Omit<CalendarEvent, 'id'>) => void;
  onEventUpdate: (id: string, event: Partial<CalendarEvent>) => void;
  onEventDelete: (id: string) => void;
  onDateSelect?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
  config?: CalendarConfig;
  className?: string;
}

export interface MonthViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  selectedDates: Date[];
  onDateSelect: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
  config: CalendarConfig;
  className?: string;
}

export interface WeekViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  selectedDates: Date[];
  onDateSelect: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
  config: CalendarConfig;
  className?: string;
}

export interface CalendarCellProps {
  date: CalendarDate;
  isSelected: boolean;
  onSelect: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
  className?: string;
}

// ============================================
// Event Manager Types
// ============================================

export interface EventManagerActions {
  addEvent: (event: Omit<CalendarEvent, 'id'>) => string;
  updateEvent: (id: string, updates: Partial<CalendarEvent>) => void;
  deleteEvent: (id: string) => void;
  getEventsByDateRange: (startDate: Date, endDate: Date) => CalendarEvent[];
  getEventsByDate: (date: Date) => CalendarEvent[];
}

// ============================================
// Utility Types
// ============================================

export interface DateRange {
  start: Date;
  end: Date;
}

export type WeekDay = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

export type MonthName = 
  | 'January' | 'February' | 'March' | 'April' | 'May' | 'June'
  | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';
