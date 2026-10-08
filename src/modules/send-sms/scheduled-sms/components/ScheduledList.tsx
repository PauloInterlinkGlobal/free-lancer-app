import { sendingTypeLabel } from '@/modules/send-sms/scheduled-sms/constants/scheduled-sms';
import { IScheduledSms } from '@/modules/send-sms/scheduled-sms/interfaces/scheduled-sms';
import {
  filterScheduledSms,
  paginate,
  type ScheduledFiltersValue,
} from '@/modules/send-sms/scheduled-sms/utils/scheduled-filters';
import { ScheduledFilters } from './ScheduledFilters';
import { ScheduledTable } from './ScheduledTable';

interface ScheduledListProps {
  data: IScheduledSms[];
  filters: ScheduledFiltersValue;
}

const sendingTypeOptions = Object.entries(sendingTypeLabel).map(
  ([value, label]) => ({ value, label })
);

export function ScheduledList({ data, filters }: ScheduledListProps) {
  const senderOptions = Array.from(new Set(data.map((sms) => sms.sender))).map(
    (sender) => ({ value: sender, label: sender })
  );

  const { items, currentPage, totalPages } = paginate(
    filterScheduledSms(data, filters),
    filters.page
  );

  return (
    <div className="flex flex-col gap-4">
      <ScheduledFilters
        sendingTypeOptions={sendingTypeOptions}
        senderOptions={senderOptions}
      />

      <ScheduledTable
        data={items}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
