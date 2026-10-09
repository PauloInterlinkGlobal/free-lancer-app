import { ALL } from '@/modules/contacts/contacts-geral/constants/contacts';
import { IContact } from '@/modules/contacts/contacts-geral/interfaces/contacts';

export type SortOrder = 'asc' | 'desc';

export const PAGE_SIZE = 5;

export interface ContactsFiltersValue {
  search: string;
  status: string;
  sort: SortOrder;
  page: number;
}

type RawParams = Record<string, string | string[] | undefined>;

const first = (v: string | string[] | undefined) =>
  Array.isArray(v) ? v[0] : v;

export function parseContactsFilters(params: RawParams): ContactsFiltersValue {
  return {
    search: first(params.search) ?? '',
    status: first(params.status) ?? ALL,
    sort: first(params.sort) === 'desc' ? 'desc' : 'asc',
    page: Math.max(1, Number(first(params.page)) || 1),
  };
}

export function filterContacts(
  data: IContact[],
  filters: ContactsFiltersValue
): IContact[] {
  const search = filters.search.trim().toLowerCase();
  const searchDigits = search.replace(/\D/g, '');

  return data
    .filter((contact) => {
      const fullName = `${contact.name} ${contact.surname || ''}`.toLowerCase();
      const matchesSearch =
        !search ||
        fullName.includes(search) ||
        (contact.email && contact.email.toLowerCase().includes(search)) ||
        (searchDigits !== '' &&
          contact.number.replace(/\D/g, '').includes(searchDigits));
      const matchesStatus =
        filters.status === ALL || contact.status === filters.status;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const nameA = `${a.name} ${a.surname || ''}`;
      const nameB = `${b.name} ${b.surname || ''}`;
      const diff = nameA.localeCompare(nameB, 'pt', { sensitivity: 'base' });
      return filters.sort === 'asc' ? diff : -diff;
    });
}

export function paginate<T>(items: T[], page: number, pageSize = PAGE_SIZE) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(page, totalPages);

  return {
    items: items.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    currentPage,
    totalPages,
  };
}
