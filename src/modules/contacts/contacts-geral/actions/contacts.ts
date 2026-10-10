'use server';

import { revalidatePath } from 'next/cache';
import { contactsMock } from '../mocks/contacts.mock';

// TODO(api): Nenhuma destas ações persiste dados. Ligar aos endpoints de edição
// e remoção de contactos quando a API estiver disponível; até lá, a lista
// (contactsMock) não muda. A criação está em contacts.actions.ts.

export type ContactActionResult = { ok: true } | { ok: false; message: string };

export async function updateContact(
  id: string,
  changes: { name: string; number: string }
): Promise<ContactActionResult> {
  const exists = contactsMock.some((contact) => contact.id === id);
  if (!exists) {
    return { ok: false, message: 'Contacto não encontrado.' };
  }

  if (!changes.name.trim()) {
    return { ok: false, message: 'O nome é obrigatório.' };
  }
  if (changes.number.replace(/\D/g, '').length < 9) {
    return { ok: false, message: 'Introduza um número de telefone válido.' };
  }

  revalidatePath('/[locale]/contacts', 'layout');
  return { ok: true };
}

export async function deleteContact(id: string): Promise<ContactActionResult> {
  const exists = contactsMock.some((contact) => contact.id === id);
  if (!exists) {
    return { ok: false, message: 'Contacto não encontrado.' };
  }

  revalidatePath('/[locale]/contacts', 'layout');
  return { ok: true };
}
