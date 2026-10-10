import { IApiStats } from '@/modules/api-integration/interfaces/api-integration';
import { Activity, CheckCircle2, KeyRound, Timer } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ApiStatsProps {
  stats: IApiStats;
}

interface Stat {
  label: string;
  value: string;
  icon: LucideIcon;
  iconColor: string;
}

export function ApiStats({ stats }: ApiStatsProps) {
  const items: Stat[] = [
    {
      label: 'Pedidos hoje',
      value: stats.requestsToday.toLocaleString('pt-PT'),
      icon: Activity,
      iconColor: 'text-primary',
    },
    {
      label: 'Taxa de sucesso',
      value: `${stats.successRate}%`,
      icon: CheckCircle2,
      iconColor: 'text-green-500',
    },
    {
      label: 'Chaves ativas',
      value: String(stats.activeKeys),
      icon: KeyRound,
      iconColor: 'text-amber-500',
    },
    {
      label: 'Latência média',
      value: `${stats.avgLatencyMs} ms`,
      icon: Timer,
      iconColor: 'text-secondary',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map(({ label, value, icon: Icon, iconColor }) => (
        <div
          key={label}
          className="flex flex-col gap-4 rounded-2xl bg-surface p-5 shadow-sm"
        >
          <span
            className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconColor}`}
          >
            <Icon size={24} aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="text-sm text-muted-content">{label}</p>
            <p className="mt-1 truncate text-2xl font-bold text-primary-content">
              {value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
