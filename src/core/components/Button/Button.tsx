import { Loader2, LucideIcon } from 'lucide-react';
import React, { forwardRef } from 'react';

export type ButtonVariant =
  'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white shadow-sm active:scale-[0.98] dark:bg-primary dark:text-neutral-950 dark:hover:bg-primary',
  secondary:
    'bg-secondary text-white shadow-sm hover:bg-secondary-400 active:scale-[0.98]',
  outline:
    'border border-neutral-300 bg-transparent text-neutral-800 hover:bg-neutral-100/70 active:scale-[0.98] dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800',
  ghost:
    'bg-transparent text-primary  active:scale-[0.98] dark:text-primary-300 dark:hover:bg-primary',
  danger:
    'bg-red-600 text-white shadow-sm hover:bg-red-700 active:scale-[0.98] dark:bg-red-500 dark:hover:bg-red-600',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3.5 py-1.5 text-xs rounded-lg gap-1.5',
  md: 'px-5 py-2.5 text-sm rounded-full gap-2',
  lg: 'px-7 py-3.5 text-base rounded-full gap-2.5',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      fullWidth = false,
      disabled,
      className = '',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={`inline-flex items-center justify-center font-medium transition-all select-none disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
        ) : LeftIcon ? (
          <LeftIcon className="w-4 h-4 shrink-0" />
        ) : null}
        {children}
        {!isLoading && RightIcon ? (
          <RightIcon className="w-4 h-4 shrink-0" />
        ) : null}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
