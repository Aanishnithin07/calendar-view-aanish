/**
 * App Component
 * Demo application showcasing the Calendar Component Library
 * Phase 6 Prompt 10: Uses useEventManager hook with localStorage persistence
 */

import { CalendarView } from '@/components/Calendar';
import { useEventManager } from '@/hooks/useEventManager';
import type { CalendarEvent } from '@/types/calendar.types';

function App() {
  // Phase 6 Prompt 10: Use useEventManager hook for event state with localStorage
  const { events, addEvent, updateEvent, deleteEvent } = useEventManager();

  // Event handlers
  const handleDateSelect = (date: Date): void => {
    console.log('Date selected:', date);
  };

  const handleEventClick = (event: CalendarEvent): void => {
    console.log('Event clicked:', event);
  };

  // Phase 6 Prompt 10: Use the CRUD methods from useEventManager
  const handleEventAdd = (event: Omit<CalendarEvent, 'id'>): void => {
    const id = addEvent(event);
    console.log('Event added with ID:', id);
  };

  const handleEventUpdate = (id: string, updates: Partial<CalendarEvent>): void => {
    updateEvent(id, updates);
    console.log('Event updated:', id, updates);
  };

  const handleEventDelete = (id: string): void => {
    deleteEvent(id);
    console.log('Event deleted:', id);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Calendar Component Library
          </h1>
          <p className="text-gray-600">
            Production-grade React + TypeScript Calendar with Tailwind CSS
          </p>
        </header>

        <main>
          <CalendarView
            initialDate={new Date()}
            events={events}
            onEventAdd={handleEventAdd}
            onEventUpdate={handleEventUpdate}
            onEventDelete={handleEventDelete}
            onDateSelect={handleDateSelect}
            onEventClick={handleEventClick}
            config={{
              locale: 'en-US',
              firstDayOfWeek: 0,
              highlightToday: true,
              allowMultipleSelection: false,
            }}
          />
        </main>

        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>Built with React 18, TypeScript (Strict Mode), Tailwind CSS, and Vite</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
