'use client';

import { Input } from '@/core/components/Input';
import { Select } from '@/core/components/Select';
import { usePathname, useRouter } from '@/core/i18n/navigation';
import { statusLabel } from '@/modules/contacts/contacts-geral/constants/contacts';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const statusOptions = [
  { value: '', label: 'Todos os estados' },
  ...Object.entries(statusLabel).map(([value, label]) => ({ value, label })),
];

export function GroupContactsFiltersForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') ?? '');
  const status = searchParams.get('status') ?? '';

  const apply = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) params.set(key, value);
    else params.delete(key);
    params.delete('page');

    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  useEffect(() => {
    if (search === (searchParams.get('search') ?? '')) return;

    const timer = setTimeout(() => apply('search', search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-surface p-4 shadow-sm sm:flex-row sm:items-end">
      <div className="sm:flex-1">
        <Input
          label="Pesquisar"
          placeholder="Nome ou número"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="sm:w-64">
        <Select
          label="Estado"
          options={statusOptions}
          value={status}
          onChange={(v) => apply('status', String(v))}
        />
      </div>
    </div>
  );
}
