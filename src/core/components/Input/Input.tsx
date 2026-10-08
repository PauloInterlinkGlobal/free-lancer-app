import { Eye, EyeOff, LucideIcon } from 'lucide-react';
import React, { forwardRef, useState } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  showPasswordToggle?: boolean;
  containerClassName?: string;
  labelClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      showPasswordToggle = false,
      type = 'text',
      id,
      disabled,
      className = '',
      containerClassName = '',
      labelClassName = '',
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId =
      id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const resolvedType = showPasswordToggle
      ? showPassword
        ? 'text'
        : 'password'
      : type;

    const borderClass = error
      ? 'border-red-500 focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500'
      : 'border-neutral-300 dark:border-neutral-700 focus-within:border-primary dark:focus-within:border-primary focus-within:ring-1 focus-within:ring-primary dark:focus-within:ring-primary-400';

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={`text-sm font-medium text-neutral-900 dark:text-neutral-200 ${labelClassName}`}
          >
            {label}
          </label>
        )}

        <div
          className={`relative flex w-full items-center rounded-lg border bg-white dark:bg-neutral-900/60 transition-colors ${borderClass} ${
            disabled
              ? 'opacity-60 cursor-not-allowed bg-neutral-100 dark:bg-neutral-800'
              : ''
          } ${containerClassName}`}
        >
          {LeftIcon && (
            <div className="pl-3.5 flex items-center pointer-events-none text-neutral-400 dark:text-neutral-400 shrink-0">
              <LeftIcon className="w-4 h-4 shrink-0" />
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={resolvedType}
            disabled={disabled}
            className={`min-w-0 flex-1 w-full bg-transparent py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 dark:text-neutral-100 dark:placeholder:text-neutral-300/80 outline-none ${
              LeftIcon ? 'pl-2.5' : 'pl-3.5'
            } ${RightIcon || showPasswordToggle ? 'pr-2' : 'pr-3.5'} ${className}`}
            {...props}
          />

          {showPasswordToggle && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={
                showPassword ? 'Ocultar palavra-passe' : 'Mostrar palavra-passe'
              }
              className="mr-3 text-neutral-400 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 focus:outline-none transition-colors shrink-0"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          )}

          {!showPasswordToggle && RightIcon && (
            <div className="pr-3.5 flex items-center pointer-events-none text-neutral-400 dark:text-neutral-400 shrink-0">
              <RightIcon className="w-4 h-4 shrink-0" />
            </div>
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

Input.displayName = 'Input';
export default Input;
