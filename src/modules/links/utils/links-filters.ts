import { ALL } from '../constants/links';
import { ILink, LinkStatus } from '../interfaces/links';

export const PAGE_SIZE = 8;

export interface LinksFiltersValue {
  search: string;
  status: string;
  page: number;
}

type RawParams = Record<string, string | string[] | undefined>;

const first = (v: string | string[] | undefined) =>
  Array.isArray(v) ? v[0] : v;

export function parseLinksFilters(params: RawParams): LinksFiltersValue {
  return {
    search: first(params.search) ?? '',
    status: first(params.status) ?? ALL,
    page: Math.max(1, Number(first(params.page)) || 1),
  };
}

export function filterLinks(
  data: ILink[],
  filters: LinksFiltersValue
): ILink[] {
  const search = filters.search.trim().toLowerCase();

  return data
    .filter((item) => {
      const matchesSearch =
        !search ||
        item.description.toLowerCase().includes(search) ||
        item.url.toLowerCase().includes(search);

      const matchesStatus =
        filters.status === ALL ||
        item.status === (filters.status as LinkStatus);

      return matchesSearch && matchesStatus;
    })
    .sort(
      (a, b) =>
        new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );
}

export function paginate<T>(items: T[], page: number, pageSize = PAGE_SIZE) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(page, totalPages);

  return {
    items: items.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    currentPage,
    totalPages,
    totalItems: items.length,
  };
}
