import { ISender } from '@/modules/senders/interfaces/senders';
import {
  filterSenders,
  paginate,
  type SendersFiltersValue,
} from '@/modules/senders/utils/senders-filters';
import { SendersCards } from './SendersCards';
import { SendersFilters } from './SendersFilters';
import { SendersHeader } from './SendersHeader';
import { SendersStats } from './SendersStats';
import { SendersWrapper } from './SendersWrapper';

interface SendersCardGridProps {
  data: ISender[];
  filters: SendersFiltersValue;
}

export function SendersCardGrid({ data, filters }: SendersCardGridProps) {
  const filtered = filterSenders(data, filters);
  const { items, currentPage, totalPages } = paginate(filtered, filters.page);

  return (
    <SendersWrapper>
      <div className="flex flex-col gap-6">
        <SendersHeader />

        <SendersStats senders={data} />

        <SendersFilters />

        <SendersCards
          items={items}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </SendersWrapper>
  );
}
