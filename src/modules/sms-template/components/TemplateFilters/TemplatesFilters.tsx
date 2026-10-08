'use client';

import { Input } from '@/core/components/Input';
import { Select } from '@/core/components/Select';
import { usePathname, useRouter } from '@/core/i18n/navigation';
import { Filter, Search, X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  TEMPLATE_CATEGORIES,
  TEMPLATE_SORT_OPTIONS,
} from '../../constants/templates';

export function TemplatesFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlSearch = searchParams.get('search') ?? '';
  const category = searchParams.get('category') ?? '';
  const sortBy = searchParams.get('sortBy') ?? 'recent';

  const [search, setSearch] = useState(urlSearch);

  useEffect(() => {
    setSearch(urlSearch);
  }, [urlSearch]);

  const setParam = (key: string, value: string, defaultValue = '') => {
    const params = new URLSearchParams(window.location.search);

    if (value === defaultValue) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    params.delete('page');

    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  useEffect(() => {
    if (search === urlSearch) return;

    const timeout = setTimeout(() => {
      setParam('search', search.trim());
    }, 400);

    return () => clearTimeout(timeout);
  }, [search]);

  const hasActiveFilters =
    urlSearch !== '' || category !== '' || sortBy !== 'recent';

  const clear = () => {
    setSearch('');
    router.replace(pathname, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border-ui bg-surface p-4 shadow-sm">
      <div className="grid grid-cols-1 items-end gap-3 md:grid-cols-[1fr_220px_220px]">
        <Input
          placeholder="Pesquisar modelo por nome ou conteúdo..."
          leftIcon={Search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select
          leftIcon={Filter}
          options={TEMPLATE_CATEGORIES}
          value={category}
          onChange={(v) => setParam('category', String(v))}
          placeholder="Filtrar por..."
        />

        <Select
          leftIcon={Filter}
          options={TEMPLATE_SORT_OPTIONS}
          value={sortBy}
          onChange={(v) => setParam('sortBy', String(v), 'recent')}
          placeholder="Ordenar por..."
        />
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={clear}
          className="flex w-fit items-center gap-1.5 text-xs font-medium text-text-muted transition-colors hover:text-text-primary"
        >
          <X size={13} aria-hidden />
          Limpar filtros
        </button>
      )}
    </div>
  );
}
