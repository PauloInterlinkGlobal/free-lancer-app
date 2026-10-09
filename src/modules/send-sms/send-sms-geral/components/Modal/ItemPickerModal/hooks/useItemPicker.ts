import { useEffect, useMemo, useState } from 'react';
import type { ItemPickerItem } from '../types';

export function normalizeSearch(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export function useItemPicker(
  items: ItemPickerItem[],
  selectedIds: string[],
  isOpen: boolean,
  mode: 'single' | 'multiple',
  pageSize: number = 6
) {
  const [draft, setDraft] = useState<string[]>(selectedIds);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  // Repõe o rascunho com os IDs seleccionados sempre que o modal abre
  useEffect(() => {
    if (isOpen) {
      setDraft(selectedIds);
      setQuery('');
      setPage(1);
    }
  }, [isOpen, selectedIds]);

  // Filtragem insensível a maiúsculas e acentos
  const filteredItems = useMemo(() => {
    const normalizedQuery = normalizeSearch(query);
    if (!normalizedQuery) return items;

    return items.filter((item) => {
      const matchTitle = normalizeSearch(item.title).includes(normalizedQuery);
      const matchSubtitle = item.subtitle
        ? normalizeSearch(item.subtitle).includes(normalizedQuery)
        : false;
      const matchMeta = item.meta
        ? normalizeSearch(item.meta).includes(normalizedQuery)
        : false;

      return matchTitle || matchSubtitle || matchMeta;
    });
  }, [items, query]);

  // Cálculo de páginas com protecção contra NaN ou encolhimento de lista
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);

  // Sincroniza página se a lista filtrada encolher
  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const pageItems = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filteredItems.slice(start, start + pageSize);
  }, [filteredItems, safePage, pageSize]);

  const allOnPageSelected = useMemo(() => {
    if (pageItems.length === 0) return false;
    return pageItems.every((item) => draft.includes(item.id));
  }, [pageItems, draft]);

  const toggleItem = (id: string) => {
    if (mode === 'single') {
      setDraft([id]);
      return;
    }

    setDraft((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const togglePage = () => {
    if (mode === 'single' || pageItems.length === 0) return;

    if (allOnPageSelected) {
      const pageIds = new Set(pageItems.map((item) => item.id));
      setDraft((prev) => prev.filter((id) => !pageIds.has(id)));
    } else {
      const newDraft = new Set(draft);
      for (const item of pageItems) {
        newDraft.add(item.id);
      }
      setDraft(Array.from(newDraft));
    }
  };

  return {
    draft,
    query,
    setQuery: (q: string) => {
      setQuery(q);
      setPage(1);
    },
    page: safePage,
    setPage,
    totalPages,
    pageItems,
    filteredItems,
    allOnPageSelected,
    toggleItem,
    togglePage,
  };
}
