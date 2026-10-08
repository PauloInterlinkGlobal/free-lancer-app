import { IContact } from '@/modules/contacts/contacts-geral/interfaces/contacts';

export interface SelectContactsModalProps {
  contacts: IContact[];
  selected: string[];
  onConfirm: (numbers: string[]) => void;
}
