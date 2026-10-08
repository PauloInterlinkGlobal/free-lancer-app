import { SendersCardGrid } from '@/modules/senders/components/SendersCardGrid';
import { sendersMock } from '@/modules/senders/mocks/senders.mock';
import { parseSendersFilters } from '@/modules/senders/utils/senders-filters';

interface SendersPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function SendersPage({ searchParams }: SendersPageProps) {
  const filters = parseSendersFilters(await searchParams);
  const data = sendersMock;

  return <SendersCardGrid data={data} filters={filters} />;
}
