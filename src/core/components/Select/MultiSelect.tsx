'use client';

import { Check, ChevronDown, X, type LucideIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export interface MultiSelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface MultiSelectProps {
  label?: string;
  value?: Array<string | number>;
  options: MultiSelectOption[];
  placeholder?: string;
  onChange?: (value: Array<string | number>) => void;
  leftIcon?: LucideIcon;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
  maxVisibleTags?: number;
}

export function MultiSelect({
  label,
  value = [],
  options,
  placeholder = 'Selecione as opções',
  onChange,
  leftIcon: LeftIcon,
  disabled = false,
  error,
  helperText,
  className = '',
  maxVisibleTags = 2,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

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

  function toggleOption(option: MultiSelectOption) {
    if (option.disabled) return;

    const exists = value.includes(option.value);

    const nextValue = exists
      ? value.filter((item) => item !== option.value)
      : [...value, option.value];

    onChange?.(nextValue);
  }

  function removeOption(optionValue: string | number) {
    onChange?.(value.filter((item) => item !== optionValue));
  }

  const selectedOptions = options.filter((option) =>
    value.includes(option.value)
  );

  const visibleOptions = selectedOptions.slice(0, maxVisibleTags);
  const remainingCount = selectedOptions.length - visibleOptions.length;

  return (
    <div className={`flex w-full flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-primary-content">
          {label}
        </label>
      )}

      <div ref={wrapperRef} className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpen((current) => !current)}
          className={`flex min-h-10 w-full items-center gap-2 rounded-lg border bg-surface px-3 py-1.5 text-left transition-colors ${
            error
              ? 'border-red-500'
              : open
                ? 'border-primary'
                : 'border-border-ui'
          } ${
            disabled
              ? 'cursor-not-allowed opacity-60'
              : 'hover:border-primary/70'
          }`}
        >
          {LeftIcon && (
            <LeftIcon
              size={16}
              className="shrink-0 text-muted-content"
              aria-hidden
            />
          )}

          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
            {selectedOptions.length === 0 ? (
              <span className="text-sm text-muted-content">{placeholder}</span>
            ) : (
              <>
                {visibleOptions.map((option) => (
                  <span
                    key={option.value}
                    className="inline-flex items-center gap-1 rounded-md bg-item-hover px-2 py-1 text-xs font-medium text-primary-content"
                  >
                    <span className="max-w-32 truncate">{option.label}</span>

                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(event) => {
                        event.stopPropagation();
                        removeOption(option.value);
                      }}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          event.stopPropagation();
                          removeOption(option.value);
                        }
                      }}
                      className="cursor-pointer text-muted-content hover:text-primary-content"
                      aria-label={`Remover ${option.label}`}
                    >
                      <X size={12} aria-hidden />
                    </span>
                  </span>
                ))}

                {remainingCount > 0 && (
                  <span className="rounded-md bg-item-hover px-2 py-1 text-xs font-medium text-muted-content">
                    +{remainingCount}
                  </span>
                )}
              </>
            )}
          </div>

          <ChevronDown
            size={16}
            className={`shrink-0 text-muted-content transition-transform ${
              open ? 'rotate-180' : ''
            }`}
            aria-hidden
          />
        </button>

        {open && (
          <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-lg border border-border-ui bg-surface p-1 shadow-lg">
            <div className="max-h-60 overflow-y-auto">
              {options.map((option) => {
                const selected = value.includes(option.value);

                return (
                  <button
                    key={option.value}
                    type="button"
                    disabled={option.disabled}
                    onClick={() => toggleOption(option)}
                    className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                      option.disabled
                        ? 'cursor-not-allowed opacity-40'
                        : 'cursor-pointer hover:bg-item-hover'
                    } ${
                      selected
                        ? 'bg-item-hover text-primary'
                        : 'text-primary-content'
                    }`}
                  >
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-border-ui">
                      {selected && (
                        <Check size={12} className="text-primary" aria-hidden />
                      )}
                    </span>

                    <span className="min-w-0 flex-1 truncate">
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {error && <p className="text-xs font-medium text-red-500">{error}</p>}

      {!error && helperText && (
        <p className="text-xs text-muted-content">{helperText}</p>
      )}
    </div>
  );
}
