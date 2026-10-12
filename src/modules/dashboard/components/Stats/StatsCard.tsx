import { IStatCard } from '@/modules/dashboard/interfaces/dashboard';
import { LucideIcon, TrendingDown, TrendingUp } from 'lucide-react';

interface StatsCardProps extends IStatCard {
  icon?: LucideIcon;
  iconBg?: string;
  iconColor?: string;
}

export function StatsCard({
  label,
  value,
  trend,
  trendUp,
  icon: Icon,
  iconBg,
  iconColor,
}: StatsCardProps) {
  const badgeClass =
    iconBg && iconColor
      ? `${iconBg} ${iconColor}`
      : 'bg-primary/10 text-primary';

  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-surface p-5 shadow-sm">
      {Icon && (
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${badgeClass}`}
        >
          <Icon size={22} aria-hidden />
        </span>
      )}

      <div className="min-w-0">
        <p className="text-sm font-medium text-muted-content">{label}</p>
        <p className="mt-1 truncate text-3xl font-bold tracking-tight text-primary-content tabular-nums">
          {value}
        </p>
      </div>

      <div
        className={`flex items-center gap-1.5  pt-3 text-xs font-semibold ${
          trendUp ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'
        }`}
      >
        {trendUp ? (
          <TrendingUp className="h-3.5 w-3.5" aria-hidden />
        ) : (
          <TrendingDown className="h-3.5 w-3.5" aria-hidden />
        )}
        <span>{trend}</span>
      </div>
    </div>
  );
}

export default StatsCard;
