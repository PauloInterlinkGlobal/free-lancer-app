import { ALL } from '../constants/links';
import { ILink, ILinksFilters, LinkStatus } from '../interfaces/links';

export const PAGE_SIZE = 8;

const VALID_STATUSES: readonly string[] = [
  ALL,
  'pending',
  'approved',
  'rejected',
] satisfies readonly (LinkStatus | typeof ALL)[];

// Filtros normalizados: todos os campos preenchidos.
export type LinksFiltersValue = Required<ILinksFilters>;

type RawParams = Record<string, string | string[] | undefined>;

const first = (v: string | string[] | undefined) =>
  Array.isArray(v) ? v[0] : v;

// Página sempre inteira e >= 1. NaN, Infinity, negativos e textos caem para 1.
export function parsePage(raw: string | undefined): number {
  const n = Math.floor(Number(raw));
  return Number.isFinite(n) && n >= 1 ? n : 1;
}

// Estado desconhecido (ex.: ?status=xpto) volta a "todos", em vez de devolver lista vazia.
export function parseStatus(raw: string | undefined): string {
  return raw && VALID_STATUSES.includes(raw) ? raw : ALL;
}

export function parseLinksFilters(params: RawParams): LinksFiltersValue {
  return {
    search: (first(params.search) ?? '').trim(),
    status: parseStatus(first(params.status)),
    page: parsePage(first(params.page)),
  };
}

// Compara sem acentos nem maiúsculas: "Localização" encontra "localizacao".
export function normalizeSearch(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export function filterLinks(data: ILink[], filters: ILinksFilters): ILink[] {
  const search = normalizeSearch(filters.search ?? '');
  const status = filters.status ?? ALL;

  return data
    .filter((item) => {
      const matchesSearch =
        !search ||
        normalizeSearch(item.description).includes(search) ||
        normalizeSearch(item.url).includes(search);

      const matchesStatus = status === ALL || item.status === status;

      return matchesSearch && matchesStatus;
    })
    .sort(
      (a, b) =>
        new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );
}

export function paginate<T>(items: T[], page: number, pageSize = PAGE_SIZE) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);

  return {
    items: items.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    currentPage,
    totalPages,
    totalItems: items.length,
  };
}
