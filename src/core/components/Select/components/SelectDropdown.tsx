'use client';

import { Check } from 'lucide-react';
import React, { forwardRef } from 'react';
import { PopoverPlacement, SelectOption } from '../types';

interface SelectDropdownProps {
  placement: PopoverPlacement;
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  selectedValue: string | number;
  optionSizeClass: string;
  onSelect: (option: SelectOption) => void;
}

export const SelectDropdown = forwardRef<HTMLDivElement, SelectDropdownProps>(
  (
    {
      placement,
      label,
      placeholder,
      options,
      selectedValue,
      optionSizeClass,
      onSelect,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="listbox"
        aria-label={label || placeholder}
        className={`absolute left-0 z-[100] w-full min-w-[200px] overflow-hidden rounded-xl border border-neutral-200 bg-white p-1.5 dark:border-neutral-800 dark:bg-[#161b26] ${
          placement === 'top'
            ? 'bottom-[calc(100%+4px)] origin-bottom'
            : 'top-[calc(100%+4px)] origin-top'
        }`}
      >
        <div className="max-h-44 overflow-y-auto space-y-0.5 overscroll-contain">
          {options.length === 0 ? (
            <div className="px-3 py-2 text-center text-xs text-neutral-400 dark:text-neutral-500">
              Nenhuma opção disponível
            </div>
          ) : (
            options.map((opt) => {
              const isSelected = String(opt.value) === String(selectedValue);
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  disabled={opt.disabled}
                  onClick={() => onSelect(opt)}
                  className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 ${optionSizeClass} text-left transition-colors ${
                    opt.disabled
                      ? 'opacity-40 cursor-not-allowed'
                      : isSelected
                        ? 'bg-primary/10 font-semibold text-primary'
                        : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-100'
                  }`}
                >
                  <span className="truncate">{opt.label}</span>
                  {isSelected && (
                    <Check className="w-4 h-4 text-primary shrink-0" />
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
    );
  }
);

SelectDropdown.displayName = 'SelectDropdown';
