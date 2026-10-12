'use client';

import { Table, type Column } from '@/core/components/Table';
import { usePathname, useRouter } from '@/core/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import {
  formatDateTime,
  messageOriginLabel,
  messageStatusLabel,
  messageStatusStyles,
} from '../constants/contact-details';
import type { IContactMessage } from '../interfaces/contact-details';

const MAX_VISIBLE_GROUPS = 2;

const columns: Column<IContactMessage>[] = [
  {
    key: 'sentAt',
    header: 'Data/Hora',
    className: 'text-muted-content whitespace-nowrap',
    render: (item) => formatDateTime(item.sentAt),
  },
  {
    key: 'message',
    header: 'Mensagem',
    render: (item) => (
      <span
        title={item.message}
        className="block max-w-xs truncate text-primary-content"
      >
        {item.message}
      </span>
    ),
  },
  {
    key: 'origin',
    header: 'Origem',
    render: (item) => messageOriginLabel[item.origin],
  },
  {
    key: 'groups',
    header: 'Grupos',
    render: (item) => {
      if (item.groups.length === 0) {
        return <span className="text-muted-content">—</span>;
      }

      const visible = item.groups.slice(0, MAX_VISIBLE_GROUPS);
      const hidden = item.groups.length - visible.length;

      return (
        <div className="flex flex-wrap items-center gap-1">
          {visible.map((group) => (
            <span
              key={group}
              className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
            >
              {group}
            </span>
          ))}
          {hidden > 0 && (
            <span
              title={item.groups.join(', ')}
              className="rounded-full bg-surface-raised px-2 py-1 text-xs font-medium text-muted-content"
            >
              +{hidden}
            </span>
          )}
        </div>
      );
    },
  },
  {
    key: 'status',
    header: 'Estado',
    render: (item) => (
      <span
        className={`rounded-full px-2.5 py-1 text-xs font-medium ${messageStatusStyles[item.status]}`}
      >
        {messageStatusLabel[item.status]}
      </span>
    ),
  },
];

interface ContactMessagesTableProps {
  data: IContactMessage[];
  currentPage: number;
  totalPages: number;
  loading?: boolean;
}

export function ContactMessagesTable({
  data,
  currentPage,
  totalPages,
  loading = false,
}: ContactMessagesTableProps) {
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
    <Table<IContactMessage>
      columns={columns}
      data={data}
      loading={loading}
      keyExtractor={(item) => item.id}
      emptyMessage="Ainda não foram enviadas mensagens a este contacto."
      pagination={{
        currentPage,
        totalPages,
        onPageChange: handlePageChange,
      }}
    />
  );
}
