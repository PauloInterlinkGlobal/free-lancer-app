'use client';

import { Check } from 'lucide-react';
import React, { forwardRef } from 'react';
import { PopoverPlacement, SelectPopupOption } from '../types';

interface SelectPopupDropdownProps {
  placement?: PopoverPlacement;
  options: SelectPopupOption[];
  value?: string | number;
  onSelect: (option: SelectPopupOption) => void;
}

export const SelectPopupDropdown = forwardRef<
  HTMLDivElement,
  SelectPopupDropdownProps
>(({ placement = 'bottom', options, value, onSelect }, ref) => {
  return (
    <div
      ref={ref}
      className={`absolute left-0 right-0 z-[100] overflow-hidden rounded-lg border border-border-ui bg-surface p-1 shadow-lg ${
        placement === 'top'
          ? 'bottom-[calc(100%+6px)] origin-bottom'
          : 'top-[calc(100%+6px)] origin-top'
      }`}
    >
      <div className="max-h-60 overflow-y-auto">
        {options.length === 0 ? (
          <div className="px-3 py-4 text-center text-sm text-muted-content">
            Nenhuma opção disponível
          </div>
        ) : (
          options.map((option) => {
            const selected = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                disabled={option.disabled}
                onClick={() => onSelect(option)}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                  option.disabled
                    ? 'cursor-not-allowed opacity-40'
                    : 'cursor-pointer hover:bg-item-hover'
                }`}
              >
                <span className="min-w-0 flex-1 truncate">{option.label}</span>

                {selected && (
                  <Check
                    size={16}
                    className="shrink-0 text-primary"
                    aria-hidden
                  />
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
});

SelectPopupDropdown.displayName = 'SelectPopupDropdown';
