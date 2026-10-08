'use client';

import { ChevronDown } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { SelectPopupDropdown } from './components/SelectPopupDropdown';
import { useSelectPlacement } from './hooks/useSelectPlacement';
import { SelectPopupOption, SelectPopupProps } from './types';

export function SelectPopup({
  label,
  value,
  options,
  placeholder = 'Selecione uma opção',
  onChange,
  leftIcon: LeftIcon,
  disabled = false,
  error,
  helperText,
  className = '',
}: SelectPopupProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  const { placement, updatePlacement } = useSelectPlacement({
    isOpen: open,
    triggerRef: buttonRef,
    popoverRef,
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function handleSelect(option: SelectPopupOption) {
    if (option.disabled) return;

    onChange?.(option.value);
    setOpen(false);
  }

  const toggleOpen = () => {
    if (disabled) return;
    if (!open) {
      updatePlacement();
    }
    setOpen((current) => !current);
  };

  return (
    <div className={`flex w-full flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          onClick={toggleOpen}
          className="text-sm font-medium text-primary-content cursor-pointer"
        >
          {label}
        </label>
      )}

      <div ref={wrapperRef} className="relative w-full">
        <button
          ref={buttonRef}
          type="button"
          disabled={disabled}
          onClick={toggleOpen}
          className={`flex h-10 w-full items-center gap-3 rounded-lg border bg-surface px-3 text-left text-sm transition-colors ${
            error
              ? 'border-red-500'
              : open
                ? 'border-primary'
                : 'border-border-ui'
          } ${
            disabled
              ? 'cursor-not-allowed opacity-60'
              : 'hover:border-primary/70 cursor-pointer'
          }`}
        >
          {LeftIcon && (
            <LeftIcon
              size={16}
              className="shrink-0 text-muted-content"
              aria-hidden
            />
          )}

          <span
            className={`min-w-0 flex-1 truncate ${
              selectedOption ? 'text-primary-content' : 'text-muted-content'
            }`}
          >
            {selectedOption?.label ?? placeholder}
          </span>

          <ChevronDown
            size={16}
            className={`shrink-0 text-muted-content transition-transform ${
              open ? 'rotate-180' : ''
            }`}
            aria-hidden
          />
        </button>

        {open && (
          <SelectPopupDropdown
            ref={popoverRef}
            placement={placement}
            options={options}
            value={value}
            onSelect={handleSelect}
          />
        )}
      </div>

      {error && <p className="text-xs font-medium text-red-500">{error}</p>}

      {!error && helperText && (
        <p className="text-xs text-muted-content">{helperText}</p>
      )}
    </div>
  );
}

export default SelectPopup;
