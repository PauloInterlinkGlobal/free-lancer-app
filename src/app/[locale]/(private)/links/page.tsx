import { LinksList } from '@/modules/links/components/LinksList';
import { getAllLinks } from '@/modules/links/services/links.service';
import { parseLinksFilters } from '@/modules/links/utils/links-filters';

interface LinksPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function LinksPage({ searchParams }: LinksPageProps) {
  const filters = parseLinksFilters(await searchParams);
  // Os dados vêm do serviço em memória (globalThis) até existir API; criar e eliminar atualizam esta lista.
  const links = await getAllLinks();

  return <LinksList links={links} filters={filters} />;
}
