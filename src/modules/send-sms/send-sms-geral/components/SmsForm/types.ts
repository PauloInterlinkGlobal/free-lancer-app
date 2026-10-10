import { IContact } from '@/modules/contacts/contacts-geral/interfaces/contacts';
import type { ApprovedLink } from '@/modules/links/services/links.service';
import {
  IContactGroup,
  ISendSmsPayload,
  ISenderId,
  ISmsTemplate,
} from '../../interfaces';

export interface SmsFormProps {
  senderIds: ISenderId[];
  groups: IContactGroup[];
  templates: ISmsTemplate[];
  availableContacts: IContact[];
  links?: ApprovedLink[];
  loading?: boolean;
  balance?: number;
  onSendTest?: (message: string) => Promise<void>;
  onSubmit: (payload: ISendSmsPayload) => void | Promise<void>;
}

export interface SmsInfo {
  length: number;
  segments: number;
  isGsm: boolean;
}
