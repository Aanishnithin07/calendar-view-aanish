/**
 * CalendarView Storybook Stories
 * Phase 5 Prompt 9: Storybook configuration for CalendarView component
 * 
 * Stories:
 * - Default: Current month with sample dummy data
 * - Empty: No events
 * - Mobile: Mobile viewport configuration
 */

import type { Meta, StoryObj } from '@storybook/react';
import { CalendarView } from './CalendarView';
import type { CalendarEvent } from '@/types/calendar.types';

// Sample dummy data for stories
const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Team Meeting',
    description: 'Weekly sync with the team',
    startDate: new Date(2025, 11, 15, 10, 0),
    endDate: new Date(2025, 11, 15, 11, 0),
    color: '#0ea5e9',
    category: 'Work',
  },
  {
    id: '2',
    title: 'Lunch Break',
    description: 'Lunch with colleagues',
    startDate: new Date(2025, 11, 15, 12, 0),
    endDate: new Date(2025, 11, 15, 13, 0),
    color: '#10b981',
    category: 'Personal',
  },
  {
    id: '3',
    title: 'Project Deadline',
    description: 'Submit quarterly report',
    startDate: new Date(2025, 11, 20, 17, 0),
    endDate: new Date(2025, 11, 20, 18, 0),
    color: '#ef4444',
    category: 'Work',
  },
  {
    id: '4',
    title: 'Code Review',
    description: 'Review PRs from team members',
    startDate: new Date(2025, 11, 18, 14, 0),
    endDate: new Date(2025, 11, 18, 15, 30),
    color: '#8b5cf6',
    category: 'Work',
  },
  {
    id: '5',
    title: 'Gym Session',
    description: 'Evening workout',
    startDate: new Date(2025, 11, 16, 18, 0),
    endDate: new Date(2025, 11, 16, 19, 30),
    color: '#f59e0b',
    category: 'Personal',
  },
  {
    id: '6',
    title: 'Doctor Appointment',
    description: 'Annual checkup',
    startDate: new Date(2025, 11, 22, 9, 0),
    endDate: new Date(2025, 11, 22, 10, 0),
    color: '#ec4899',
    category: 'Personal',
  },
  {
    id: '7',
    title: 'Conference Call',
    description: 'Client presentation',
    startDate: new Date(2025, 11, 23, 15, 0),
    endDate: new Date(2025, 11, 23, 16, 30),
    color: '#0ea5e9',
    category: 'Work',
  },
  {
    id: '8',
    title: 'Birthday Party',
    description: "Friend's birthday celebration",
    startDate: new Date(2025, 11, 25, 19, 0),
    endDate: new Date(2025, 11, 25, 22, 0),
    color: '#f472b6',
    category: 'Social',
  },
];

// Story metadata
const meta = {
  title: 'Calendar/CalendarView',
  component: CalendarView,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    events: {
      description: 'Array of calendar events to display',
      control: 'object',
    },
    onEventAdd: {
      description: 'Callback fired when a new event is added',
      action: 'event-added',
    },
    onEventUpdate: {
      description: 'Callback fired when an event is updated',
      action: 'event-updated',
    },
    onEventDelete: {
      description: 'Callback fired when an event is deleted',
      action: 'event-deleted',
    },
  },
} satisfies Meta<typeof CalendarView>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Story
 * Phase 5 Prompt 9: Current month with sample dummy data
 */
export const Default: Story = {
  args: {
    events: mockEvents,
    onEventAdd: (event) => {
      console.log('Event added:', event);
    },
    onEventUpdate: (id, updates) => {
      console.log('Event updated:', id, updates);
    },
    onEventDelete: (id) => {
      console.log('Event deleted:', id);
    },
  },
};

/**
 * Empty Story
 * Phase 5 Prompt 9: No events
 */
export const Empty: Story = {
  args: {
    events: [],
    onEventAdd: (event) => {
      console.log('Event added:', event);
    },
    onEventUpdate: (id, updates) => {
      console.log('Event updated:', id, updates);
    },
    onEventDelete: (id) => {
      console.log('Event deleted:', id);
    },
  },
};

/**
 * Mobile Story
 * Phase 5 Prompt 9: Mobile viewport using Storybook parameters
 */
export const Mobile: Story = {
  args: {
    events: mockEvents,
    onEventAdd: (event) => {
      console.log('Event added:', event);
    },
    onEventUpdate: (id, updates) => {
      console.log('Event updated:', id, updates);
    },
    onEventDelete: (id) => {
      console.log('Event deleted:', id);
    },
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

/**
 * Additional Story: Many Events
 * Demonstrates calendar with multiple events per day
 */
export const ManyEvents: Story = {
  args: {
    events: [
      ...mockEvents,
      {
        id: '9',
        title: 'Morning Standup',
        startDate: new Date(2025, 11, 15, 9, 0),
        endDate: new Date(2025, 11, 15, 9, 30),
        color: '#0ea5e9',
        category: 'Work',
      },
      {
        id: '10',
        title: 'Design Review',
        startDate: new Date(2025, 11, 15, 14, 0),
        endDate: new Date(2025, 11, 15, 15, 0),
        color: '#8b5cf6',
        category: 'Work',
      },
      {
        id: '11',
        title: 'Sprint Planning',
        startDate: new Date(2025, 11, 15, 16, 0),
        endDate: new Date(2025, 11, 15, 17, 30),
        color: '#0ea5e9',
        category: 'Work',
      },
      {
        id: '12',
        title: 'Dinner Reservation',
        startDate: new Date(2025, 11, 15, 19, 30),
        endDate: new Date(2025, 11, 15, 21, 0),
        color: '#f59e0b',
        category: 'Personal',
      },
    ],
    onEventAdd: (event) => {
      console.log('Event added:', event);
    },
    onEventUpdate: (id, updates) => {
      console.log('Event updated:', id, updates);
    },
    onEventDelete: (id) => {
      console.log('Event deleted:', id);
    },
  },
};
