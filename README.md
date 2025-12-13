# 📅 Calendar Component Library

> Production-grade React calendar component with TypeScript, Tailwind CSS, and full accessibility support - Built for professional interviews and real-world applications.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3.1-61dafb.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.0-38bdf8.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-7.2.7-646cff.svg)](https://vitejs.dev/)

## ✨ Features

### Core Functionality
- ✅ **Multiple Views**: Month grid (42 days) and Week timeline (hourly slots)
- ✅ **Event Management**: Full CRUD with form validation and color picker
- ✅ **LocalStorage Persistence**: Events survive page refresh
- ✅ **Strict TypeScript**: Full type safety with strict mode enabled

### User Experience
- ✅ **Floating Action Button**: Quick event creation access
- ✅ **Toast Notifications**: Success/error feedback for all actions
- ✅ **Empty State**: Friendly onboarding when no events exist
- ✅ **Delete Confirmation**: Prevents accidental deletions
- ✅ **Keyboard Shortcuts**: N (new), ←/→ (navigate), T (today), ESC (close)

### Design & Accessibility
- ✅ **Mobile Responsive**: Full-screen modals, touch-friendly (48px buttons)
- ✅ **Accessible**: ARIA labels, keyboard navigation, screen reader friendly
- ✅ **Smooth Animations**: Transitions, hover effects, micro-interactions
- ✅ **Custom Design System**: Tailwind CSS v4 with custom theme

### Technical Excellence
- ✅ **No External UI Libraries**: All primitives built from scratch
- ✅ **Performance Optimized**: React.memo, useCallback, code splitting
- ✅ **Custom Hooks**: `useCalendar` and `useEventManager`
- ✅ **Storybook Ready**: Visual component testing
- ✅ **Production Build**: Zero TypeScript errors, 220KB gzipped

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
