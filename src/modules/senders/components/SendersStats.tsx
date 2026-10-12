import { ISender } from '@/modules/senders/interfaces/senders';
import { AlertTriangle, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';

interface SendersStatsProps {
  senders: ISender[];
}

export function SendersStats({ senders }: SendersStatsProps) {
  const total = senders.length;
  const validated = senders.filter((s) => s.status === 'validated').length;
  const pending = senders.filter((s) => s.status === 'pending').length;
  const rejected = senders.filter((s) => s.status === 'rejected').length;

  const stats = [
    {
      label: 'Total de senders',
      value: total,
      subtext: 'Cadastrados na conta',
      icon: ShieldCheck,
      iconStyle: 'bg-primary/10 text-primary',
    },
    {
      label: 'Validados & Ativos',
      value: validated,
      subtext: 'Prontos para envio de SMS',
      icon: CheckCircle2,
      iconStyle: 'bg-green-500/10 text-green-500',
    },
    {
      label: 'Em Análise',
      value: pending,
      subtext: 'Aguardando aprovação',
      icon: Clock,
      iconStyle: 'bg-amber-500/10 text-amber-500',
    },
    {
      label: 'Rejeitados',
      value: rejected,
      subtext: 'Requerem revisão',
      icon: AlertTriangle,
      iconStyle: 'bg-red-500/10 text-red-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map(({ label, value, subtext, icon: Icon, iconStyle }) => (
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
            <p className="mt-1 truncate text-3xl font-bold tracking-tight text-primary-content tabular-nums">
              {value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
