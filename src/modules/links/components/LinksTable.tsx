'use client';

import { Table, type Column } from '@/core/components/Table';
import { usePathname, useRouter } from '@/core/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { AlertCircle, CheckCircle2, Clock, Trash2 } from 'lucide-react';
import { linkStatusLabel, linkStatusStyles } from '../constants/links';
import { ILink, LinkStatus } from '../interfaces/links';

const dateFormatter = new Intl.DateTimeFormat('pt-PT', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  timeZone: 'Africa/Luanda',
});

const formatDate = (iso?: string | null) => {
  if (!iso) return '—';
  try {
    return dateFormatter.format(new Date(iso));
  } catch {
    return '—';
  }
};

const statusIcons: Record<LinkStatus, typeof CheckCircle2> = {
  approved: CheckCircle2,
  pending: Clock,
  rejected: AlertCircle,
};

const columns = (
  onDelete: (item: ILink) => void
): Column<ILink>[] => [
  {
    key: 'description',
    header: 'Descrição',
    render: (link) => (
      <span
        title={link.description}
        className="block max-w-[220px] truncate font-medium text-primary-content sm:max-w-[320px]"
      >
        {link.description}
      </span>
    ),
  },
  {
    key: 'url',
    header: 'Link',
    render: (link) => (
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        title={link.url}
        className="block max-w-[200px] truncate font-mono text-xs text-primary transition-colors hover:underline sm:max-w-[280px]"
      >
        {link.url}
      </a>
    ),
  },
  {
    key: 'submittedAt',
    header: 'Data de submissão',
    className: 'text-muted-content whitespace-nowrap',
    render: (link) => formatDate(link.submittedAt),
  },
  {
    key: 'reviewedAt',
    header: 'Revisão',
    className: 'text-muted-content whitespace-nowrap',
    render: (link) => formatDate(link.reviewedAt),
  },
  {
    key: 'status',
    header: 'Estado',
    render: (link) => {
      const StatusIcon = statusIcons[link.status] || Clock;
      const titleAttr =
        link.status === 'rejected' && link.rejectionReason
          ? `Motivo: ${link.rejectionReason}`
          : linkStatusLabel[link.status];

      return (
        <span
          title={titleAttr}
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${linkStatusStyles[link.status]}`}
        >
          <StatusIcon size={13} aria-hidden />
          <span>{linkStatusLabel[link.status]}</span>
        </span>
      );
    },
  },
  {
    key: 'actions',
    header: 'Acções',
    actions: (link) => [
      {
        label: 'Eliminar',
        icon: Trash2,
        danger: true,
        onClick: () => onDelete(link),
      },
    ],
  },
];

interface LinksTableProps {
  data: ILink[];
  currentPage: number;
  totalPages: number;
  loading?: boolean;
  onDelete: (link: ILink) => void;
}

export function LinksTable({
  data,
  currentPage,
  totalPages,
  loading = false,
  onDelete,
}: LinksTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (page <= 1) {
      params.delete('page');
    } else {
      params.set('page', String(page));
    }

    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return (
    <Table<ILink>
      columns={columns(onDelete)}
      data={data}
      loading={loading}
      keyExtractor={(item) => item.id}
      emptyMessage="Ainda não submeteu nenhum link."
      pagination={{
        currentPage,
        totalPages,
        onPageChange: handlePageChange,
      }}
    />
  );
}
