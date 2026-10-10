// Serviço de servidor: só deve ser importado por Server Components e Server Actions.
// Não é um componente de cliente e não usa hooks.
import { groupsMock } from '@/modules/contacts/contacts-groups/mocks/groups.mock';
import type { IContact, ICreateContactInput } from '../interfaces/contacts';
import { contactsMock } from '../mocks/contacts.mock';

// TODO(api): Substituir pelas chamadas à API de contactos e de grupos.
// Os dados são só de leitura: não há gravação até existir API.

export function getAllContacts(): IContact[] {
  return contactsMock;
}

export function getGroupNames(): string[] {
  return groupsMock.map((group) => group.name);
}

export function getGroupOptions(): { value: string; label: string }[] {
  return getGroupNames().map((name) => ({ value: name, label: name }));
}

// Monta o contacto criado (status 'active'). Não é gravado: ver TODO(api) acima.
export function buildContact(input: ICreateContactInput): IContact {
  return {
    id: crypto.randomUUID(),
    name: input.name,
    surname: input.surname,
    number: input.number,
    email: input.email,
    date: new Date().toISOString(),
    groups: input.groups,
    variables: input.variables,
    status: 'active',
  };
}
