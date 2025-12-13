/**
 * CalendarView Component
 * Phase 6 Prompt 13: Integrated calendar with navigation, event management, and modal interactions
 * 
 * Features:
 * - Uses useCalendar for navigation state
 * - Uses useEventManager for data state (via props)
 * - Header with Month/Year, Prev/Today/Next buttons, and View Toggle
 * - Conditional rendering of MonthView or WeekView
 * - EventModal integration for Create and Edit modes
 * - Responsive layout
 */

import React, { useState } from 'react';
import type { CalendarEvent } from '@/types/calendar.types';
import { MonthView } from './MonthView';
import { WeekView } from './WeekView';
import { EventModal } from './EventModal';
import { Button } from '@/components/primitives/Button';
import { useCalendar } from '@/hooks/useCalendar';
import { formatDate } from '@/utils/date.utils';

/**
 * CalendarView Props
 */
export interface CalendarViewProps {
  events: CalendarEvent[];
  onEventAdd: (event: Omit<CalendarEvent, 'id'>) => void;
  onEventUpdate: (id: string, updates: Partial<CalendarEvent>) => void;
  onEventDelete: (id: string) => void;
}

const DEFAULT_CONFIG = {
  locale: 'en-US',
  firstDayOfWeek: 0,
  showWeekNumbers: false,
  highlightToday: true,
  allowMultipleSelection: false,
};

/**
 * CalendarView Component
 * Phase 6 Prompt 13: Main calendar view with integrated event management
 */
export const CalendarView: React.FC<CalendarViewProps> = ({
  events,
  onEventAdd,
  onEventUpdate,
  onEventDelete,
}) => {
  // Phase 6 Prompt 13: Use useCalendar for navigation state
  const { state, handlers } = useCalendar();
  const { currentDate, view } = state;
  const { nextMonth, prevMonth, goToToday, setView } = handlers;
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | undefined>();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  // Phase 6 Prompt 13: Pass onEventClick to open EventModal in 'Edit' mode
  const handleEventClick = (event: CalendarEvent): void => {
    setSelectedEvent(event);
    setModalMode('edit');
    setIsModalOpen(true);
  };
  
  // Phase 6 Prompt 13: Pass onCellClick to open EventModal in 'Create' mode
  const handleCellClick = (date: Date): void => {
    setSelectedDate(date);
    setSelectedEvent(undefined);
    setModalMode('create');
    setIsModalOpen(true);
  };
  
  // Handle modal save
  const handleModalSave = (eventData: Omit<CalendarEvent, 'id'> | CalendarEvent): void => {
    if (modalMode === 'create') {
      onEventAdd(eventData as Omit<CalendarEvent, 'id'>);
    } else if (modalMode === 'edit' && 'id' in eventData) {
      const { id, ...updates } = eventData as CalendarEvent;
      onEventUpdate(id, updates);
    }
  };
  
  // Handle modal delete
  const handleModalDelete = (id: string): void => {
    onEventDelete(id);
  };
  
  // Get display title for header
  const getDisplayTitle = (): string => {
    if (view === 'month') {
      return formatDate(currentDate, 'MMMM YYYY');
    } else {
      return `Week of ${formatDate(currentDate, 'MMM D, YYYY')}`;
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-card overflow-hidden">
      {/* Phase 6 Prompt 13: Header with Month/Year, Prev/Today/Next buttons, View Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 border-b border-neutral-200 bg-neutral-50">
        {/* Navigation Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={prevMonth}
            aria-label="Previous month"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </Button>
          
          <Button
            variant="secondary"
            size="sm"
            onClick={goToToday}
          >
            Today
          </Button>
          
          <Button
            variant="secondary"
            size="sm"
            onClick={nextMonth}
            aria-label="Next month"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
        
        {/* Current Month/Year Display */}
        <h2 className="text-2xl font-bold text-neutral-900">
          {getDisplayTitle()}
        </h2>
        
        {/* Phase 6 Prompt 13: View Toggle - 'Month' | 'Week' */}
        <div className="flex gap-2">
          <Button
            variant={view === 'month' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setView('month')}
          >
            Month
          </Button>
          <Button
            variant={view === 'week' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setView('week')}
          >
            Week
          </Button>
        </div>
      </div>
      
      {/* Calendar Body */}
      <div className="p-6">
        {/* Phase 6 Prompt 13: Conditional Rendering - If view === 'month', render MonthView */}
        {view === 'month' && (
          <MonthView
            currentDate={currentDate}
            events={events}
            onDateSelect={handleCellClick}
            onEventClick={handleEventClick}
            config={DEFAULT_CONFIG}
          />
        )}
        
        {/* Phase 6 Prompt 13: Conditional Rendering - If view === 'week', render WeekView */}
        {view === 'week' && (
          <WeekView
            currentDate={currentDate}
            events={events}
            onEventClick={handleEventClick}
          />
        )}
      </div>
      
      {/* Phase 6 Prompt 13: EventModal Integration */}
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleModalSave}
        onDelete={handleModalDelete}
        initialDate={selectedDate}
        existingEvent={selectedEvent}
      />
    </div>
  );
};

CalendarView.displayName = 'CalendarView';
