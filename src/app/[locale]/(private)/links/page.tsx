import { LinksList } from '@/modules/links/components/LinksList';
import { linksMock } from '@/modules/links/mocks/links.mock';
import { parseLinksFilters } from '@/modules/links/utils/links-filters';

interface LinksPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function LinksPage({ searchParams }: LinksPageProps) {
  const filters = parseLinksFilters(await searchParams);
  // TODO(api): Substituir linksMock por chamada ao serviço de links quando a API estiver disponível.
  const data = linksMock;

  return <LinksList initialData={data} filters={filters} />;
}
