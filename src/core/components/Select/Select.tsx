'use client';

import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { SelectDropdown } from './components/SelectDropdown';
import { SelectTrigger } from './components/SelectTrigger';
import { SIZE_STYLES } from './constants';
import { useSelectPlacement } from './hooks/useSelectPlacement';
import { SelectOption, SelectProps } from './types';

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon: LeftIcon,
      options = [],
      placeholder = 'Selecione uma opção',
      value: controlledValue,
      defaultValue,
      onChange,
      onValueChange,
      size = 'md',
      variant = 'outline',
      placement: controlledPlacement,
      containerClassName = '',
      wrapperClassName = '',
      id,
      name,
      disabled = false,
      className = '',
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState<string | number>(
      defaultValue ?? ''
    );
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const popoverRef = useRef<HTMLDivElement>(null);

    const isControlled = controlledValue !== undefined;
    const selectedValue = isControlled ? controlledValue : internalValue;

    const selectId =
      id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    const selectedOption = options.find(
      (opt) => String(opt.value) === String(selectedValue)
    );

    const { placement, updatePlacement } = useSelectPlacement({
      isOpen,
      triggerRef: buttonRef,
      popoverRef,
    });

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

    const handleSelect = (option: SelectOption) => {
      if (option.disabled || disabled) return;

      if (!isControlled) {
        setInternalValue(option.value);
      }

      if (onChange) {
        const valStr = String(option.value);
        const eventObj = {
          target: {
            value: valStr,
            name,
          },
          currentTarget: {
            value: valStr,
            name,
          },
          value: option.value,
          toString() {
            return valStr;
          },
        };
        onChange(eventObj);
      }

      if (onValueChange) {
        onValueChange(String(option.value));
      }

      setIsOpen(false);
    };

    const toggleOpen = () => {
      if (disabled) return;
      if (!isOpen) {
        updatePlacement();
      }
      setIsOpen((prev) => !prev);
    };

    const currentSize = SIZE_STYLES[size];

    return (
      <div
        ref={containerRef}
        className={`relative flex flex-col gap-1.5 ${
          isOpen ? 'z-30' : 'z-10'
        } ${containerClassName.includes('w-') ? '' : 'w-full'} ${containerClassName}`}
      >
        {label && (
          <label
            htmlFor={selectId}
            onClick={toggleOpen}
            className="text-sm font-medium text-neutral-900 dark:text-neutral-200 select-none cursor-pointer"
          >
            {label}
          </label>
        )}

        <div className="relative w-full">
          <SelectTrigger
            ref={(node) => {
              buttonRef.current = node;
              if (typeof ref === 'function') ref(node);
              else if (ref)
                (
                  ref as React.MutableRefObject<HTMLButtonElement | null>
                ).current = node;
            }}
            id={selectId}
            isOpen={isOpen}
            disabled={disabled}
            error={error}
            variant={variant}
            sizeStyles={currentSize}
            selectedOption={selectedOption}
            placeholder={placeholder}
            leftIcon={LeftIcon}
            wrapperClassName={wrapperClassName}
            className={className}
            onClick={toggleOpen}
          />

          {isOpen && (
            <SelectDropdown
              ref={popoverRef}
              placement={controlledPlacement || placement}
              label={label}
              placeholder={placeholder}
              options={options}
              selectedValue={selectedValue}
              optionSizeClass={currentSize.option}
              onSelect={handleSelect}
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
);

Select.displayName = 'Select';

export default Select;
