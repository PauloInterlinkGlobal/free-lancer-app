'use server';

import { revalidatePath } from 'next/cache';
import type { ContactFormErrors, ContactFormState } from '../interfaces/contacts';
import {
  buildContact,
  getAllContacts,
  getGroupNames,
} from '../services/contacts.service';
import { validateContact } from '../utils/contact-validation';

const MAX_CUSTOM_VARIABLES = 10;

// Nunca confiar nos dados do cliente: tudo é validado aqui, no servidor.
export async function createContactAction(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  try {
    const text = (field: string): string => {
      const value = formData.get(field);
      return typeof value === 'string' ? value : '';
    };
    const texts = (field: string): string[] =>
      formData
        .getAll(field)
        .filter((value): value is string => typeof value === 'string');

    const errors: ContactFormErrors = {};

    // Grupos: só se aceitam nomes que existem no serviço.
    const allowedGroups = getGroupNames();
    const groups = [
      ...new Set(texts('groups').map((group) => group.trim()).filter(Boolean)),
    ];
    if (groups.some((group) => !allowedGroups.includes(group))) {
      errors.groups = 'Selecione apenas grupos existentes.';
    }

    // Variáveis: chave e valor chegam em listas paralelas (uma entrada por linha).
    const keys = texts('variableKey');
    const values = texts('variableValue');
    const rowCount = Math.max(keys.length, values.length);

    if (rowCount > MAX_CUSTOM_VARIABLES) {
      errors.generalVariables = `Pode adicionar no máximo ${MAX_CUSTOM_VARIABLES} variáveis personalizadas.`;
    }

    const keyCounts = new Map<string, number>();
    for (let index = 0; index < rowCount; index++) {
      const key = (keys[index] ?? '').trim();
      if (key) keyCounts.set(key, (keyCounts.get(key) ?? 0) + 1);
    }

    const rowErrors: Record<string, string> = {};
    const variables: Record<string, string> = {};
    for (let index = 0; index < rowCount; index++) {
      const key = (keys[index] ?? '').trim();
      if (!key) {
        rowErrors[String(index)] = 'A chave da variável é obrigatória.';
      } else if ((keyCounts.get(key) ?? 0) > 1) {
        rowErrors[String(index)] = `A chave "${key}" está duplicada.`;
      } else {
        variables[key] = (values[index] ?? '').trim();
      }
    }

    // Duplicados verificados contra o serviço (validateContact recebe os números existentes).
    const existingNumbers = getAllContacts().map((contact) => contact.number);
    const result = validateContact(
      {
        name: text('name'),
        surname: text('surname'),
        number: text('number'),
        email: text('email'),
        groups,
        variables,
      },
      existingNumbers
    );

    const mergedErrors: ContactFormErrors = {
      ...result.errors,
      groups: errors.groups,
      generalVariables: result.errors.generalVariables ?? errors.generalVariables,
      rows: Object.keys(rowErrors).length > 0 ? rowErrors : undefined,
    };

    const hasErrors =
      !result.isValid ||
      Boolean(errors.groups) ||
      Boolean(errors.generalVariables) ||
      Object.keys(rowErrors).length > 0 ||
      !result.normalized;

    if (hasErrors || !result.normalized) {
      return { ok: false, errors: mergedErrors };
    }

    // TODO(api): Gravar o contacto quando existir endpoint de criação.
    buildContact(result.normalized);
    revalidatePath('/[locale]/contacts', 'page');

    return { ok: true, errors: {} };
  } catch {
    return {
      ok: false,
      errors: { form: 'Não foi possível guardar o contacto. Tente novamente.' },
    };
  }
}
