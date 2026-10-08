interface FloatingLabelProps {
  inputId: string;
  label: string;
  isFloating: boolean;
  isFocused: boolean;
  error?: string;
}

export default function FloatingLabel({
  inputId,
  label,
  isFloating,
  isFocused,
  error,
}: FloatingLabelProps) {
  const labelColor = error
    ? 'text-red-500'
    : isFocused
      ? 'text-primary-500 dark:text-primary-400'
      : 'text-neutral-600 dark:text-neutral-400';

  const positionClass = isFloating
    ? `-top-2.5 bg-white px-1.5 text-xs font-medium dark:bg-[#1e1f20] ${labelColor}`
    : 'top-3.5 text-sm text-neutral-500 dark:text-neutral-400';

  return (
    <label
      htmlFor={inputId}
      className={`pointer-events-none absolute left-3.5 transition-all duration-150 origin-top-left ${positionClass}`}
    >
      {label}
    </label>
  );
}
