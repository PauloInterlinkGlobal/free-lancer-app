'use client';

import { Table, type Column } from '@/core/components/Table';
import { usePathname, useRouter } from '@/core/i18n/navigation';
import { useModalStore } from '@/core/store/useModalStore';
import {
  sendingTypeLabel,
  smsTypeLabel,
} from '@/modules/send-sms/draft-sms/constants/draft-sms';
import {
  DraftSendingType,
  DraftSmsType,
  IDraftSms,
} from '@/modules/send-sms/draft-sms/interfaces/draft-sms';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { DeleteDraftModal, DetailDraftModal } from './Modal';

const smsTypeStyles: Record<DraftSmsType, string> = {
  immediate: 'bg-primary/10 text-primary',
  scheduled: 'bg-secondary/10 text-secondary',
};

const sendingTypeStyles: Record<DraftSendingType, string> = {
  flash: 'bg-amber-500/10 text-amber-500',
  normal: 'bg-surface-raised text-secondary-content',
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

const formatNumber = (value: number | null) =>
  value === null ? '-' : value.toLocaleString();

const columns = (
  onView: (item: IDraftSms) => void,
  onEdit: (item: IDraftSms) => void,
  onDelete: (item: IDraftSms) => void
): Column<IDraftSms>[] => [
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
    key: 'recipients',
    header: 'Destinatários',
    render: (sms) => formatNumber(sms.recipients),
  },
  {
    key: 'smsUsed',
    header: 'SMS usados',
    render: (sms) => formatNumber(sms.smsUsed),
  },
  {
    key: 'sender',
    header: 'Sender',
    render: (sms) => sms.sender ?? '-',
  },
  {
    key: 'editionDate',
    header: 'Data de edição',
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

interface DraftTableProps {
  data: IDraftSms[];
  currentPage: number;
  totalPages: number;
  loading?: boolean;
}

export function DraftTable({
  data,
  currentPage,
  totalPages,
  loading = false,
}: DraftTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { openModal } = useModalStore();

  const [selectedDraft, setSelectedDraft] = useState<IDraftSms | null>(null);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (page <= 1) params.delete('page');
    else params.set('page', String(page));

    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const handleView = (sms: IDraftSms) => {
    setSelectedDraft(sms);
    openModal('DETAIL_DRAFT_SMS');
  };

  const handleEdit = (sms: IDraftSms) =>
    router.push(`/send-sms?draft=${sms.id}`);

  const handleDelete = (sms: IDraftSms) => {
    setSelectedDraft(sms);
    openModal('DELETE_DRAFT_SMS');
  };

  return (
    <>
      <Table<IDraftSms>
        allowGrid
        columns={columns(handleView, handleEdit, handleDelete)}
        data={data}
        loading={loading}
        keyExtractor={(sms) => sms.id}
        emptyMessage="Não existem rascunhos."
        pagination={{
          currentPage,
          totalPages,
          onPageChange: handlePageChange,
        }}
      />

      <DetailDraftModal draft={selectedDraft} />
      <DeleteDraftModal draft={selectedDraft} />
    </>
  );
}
