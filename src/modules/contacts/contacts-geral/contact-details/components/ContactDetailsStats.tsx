import { Clock, MessageSquare, Percent, Phone } from 'lucide-react';
import { formatDateTime } from '../constants/contact-details';
import type { IContactStats } from '../interfaces/contact-details';

interface ContactDetailsStatsProps {
  number: string;
  stats: IContactStats;
}

export function ContactDetailsStats({
  number,
  stats,
}: ContactDetailsStatsProps) {
  const items = [
    {
      label: 'Número',
      value: number,
      icon: Phone,
      iconStyle: 'bg-primary/10 text-primary',
    },
    {
      label: 'SMS enviadas',
      value: stats.totalSent,
      icon: MessageSquare,
      iconStyle: 'bg-green-500/10 text-green-500',
    },
    {
      label: 'Taxa de conversão',
      value: `${stats.conversionRate.toFixed(1)}%`,
      icon: Percent,
      iconStyle: 'bg-amber-500/10 text-amber-500',
    },
    {
      label: 'Última mensagem',
      value: formatDateTime(stats.lastMessageAt),
      icon: Clock,
      iconStyle: 'bg-red-500/10 text-red-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map(({ label, value, icon: Icon, iconStyle }) => (
        <div
          key={label}
          className="flex flex-col gap-5 rounded-2xl bg-surface p-5 shadow-sm"
        >
          <span
            className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconStyle}`}
          >
            <Icon size={22} aria-hidden />
          </span>

          <div className="min-w-0">
            <p className="text-sm font-medium text-muted-content">{label}</p>
            <p className="mt-1 truncate text-2xl font-bold tracking-tight text-primary-content tabular-nums">
              {value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
