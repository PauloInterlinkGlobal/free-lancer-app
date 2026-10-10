'use client';

import { ChevronDown, LucideIcon } from 'lucide-react';
import React, { forwardRef } from 'react';
import { SelectOption, SelectVariant } from '../types';

interface SelectTriggerProps {
  id?: string;
  isOpen: boolean;
  disabled?: boolean;
  error?: string;
  variant?: SelectVariant;
  sizeStyles: { trigger: string; icon: string };
  selectedOption?: SelectOption;
  placeholder?: string;
  leftIcon?: LucideIcon;
  wrapperClassName?: string;
  className?: string;
  onClick: () => void;
}

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  (
    {
      id,
      isOpen,
      disabled = false,
      error,
      variant = 'outline',
      sizeStyles,
      selectedOption,
      placeholder = 'Selecione uma opção',
      leftIcon: LeftIcon,
      wrapperClassName = '',
      className = '',
      onClick,
    },
    ref
  ) => {
    const borderClass =
      variant === 'ghost'
        ? 'border-transparent bg-transparent hover:bg-neutral-200/50 dark:hover:bg-neutral-800/60'
        : error
          ? 'border-red-500 ring-1 ring-red-500'
          : isOpen
            ? 'border-primary ring-1 ring-primary dark:border-primary dark:ring-primary'
            : 'border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600';

    return (
      <button
        ref={ref}
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={onClick}
        className={`relative flex w-full items-center justify-between rounded-lg border bg-white dark:bg-neutral-900/60 transition-colors text-left outline-none ${borderClass} ${
          sizeStyles.trigger
        } ${disabled ? 'cursor-not-allowed opacity-60 bg-neutral-100 dark:bg-neutral-800' : 'cursor-pointer'} px-3.5 ${wrapperClassName} ${className}`}
      >
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          {LeftIcon && (
            <LeftIcon className="w-4 h-4 text-neutral-400 dark:text-neutral-400 shrink-0" />
          )}
          <span
            className={`truncate text-sm ${
              selectedOption
                ? 'text-neutral-900 dark:text-neutral-100 font-normal'
                : 'text-neutral-400 dark:text-neutral-300/80'
            }`}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>

        <ChevronDown
          className={`ml-2 text-neutral-400 transition-transform duration-200 dark:text-neutral-400 shrink-0 ${
            sizeStyles.icon
          } ${isOpen ? 'rotate-180 text-primary dark:text-primary' : ''}`}
        />
      </button>
    );
  }
);

SelectTrigger.displayName = 'SelectTrigger';
