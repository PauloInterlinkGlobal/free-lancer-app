import type {
  ContactStatus,
  IContact,
} from '@/modules/contacts/contacts-geral/interfaces/contacts';
import type { IGroup } from '@/modules/contacts/contacts-groups/interfaces/groups';

export interface GroupContactsParams {
  search?: string;
  status?: string;
  page?: number;
}

export type GroupStatusCounts = Record<ContactStatus, number>;

export interface GroupDetails {
  group: IGroup;
  stats: {
    total: number;
    byStatus: GroupStatusCounts;
  };
  contacts: IContact[];
  currentPage: number;
  totalPages: number;
}
