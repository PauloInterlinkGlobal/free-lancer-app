'use client';

import { Table, type Column } from '@/core/components/Table';
import { usePathname, useRouter } from '@/core/i18n/navigation';
import { IBlacklist } from '@/modules/contacts/contacts-blacklist/interfaces/blacklist';
import { useModalStore } from '@/core/store/useModalStore';
import { LockOpen, Trash2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { DeleteBlacklistModal, UnblockBlacklistModal } from './Modal';

const dateFormatter = new Intl.DateTimeFormat('pt-PT', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  timeZone: 'Africa/Luanda',
});

const formatDate = (iso: string) => dateFormatter.format(new Date(iso));

const columns = (
  onUnblock: (item: IBlacklist) => void,
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
        label: 'Desbloquear',
        icon: LockOpen,
        onClick: () => onUnblock(item),
      },
      {
        label: 'Eliminar',
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

  const { openModal } = useModalStore();
  const [selected, setSelected] = useState<IBlacklist | null>(null);

  const handleUnblock = (item: IBlacklist) => {
    setSelected(item);
    openModal('UNBLOCK_BLACKLIST');
  };

  const handleDelete = (item: IBlacklist) => {
    setSelected(item);
    openModal('DELETE_BLACKLIST');
  };

  return (
    <>
      <Table<IBlacklist>
        allowGrid
        columns={columns(handleUnblock, handleDelete)}
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

      <UnblockBlacklistModal
        item={selected}
        onClose={() => setSelected(null)}
      />
      <DeleteBlacklistModal item={selected} onClose={() => setSelected(null)} />
    </>
  );
}
