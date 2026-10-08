'use client';

import { Clock } from 'lucide-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { TimePickerPopover } from './components/TimePickerPopover';
import { TimePickerTrigger } from './components/TimePickerTrigger';
import { MINUTES_15, MINUTES_5 } from './constants';
import { useTimePickerPlacement } from './hooks/useTimePickerPlacement';
import { TimePickerProps } from './types';

export function TimePicker({
  label,
  value = '09:00',
  onChange,
  placeholder = 'Selecione a hora',
  error,
  helperText,
  disabled = false,
  leftIcon: LeftIcon = Clock,
  className = '',
  containerClassName = '',
  minuteStep = 15,
}: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const { placement, updatePlacement } = useTimePickerPlacement({
    isOpen,
    triggerRef,
    popoverRef,
  });

  const minutesList = minuteStep === 5 ? MINUTES_5 : MINUTES_15;

  const [selectedHour, selectedMinute] = useMemo(() => {
    if (!value || !value.includes(':')) return ['09', '00'];
    const [h, m] = value.split(':');
    return [h.padStart(2, '0'), m.padStart(2, '0')];
  }, [value]);

  // Click outside and Escape handler
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

  const handleHourSelect = (hour: string) => {
    const newTime = `${hour}:${selectedMinute}`;
    onChange?.(newTime);
  };

  const handleMinuteSelect = (minute: string) => {
    const newTime = `${selectedHour}:${minute}`;
    onChange?.(newTime);
  };

  const handleSetCurrentTime = () => {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(Math.floor(now.getMinutes() / 15) * 15).padStart(2, '0');
    onChange?.(`${h}:${m}`);
    setIsOpen(false);
  };

  const handlePresetSelect = (timeStr: string) => {
    onChange?.(timeStr);
    setIsOpen(false);
  };

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
        <TimePickerTrigger
          ref={triggerRef}
          isOpen={isOpen}
          disabled={disabled}
          error={error}
          value={value}
          placeholder={placeholder}
          leftIcon={LeftIcon}
          className={className}
          onClick={toggleOpen}
        />

        {isOpen && (
          <TimePickerPopover
            ref={popoverRef}
            placement={placement}
            value={value}
            selectedHour={selectedHour}
            selectedMinute={selectedMinute}
            minutesList={minutesList}
            onHourSelect={handleHourSelect}
            onMinuteSelect={handleMinuteSelect}
            onSetCurrentTime={handleSetCurrentTime}
            onPresetSelect={handlePresetSelect}
            onConfirm={() => setIsOpen(false)}
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

export default TimePicker;
