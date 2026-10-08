import { ALL } from '@/modules/send-sms/scheduled-sms/constants/scheduled-sms';
import { IScheduledSms } from '@/modules/send-sms/scheduled-sms/interfaces/scheduled-sms';

export type SortOrder = 'asc' | 'desc';

export const PAGE_SIZE = 5;

export interface ScheduledFiltersValue {
  search: string;
  type: string; // tipo de envio: normal | flash
  sender: string;
  sort: SortOrder;
  page: number;
}

type RawParams = Record<string, string | string[] | undefined>;

const first = (v: string | string[] | undefined) =>
  Array.isArray(v) ? v[0] : v;

export function parseScheduledFilters(
  params: RawParams
): ScheduledFiltersValue {
  return {
    search: first(params.search) ?? '',
    type: first(params.type) ?? ALL,
    sender: first(params.sender) ?? ALL,
    sort: first(params.sort) === 'asc' ? 'asc' : 'desc',
    page: Math.max(1, Number(first(params.page)) || 1),
  };
}

export function filterScheduledSms(
  data: IScheduledSms[],
  filters: ScheduledFiltersValue
): IScheduledSms[] {
  const search = filters.search.trim().toLowerCase();

  return data
    .filter((sms) => {
      const matchesSearch =
        !search || sms.content.toLowerCase().includes(search);
      const matchesType =
        filters.type === ALL || sms.sendingType === filters.type;
      const matchesSender =
        filters.sender === ALL || sms.sender === filters.sender;

      return matchesSearch && matchesType && matchesSender;
    })
    .sort((a, b) => {
      const diff =
        new Date(a.sendingDate).getTime() - new Date(b.sendingDate).getTime();
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
