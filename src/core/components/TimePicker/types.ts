import { LucideIcon } from 'lucide-react';

export interface TimePickerProps {
  label?: string;
  value?: string; // HH:mm
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  leftIcon?: LucideIcon;
  className?: string;
  containerClassName?: string;
  minuteStep?: number; // 5 or 15
}

export type PopoverPlacement = 'top' | 'bottom';
