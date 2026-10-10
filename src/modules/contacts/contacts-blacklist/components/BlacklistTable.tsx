'use client';

import { Table, type Column } from '@/core/components/Table';
import { usePathname, useRouter } from '@/core/i18n/navigation';
import { IBlacklist } from '@/modules/contacts/contacts-blacklist/interfaces/blacklist';
import { Trash2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const dateFormatter = new Intl.DateTimeFormat('pt-PT', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  timeZone: 'Africa/Luanda',
});

const formatDate = (iso: string) => dateFormatter.format(new Date(iso));

const columns = (
  onDelete: (item: IBlacklist) => void
): Column<IBlacklist>[] => [
  {
    key: 'number',
    header: 'Número',
    render: (item) => (
      <span className="font-medium text-primary-content">{item.number}</span>
    ),
  },
  {
    key: 'date',
    header: 'Data',
    className: 'text-muted-content',
    render: (item) => formatDate(item.date),
  },
  {
    key: 'actions',
    header: 'Acções',
    actions: (item) => [
      {
        label: 'Remover',
        icon: Trash2,
        danger: true,
        onClick: () => onDelete(item),
      },
    ],
  },
];

interface BlacklistTableProps {
  data: IBlacklist[];
  currentPage: number;
  totalPages: number;
  loading?: boolean;
}

export function BlacklistTable({
  data,
  currentPage,
  totalPages,
  loading = false,
}: BlacklistTableProps) {
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

  const handleDelete = (item: IBlacklist) => {
    console.log('Remover da blacklist', item.id);
  };

  return (
    <Table<IBlacklist>
      allowGrid
      columns={columns(handleDelete)}
      data={data}
      loading={loading}
      keyExtractor={(item) => item.id}
      emptyMessage="Não existem números na blacklist."
      pagination={{
        currentPage,
        totalPages,
        onPageChange: handlePageChange,
      }}
    />
  );
}
