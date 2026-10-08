'use client';

import { Table, type Column } from '@/core/components/Table';
import { IContact } from '@/modules/contacts/contacts-geral/interfaces/contacts';
import React, { useMemo } from 'react';

interface ContactTableProps {
  pageItems: IContact[];
  draft: string[];
  currentPage: number;
  totalPages: number;
  onToggleContact: (number: string) => void;
  onPageChange: (page: number) => void;
}

export function ContactTable({
  pageItems,
  draft,
  currentPage,
  totalPages,
  onToggleContact,
  onPageChange,
}: ContactTableProps) {
  const columns: Column<IContact>[] = useMemo(
    () => [
      {
        key: 'select',
        header: '',
        render: (c) => (
          <input
            type="checkbox"
            checked={draft.includes(c.number)}
            onChange={() => onToggleContact(c.number)}
            aria-label={`Selecionar ${c.name}`}
            className="h-4 w-4 accent-[rgb(var(--color-primary))]"
          />
        ),
      },
      {
        key: 'name',
        header: 'Nome',
        render: (c) => (
          <span className="font-medium text-primary-content">{c.name}</span>
        ),
      },
      { key: 'number', header: 'Número' },
    ],
    [draft, onToggleContact]
  );

  return (
    <Table<IContact>
      columns={columns}
      data={pageItems}
      keyExtractor={(c) => c.id}
      emptyMessage="Nenhum contacto encontrado."
      pagination={{
        currentPage,
        totalPages,
        onPageChange,
      }}
    />
  );
}
