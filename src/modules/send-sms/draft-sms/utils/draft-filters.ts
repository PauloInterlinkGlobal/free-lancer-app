import { ALL, first, type RawParams } from '@/core/helpers/table-filters';
import { IDraftSms } from '@/modules/send-sms/draft-sms/interfaces/draft-sms';

export interface DraftFiltersValue {
  search: string;
  smsType: string;
  sendingType: string;
  page: number;
}

export function parseDraftFilters(params: RawParams): DraftFiltersValue {
  return {
    search: first(params.search) ?? '',
    smsType: first(params.smsType) ?? ALL,
    sendingType: first(params.sendingType) ?? ALL,
    page: Math.max(1, Number(first(params.page)) || 1),
  };
}

export function filterDraftSms(
  data: IDraftSms[],
  filters: DraftFiltersValue
): IDraftSms[] {
  const search = filters.search.trim().toLowerCase();

  return data
    .filter((sms) => {
      const matchesSearch =
        !search || sms.content.toLowerCase().includes(search);
      const matchesSmsType =
        filters.smsType === ALL || sms.smsType === filters.smsType;
      const matchesSendingType =
        filters.sendingType === ALL || sms.sendingType === filters.sendingType;

      return matchesSearch && matchesSmsType && matchesSendingType;
    })
    .sort(
      (a, b) =>
        new Date(b.editionDate).getTime() - new Date(a.editionDate).getTime()
    );
}
