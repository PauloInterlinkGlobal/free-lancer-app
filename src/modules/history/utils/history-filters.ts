import { IHistorySms } from '@/modules/history/interfaces/history';

export const PAGE_SIZE = 5;

export interface HistoryFiltersValue {
  search: string;
  dateFrom: string; // YYYY-MM-DD ou ''
  dateTo: string; // YYYY-MM-DD ou ''
  page: number;
}

type RawParams = Record<string, string | string[] | undefined>;

const first = (v: string | string[] | undefined) =>
  Array.isArray(v) ? v[0] : v;

const isoDay = (v: string | string[] | undefined) => {
  const value = first(v) ?? '';
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : '';
};

const dayFormatter = new Intl.DateTimeFormat('en-CA', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  timeZone: 'Africa/Luanda',
});

const toDay = (iso: string) => dayFormatter.format(new Date(iso));

export function parseHistoryFilters(params: RawParams): HistoryFiltersValue {
  return {
    search: first(params.search) ?? '',
    dateFrom: isoDay(params.dateFrom),
    dateTo: isoDay(params.dateTo),
    page: Math.max(1, Number(first(params.page)) || 1),
  };
}

export function filterHistorySms(
  data: IHistorySms[],
  filters: HistoryFiltersValue
): IHistorySms[] {
  const search = filters.search.trim().toLowerCase();

  return data
    .filter((sms) => {
      const day = toDay(sms.sendingDate);

      const matchesSearch =
        !search || sms.content.toLowerCase().includes(search);
      const matchesFrom = !filters.dateFrom || day >= filters.dateFrom;
      const matchesTo = !filters.dateTo || day <= filters.dateTo;

      return matchesSearch && matchesFrom && matchesTo;
    })
    .sort(
      (a, b) =>
        new Date(b.sendingDate).getTime() - new Date(a.sendingDate).getTime()
    );
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
