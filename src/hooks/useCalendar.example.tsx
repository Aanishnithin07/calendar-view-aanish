/**
 * useCalendar Hook Usage Example
 * Demonstrates the Phase 2 hook structure with state and handlers
 */

import React from 'react';
import { useCalendar } from './useCalendar';
import type { ViewType } from '@/types/calendar.types';

/**
 * Example component showing useCalendar hook usage
 */
export const CalendarExample: React.FC = () => {
  // Phase 2: Hook returns { state, handlers }
  const { state, handlers } = useCalendar({
    initialDate: new Date(),
    initialView: 'month',
  });

  // Destructure state
  const { currentDate, view } = state;

  // Destructure handlers (all are memoized with useCallback)
  const { nextMonth, prevMonth, goToToday, setView } = handlers;

  // Handle view toggle
  const toggleView = (): void => {
    const newView: ViewType = view === 'month' ? 'week' : 'month';
    setView(newView);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">useCalendar Hook Demo</h2>

      {/* Current State Display */}
      <div className="mb-4 p-3 bg-neutral-50 rounded">
        <p className="font-semibold">Current State:</p>
        <p>Date: {currentDate.toLocaleDateString()}</p>
        <p>View: {view}</p>
      </div>

      {/* Navigation Controls */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={prevMonth}
          className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
        >
          Previous Month
        </button>
        
        <button
          onClick={goToToday}
          className="px-4 py-2 bg-neutral-700 text-white rounded hover:bg-neutral-900"
        >
          Today
        </button>
        
        <button
          onClick={nextMonth}
          className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
        >
          Next Month
        </button>
      </div>

      {/* View Toggle */}
      <div>
        <button
          onClick={toggleView}
          className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
        >
          Toggle View (Current: {view})
        </button>
      </div>

      {/* Performance Note */}
      <div className="mt-4 p-3 bg-primary-50 rounded text-sm">
        <p className="font-semibold">⚡ Performance Optimization:</p>
        <p>All handlers are memoized with useCallback to prevent unnecessary re-renders.</p>
      </div>
    </div>
  );
};

/**
 * Usage in your components:
 * 
 * ```tsx
 * const { state, handlers } = useCalendar({
 *   initialDate: new Date(),
 *   initialView: 'month'
 * });
 * 
 * // Access state
 * console.log(state.currentDate);
 * console.log(state.view);
 * 
 * // Use handlers
 * handlers.nextMonth();
 * handlers.prevMonth();
 * handlers.goToToday();
 * handlers.setView('week');
 * ```
 */
