# Calendar View Component

## Live Demo

**Application**: [https://your-vercel-deployment.vercel.app](https://your-vercel-deployment.vercel.app)  
**Storybook**: [https://your-storybook-deployment.vercel.app](https://your-storybook-deployment.vercel.app)

> Replace the URLs above after deployment

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run Storybook
npm run storybook

# Build for production
npm run build
```

## Architecture

Built using a Clean Architecture approach. The application is organized into:

- **components/Calendar**: Core domain logic (CalendarView, MonthView, WeekView, CalendarCell, EventModal)
- **components/primitives**: Reusable, accessible UI components (Button, Modal, Toast, Select) - No external libraries
- **hooks**: Custom React hooks (useCalendar, useEventManager) to separate state management from UI
- **utils**: Pure functions for date manipulation and event validation
- **types**: Comprehensive TypeScript type definitions

## Features

- [x] **Month & Week Views**: Full 6-week grid (42 days) and hourly timeline (00:00-23:00)
- [x] **Event Management**: Create, Edit, Delete with form validation and color picker
- [x] **Local Persistence**: Data survives page reloads using localStorage
- [x] **Keyboard Accessibility**: Full navigation support (N for new, Arrow keys for navigation, T for today, ESC to close)
- [x] **Responsive Design**: Mobile-first approach with floating action button and touch optimizations
- [x] **Toast Notifications**: Success/error feedback for all operations
- [x] **Empty State**: User-friendly onboarding when no events exist
- [x] **Delete Confirmation**: Modal confirmation to prevent accidental deletions

## Storybook Stories

The component library includes comprehensive Storybook documentation:

- **Default**: Interactive calendar with sample events
- **Empty**: Zero-state visualization
- **Week View**: Timeline view demonstration
- **Mobile**: Responsive layout verification
- **Many Events**: Stress-test with multiple events per day

## Technologies

- **React 18.3.1** with TypeScript 5.6.2 (Strict Mode)
- **Tailwind CSS v4.1.0** for styling
- **Storybook 10.1.8** for component documentation
- **Vite 7.2.7** as build tool
- **ESLint** for code quality

## Project Structure

```
src/
├── components/
│   ├── Calendar/
│   │   ├── CalendarView.tsx      # Main orchestrator
│   │   ├── MonthView.tsx         # Monthly grid layout
│   │   ├── WeekView.tsx          # Weekly timeline
│   │   ├── CalendarCell.tsx      # Individual day cell
│   │   ├── EventModal.tsx        # CRUD form
│   │   ├── EmptyState.tsx        # Zero-state UI
│   │   └── index.ts
│   └── primitives/
│       ├── Button.tsx            # Accessible button
│       ├── Modal.tsx             # Portal-based modal
│       ├── Toast.tsx             # Notification system
│       ├── Select.tsx            # Styled dropdown
│       └── index.ts
├── hooks/
│   ├── useCalendar.ts            # Navigation state
│   ├── useEventManager.ts        # Event CRUD + persistence
│   └── index.ts
├── utils/
│   ├── date.utils.ts             # Date manipulation (30+ functions)
│   └── event.utils.ts            # Event filtering & validation
├── types/
│   └── calendar.types.ts         # TypeScript definitions
└── styles/
    └── globals.css               # Global styles
```

## Development

```bash
# Development server with HMR
npm run dev

# TypeScript type checking
npm run build

# Storybook development
npm run storybook

# Build Storybook for deployment
npm run build-storybook
```

## Contact

**Developer**: Aanish Nithin  
**Email**: aanishnithin07@gmail.com  
**Repository**: [https://github.com/Aanishnithin07/calendar-view-aanish](https://github.com/Aanishnithin07/calendar-view-aanish)
