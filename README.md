# Calendar Component Library

A production-grade, senior-level Calendar Component library built with React 18, TypeScript (Strict Mode), Tailwind CSS, and Vite.

## 🎯 Features

- ✅ **Strict TypeScript**: Full type safety with `strict`, `noImplicitAny`, and `strictNullChecks` enabled
- 📅 **Multiple Views**: Month view and Week view support
- 🎨 **Tailwind CSS**: Production-ready design system with custom theme
- 🚫 **No External UI Libraries**: All primitive components built from scratch
- ♿ **Accessible**: ARIA-compliant components
- 🎣 **Custom Hooks**: `useCalendar` and `useEventManager` for state management
- 📦 **Tree-shakeable**: Modular architecture with barrel exports
- 🔧 **Vite**: Lightning-fast build tool

## 📁 Project Structure

\`\`\`
src/
├── components/
│   ├── Calendar/           # Main calendar components
│   │   ├── CalendarView.tsx
│   │   ├── MonthView.tsx
│   │   ├── WeekView.tsx
│   │   ├── CalendarCell.tsx
│   │   └── index.ts
│   └── primitives/         # UI primitives (no external libs)
│       ├── Button.tsx
│       ├── Modal.tsx
│       ├── Select.tsx
│       └── index.ts
├── hooks/                  # Custom React hooks
│   ├── useCalendar.ts
│   ├── useEventManager.ts
│   └── index.ts
├── utils/                  # Utility functions
│   ├── date.utils.ts
│   └── event.utils.ts
├── types/                  # TypeScript type definitions
│   └── calendar.types.ts
└── styles/                 # Global styles
    └── globals.css
\`\`\`

## 🚀 Getting Started

### Development

\`\`\`bash
# Start dev server
npm run dev
\`\`\`

### Build

\`\`\`bash
# Build for production
npm run build
\`\`\`

## 📚 Usage Example

\`\`\`tsx
import { CalendarView } from '@/components/Calendar';
import type { CalendarEvent } from '@/types/calendar.types';

const events: CalendarEvent[] = [
  {
    id: '1',
    title: 'Meeting',
    startDate: new Date(2025, 11, 15),
    endDate: new Date(2025, 11, 15),
    color: '#3b82f6',
  },
];

function App() {
  return (
    <CalendarView
      events={events}
      onDateSelect={(date) => console.log('Selected:', date)}
      onEventClick={(event) => console.log('Event:', event)}
    />
  );
}
\`\`\`

## 🎯 Tech Stack

- **React 18** - UI library
- **TypeScript 15** - Strict type checking
- **Tailwind CSS** - Utility-first CSS
- **Vite** - Build tool

## 🏗️ Architecture

1. **Strict TypeScript**: All code is fully typed
2. **Modular Design**: Separated components, hooks, and utilities
3. **Custom Primitives**: No external UI library dependencies
4. **Barrel Exports**: Clean imports with index files
5. **Path Aliases**: Absolute imports with `@/` prefix

Built for senior-level calendar component assignment.
