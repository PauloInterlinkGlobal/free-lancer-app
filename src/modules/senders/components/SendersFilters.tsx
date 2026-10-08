'use client';

import { Input } from '@/core/components/Input';
import { Select, type SelectOption } from '@/core/components/Select';
import { usePathname, useRouter } from '@/core/i18n/navigation';
import { ALL, senderStatusLabel } from '@/modules/senders/constants/senders';
import { ArrowDownAZ, CircleDot, Search, X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const sortOptions: SelectOption[] = [
  { value: 'asc', label: 'A - Z' },
  { value: 'desc', label: 'Z - A' },
];

const statusOptions: SelectOption[] = [
  { value: ALL, label: 'Todos os estados' },
  ...Object.entries(senderStatusLabel).map(([value, label]) => ({
    value,
    label,
  })),
];

export function SendersFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlSearch = searchParams.get('search') ?? '';
  const status = searchParams.get('status') ?? ALL;
  const sort = searchParams.get('sort') ?? 'asc';

  const [search, setSearch] = useState(urlSearch);

  useEffect(() => {
    setSearch(urlSearch);
  }, [urlSearch]);

  const setParam = (key: string, value: string, defaultValue = '') => {
    const params = new URLSearchParams(window.location.search);

    if (value === defaultValue) params.delete(key);
    else params.set(key, value);

    params.delete('page');

    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  useEffect(() => {
    if (search === urlSearch) return;

    const timeout = setTimeout(() => setParam('search', search.trim()), 400);
    return () => clearTimeout(timeout);
  }, [search]);

  const hasActiveFilters = urlSearch !== '' || status !== ALL;

  const clear = () => {
    setSearch('');
    router.replace(pathname, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border-ui bg-surface p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-end justify-between">
        <div className="grid flex-1 grid-cols-1 items-end gap-3 sm:grid-cols-2 xl:grid-cols-[2fr_1fr_1fr]">
          <div className="sm:col-span-2 xl:col-span-1">
            <Input
              label="Pesquisar"
              placeholder="Pesquisar por remetente..."
              leftIcon={Search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Select
            label="Estado"
            leftIcon={CircleDot}
            options={statusOptions}
            value={status}
            onChange={(v) => setParam('status', String(v), ALL)}
          />

          <Select
            label="Ordenar por nome"
            leftIcon={ArrowDownAZ}
            options={sortOptions}
            value={sort}
            onChange={(v) => setParam('sort', String(v), 'asc')}
          />
        </div>
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={clear}
          className="flex w-fit items-center gap-1 text-xs font-medium text-muted-content transition-colors hover:text-primary-content"
        >
          <X size={12} aria-hidden />
          Limpar filtros
        </button>
      )}
    </div>
  );
}
