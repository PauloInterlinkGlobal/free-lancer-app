'use server';

import { revalidatePath } from 'next/cache';
import {
  createLink,
  deleteLink,
  getLinks,
} from '../services/links.service';
import {
  normalizeUrl,
  validateLinkInput,
  type LinkInputErrors,
  type LinkInputValues,
} from '../utils/link-validation';

export type CreateLinkActionState = {
  ok: boolean;
  errors: LinkInputErrors;
  values: LinkInputValues;
};

/**
 * Verifica se já existe um link com o mesmo URL (normalizado, case-insensitive).
 * Percorre todas as páginas porque o serviço devolve resultados paginados.
 * TODO(api): substituir por endpoint dedicado de verificação de unicidade.
 */
async function urlAlreadyExists(normalizedUrl: string): Promise<boolean> {
  const target = normalizedUrl.toLowerCase();
  let page = 1;
  let totalPages = 1;

  do {
    const result = await getLinks({ page, status: 'all' });
    const found = result.items.some(
      (link) => normalizeUrl(link.url).toLowerCase() === target
    );
    if (found) return true;
    totalPages = result.totalPages;
    page += 1;
  } while (page <= totalPages);

  return false;
}

/**
 * Server Action para criar um link.
 * Valida tudo no servidor, impede URLs duplicadas e revalida a listagem.
 * Nunca confiar nos dados do cliente.
 */
export async function createLinkAction(
  _prevState: CreateLinkActionState,
  formData: FormData
): Promise<CreateLinkActionState> {
  const rawUrl = String(formData.get('url') ?? '');
  const rawDescription = String(formData.get('description') ?? '');

  const validation = validateLinkInput({
    url: rawUrl,
    description: rawDescription,
  });

  if (!validation.ok) {
    return {
      ok: false,
      errors: validation.errors,
      values: validation.values,
    };
  }

  const { url, description } = validation.values;

  if (await urlAlreadyExists(url)) {
    return {
      ok: false,
      errors: { url: 'Este URL já se encontra registado.' },
      values: { url, description },
    };
  }

  try {
    await createLink({ url, description });
  } catch {
    return {
      ok: false,
      errors: {
        url: 'Não foi possível criar o link. Tente novamente.',
      },
      values: { url, description },
    };
  }

  // Revalida a página de links (App Router com locale).
  revalidatePath('/[locale]/links', 'page');

  return {
    ok: true,
    errors: {},
    values: { url: 'https://', description: '' },
  };
}

/**
 * Server Action para eliminar um link pelo id.
 * Valida o identificador no servidor, elimina e revalida a listagem.
 */
export async function deleteLinkAction(
  id: string
): Promise<{ ok: boolean }> {
  const trimmedId = typeof id === 'string' ? id.trim() : '';

  if (!trimmedId) {
    return { ok: false };
  }

  const deleted = await deleteLink(trimmedId);

  if (!deleted) {
    return { ok: false };
  }

  revalidatePath('/[locale]/links', 'page');

  return { ok: true };
}
