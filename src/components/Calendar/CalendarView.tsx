/**
 * CalendarView Component
 * Main calendar component with view switching and controls
 */

import React, { useState } from 'react';
import type { CalendarViewProps, CalendarViewType, CalendarConfig } from '@/types/calendar.types';
import { MonthView } from './MonthView';
import { WeekView } from './WeekView';
import { Button } from '@/components/primitives/Button';
import { Select } from '@/components/primitives/Select';
import { addMonths, getMonthName, addDays } from '@/utils/date.utils';

const DEFAULT_CONFIG: CalendarConfig = {
  locale: 'en-US',
  firstDayOfWeek: 0,
  showWeekNumbers: false,
  highlightToday: true,
  allowMultipleSelection: false,
};

export const CalendarView: React.FC<CalendarViewProps> = ({
  initialDate = new Date(),
  events = [],
  onDateSelect,
  onEventClick,
  config = {},
  className = '',
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(initialDate);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [viewType, setViewType] = useState<CalendarViewType>('month');
  
  const mergedConfig: CalendarConfig = { ...DEFAULT_CONFIG, ...config };
  
  // Navigation handlers
  const handlePrevious = (): void => {
    if (viewType === 'month') {
      setCurrentDate(addMonths(currentDate, -1));
    } else if (viewType === 'week') {
      setCurrentDate(addDays(currentDate, -7));
    }
  };
  
  const handleNext = (): void => {
    if (viewType === 'month') {
      setCurrentDate(addMonths(currentDate, 1));
    } else if (viewType === 'week') {
      setCurrentDate(addDays(currentDate, 7));
    }
  };
  
  const handleToday = (): void => {
    setCurrentDate(new Date());
  };
  
  // Date selection handler
  const handleDateSelect = (date: Date): void => {
    if (mergedConfig.allowMultipleSelection) {
      setSelectedDates(prev => {
        const isAlreadySelected = prev.some(d => 
          d.getTime() === date.getTime()
        );
        
        if (isAlreadySelected) {
          return prev.filter(d => d.getTime() !== date.getTime());
        }
        return [...prev, date];
      });
    } else {
      setSelectedDates([date]);
    }
    
    onDateSelect?.(date);
  };
  
  // Get display title
  const getDisplayTitle = (): string => {
    const year = currentDate.getFullYear();
    const month = getMonthName(currentDate.getMonth(), mergedConfig.locale);
    
    if (viewType === 'month') {
      return `${month} ${year}`;
    } else if (viewType === 'week') {
      return `Week of ${month} ${currentDate.getDate()}, ${year}`;
    }
    return `${month} ${year}`;
  };
  
  return (
    <div className={`calendar-container ${className}`}>
      {/* Calendar Header */}
      <div className="calendar-header">
        {/* Navigation Controls */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrevious}
            aria-label="Previous"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToday}
          >
            Today
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNext}
            aria-label="Next"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
        
        {/* Current Date Display */}
        <h2 className="text-xl font-semibold text-gray-900">
          {getDisplayTitle()}
        </h2>
        
        {/* View Selector */}
        <Select
          options={[
            { value: 'month', label: 'Month' },
            { value: 'week', label: 'Week' },
          ]}
          value={viewType}
          onChange={(e) => setViewType(e.target.value as CalendarViewType)}
          selectSize="sm"
          aria-label="Calendar view type"
        />
      </div>
      
      {/* Calendar Body */}
      <div className="p-4">
        {viewType === 'month' && (
          <MonthView
            currentDate={currentDate}
            events={events}
            selectedDates={selectedDates}
            onDateSelect={handleDateSelect}
            onEventClick={onEventClick}
            config={mergedConfig}
          />
        )}
        
        {viewType === 'week' && (
          <WeekView
            currentDate={currentDate}
            events={events}
            selectedDates={selectedDates}
            onDateSelect={handleDateSelect}
            onEventClick={onEventClick}
            config={mergedConfig}
          />
        )}
      </div>
    </div>
  );
};

CalendarView.displayName = 'CalendarView';
