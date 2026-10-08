'use client';

import { Table, type Column } from '@/core/components/Table';
import { usePathname, useRouter } from '@/core/i18n/navigation';
import {
  formatAmount,
  methodLabel,
  statusLabel,
} from '@/modules/payments/constants/payments';
import {
  IPayment,
  PaymentStatus,
} from '@/modules/payments/interfaces/payments';
import { canUploadProof } from '@/modules/payments/utils/payments-filters';
import { Eye, Upload } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const statusStyles: Record<PaymentStatus, string> = {
  pending: 'bg-amber-500/10 text-amber-500',
  review: 'bg-primary/10 text-primary',
  approved: 'bg-green-500/10 text-green-500',
  rejected: 'bg-red-500/10 text-red-500',
};

const dateFormatter = new Intl.DateTimeFormat('pt-PT', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Africa/Luanda',
});

const formatDate = (iso: string) => dateFormatter.format(new Date(iso));

const columns = (
  onView: (item: IPayment) => void,
  onUpload: (item: IPayment) => void
): Column<IPayment>[] => [
  {
    key: 'reference',
    header: 'Referência',
    render: (payment) => (
      <span className="font-medium text-primary-content">
        {payment.reference}
      </span>
    ),
  },
  {
    key: 'method',
    header: 'Método',
    render: (payment) => methodLabel[payment.method],
  },
  {
    key: 'amount',
    header: 'Valor',
    render: (payment) => formatAmount(payment.amount),
  },
  {
    key: 'status',
    header: 'Estado',
    render: (payment) => (
      <span
        className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[payment.status]}`}
      >
        {statusLabel[payment.status]}
      </span>
    ),
  },
  {
    key: 'createdAt',
    header: 'Data',
    className: 'text-muted-content',
    render: (payment) => formatDate(payment.createdAt),
  },
  {
    key: 'actions',
    header: 'Acções',
    actions: (payment) => [
      ...(canUploadProof(payment)
        ? [
            {
              label: 'Enviar comprovativo',
              icon: Upload,
              onClick: () => onUpload(payment),
            },
          ]
        : []),
      { label: 'Ver detalhes', icon: Eye, onClick: () => onView(payment) },
    ],
  },
];

interface PaymentsTableProps {
  data: IPayment[];
  currentPage: number;
  totalPages: number;
  loading?: boolean;
}

export function PaymentsTable({
  data,
  currentPage,
  totalPages,
  loading = false,
}: PaymentsTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (page <= 1) params.delete('page');
    else params.set('page', String(page));

    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const handleView = (payment: IPayment) =>
    router.push(`/payments/${payment.reference}`);

  const handleUpload = (payment: IPayment) =>
    router.push(`/payments/top-up/${payment.reference}`);

  return (
    <Table<IPayment>
      columns={columns(handleView, handleUpload)}
      data={data}
      loading={loading}
      keyExtractor={(payment) => payment.id}
      emptyMessage="Não existem pagamentos."
      pagination={{
        currentPage,
        totalPages,
        onPageChange: handlePageChange,
      }}
    />
  );
}
