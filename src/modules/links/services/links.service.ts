// Serviço de servidor: só deve ser importado por Server Components e Server Actions.
// Não é um componente de cliente e não usa hooks. O pacote `server-only` não está instalado no projeto.
import { ALL } from '../constants/links';
import { ILink, ILinksFilters } from '../interfaces/links';
import { linksMock } from '../mocks/links.mock';
import { filterLinks, paginate } from '../utils/links-filters';

// TODO(api): Substituir este armazenamento em memória pelas chamadas à API de links.
// O array fica em globalThis para sobreviver ao hot reload do desenvolvimento.
// Em produção, cada instância do servidor tem a sua própria cópia.
type LinksGlobal = typeof globalThis & { __linksStore?: ILink[] };
const globalLinks = globalThis as LinksGlobal;
globalLinks.__linksStore ??= [...linksMock];

function store(): ILink[] {
  return globalLinks.__linksStore ?? [];
}

export interface LinksPage {
  items: ILink[];
  total: number;
  page: number;
  totalPages: number;
}

export interface CreateLinkData {
  url: string;
  description: string;
}

export async function getAllLinks(): Promise<ILink[]> {
  return [...store()];
}

export async function getLinks(filters: ILinksFilters): Promise<LinksPage> {
  const normalized = {
    search: filters.search ?? '',
    status: filters.status ?? ALL,
    page: filters.page,
  };

  const filtered = filterLinks(store(), normalized);
  const { items, currentPage, totalPages, totalItems } = paginate(
    filtered,
    normalized.page
  );

  return { items, total: totalItems, page: currentPage, totalPages };
}

export async function getApprovedLinks(): Promise<ILink[]> {
  return store().filter((link) => link.status === 'approved');
}

export async function createLink(data: CreateLinkData): Promise<ILink> {
  const link: ILink = {
    id: `link-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    description: data.description,
    url: data.url,
    submittedAt: new Date().toISOString(),
    reviewedAt: null,
    status: 'pending',
  };

  store().unshift(link);
  return link;
}

export async function deleteLink(id: string): Promise<boolean> {
  const items = store();
  const index = items.findIndex((link) => link.id === id);

  if (index === -1) return false;

  items.splice(index, 1);
  return true;
}
