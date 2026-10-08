'use client';

import { Table, type Column } from '@/core/components/Table';
import { usePathname, useRouter } from '@/core/i18n/navigation';
import {
  sexLabel,
  statusLabel,
} from '@/modules/contacts/contacts-geral/constants/contacts';
import {
  ContactStatus,
  IContact,
} from '@/modules/contacts/contacts-geral/interfaces/contacts';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const MAX_VISIBLE_GROUPS = 2;

const statusStyles: Record<ContactStatus, string> = {
  active: 'bg-green-500/10 text-green-500',
  inactive: 'bg-surface-raised text-muted-content',
  blocked: 'bg-red-500/10 text-red-500',
};

const dateFormatter = new Intl.DateTimeFormat('pt-PT', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  timeZone: 'Africa/Luanda',
});

const formatDate = (iso: string) => dateFormatter.format(new Date(iso));

const columns = (
  onView: (item: IContact) => void,
  onEdit: (item: IContact) => void,
  onDelete: (item: IContact) => void
): Column<IContact>[] => [
  {
    key: 'name',
    header: 'Nome do contacto',
    render: (contact) => (
      <span className="font-medium text-primary-content">{contact.name}</span>
    ),
  },
  {
    key: 'number',
    header: 'Número',
  },
  {
    key: 'sex',
    header: 'Sexo',
    render: (contact) => sexLabel[contact.sex],
  },
  {
    key: 'date',
    header: 'Data',
    className: 'text-muted-content',
    render: (contact) => formatDate(contact.date),
  },
  {
    key: 'groups',
    header: 'Grupos',
    render: (contact) => {
      if (contact.groups.length === 0) {
        return <span className="text-muted-content">—</span>;
      }

      const visible = contact.groups.slice(0, MAX_VISIBLE_GROUPS);
      const hidden = contact.groups.length - visible.length;

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
              title={contact.groups.join(', ')}
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
    render: (contact) => (
      <span
        className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[contact.status]}`}
      >
        {statusLabel[contact.status]}
      </span>
    ),
  },
  {
    key: 'actions',
    header: 'Acções',
    actions: (contact) => [
      { label: 'Ver detalhes', icon: Eye, onClick: () => onView(contact) },
      { label: 'Editar', icon: Pencil, onClick: () => onEdit(contact) },
      {
        label: 'Eliminar',
        icon: Trash2,
        danger: true,
        onClick: () => onDelete(contact),
      },
    ],
  },
];

interface ContactsTableProps {
  data: IContact[];
  currentPage: number;
  totalPages: number;
  loading?: boolean;
}

export function ContactsTable({
  data,
  currentPage,
  totalPages,
  loading = false,
}: ContactsTableProps) {
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

  const handleView = (contact: IContact) => console.log('Ver', contact.id);
  const handleEdit = (contact: IContact) => console.log('Editar', contact.id);
  const handleDelete = (contact: IContact) =>
    console.log('Eliminar', contact.id);

  return (
    <Table<IContact>
      columns={columns(handleView, handleEdit, handleDelete)}
      data={data}
      loading={loading}
      keyExtractor={(contact) => contact.id}
      emptyMessage="Não existem contactos."
      pagination={{
        currentPage,
        totalPages,
        onPageChange: handlePageChange,
      }}
    />
  );
}
