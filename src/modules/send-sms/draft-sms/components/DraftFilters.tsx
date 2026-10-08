'use client';

import { Input } from '@/core/components/Input';
import { Select, type SelectOption } from '@/core/components/Select';
import { ALL } from '@/core/helpers/table-filters';
import { usePathname, useRouter } from '@/core/i18n/navigation';
import { Repeat, Search, Tag, X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface DraftFiltersProps {
  smsTypeOptions: SelectOption[];
  sendingTypeOptions: SelectOption[];
}

export function DraftFilters({
  smsTypeOptions,
  sendingTypeOptions,
}: DraftFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlSearch = searchParams.get('search') ?? '';
  const smsType = searchParams.get('smsType') ?? ALL;
  const sendingType = searchParams.get('sendingType') ?? ALL;

  const [search, setSearch] = useState(urlSearch);

  const setParam = (key: string, value: string, defaultValue = '') => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === defaultValue) params.delete(key);
    else params.set(key, value);

    params.delete('page');

    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  // Debounce da pesquisa
  useEffect(() => {
    if (search === urlSearch) return;

    const timeout = setTimeout(() => setParam('search', search), 400);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const hasActiveFilters =
    urlSearch !== '' || smsType !== ALL || sendingType !== ALL;

  const clear = () => {
    setSearch('');
    router.replace(pathname, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-ui bg-surface p-4">
      <div className="grid grid-cols-1 items-end gap-3 md:grid-cols-[2fr_1fr_1fr]">
        <Input
          label="Pesquisar"
          placeholder="Pesquisar pelo conteúdo..."
          leftIcon={Search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select
          label="Tipo de SMS"
          leftIcon={Tag}
          options={[{ value: ALL, label: 'Todos os tipos' }, ...smsTypeOptions]}
          value={smsType}
          onChange={(v) => setParam('smsType', String(v), ALL)}
        />

        <Select
          label="Tipo de envio"
          leftIcon={Repeat}
          options={[
            { value: ALL, label: 'Todos os envios' },
            ...sendingTypeOptions,
          ]}
          value={sendingType}
          onChange={(v) => setParam('sendingType', String(v), ALL)}
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
