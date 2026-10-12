import {
  Banknote,
  CheckCircle2,
  LucideIcon,
  Radio,
  Send,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { IReportStatItem } from '../../interfaces/reports';

const iconMap: Record<
  IReportStatItem['type'],
  { icon: LucideIcon; color: string }
> = {
  sms: {
    icon: Send,
    color: 'text-primary',
  },
  rate: {
    icon: CheckCircle2,
    color: 'text-emerald-500',
  },
  cost: {
    icon: Banknote,
    color: 'text-amber-500',
  },
  sender: {
    icon: Radio,
    color: 'text-indigo-500',
  },
};

interface ReportsStatsCardProps {
  stat: IReportStatItem;
}

export function ReportsStatsCard({ stat }: ReportsStatsCardProps) {
  const { icon: Icon, color } = iconMap[stat.type] || iconMap.sms;

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-surface p-5 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}
        >
          <Icon size={24} aria-hidden />
        </span>

        <div
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
            stat.trendUp
              ? 'bg-emerald-500/10 text-emerald-500'
              : 'bg-rose-500/10 text-rose-500'
          }`}
        >
          {stat.trendUp ? (
            <TrendingUp size={13} aria-hidden className="shrink-0" />
          ) : (
            <TrendingDown size={13} aria-hidden className="shrink-0" />
          )}
          <span>{stat.trend}</span>
        </div>
      </div>

      <div className="min-w-0">
        <p className="text-sm text-muted-content">{stat.label}</p>
        <p className="mt-1 truncate text-2xl font-bold text-primary-content">
          {stat.value}
        </p>
        {stat.subValue && (
          <p className="mt-1 text-xs text-muted-content">{stat.subValue}</p>
        )}
      </div>
    </div>
  );
}
