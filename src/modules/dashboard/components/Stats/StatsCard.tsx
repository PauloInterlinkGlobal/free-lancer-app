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
  icon: CustomIcon,
  iconBg,
  iconColor,
}: StatsCardProps) {
  const IconComponent = CustomIcon;
  const badgeClass =
    iconBg && iconColor
      ? `${iconBg} ${iconColor}`
      : 'bg-primary/10 text-primary';

  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-border-ui bg-surface p-5 transition-all duration-200 hover:shadow-sm">
      <div className="flex min-w-0 flex-col gap-2">
        <span className="text-xs font-medium text-text-muted sm:text-sm">
          {label}
        </span>
        <span className="truncate text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
          {value}
        </span>
        <div
          className={`flex items-center gap-1.5 text-xs font-semibold ${
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

      {IconComponent && (
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${badgeClass}`}
        >
          <IconComponent className="h-5 w-5" aria-hidden />
        </div>
      )}
    </div>
  );
}

export default StatsCard;
