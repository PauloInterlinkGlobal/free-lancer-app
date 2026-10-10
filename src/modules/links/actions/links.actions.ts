'use server';

import { revalidatePath } from 'next/cache';
import type {
  LinkDeleteResult,
  LinkFormState,
  LinkFormValues,
} from '../interfaces/links';
import {
  deleteLink,
  getAllLinks,
  createLink,
} from '../services/links.service';
import {
  normalizeUrl,
  validateLinkInput,
} from '../utils/link-validation';

// Nunca confiar nos dados do cliente: tudo é validado aqui, no servidor.

const LINKS_PATH = '/[locale]/links';
const ID_PATTERN = /^[A-Za-z0-9_-]{1,100}$/;

// Só aceita texto. Campos com ficheiros ou valores em falta contam como vazios.
function readText(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === 'string' ? value : '';
}

export async function createLinkAction(
  _prevState: LinkFormState,
  formData: FormData
): Promise<LinkFormState> {
  const values: LinkFormValues = {
    url: readText(formData, 'url'),
    description: readText(formData, 'description'),
  };

  try {
    // Duplicados são verificados contra os dados do serviço, não contra o cliente.
    const existing = await getAllLinks();
    const errors = validateLinkInput(
      values,
      existing.map((link) => link.url)
    );

    if (errors.url || errors.description) {
      return { ok: false, errors, values };
    }

    await createLink({
      url: normalizeUrl(values.url.trim()),
      description: values.description.trim(),
    });

    revalidatePath(LINKS_PATH, 'page');

    return { ok: true, errors: {}, values: { url: '', description: '' } };
  } catch {
    return {
      ok: false,
      errors: { url: 'Não foi possível submeter o link. Tente novamente.' },
      values,
    };
  }
}

export async function deleteLinkAction(id: string): Promise<LinkDeleteResult> {
  if (typeof id !== 'string' || !ID_PATTERN.test(id)) {
    return { ok: false, error: 'Identificador de link inválido.' };
  }

  try {
    const removed = await deleteLink(id);

    if (!removed) {
      return { ok: false, error: 'Link não encontrado.' };
    }

    revalidatePath(LINKS_PATH, 'page');
    return { ok: true };
  } catch {
    return { ok: false, error: 'Não foi possível eliminar o link.' };
  }
}
