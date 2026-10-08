interface FieldErrorProps {
  error?: string;
  helperText?: string;
}

export default function FieldError({ error, helperText }: FieldErrorProps) {
  if (error) {
    return (
      <p className="text-xs text-red-500 flex items-center gap-1 pl-1">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
        <span>{error}</span>
      </p>
    );
  }

  if (helperText) {
    return (
      <p className="text-xs text-neutral-500 dark:text-neutral-400 pl-1">
        {helperText}
      </p>
    );
  }

  return null;
}
