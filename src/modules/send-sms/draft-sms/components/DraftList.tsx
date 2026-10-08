import { paginate } from '@/core/helpers/table-filters';
import {
  sendingTypeLabel,
  smsTypeLabel,
} from '@/modules/send-sms/draft-sms/constants/draft-sms';
import { IDraftSms } from '@/modules/send-sms/draft-sms/interfaces/draft-sms';
import {
  filterDraftSms,
  type DraftFiltersValue,
} from '@/modules/send-sms/draft-sms/utils/draft-filters';
import { DraftFilters } from './DraftFilters';
import { DraftTable } from './DraftTable';

interface DraftListProps {
  data: IDraftSms[];
  filters: DraftFiltersValue;
}

const toOptions = (labels: Record<string, string>) =>
  Object.entries(labels).map(([value, label]) => ({ value, label }));

const smsTypeOptions = toOptions(smsTypeLabel);
const sendingTypeOptions = toOptions(sendingTypeLabel);

export function DraftList({ data, filters }: DraftListProps) {
  const { items, currentPage, totalPages } = paginate(
    filterDraftSms(data, filters),
    filters.page
  );

  return (
    <div className="flex flex-col gap-4">
      <DraftFilters
        smsTypeOptions={smsTypeOptions}
        sendingTypeOptions={sendingTypeOptions}
      />

      <DraftTable
        data={items}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
