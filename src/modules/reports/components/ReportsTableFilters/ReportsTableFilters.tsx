'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/core/i18n/navigation';
import { Input } from '@/core/components/Input';
import { Select } from '@/core/components/Select';
import { Search, X, Radio, Calendar } from 'lucide-react';
import { ALL, PERIOD_OPTIONS, SENDER_OPTIONS } from '../../constants/reports';

export function ReportsTableFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlSearch = searchParams.get('search') ?? '';
  const urlPeriod = searchParams.get('period') ?? '7d';
  const urlSender = searchParams.get('sender') ?? ALL;

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

  const hasActiveFilters = urlSearch !== '' || urlSender !== ALL;

  const clearFilters = () => {
    setSearch('');
    const params = new URLSearchParams(window.location.search);
    params.delete('search');
    params.delete('sender');
    params.delete('page');
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="w-full sm:w-60">
        <Input
          placeholder="Pesquisar campanha..."
          leftIcon={Search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="w-full sm:w-44">
        <Select
          leftIcon={Calendar}
          options={PERIOD_OPTIONS}
          value={urlPeriod}
          onChange={(v) =>
            setParam('period', String(v.target?.value ?? v), '7d')
          }
        />
      </div>

      <div className="w-full sm:w-48">
        <Select
          leftIcon={Radio}
          options={SENDER_OPTIONS}
          value={urlSender}
          onChange={(v) =>
            setParam('sender', String(v.target?.value ?? v), ALL)
          }
        />
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={clearFilters}
          className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted-content transition-colors hover:bg-item-hover hover:text-primary-content"
        >
          <X size={14} />
          Limpar
        </button>
      )}
    </div>
  );
}
