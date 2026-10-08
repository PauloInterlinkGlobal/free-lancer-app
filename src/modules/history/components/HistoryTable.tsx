'use client';

import { Table, type Column } from '@/core/components/Table';
import { usePathname, useRouter } from '@/core/i18n/navigation';
import {
  sendingTypeLabel,
  smsTypeLabel,
} from '@/modules/history/constants/history';
import {
  HistorySendingType,
  HistorySmsType,
  IHistorySms,
} from '@/modules/history/interfaces/history';
import { Eye } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const smsTypeStyles: Record<HistorySmsType, string> = {
  scheduled: 'bg-primary/10 text-primary',
  immediate: 'bg-secondary/10 text-secondary',
};

const sendingTypeStyles: Record<HistorySendingType, string> = {
  normal: 'bg-primary/10 text-primary',
  flash: 'bg-secondary/10 text-secondary',
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
  onView: (item: IHistorySms) => void
): Column<IHistorySms>[] => [
  {
    key: 'smsType',
    header: 'Tipo de SMS',
    render: (sms) => (
      <span
        className={`rounded-full px-2.5 py-1 text-xs font-medium ${smsTypeStyles[sms.smsType]}`}
      >
        {smsTypeLabel[sms.smsType]}
      </span>
    ),
  },
  {
    key: 'content',
    header: 'Conteúdo',
    render: (sms) => (
      <span
        title={sms.content}
        className="block max-w-xs truncate font-medium text-primary-content"
      >
        {sms.content}
      </span>
    ),
  },
  {
    key: 'sendingType',
    header: 'Tipo de envio',
    render: (sms) => (
      <span
        className={`rounded-full px-2.5 py-1 text-xs font-medium ${sendingTypeStyles[sms.sendingType]}`}
      >
        {sendingTypeLabel[sms.sendingType]}
      </span>
    ),
  },
  {
    key: 'recipients',
    header: 'Destinatários',
    render: (sms) => sms.recipients.toLocaleString(),
  },
  {
    key: 'smsUsed',
    header: 'SMS usados',
    render: (sms) => sms.smsUsed.toLocaleString(),
  },
  {
    key: 'sender',
    header: 'Sender',
  },
  {
    key: 'editionDate',
    header: 'Data de edição',
    className: 'text-muted-content',
    render: (sms) => formatDate(sms.editionDate),
  },
  {
    key: 'sendingDate',
    header: 'Data de envio',
    className: 'text-muted-content',
    render: (sms) => formatDate(sms.sendingDate),
  },
  {
    key: 'actions',
    header: 'Acções',
    actions: (sms) => [
      { label: 'Ver detalhes', icon: Eye, onClick: () => onView(sms) },
    ],
  },
];

interface HistoryTableProps {
  data: IHistorySms[];
  currentPage: number;
  totalPages: number;
  loading?: boolean;
}

export function HistoryTable({
  data,
  currentPage,
  totalPages,
  loading = false,
}: HistoryTableProps) {
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

  const handleView = (sms: IHistorySms) => console.log('Ver', sms.id);

  return (
    <Table<IHistorySms>
      columns={columns(handleView)}
      data={data}
      loading={loading}
      keyExtractor={(sms) => sms.id}
      emptyMessage="Não existem SMS no histórico."
      pagination={{
        currentPage,
        totalPages,
        onPageChange: handlePageChange,
      }}
    />
  );
}
