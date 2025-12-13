/**
 * App Component
 * Demo application showcasing the Calendar Component Library
 * Phase 2: Implements CRUD operations for events
 */

import { useState } from 'react';
import { CalendarView } from '@/components/Calendar';
import type { CalendarEvent } from '@/types/calendar.types';

function App() {
  // State management for events
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Team Meeting',
      description: 'Weekly team sync',
      startDate: new Date(2025, 11, 15, 10, 0),
      endDate: new Date(2025, 11, 15, 11, 0),
      color: '#0ea5e9',
      category: 'Work',
    },
    {
      id: '2',
      title: 'Project Deadline',
      description: 'Calendar component submission',
      startDate: new Date(2025, 11, 20),
      endDate: new Date(2025, 11, 20),
      color: '#ef4444',
      category: 'Important',
      allDay: true,
    },
    {
      id: '3',
      title: 'Code Review',
      startDate: new Date(2025, 11, 18, 14, 0),
      endDate: new Date(2025, 11, 18, 15, 30),
      color: '#10b981',
      category: 'Development',
    },
  ]);

  // Event handlers
  const handleDateSelect = (date: Date): void => {
    console.log('Date selected:', date);
  };

  const handleEventClick = (event: CalendarEvent): void => {
    console.log('Event clicked:', event);
  };

  const handleEventAdd = (event: Omit<CalendarEvent, 'id'>): void => {
    const newEvent: CalendarEvent = {
      ...event,
      id: `event-${Date.now()}`,
    };
    setEvents(prev => [...prev, newEvent]);
    console.log('Event added:', newEvent);
  };

  const handleEventUpdate = (id: string, updates: Partial<CalendarEvent>): void => {
    setEvents(prev =>
      prev.map(event =>
        event.id === id ? { ...event, ...updates } : event
      )
    );
    console.log('Event updated:', id, updates);
  };

  const handleEventDelete = (id: string): void => {
    setEvents(prev => prev.filter(event => event.id !== id));
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
