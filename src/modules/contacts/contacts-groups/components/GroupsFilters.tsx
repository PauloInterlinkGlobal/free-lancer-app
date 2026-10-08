'use client';

import { Input } from '@/core/components/Input';
import { Select, type SelectOption } from '@/core/components/Select';
import { usePathname, useRouter } from '@/core/i18n/navigation';
import { ArrowDownAZ, Search, X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const sortOptions: SelectOption[] = [
  { value: 'asc', label: 'A - Z' },
  { value: 'desc', label: 'Z - A' },
];

export function GroupsFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlSearch = searchParams.get('search') ?? '';
  const sort = searchParams.get('sort') ?? 'asc';

  const [search, setSearch] = useState(urlSearch);

  useEffect(() => {
    setSearch(urlSearch);
  }, [urlSearch]);

  const setParam = (key: string, value: string, defaultValue = '') => {
    const params = new URLSearchParams(window.location.search);

    if (value === defaultValue) params.delete(key);
    else params.set(key, value);

    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  useEffect(() => {
    if (search === urlSearch) return;

    const timeout = setTimeout(() => setParam('search', search.trim()), 400);
    return () => clearTimeout(timeout);
  }, [search]);

  const hasActiveFilters = urlSearch !== '';

  const clear = () => {
    setSearch('');
    router.replace(pathname, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-ui bg-surface p-4">
      <div className="grid grid-cols-1 items-end gap-3 md:grid-cols-[2fr_1fr]">
        <Input
          label="Pesquisar"
          placeholder="Pesquisar por nome ou descrição..."
          leftIcon={Search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select
          label="Ordenar por nome"
          leftIcon={ArrowDownAZ}
          options={sortOptions}
          value={sort}
          onChange={(v) => setParam('sort', String(v), 'asc')}
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
