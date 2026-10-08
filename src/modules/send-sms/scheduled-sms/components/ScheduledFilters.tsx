'use client';

import { Input } from '@/core/components/Input';
import { Select, type SelectOption } from '@/core/components/Select';
import { usePathname, useRouter } from '@/core/i18n/navigation';
import { ALL } from '@/modules/send-sms/scheduled-sms/constants/scheduled-sms';
import { ArrowDownUp, Search, Send, User, X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ScheduledFiltersProps {
  sendingTypeOptions: SelectOption[];
  senderOptions: SelectOption[];
}

const sortOptions: SelectOption[] = [
  { value: 'desc', label: 'Mais recentes' },
  { value: 'asc', label: 'Mais antigos' },
];

export function ScheduledFilters({
  sendingTypeOptions,
  senderOptions,
}: ScheduledFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlSearch = searchParams.get('search') ?? '';
  const type = searchParams.get('type') ?? ALL;
  const sender = searchParams.get('sender') ?? ALL;
  const sort = searchParams.get('sort') ?? 'desc';

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

  const hasActiveFilters = urlSearch !== '' || type !== ALL || sender !== ALL;

  const clear = () => {
    setSearch('');
    router.replace(pathname, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-ui bg-surface p-4">
      <div className="grid grid-cols-1 items-end gap-3 md:grid-cols-2 xl:grid-cols-[2fr_1fr_1fr_1fr]">
        <Input
          label="Pesquisar"
          placeholder="Pesquisar pelo conteúdo..."
          leftIcon={Search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select
          label="Tipo de envio"
          leftIcon={Send}
          options={[
            { value: ALL, label: 'Todos os envios' },
            ...sendingTypeOptions,
          ]}
          value={type}
          onChange={(v) => setParam('type', String(v), ALL)}
        />

        <Select
          label="Sender"
          leftIcon={User}
          options={[
            { value: ALL, label: 'Todos os senders' },
            ...senderOptions,
          ]}
          value={sender}
          onChange={(v) => setParam('sender', String(v), ALL)}
        />

        <Select
          label="Ordenar por data"
          leftIcon={ArrowDownUp}
          options={sortOptions}
          value={sort}
          onChange={(v) => setParam('sort', String(v), 'desc')}
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
