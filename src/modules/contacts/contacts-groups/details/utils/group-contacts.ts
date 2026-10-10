import type { IContact } from '@/modules/contacts/contacts-geral/interfaces/contacts';

export const CONTACTS_PAGE_SIZE = 10;

export interface GroupContactsFilterValue {
  search?: string;
  status?: string;
}

export function filterGroupContacts(
  contacts: IContact[],
  { search, status }: GroupContactsFilterValue
) {
  const term = search?.trim().toLowerCase();

  return contacts.filter((contact) => {
    const matchesSearch =
      !term ||
      contact.name.toLowerCase().includes(term) ||
      contact.number.includes(term);
    const matchesStatus = !status || contact.status === status;

    return matchesSearch && matchesStatus;
  });
}

export function paginate<T>(
  items: T[],
  page: number,
  pageSize = CONTACTS_PAGE_SIZE
) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    currentPage,
    totalPages,
  };
}
