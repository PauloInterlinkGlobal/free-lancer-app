import { BlacklistList } from '@/modules/contacts/contacts-blacklist/components/BlacklistList';
import { blacklistMock } from '@/modules/contacts/contacts-blacklist/mocks/blacklist.mock';
import { parseBlacklistFilters } from '@/modules/contacts/contacts-blacklist/utils/blacklist-filters';

interface BlacklistPageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function BlacklistPage({
  searchParams,
}: BlacklistPageProps) {
  const params = await searchParams;

  const filters = parseBlacklistFilters(params);

  return <BlacklistList data={blacklistMock} filters={filters} />;
}
