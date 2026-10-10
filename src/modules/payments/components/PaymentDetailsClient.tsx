'use client';

import { Link } from '@/core/i18n/navigation';
import {
  formatAmount,
  methodLabel,
  statusLabel,
} from '@/modules/payments/constants/payments';
import type {
  IPayment,
  PaymentStatus,
} from '@/modules/payments/interfaces/payments';
import { canUploadProof } from '@/modules/payments/utils/payments-filters';
import { ArrowLeft, Upload } from 'lucide-react';

const statusStyles: Record<PaymentStatus, string> = {
  pending: 'text-amber-500',
  review: 'text-primary',
  approved: 'text-green-500',
  rejected: 'text-red-500',
};

const dateFormatter = new Intl.DateTimeFormat('pt-PT', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Africa/Luanda',
});

export function PaymentDetailsClient({ payment }: { payment: IPayment }) {
  const rows = [
    { label: 'Referência', value: payment.reference },
    { label: 'Método', value: methodLabel[payment.method] },
    { label: 'Volume', value: formatAmount(payment.amount) },
    { label: 'Data', value: dateFormatter.format(new Date(payment.createdAt)) },
    ...(payment.transferReference
      ? [
          {
            label: 'Referência da transferência',
            value: payment.transferReference,
          },
        ]
      : []),
    ...(payment.proofName
      ? [{ label: 'Comprovativo', value: payment.proofName }]
      : []),
  ];

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-4">
      <Link
        href="/payments"
        className="flex w-fit items-center gap-2 text-sm text-muted-content transition-colors hover:text-primary-content"
      >
        <ArrowLeft size={16} aria-hidden />
        Voltar aos pagamentos
      </Link>

      <div className="flex flex-col gap-5 rounded-2xl bg-surface p-5 shadow-sm md:p-6">
        <h1 className="text-xl font-bold text-primary-content">
          Detalhes do pagamento
        </h1>

        <dl className="flex flex-col divide-y divide-black/5 rounded-xl bg-surface-raised px-4">
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
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[payment.status]}`}
              >
                {statusLabel[payment.status]}
              </span>
            </dd>
          </div>
        </dl>

        {canUploadProof(payment) && (
          <Link
            href={`/payments/top-up/${payment.reference}`}
            className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            <Upload size={16} aria-hidden />
            Enviar comprovativo
          </Link>
        )}
      </div>
    </div>
  );
}
