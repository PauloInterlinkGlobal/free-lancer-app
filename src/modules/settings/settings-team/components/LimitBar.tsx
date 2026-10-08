interface LimitBarProps {
  percent: number;
  label?: string;
  className?: string;
}

export function LimitBar({ percent, label, className = '' }: LimitBarProps) {
  const hot = percent >= 80;

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-1.5 w-40 max-w-full overflow-hidden rounded-full bg-surface-subtle"
      >
        <div
          className={`h-full rounded-full transition-[width] ${
            hot ? 'bg-orange-500' : 'bg-primary'
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>
      {label && (
        <span
          className={`text-xs ${
            hot ? 'font-medium text-orange-600' : 'text-muted-content'
          }`}
        >
          {label}
        </span>
      )}
    </div>
  );
}
