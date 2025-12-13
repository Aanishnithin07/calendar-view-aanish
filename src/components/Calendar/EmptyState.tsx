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
    <div className="flex flex-col items-center justify-center min-h-[400px] py-12 px-4">
      {/* Calendar Icon */}
      <div className="mb-6">
        <svg
          className="w-24 h-24 text-neutral-300"
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
      <h3 className="text-xl font-semibold text-neutral-900 mb-2">
        No Events Yet
      </h3>
      <p className="text-neutral-600 text-center max-w-sm mb-8">
        Get started by creating your first event. Track meetings, deadlines, and important dates all in one place.
      </p>

      {/* CTA Button */}
      <Button
        variant="primary"
        onClick={onCreateEvent}
        className="shadow-lg hover:shadow-xl transition-shadow"
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
