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
import { EmptyState } from './EmptyState';
import { Button } from '@/components/primitives/Button';
import { Toast } from '@/components/primitives/Toast';
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
  const { nextMonth, prevMonth, nextWeek, prevWeek, goToToday, setView } = handlers;
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | undefined>();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  // Delete confirmation state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  
  // Toast notification state
  const [toast, setToast] = useState<{message: string; type: 'success' | 'error' | 'info'} | null>(null);
  
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
      setToast({ message: 'Event created successfully!', type: 'success' });
    } else if (modalMode === 'edit' && 'id' in eventData) {
      const { id, ...updates } = eventData as CalendarEvent;
      onEventUpdate(id, updates);
      setToast({ message: 'Event updated successfully!', type: 'success' });
    }
  };
  
  // Handle modal delete with confirmation
  const handleModalDelete = (id: string): void => {
    setEventToDelete(id);
    setShowDeleteConfirm(true);
  };
  
  // Confirm delete
  const confirmDelete = (): void => {
    if (eventToDelete) {
      onEventDelete(eventToDelete);
      setShowDeleteConfirm(false);
      setEventToDelete(null);
      setIsModalOpen(false);
      setToast({ message: 'Event deleted successfully!', type: 'success' });
    }
  };

  // Keyboard shortcuts for better UX
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // N key - New event
      if (e.key === 'n' || e.key === 'N') {
        if (!isModalOpen && !showDeleteConfirm) {
          handleFabClick();
        }
      }
      
      // Left arrow - Previous month/week
      if (e.key === 'ArrowLeft' && !isModalOpen && !showDeleteConfirm) {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
          return; // Don't interfere with input navigation
        }
        if (view === 'month') {
          prevMonth();
        } else {
          prevWeek();
        }
      }
      
      // Right arrow - Next month/week
      if (e.key === 'ArrowRight' && !isModalOpen && !showDeleteConfirm) {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
          return; // Don't interfere with input navigation
        }
        if (view === 'month') {
          nextMonth();
        } else {
          nextWeek();
        }
      }
      
      // T key - Go to today
      if ((e.key === 't' || e.key === 'T') && !isModalOpen && !showDeleteConfirm) {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
          return;
        }
        goToToday();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, showDeleteConfirm, view, nextMonth, prevMonth, nextWeek, prevWeek, goToToday]);
  
  // Handle FAB click to create new event
  const handleFabClick = (): void => {
    setSelectedDate(new Date());
    setSelectedEvent(undefined);
    setModalMode('create');
    setIsModalOpen(true);
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 sm:p-6 border-b border-neutral-200 bg-neutral-50">
        {/* Navigation Controls */}
        <div className="flex items-center gap-2 justify-between sm:justify-start">
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
          
          {/* Current Month/Year Display - Mobile */}
          <h2 className="text-lg sm:hidden font-bold text-neutral-900">
            {getDisplayTitle()}
          </h2>
        </div>
        
        {/* Current Month/Year Display - Desktop */}
        <h2 className="hidden sm:block text-2xl font-bold text-neutral-900">
          {getDisplayTitle()}
        </h2>
        
        {/* Phase 6 Prompt 13: View Toggle - 'Month' | 'Week' */}
        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            variant={view === 'month' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setView('month')}
            className="flex-1 sm:flex-none"
          >
            Month
          </Button>
          <Button
            variant={view === 'week' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setView('week')}
            className="flex-1 sm:flex-none"
          >
            Week
          </Button>
        </div>
      </div>
      
      {/* Calendar Body */}
      <div className="p-6">
        {/* Show EmptyState when no events exist */}
        {events.length === 0 ? (
          <EmptyState onCreateEvent={handleFabClick} />
        ) : (
          <>
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
          </>
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
      
      {/* Floating Action Button for Quick Event Creation */}
      {events.length > 0 && (
        <button
          onClick={handleFabClick}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-12 h-12 sm:w-14 sm:h-14 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group z-50"
          aria-label="Create new event"
          title="Create new event (Press N)"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 4v16m8-8H4" />
          </svg>
        </button>
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50" onClick={() => setShowDeleteConfirm(false)}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900">Delete Event?</h3>
                <p className="text-sm text-neutral-600">This action cannot be undone.</p>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

CalendarView.displayName = 'CalendarView';
