import { useState } from 'react';

export function useFloatingInput(value: unknown, id?: string, label?: string) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const inputId =
    id || `field-${(label || '').toLowerCase().replace(/\s+/g, '-')}`;
  const isFloating =
    isFocused || (value !== undefined && value !== '' && value !== null);

  return {
    isFocused,
    setIsFocused,
    showPassword,
    setShowPassword,
    inputId,
    isFloating,
  };
}
