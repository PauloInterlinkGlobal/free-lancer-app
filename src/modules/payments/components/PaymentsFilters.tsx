'use client';

import { Input } from '@/core/components/Input';
import { Select, type SelectOption } from '@/core/components/Select';
import { usePathname, useRouter } from '@/core/i18n/navigation';
import { ALL } from '@/modules/payments/constants/payments';
import { Calendar, CircleDot, Search, X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PaymentsFiltersProps {
  statusOptions: SelectOption[];
}

export function PaymentsFilters({ statusOptions }: PaymentsFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlSearch = searchParams.get('search') ?? '';
  const status = searchParams.get('status') ?? ALL;
  const dateFrom = searchParams.get('dateFrom') ?? '';
  const dateTo = searchParams.get('dateTo') ?? '';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const hasActiveFilters =
    urlSearch !== '' || status !== ALL || dateFrom !== '' || dateTo !== '';

  const clear = () => {
    setSearch('');
    router.replace(pathname, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-ui bg-surface p-4">
      <div className="grid grid-cols-1 items-end gap-3 md:grid-cols-2 xl:grid-cols-4">
        <Input
          label="Pesquisar"
          placeholder="Pesquisar por referência..."
          leftIcon={Search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select
          label="Estado"
          leftIcon={CircleDot}
          options={[
            { value: ALL, label: 'Todos os estados' },
            ...statusOptions,
          ]}
          value={status}
          onChange={(v) => setParam('status', String(v), ALL)}
        />

        <Input
          type="date"
          label="Data de início"
          leftIcon={Calendar}
          value={dateFrom}
          max={dateTo || undefined}
          onChange={(e) => setParam('dateFrom', e.target.value)}
        />

        <Input
          type="date"
          label="Data de fim"
          leftIcon={Calendar}
          value={dateTo}
          min={dateFrom || undefined}
          onChange={(e) => setParam('dateTo', e.target.value)}
        />
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
