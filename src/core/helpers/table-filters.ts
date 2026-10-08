export const ALL = 'all';
export const PAGE_SIZE = 5;

export type SortOrder = 'asc' | 'desc';

export type RawParams = Record<string, string | string[] | undefined>;

export const first = (v: string | string[] | undefined) =>
  Array.isArray(v) ? v[0] : v;

export function paginate<T>(items: T[], page: number, pageSize = PAGE_SIZE) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(page, totalPages);

  return {
    items: items.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    currentPage,
    totalPages,
  };
}
