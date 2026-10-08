'use client';

import { Input } from '@/core/components/Input';
import { usePathname, useRouter } from '@/core/i18n/navigation';
import { Calendar, Search, X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function HistoryFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlSearch = searchParams.get('search') ?? '';
  const dateFrom = searchParams.get('dateFrom') ?? '';
  const dateTo = searchParams.get('dateTo') ?? '';

  const [search, setSearch] = useState(urlSearch);

  // Mantém o input sincronizado com a URL (back/forward, limpar filtros)
  useEffect(() => {
    setSearch(urlSearch);
  }, [urlSearch]);

  const setParam = (key: string, value: string, defaultValue = '') => {
    // Lê sempre o estado mais recente da URL (evita closures desactualizadas)
    const params = new URLSearchParams(window.location.search);

    if (value === defaultValue) params.delete(key);
    else params.set(key, value);

    params.delete('page');

    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  // Debounce da pesquisa
  useEffect(() => {
    if (search === urlSearch) return;

    const timeout = setTimeout(() => setParam('search', search.trim()), 400);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const hasActiveFilters = urlSearch !== '' || dateFrom !== '' || dateTo !== '';

  const clear = () => {
    setSearch('');
    router.replace(pathname, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-ui bg-surface p-4">
      <div className="grid grid-cols-1 items-end gap-3 md:grid-cols-2 xl:grid-cols-[2fr_1fr_1fr]">
        <div className="md:col-span-2 xl:col-span-1">
          <Input
            label="Pesquisar"
            placeholder="Pesquisar pelo conteúdo..."
            leftIcon={Search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

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
