/**
 * Serviço de servidor do módulo Links.
 *
 * A persistência ainda é simulada em memória enquanto a API não estiver disponível.
 * TODO(api): substituir o armazenamento global por chamadas ao serviço/API de links.
 * Não importar este módulo em componentes Client.
 */
import { randomUUID } from 'node:crypto';
import { ALL } from '../constants/links';
import type { ILink, ILinksFilters } from '../interfaces/links';
import { linksMock } from '../mocks/links.mock';
import {
  filterLinks,
  paginate,
  type LinksFiltersValue,
} from '../utils/links-filters';

declare global {
  // Mantém os dados durante o hot reload em desenvolvimento.
  // eslint-disable-next-line no-var
  var __linksStore: ILink[] | undefined;
}

function getLinksStore(): ILink[] {
  globalThis.__linksStore ??= linksMock.map((link) => ({ ...link }));
  return globalThis.__linksStore;
}

export interface GetLinksResult {
  items: ILink[];
  total: number;
  page: number;
  totalPages: number;
}

export type ApprovedLink = Pick<ILink, 'id' | 'description' | 'url'>;

export async function getLinks(
  filters: ILinksFilters
): Promise<GetLinksResult> {
  // TODO(api): obter os links filtrados e paginados através da API.
  const normalizedFilters: LinksFiltersValue = {
    search: filters.search ?? '',
    status: filters.status ?? ALL,
    page: Math.max(1, Math.floor(Number(filters.page) || 1)),
  };

  const filteredLinks = filterLinks(
    getLinksStore().map((link) => ({ ...link })),
    normalizedFilters
  );
  const result = paginate(filteredLinks, normalizedFilters.page);

  return {
    items: result.items,
    total: result.totalItems,
    page: result.currentPage,
    totalPages: result.totalPages,
  };
}

export async function getApprovedLinks(): Promise<ApprovedLink[]> {
  // TODO(api): obter os links aprovados através da API.
  return getLinksStore()
    .filter((link) => link.status === 'approved')
    .map(({ id, description, url }) => ({ id, description, url }));
}

export async function createLink(
  input: Pick<ILink, 'description' | 'url'>
): Promise<ILink> {
  // TODO(api): persistir o novo link através da API.
  const link: ILink = {
    id: randomUUID(),
    description: input.description,
    url: input.url,
    submittedAt: new Date().toISOString(),
    reviewedAt: null,
    status: 'pending',
  };

  getLinksStore().unshift(link);
  return { ...link };
}

export async function deleteLink(id: string): Promise<boolean> {
  // TODO(api): eliminar o link através da API.
  const store = getLinksStore();
  const index = store.findIndex((link) => link.id === id);

  if (index === -1) {
    return false;
  }

  store.splice(index, 1);
  return true;
}
