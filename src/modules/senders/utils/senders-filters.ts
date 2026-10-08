import { ALL } from '../constants/senders';
import { ISender, SenderStatus } from '../interfaces/senders';

export const PAGE_SIZE = 5;

export interface SendersFiltersValue {
  search: string;
  status: string;
  sort: 'asc' | 'desc';
  page: number;
}

type RawParams = Record<string, string | string[] | undefined>;

const first = (v: string | string[] | undefined) =>
  Array.isArray(v) ? v[0] : v;

export function parseSendersFilters(params: RawParams): SendersFiltersValue {
  const sort = first(params.sort);
  return {
    search: first(params.search) ?? '',
    status: first(params.status) ?? ALL,
    sort: sort === 'desc' ? 'desc' : 'asc',
    page: Math.max(1, Number(first(params.page)) || 1),
  };
}

export function filterSenders(
  data: ISender[],
  filters: SendersFiltersValue
): ISender[] {
  const search = filters.search.trim().toLowerCase();

  return data
    .filter((item) => {
      const matchesSearch =
        !search ||
        item.sender.toLowerCase().includes(search) ||
        (item.description && item.description.toLowerCase().includes(search));

      const matchesStatus =
        filters.status === ALL ||
        item.status === (filters.status as SenderStatus);

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (filters.sort === 'desc') {
        return b.sender.localeCompare(a.sender);
      }
      return a.sender.localeCompare(b.sender);
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
