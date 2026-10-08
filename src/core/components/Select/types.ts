import { LucideIcon } from 'lucide-react';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectPopupOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export type SelectSize = 'sm' | 'md' | 'lg';
export type SelectVariant = 'outline' | 'ghost';
export type PopoverPlacement = 'top' | 'bottom';

export interface SelectProps {
  label?: string;
  value?: string | number;
  defaultValue?: string | number;
  options?: SelectOption[];
  placeholder?: string;
  onChange?: (e: any) => void;
  onValueChange?: (value: string) => void;
  leftIcon?: LucideIcon;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  size?: SelectSize;
  variant?: SelectVariant;
  placement?: PopoverPlacement;
  containerClassName?: string;
  wrapperClassName?: string;
  id?: string;
  name?: string;
  className?: string;
}

export interface SelectPopupProps {
  label?: string;
  value?: string | number;
  options: SelectPopupOption[];
  placeholder?: string;
  onChange?: (value: string | number) => void;
  leftIcon?: LucideIcon;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
}
