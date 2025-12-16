/**
 * EmptyState Component
 * Interview Polish: Professional empty state for when no events exist
 * 
 * Features:
 * - Friendly illustration/icon
 * - Helpful message
 * - Clear call-to-action button
 * - Centered layout with good spacing
 */

import React from 'react';
import { Button } from '../primitives/Button';

interface EmptyStateProps {
  onCreateEvent: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onCreateEvent }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] py-16 px-4 bg-gradient-to-b from-white to-neutral-50 rounded-lg">
      {/* Calendar Icon */}
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-primary-100 rounded-full blur-3xl opacity-30"></div>
        <svg
          className="w-32 h-32 text-primary-400 relative"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      {/* Message */}
      <h3 className="text-2xl font-bold text-neutral-900 mb-3">
        No Events Scheduled
      </h3>
      <p className="text-neutral-600 text-center max-w-md mb-10 text-lg">
        Start organizing your schedule by creating your first event. Track meetings, deadlines, and important dates efficiently.
      </p>

      {/* CTA Button */}
      <Button
        variant="primary"
        onClick={onCreateEvent}
        size="lg"
        className="shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
        leftIcon={
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        }
      >
        Create Your First Event
      </Button>
    </div>
  );
};
