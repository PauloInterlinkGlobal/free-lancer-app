'use client';

import { ChevronDown, LucideIcon } from 'lucide-react';
import React, { forwardRef } from 'react';

interface TimePickerTriggerProps {
  isOpen: boolean;
  disabled?: boolean;
  error?: string;
  value?: string;
  placeholder?: string;
  leftIcon?: LucideIcon;
  className?: string;
  onClick: () => void;
}

export const TimePickerTrigger = forwardRef<
  HTMLButtonElement,
  TimePickerTriggerProps
>(
  (
    {
      isOpen,
      disabled = false,
      error,
      value,
      placeholder = 'Selecione a hora',
      leftIcon: LeftIcon,
      className = '',
      onClick,
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={onClick}
        className={`relative flex w-full items-center justify-between rounded-lg border bg-white px-3.5 py-2.5 text-left text-sm outline-none transition-all dark:bg-neutral-900/50 ${
          disabled
            ? 'cursor-not-allowed opacity-60 bg-neutral-100 dark:bg-neutral-800'
            : 'cursor-pointer'
        } ${
          error
            ? 'border-red-500 ring-1 ring-red-500'
            : isOpen
              ? 'border-primary-500 ring-1 ring-primary-500 dark:border-primary-400 dark:ring-primary-400'
              : 'border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600'
        } ${className}`}
      >
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          {LeftIcon && (
            <LeftIcon className="w-4 h-4 text-neutral-400 dark:text-neutral-500 shrink-0" />
          )}
          <span
            className={`truncate ${
              value
                ? 'text-neutral-900 dark:text-neutral-100 font-medium'
                : 'text-neutral-400 dark:text-neutral-500'
            }`}
          >
            {value ? `${value}h` : placeholder}
          </span>
        </div>

        <ChevronDown
          className={`ml-2 text-neutral-400 transition-transform duration-200 dark:text-neutral-500 shrink-0 w-4 h-4 ${
            isOpen ? 'rotate-180 text-primary-500 dark:text-primary-400' : ''
          }`}
        />
      </button>
    );
  }
);

TimePickerTrigger.displayName = 'TimePickerTrigger';
