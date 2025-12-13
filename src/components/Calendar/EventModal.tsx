/**
 * EventModal Component
 * Phase 6 Prompt 11: Event form modal for creating and editing calendar events
 * 
 * Features:
 * - Uses Modal primitive component
 * - Form inputs: Title, Description, Start Time, End Time, Color
 * - Validation: End Time > Start Time, Title required
 * - Delete button only shown when editing existing event
 * - Focus management: First input focused when opened
 * - Styling: primary-500 and neutral colors from Tailwind config
 * - No external form libraries (standard React state)
 */

import React, { useState, useEffect, useRef } from 'react';
import { Modal } from '@/components/primitives/Modal';
import { Button } from '@/components/primitives/Button';
import type { CalendarEvent } from '@/types/calendar.types';

/**
 * EventModal Props
 * Phase 6 Prompt 11 specification
 */
export interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<CalendarEvent, 'id'> | CalendarEvent) => void;
  onDelete?: (id: string) => void;
  initialDate?: Date;
  existingEvent?: CalendarEvent;
}

/**
 * Predefined color options with Tailwind classes
 */
const COLOR_OPTIONS = [
  { value: '#0ea5e9', label: 'Blue', bgClass: 'bg-primary-500' },
  { value: '#10b981', label: 'Green', bgClass: 'bg-green-500' },
  { value: '#f59e0b', label: 'Orange', bgClass: 'bg-orange-500' },
  { value: '#ef4444', label: 'Red', bgClass: 'bg-red-500' },
  { value: '#8b5cf6', label: 'Purple', bgClass: 'bg-purple-500' },
  { value: '#ec4899', label: 'Pink', bgClass: 'bg-pink-500' },
];

/**
 * Format Date to datetime-local input format (YYYY-MM-DDTHH:mm)
 */
const formatDateTimeLocal = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

/**
 * EventModal Component
 * Form modal for creating and editing calendar events
 */
export const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialDate = new Date(),
  existingEvent,
}) => {
  const isEditing = !!existingEvent;
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [color, setColor] = useState(COLOR_OPTIONS[0].value);
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  // Ref for first input (focus management)
  const titleInputRef = useRef<HTMLInputElement>(null);
  
  // Phase 6 Prompt 11: Focus management - first input should be focused when opened
  useEffect(() => {
    if (isOpen && titleInputRef.current) {
      // Small delay to ensure modal is fully rendered
      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);
  
  // Initialize form with existing event data or default values
  useEffect(() => {
    if (isOpen) {
      if (existingEvent) {
        setTitle(existingEvent.title);
        setDescription(existingEvent.description || '');
        setStartTime(formatDateTimeLocal(existingEvent.startDate));
        setEndTime(formatDateTimeLocal(existingEvent.endDate));
        setColor(existingEvent.color);
        setCategory(existingEvent.category || '');
      } else {
        // Reset form for new event
        setTitle('');
        setDescription('');
        const start = new Date(initialDate);
        start.setHours(9, 0, 0, 0); // Default to 9:00 AM
        const end = new Date(start);
        end.setHours(10, 0, 0, 0); // Default to 10:00 AM (1 hour duration)
        setStartTime(formatDateTimeLocal(start));
        setEndTime(formatDateTimeLocal(end));
        setColor(COLOR_OPTIONS[0].value);
        setCategory('');
      }
      setErrors({});
    }
  }, [isOpen, existingEvent, initialDate]);
  
  /**
   * Phase 6 Prompt 11: Validation
   * - Title is required
   * - End Time must be after Start Time
   */
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    // Title validation
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    // Date/Time validation
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    
    if (endDate <= startDate) {
      newErrors.endTime = 'End time must be after start time';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  /**
   * Handle form submission
   */
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const eventData = {
      ...(existingEvent && { id: existingEvent.id }),
      title: title.trim(),
      description: description.trim(),
      startDate: new Date(startTime),
      endDate: new Date(endTime),
      color,
      category: category.trim(),
    };
    
    onSave(eventData);
    onClose();
  };
  
  /**
   * Handle delete button click
   */
  const handleDelete = (): void => {
    if (existingEvent && onDelete) {
      onDelete(existingEvent.id);
      onClose();
    }
  };
  
  /**
   * Handle modal close
   */
  const handleClose = (): void => {
    setErrors({});
    onClose();
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditing ? 'Edit Event' : 'Create Event'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Input - Phase 6 Prompt 11: First input with focus management */}
        <div>
          <label htmlFor="event-title" className="block text-sm font-semibold text-neutral-900 mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            ref={titleInputRef}
            id="event-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
              errors.title ? 'border-red-500' : 'border-neutral-300'
            }`}
            placeholder="Event title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title}</p>
          )}
        </div>
        
        {/* Description Textarea */}
        <div>
          <label htmlFor="event-description" className="block text-sm font-semibold text-neutral-900 mb-2">
            Description
          </label>
          <textarea
            id="event-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors resize-none"
            placeholder="Event description (optional)"
          />
        </div>
        
        {/* Start Time - datetime-local */}
        <div>
          <label htmlFor="event-start" className="block text-sm font-semibold text-neutral-900 mb-2">
            Start Time <span className="text-red-500">*</span>
          </label>
          <input
            id="event-start"
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
          />
        </div>
        
        {/* End Time - datetime-local with validation */}
        <div>
          <label htmlFor="event-end" className="block text-sm font-semibold text-neutral-900 mb-2">
            End Time <span className="text-red-500">*</span>
          </label>
          <input
            id="event-end"
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
              errors.endTime ? 'border-red-500' : 'border-neutral-300'
            }`}
          />
          {errors.endTime && (
            <p className="mt-1 text-sm text-red-500">{errors.endTime}</p>
          )}
        </div>
        
        {/* Color Radio Buttons - Phase 6 Prompt 11: Radio buttons with Tailwind bg colors */}
        <div>
          <label className="block text-sm font-semibold text-neutral-900 mb-3">
            Color
          </label>
          <div className="flex flex-wrap gap-3">
            {COLOR_OPTIONS.map((option) => (
              <label
                key={option.value}
                className="flex items-center cursor-pointer group"
              >
                <input
                  type="radio"
                  name="event-color"
                  value={option.value}
                  checked={color === option.value}
                  onChange={(e) => setColor(e.target.value)}
                  className="sr-only"
                />
                <span
                  className={`w-10 h-10 rounded-full ${option.bgClass} flex items-center justify-center transition-all ${
                    color === option.value
                      ? 'ring-4 ring-primary-500 ring-offset-2 scale-110'
                      : 'ring-2 ring-neutral-200 group-hover:scale-105'
                  }`}
                  title={option.label}
                >
                  {color === option.value && (
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Category Input */}
        <div>
          <label htmlFor="event-category" className="block text-sm font-semibold text-neutral-900 mb-2">
            Category
          </label>
          <input
            id="event-category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
            placeholder="Work, Personal, etc. (optional)"
          />
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-4 border-t border-neutral-200">
          {/* Phase 6 Prompt 11: Delete Button only shown if existingEvent is provided */}
          {isEditing && onDelete ? (
            <Button
              type="button"
              variant="danger"
              onClick={handleDelete}
            >
              Delete Event
            </Button>
          ) : (
            <div />
          )}
          
          <div className="flex gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
            >
              {isEditing ? 'Update Event' : 'Create Event'}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

EventModal.displayName = 'EventModal';
