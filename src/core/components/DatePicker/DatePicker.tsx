'use client';

import { Calendar as CalendarIcon } from 'lucide-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { DatePickerCalendar } from './components/DatePickerCalendar';
import { DatePickerTrigger } from './components/DatePickerTrigger';
import { useDatePickerPlacement } from './hooks/useDatePickerPlacement';
import { DatePickerProps } from './types';
import {
  formatDateStr,
  formatDisplayDate,
  generateCalendarDays,
  isDateDisabled,
  parseDateStr,
} from './utils/date.utils';

export function DatePicker({
  label,
  value,
  onChange,
  minDate,
  maxDate,
  placeholder = 'Selecione a data',
  error,
  helperText,
  disabled = false,
  leftIcon: LeftIcon = CalendarIcon,
  className = '',
  containerClassName = '',
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const { placement, updatePlacement } = useDatePickerPlacement({
    isOpen,
    triggerRef,
    popoverRef,
  });

  const selectedDate = useMemo(() => parseDateStr(value), [value]);
  const minParsed = useMemo(() => parseDateStr(minDate), [minDate]);
  const maxParsed = useMemo(() => parseDateStr(maxDate), [maxDate]);

  // View state for calendar navigation (month/year)
  const [viewDate, setViewDate] = useState<Date>(() => {
    return selectedDate || new Date();
  });

  // Sync viewDate when selectedDate changes
  useEffect(() => {
    if (selectedDate) {
      setViewDate(
        new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
      );
    }
  }, [selectedDate]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth();

  const handlePrevMonth = () => {
    setViewDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleSelectDate = (date: Date) => {
    if (isDateDisabled(date, minParsed, maxParsed)) return;
    const formatted = formatDateStr(date);
    onChange?.(formatted);
    setIsOpen(false);
  };

  const calendarDays = useMemo(
    () => generateCalendarDays(currentYear, currentMonth),
    [currentYear, currentMonth]
  );

  const displayLabel = useMemo(
    () => formatDisplayDate(selectedDate, placeholder),
    [selectedDate, placeholder]
  );

  const toggleOpen = () => {
    if (disabled) return;
    if (!isOpen) {
      updatePlacement();
    }
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col gap-1.5 w-full ${containerClassName}`}
    >
      {label && (
        <label
          onClick={toggleOpen}
          className="text-sm font-medium text-neutral-700 dark:text-neutral-300 select-none cursor-pointer"
        >
          {label}
        </label>
      )}

      <div className="relative w-full">
        <DatePickerTrigger
          ref={triggerRef}
          isOpen={isOpen}
          disabled={disabled}
          error={error}
          displayLabel={displayLabel}
          hasValue={!!selectedDate}
          leftIcon={LeftIcon}
          className={className}
          onClick={toggleOpen}
        />

        {isOpen && (
          <DatePickerCalendar
            ref={popoverRef}
            placement={placement}
            currentYear={currentYear}
            currentMonth={currentMonth}
            calendarDays={calendarDays}
            selectedDate={selectedDate}
            minParsed={minParsed}
            maxParsed={maxParsed}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            onSelectDate={handleSelectDate}
          />
        )}
      </div>

      {error ? (
        <p className="text-xs text-red-500 dark:text-red-400 font-medium">
          {error}
        </p>
      ) : helperText ? (
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

export default DatePicker;
