'use client';

import { IContact } from '@/modules/contacts/contacts-geral/interfaces/contacts';
import { useEffect, useMemo, useState } from 'react';

const PAGE_SIZE = 6;
const digits = (value: string) => value.replace(/\D/g, '');

export function useContactSelection(
  contacts: IContact[],
  selected: string[],
  isOpen: boolean
) {
  const [draft, setDraft] = useState<string[]>(selected);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (isOpen) {
      setDraft(selected);
      setQuery('');
      setPage(1);
    }
  }, [isOpen, selected]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return contacts;

    const qDigits = digits(q);

    return contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (qDigits !== '' && digits(c.number).includes(qDigits))
    );
  }, [contacts, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function toggleContact(number: string) {
    setDraft((prev) =>
      prev.includes(number)
        ? prev.filter((n) => n !== number)
        : [...prev, number]
    );
  }

  const allOnPageSelected =
    pageItems.length > 0 && pageItems.every((c) => draft.includes(c.number));

  function togglePage() {
    const numbers = pageItems.map((c) => c.number);
    setDraft((prev) =>
      allOnPageSelected
        ? prev.filter((n) => !numbers.includes(n))
        : Array.from(new Set([...prev, ...numbers]))
    );
  }

  return {
    draft,
    query,
    setQuery,
    page,
    setPage,
    totalPages,
    pageItems,
    allOnPageSelected,
    toggleContact,
    togglePage,
  };
}
