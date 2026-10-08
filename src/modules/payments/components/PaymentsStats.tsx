import { formatAmount } from '@/modules/payments/constants/payments';
import { IPayment } from '@/modules/payments/interfaces/payments';
import { getPaymentsStats } from '@/modules/payments/utils/payments-filters';
import {
  Clock,
  FileSearch,
  Wallet,
  XCircle,
  type LucideIcon,
} from 'lucide-react';

interface PaymentsStatsProps {
  data: IPayment[];
}

interface Stat {
  label: string;
  value: string;
  icon: LucideIcon;
  iconColor: string;
}

export function PaymentsStats({ data }: PaymentsStatsProps) {
  const stats = getPaymentsStats(data);

  const items: Stat[] = [
    {
      label: 'Saldo Disponível',
      value: formatAmount(stats.totalApproved),
      icon: Wallet,
      iconColor: 'text-green-500',
    },
    {
      label: 'Pendentes',
      value: String(stats.pending),
      icon: Clock,
      iconColor: 'text-amber-500',
    },
    {
      label: 'Em análise',
      value: String(stats.review),
      icon: FileSearch,
      iconColor: 'text-primary',
    },
    {
      label: 'Rejeitados',
      value: String(stats.rejected),
      icon: XCircle,
      iconColor: 'text-red-500',
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
            className={`flex h-12 w-12 items-center justify-center rounded-xl  ${iconColor}`}
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
