import { IContact } from '../interfaces/contacts';

export function collectCustomVariableKeys(contacts: IContact[]): string[] {
  const keys = new Set<string>();

  for (const contact of contacts) {
    if (contact.variables) {
      for (const key of Object.keys(contact.variables)) {
        const trimmed = key.trim();
        if (trimmed) {
          keys.add(trimmed);
        }
      }
    }
  }

  return Array.from(keys).sort((a, b) => a.localeCompare(b, 'pt'));
}
