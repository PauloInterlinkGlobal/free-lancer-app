import { IContact } from '@/modules/contacts/contacts-geral/interfaces/contacts';

export type MessageStatus = 'delivered' | 'sent' | 'pending' | 'failed';
export type MessageOrigin = 'campaign' | 'quick' | 'api';

export interface IContactMessage {
  id: string;
  sentAt: string; // ISO
  message: string;
  origin: MessageOrigin;
  groups: string[];
  status: MessageStatus;
}

export interface IContactStats {
  totalSent: number;
  conversionRate: number;
  lastMessageAt: string | null;
}

export interface IContactDetails {
  contact: IContact;
  stats: IContactStats;
  messages: IContactMessage[];
  totalPages: number;
}
