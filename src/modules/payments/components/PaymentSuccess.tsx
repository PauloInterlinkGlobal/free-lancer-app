'use client';

import { Link } from '@/core/i18n/navigation';
import { formatAmount } from '@/modules/payments/constants/payments';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface PaymentSuccessProps {
  reference: string;
  amount: number;
}

export function PaymentSuccess({ reference, amount }: PaymentSuccessProps) {
  const rows = [
    { label: 'Referência do pedido', value: reference },
    { label: 'Valor', value: formatAmount(amount) },
  ];

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-6 rounded-2xl bg-surface p-6 text-center shadow-sm md:p-8">
      <span className="flex h-16 w-16 items-center justify-center  text-green-500">
        <CheckCircle2 size={36} aria-hidden />
      </span>

      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold text-primary-content md:text-2xl">
          Comprovativo enviado
        </h2>
        <p className="text-sm text-muted-content">
          Vamos validar o pagamento e creditar a sua conta. Pode acompanhar o
          estado na lista de pagamentos.
        </p>
      </div>

      <dl className="flex w-full flex-col divide-y divide-black/5 rounded-xl bg-surface-raised px-4">
        {rows.map(({ label, value }) => (
          <div
            key={label}
            className="flex items-center justify-between gap-4 py-3 text-sm"
          >
            <dt className="shrink-0 text-muted-content">{label}</dt>
            <dd className="break-all text-right font-medium text-primary-content">
              {value}
            </dd>
          </div>
        ))}

        <div className="flex items-center justify-between gap-4 py-3 text-sm">
          <dt className="shrink-0 text-muted-content">Estado</dt>
          <dd>
            <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
              Em análise
            </span>
          </dd>
        </div>
      </dl>

      <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-center">
        <Link
          href={`/payments/${reference}`}
          className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Ver detalhes
          <ArrowRight size={16} aria-hidden />
        </Link>

        <Link
          href="/payments"
          className="rounded-xl px-5 py-3 text-sm font-medium text-muted-content transition-colors hover:bg-item-hover hover:text-primary-content"
        >
          Ver pagamentos
        </Link>
      </div>
    </div>
  );
}
