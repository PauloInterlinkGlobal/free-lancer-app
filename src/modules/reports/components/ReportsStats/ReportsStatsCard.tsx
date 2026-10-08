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
    <div className="flex flex-col justify-between bg-surface p-5 shadow-sm transition-all hover:border-primary/30">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}
        >
          <Icon size={20} />
        </div>

        <div
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
            stat.trendUp
              ? 'bg-emerald-500/10 text-emerald-500'
              : 'bg-rose-500/10 text-rose-500'
          }`}
        >
          {stat.trendUp ? (
            <TrendingUp size={13} className="shrink-0" />
          ) : (
            <TrendingDown size={13} className="shrink-0" />
          )}
          <span>{stat.trend}</span>
        </div>
      </div>

      <div className="mt-4 flex flex-col">
        <span className="text-xs font-medium text-muted-content">
          {stat.label}
        </span>
        <span className="mt-1 text-2xl font-bold tracking-tight text-primary-content">
          {stat.value}
        </span>
      </div>

      {stat.subValue && (
        <div className="mt-3  pt-2.5">
          <p className="text-xs font-medium text-muted-content">
            {stat.subValue}
          </p>
        </div>
      )}
    </div>
  );
}
