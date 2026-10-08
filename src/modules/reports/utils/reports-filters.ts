import { ALL, ALL_PERIODS } from '../constants/reports';
import { ICampaignReport, ReportsFiltersValue } from '../interfaces/reports';

export const PAGE_SIZE = 5;

type RawParams = Record<string, string | string[] | undefined>;

const first = (v: string | string[] | undefined) =>
  Array.isArray(v) ? v[0] : v;

export function parseReportsFilters(params: RawParams): ReportsFiltersValue {
  return {
    search: first(params.search) ?? '',
    period: first(params.period) ?? '7d',
    sender: first(params.sender) ?? ALL,
    status: first(params.status) ?? ALL,
    page: Math.max(1, Number(first(params.page)) || 1),
  };
}

export function filterCampaignReports(
  data: ICampaignReport[],
  filters: ReportsFiltersValue
): ICampaignReport[] {
  const search = filters.search.trim().toLowerCase();

  return data
    .filter((item) => {
      const matchesSearch =
        !search ||
        item.name.toLowerCase().includes(search) ||
        item.sender.toLowerCase().includes(search);

      const matchesSender =
        filters.sender === ALL ||
        !filters.sender ||
        item.sender === filters.sender;

      const matchesStatus =
        filters.status === ALL ||
        !filters.status ||
        item.status === filters.status;

      return matchesSearch && matchesSender && matchesStatus;
    })
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
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
