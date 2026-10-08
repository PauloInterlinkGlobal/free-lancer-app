import { HistoryList } from '@/modules/history/components/HistoryList';
import { historySmsMock } from '@/modules/history/mocks/history.mock';
import { parseHistoryFilters } from '@/modules/history/utils/history-filters';

interface HistoryPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function HistoryPage({ searchParams }: HistoryPageProps) {
  const filters = parseHistoryFilters(await searchParams);

  const data = historySmsMock;

  return (
    <div className="flex flex-col gap-6">
      <HistoryList data={data} filters={filters} />
    </div>
  );
}
