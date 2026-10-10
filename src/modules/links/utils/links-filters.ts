import { ALL } from '../constants/links';
import type { ILink, LinkStatus } from '../interfaces/links';

export const PAGE_SIZE = 8;

export type LinksFilterStatus = LinkStatus | typeof ALL;

export interface LinksFiltersValue {
  search: string;
  status: LinksFilterStatus;
  page: number;
}

type RawParams = Record<string, string | string[] | undefined>;

const first = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value;

const isLinkStatus = (value: string): value is LinkStatus =>
  value === 'pending' || value === 'approved' || value === 'rejected';

/** Converte texto para pesquisa sem distinção entre maiúsculas e acentos. */
function normalizeSearchText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function parseLinksFilters(params: RawParams): LinksFiltersValue {
  const rawStatus = first(params.status) ?? ALL;
  const status: LinksFilterStatus =
    rawStatus === ALL || isLinkStatus(rawStatus) ? rawStatus : ALL;

  return {
    search: (first(params.search) ?? '').trim(),
    status,
    // Mantém o mínimo em 1 e evita NaN quando a query string não é numérica.
    page: Math.max(1, Number(first(params.page)) || 1),
  };
}

export function filterLinks(
  data: ILink[],
  filters: LinksFiltersValue
): ILink[] {
  const search = normalizeSearchText(filters.search.trim());

  return data
    .filter((item) => {
      const description = normalizeSearchText(item.description);
      const url = normalizeSearchText(item.url);
      const matchesSearch =
        !search || description.includes(search) || url.includes(search);
      const matchesStatus =
        filters.status === ALL || item.status === filters.status;

      return matchesSearch && matchesStatus;
    })
    .sort(
      (a, b) =>
        new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );
}

export function paginate<T>(items: T[], page: number, pageSize = PAGE_SIZE) {
  const safePageSize = Number.isFinite(pageSize)
    ? Math.max(1, Math.floor(pageSize))
    : PAGE_SIZE;
  const totalPages = Math.max(1, Math.ceil(items.length / safePageSize));
  const requestedPage = Number.isFinite(page) ? Math.floor(page) : 1;
  const currentPage = Math.min(Math.max(1, requestedPage), totalPages);
  const startIndex = (currentPage - 1) * safePageSize;

  return {
    items: items.slice(startIndex, startIndex + safePageSize),
    currentPage,
    totalPages,
    totalItems: items.length,
  };
}
