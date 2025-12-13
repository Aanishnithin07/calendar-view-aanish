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
            events={events}
            onEventAdd={addEvent}
            onEventUpdate={updateEvent}
            onEventDelete={deleteEvent}
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
