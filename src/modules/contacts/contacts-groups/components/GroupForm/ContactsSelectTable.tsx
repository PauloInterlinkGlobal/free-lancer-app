'use client';

import { Input } from '@/core/components/Input';
import { Table, type Column } from '@/core/components/Table';
import type { IContact } from '@/modules/contacts/contacts-geral/interfaces/contacts';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';

const PAGE_SIZE = 5;

interface ContactsSelectTableProps {
  contacts: IContact[];
  selected: string[];
  onChange: (ids: string[]) => void;
}

export function ContactsSelectTable({
  contacts,
  selected,
  onChange,
}: ContactsSelectTableProps) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return contacts;
    return contacts.filter(
      (c) => c.name.toLowerCase().includes(q) || c.number.includes(q)
    );
  }, [contacts, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function toggle(id: string) {
    onChange(
      selected.includes(id)
        ? selected.filter((s) => s !== id)
        : [...selected, id]
    );
  }

  const columns: Column<IContact>[] = [
    {
      key: 'select',
      header: '',
      render: (c) => (
        <input
          type="checkbox"
          checked={selected.includes(c.id)}
          onChange={() => toggle(c.id)}
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
  ];

  return (
    <div className="flex flex-col gap-3">
      <Input
        leftIcon={Search}
        placeholder="Pesquisar por nome ou número"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setPage(1);
        }}
      />

      <Table<IContact>
        columns={columns}
        data={pageItems}
        keyExtractor={(c) => c.id}
        emptyMessage="Nenhum contacto encontrado."
        pagination={{ currentPage: page, totalPages, onPageChange: setPage }}
      />
    </div>
  );
}
