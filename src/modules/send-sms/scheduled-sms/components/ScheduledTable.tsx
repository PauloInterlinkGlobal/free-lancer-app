'use client';

import { Table, type Column } from '@/core/components/Table';
import { usePathname, useRouter } from '@/core/i18n/navigation';
import { useModalStore } from '@/core/store/useModalStore';
import { sendingTypeLabel } from '@/modules/send-sms/scheduled-sms/constants/scheduled-sms';
import {
  IScheduledSms,
  SendingType,
} from '@/modules/send-sms/scheduled-sms/interfaces/scheduled-sms';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { DeleteScheduledModal, DetailScheduledModal } from './Modal';

const sendingTypeStyles: Record<SendingType, string> = {
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
  onView: (item: IScheduledSms) => void,
  onEdit: (item: IScheduledSms) => void,
  onDelete: (item: IScheduledSms) => void
): Column<IScheduledSms>[] => [
  {
    key: 'reference',
    header: 'Referência',
    render: (sms) => (
      <span className="font-mono text-sm font-medium text-primary-content">
        {sms.reference}
      </span>
    ),
  },
  {
    key: 'sendingType',
    header: 'Tipo',
    render: (sms) => (
      <span
        className={`rounded-full px-2.5 py-1 text-xs font-medium ${sendingTypeStyles[sms.sendingType]}`}
      >
        {sendingTypeLabel[sms.sendingType]}
      </span>
    ),
  },
  {
    key: 'content',
    header: 'Conteúdo',
    render: (sms) => (
      <span
        title={sms.content}
        className="block max-w-xs truncate text-primary-content"
      >
        {sms.content}
      </span>
    ),
  },
  {
    key: 'recipients',
    header: 'Destinatários',
    render: (sms) => sms.recipients.toLocaleString('pt-PT'),
  },
  {
    key: 'editionDate',
    header: 'Última actualização',
    className: 'text-muted-content',
    render: (sms) => formatDate(sms.editionDate),
  },
  {
    key: 'actions',
    header: 'Acções',
    actions: (sms) => [
      { label: 'Ver detalhes', icon: Eye, onClick: () => onView(sms) },
      { label: 'Editar', icon: Pencil, onClick: () => onEdit(sms) },
      {
        label: 'Eliminar',
        icon: Trash2,
        danger: true,
        onClick: () => onDelete(sms),
      },
    ],
  },
];

interface ScheduledTableProps {
  data: IScheduledSms[];
  currentPage: number;
  totalPages: number;
  loading?: boolean;
}

export function ScheduledTable({
  data,
  currentPage,
  totalPages,
  loading = false,
}: ScheduledTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { openModal } = useModalStore();

  const [selectedScheduled, setSelectedScheduled] =
    useState<IScheduledSms | null>(null);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (page <= 1) params.delete('page');
    else params.set('page', String(page));

    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const handleView = (sms: IScheduledSms) => {
    setSelectedScheduled(sms);
    openModal('DETAIL_SCHEDULED_SMS');
  };

  const handleEdit = (sms: IScheduledSms) => {
    router.push(`/send-sms?scheduled=${sms.id}`);
  };

  const handleDelete = (sms: IScheduledSms) => {
    setSelectedScheduled(sms);
    openModal('DELETE_SCHEDULED_SMS');
  };

  return (
    <>
      <Table<IScheduledSms>
        columns={columns(handleView, handleEdit, handleDelete)}
        data={data}
        loading={loading}
        keyExtractor={(sms) => sms.id}
        emptyMessage="Não existem SMS agendados."
        pagination={{
          currentPage,
          totalPages,
          onPageChange: handlePageChange,
        }}
      />

      <DetailScheduledModal scheduled={selectedScheduled} />
      <DeleteScheduledModal scheduled={selectedScheduled} />
    </>
  );
}
