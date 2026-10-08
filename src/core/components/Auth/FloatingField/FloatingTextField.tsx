'use client';

import { forwardRef } from 'react';
import { FloatingTextFieldProps } from './types';
import { useFloatingInput } from './useFloatingInput';
import FloatingLabel from './FloatingLabel';
import PasswordToggle from './PasswordToggle';
import FieldError from './FieldError';

const FloatingTextField = forwardRef<HTMLInputElement, FloatingTextFieldProps>(
  (props, ref) => {
    const {
      label,
      error,
      helperText,
      type = 'text',
      value,
      showPasswordToggle = false,
      className = '',
      id,
      onFocus,
      onBlur,
      ...rest
    } = props;
    const {
      isFocused,
      setIsFocused,
      showPassword,
      setShowPassword,
      inputId,
      isFloating,
    } = useFloatingInput(value, id, label);

    const borderClass = error
      ? 'border-red-500 focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500'
      : 'border-neutral-400 dark:border-neutral-600 focus-within:border-primary-500 dark:focus-within:border-primary-400 focus-within:ring-1 focus-within:ring-primary-500 dark:focus-within:ring-primary-400';

    return (
      <div className="flex flex-col gap-1.5 w-full">
        <div
          className={`relative flex items-center rounded-md border bg-transparent transition-colors ${borderClass} ${className}`}
        >
          <input
            ref={ref}
            id={inputId}
            type={
              showPasswordToggle ? (showPassword ? 'text' : 'password') : type
            }
            value={value}
            onFocus={(e) => {
              setIsFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
            }}
            placeholder=" "
            className="peer w-full rounded-md bg-transparent px-3.5 pt-4 pb-2.5 text-sm text-neutral-900 outline-none dark:text-neutral-50"
            {...rest}
          />
          <FloatingLabel
            inputId={inputId}
            label={label}
            isFloating={isFloating}
            isFocused={isFocused}
            error={error}
          />
          {showPasswordToggle && (
            <PasswordToggle
              show={showPassword}
              onToggle={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
        <FieldError error={error} helperText={helperText} />
      </div>
    );
  }
);

FloatingTextField.displayName = 'FloatingTextField';
export default FloatingTextField;
