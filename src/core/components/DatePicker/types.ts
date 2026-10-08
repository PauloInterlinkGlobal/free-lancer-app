import { LucideIcon } from 'lucide-react';

export interface DatePickerProps {
  label?: string;
  value?: string; // YYYY-MM-DD
  onChange?: (value: string) => void;
  minDate?: string; // YYYY-MM-DD
  maxDate?: string; // YYYY-MM-DD
  placeholder?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  leftIcon?: LucideIcon;
  className?: string;
  containerClassName?: string;
}

export type PopoverPlacement = 'top' | 'bottom';

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
}
