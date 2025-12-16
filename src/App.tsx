/**
 * App Component
 * Demo application showcasing the Calendar Component Library
 * Phase 6 Prompt 13: Integrated with CalendarView and useEventManager
 */

import { CalendarView } from '@/components/Calendar';
import { useEventManager } from '@/hooks/useEventManager';

function App() {
  // Phase 6 Prompt 10: Use useEventManager hook for event state with localStorage
  const { events, addEvent, updateEvent, deleteEvent } = useEventManager();

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-100 via-white to-neutral-100 py-8 px-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800 mb-3">
            Calendar Management System
          </h1>
          <p className="text-lg text-neutral-700 font-medium">
            Professional Event Scheduling & Management Platform
          </p>
        </header>

        <main>
          <CalendarView
            events={events}
            onEventAdd={addEvent}
            onEventUpdate={updateEvent}
            onEventDelete={deleteEvent}
          />
        </main>

        <footer className="mt-12 pt-8 border-t-2 border-neutral-200 text-center">
          <p className="text-neutral-600 font-medium text-base">
            Developed by <span className="text-primary-700 font-bold">Aanish Nithin A</span>
          </p>
          <p className="text-neutral-500 text-sm mt-2">
            React 18 • TypeScript • Tailwind CSS • Vite
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
