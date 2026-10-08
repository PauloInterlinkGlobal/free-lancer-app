'use client';

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
      iconBg: 'text-primary',
    },
    {
      label: 'Validados & Ativos',
      value: validated,
      subtext: 'Prontos para envio de SMS',
      icon: CheckCircle2,
      iconBg: 'text-emerald-600',
    },
    {
      label: 'Em Análise',
      value: pending,
      subtext: 'Aguardando aprovação',
      icon: Clock,
      iconBg: 'text-amber-600',
    },
    {
      label: 'Rejeitados',
      value: rejected,
      subtext: 'Requerem revisão',
      icon: AlertTriangle,
      iconBg: 'text-rose-600 ',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="flex items-start justify-between gap-3 rounded-2xl border border-border-ui bg-surface p-5 transition-all duration-200 hover:shadow-sm"
          >
            <div className="flex flex-col gap-1.5 min-w-0">
              <span className="text-xs font-medium text-text-muted">
                {stat.label}
              </span>
              <span className="text-2xl font-bold tracking-tight text-primary-content">
                {stat.value}
              </span>
              <span className="text-xs text-muted-content line-clamp-1">
                {stat.subtext}
              </span>
            </div>

            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center ${stat.iconBg}`}
            >
              <Icon className="h-5 w-5" aria-hidden />
            </div>
          </div>
        );
      })}
    </div>
  );
}
