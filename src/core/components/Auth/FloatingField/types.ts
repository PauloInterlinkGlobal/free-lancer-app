import { InputHTMLAttributes } from 'react';

export interface FloatingTextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  showPasswordToggle?: boolean;
}
