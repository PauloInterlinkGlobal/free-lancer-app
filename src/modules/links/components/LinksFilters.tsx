'use client';

import { Input } from '@/core/components/Input';
import { Select, type SelectOption } from '@/core/components/Select';
import { usePathname, useRouter } from '@/core/i18n/navigation';
import { ALL, linkStatusLabel } from '@/modules/links/constants/links';
import { CircleDot, Search, X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const statusOptions: SelectOption[] = [
  { value: ALL, label: 'Todos os estados' },
  ...Object.entries(linkStatusLabel).map(([value, label]) => ({
    value,
    label,
  })),
];

export function LinksFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlSearch = searchParams.get('search') ?? '';
  const status = searchParams.get('status') ?? ALL;

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

    const timeout = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      const trimmed = search.trim();
      if (!trimmed) params.delete('search');
      else params.set('search', trimmed);
      params.delete('page');
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    }, 400);

    return () => clearTimeout(timeout);
  }, [search, urlSearch, pathname, router]);

  const hasActiveFilters = urlSearch !== '' || status !== ALL;

  const clear = () => {
    setSearch('');
    router.replace(pathname, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border-ui bg-surface p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-end justify-between">
        <div className="grid flex-1 grid-cols-1 items-end gap-3 sm:grid-cols-2">
          <div>
            <Input
              label="Pesquisar"
              placeholder="Pesquisar por descrição ou link..."
              leftIcon={Search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div>
            <Select
              label="Estado"
              leftIcon={CircleDot}
              options={statusOptions}
              value={status}
              onChange={(v) => setParam('status', String(v), ALL)}
            />
          </div>
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
