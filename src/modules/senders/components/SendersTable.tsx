'use client';

import { Table, type Column } from '@/core/components/Table';
import { usePathname, useRouter } from '@/core/i18n/navigation';
import {
  senderStatusBadgeStyles,
  senderStatusIcons,
  senderStatusLabel,
} from '@/modules/senders/constants/senders';
import { ISender } from '@/modules/senders/interfaces/senders';
import { formatSenderDate } from '@/modules/senders/utils/senders-format';
import { Eye, Send, Trash2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const columns = (
  onView: (item: ISender) => void,
  onSend: () => void,
  onDelete: (item: ISender) => void
): Column<ISender>[] => [
  {
    key: 'sender',
    header: 'Sender ID',
    render: (sender) => (
      <span className="font-medium text-primary-content">{sender.sender}</span>
    ),
  },
  {
    key: 'status',
    header: 'Estado',
    render: (sender) => {
      const StatusIcon = senderStatusIcons[sender.status];
      return (
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-medium ${senderStatusBadgeStyles[sender.status]}`}
        >
          <StatusIcon className="h-3.5 w-3.5" />
          {senderStatusLabel[sender.status]}
        </span>
      );
    },
  },
  {
    key: 'description',
    header: 'Descrição',
    className: 'max-w-xs truncate text-muted-content',
    render: (sender) => sender.description || '—',
  },
  {
    key: 'createdAt',
    header: 'Criação',
    render: (sender) => formatSenderDate(sender.createdAt),
  },
  {
    key: 'validatedAt',
    header: 'Validação',
    render: (sender) => formatSenderDate(sender.validatedAt),
  },
  {
    key: 'actions',
    header: 'Acções',
    actions: (sender) => [
      { label: 'Ver detalhes', icon: Eye, onClick: () => onView(sender) },
      ...(sender.status === 'validated'
        ? [{ label: 'Enviar SMS', icon: Send, onClick: onSend }]
        : []),
      {
        label: 'Eliminar',
        icon: Trash2,
        onClick: () => onDelete(sender),
        danger: true,
      },
    ],
  },
];

interface SendersTableProps {
  items: ISender[];
  currentPage: number;
  totalPages: number;
  onView: (sender: ISender) => void;
  onDelete: (sender: ISender) => void;
}

export function SendersTable({
  items,
  currentPage,
  totalPages,
  onView,
  onDelete,
}: SendersTableProps) {
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

  return (
    <Table<ISender>
      columns={columns(onView, () => router.push('/send-sms'), onDelete)}
      data={items}
      keyExtractor={(sender) => sender.id}
      emptyMessage="Nenhum remetente encontrado."
      pagination={{ currentPage, totalPages, onPageChange: handlePageChange }}
    />
  );
}
