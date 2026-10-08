import { IBlacklist } from '@/modules/contacts/contacts-blacklist/interfaces/blacklist';

export interface BlacklistFiltersValue {
  search: string;
  sort: 'asc' | 'desc';
  page: number;
}

const ITEMS_PER_PAGE = 10;

export function filterBlacklist(
  data: IBlacklist[],
  filters: BlacklistFiltersValue
) {
  const search = filters.search.trim().toLowerCase();

  let result = [...data];

  if (search) {
    result = result.filter((item) =>
      item.number.toLowerCase().includes(search)
    );
  }

  result.sort((a, b) => {
    const comparison = a.number.localeCompare(b.number);

    return filters.sort === 'asc' ? comparison : -comparison;
  });

  return result;
}

export function paginate(
  data: IBlacklist[],
  page: number,
  itemsPerPage = ITEMS_PER_PAGE
) {
  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));

  const currentPage = Math.min(Math.max(page, 1), totalPages);

  const start = (currentPage - 1) * itemsPerPage;

  return {
    items: data.slice(start, start + itemsPerPage),
    currentPage,
    totalPages,
  };
}

export function parseBlacklistFilters(
  searchParams: Record<string, string | undefined>
): BlacklistFiltersValue {
  const search = searchParams.search ?? '';

  const sort: BlacklistFiltersValue['sort'] =
    searchParams.sort === 'desc' ? 'desc' : 'asc';

  const pageParam = Number(searchParams.page ?? '1');

  const page =
    Number.isFinite(pageParam) && pageParam > 0 ? Math.floor(pageParam) : 1;

  return {
    search,
    sort,
    page,
  };
}
