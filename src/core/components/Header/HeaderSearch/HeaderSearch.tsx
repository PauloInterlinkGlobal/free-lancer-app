'use client';

import { useClickOutside } from '@/core/components/Header/useClickOutside';
import { navItems } from '@/core/components/SideBar/nav-items';
import { Link, useRouter } from '@/core/i18n/navigation';
import type { LucideIcon } from 'lucide-react';
import { Search } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';

interface SearchEntry {
  label: string;
  href: string;
  icon: LucideIcon;
  description?: string;
}

const entries: SearchEntry[] = navItems.flatMap((item) => [
  item,
  ...(item.subItems ?? []),
]);

export function HeaderSearch() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useClickOutside(ref, () => setOpen(false), open);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return entries
      .filter(
        (e) =>
          e.label.toLowerCase().includes(q) ||
          e.description?.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [query]);

  function go(href: string) {
    setOpen(false);
    setQuery('');
    router.push(href);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[active]) {
      go(results[active].href);
    }
  }

  return (
    <div ref={ref} className="relative hidden w-full md:block">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
      <input
        type="search"
        value={query}
        placeholder="Pesquisar..."
        aria-label="Pesquisar"
        onChange={(e) => {
          setQuery(e.target.value);
          setActive(0);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        className="h-9 w-full rounded-xl border border-border-ui  pl-9 pr-3 text-sm outline-none transition-colors focus:border-primary"
      />

      {open && query.trim() && (
        <div className="absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-xl border border-border-ui bg-surface p-1.5 shadow-md">
          {results.length === 0 ? (
            <p className="px-3 py-2 text-sm text-text-secondary">
              Sem resultados
            </p>
          ) : (
            results.map((r, i) => (
              <Link
                key={r.href}
                href={r.href}
                onClick={() => go(r.href)}
                onMouseEnter={() => setActive(i)}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                  i === active ? 'bg-item-hover' : ''
                }`}
              >
                <r.icon className="h-4 w-4 text-text-secondary" />
                {r.label}
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
