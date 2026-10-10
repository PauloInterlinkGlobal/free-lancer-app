import { IContact } from '@/modules/contacts/contacts-geral/interfaces/contacts';
import { ILink } from '@/modules/links/interfaces/links';
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
  links?: Pick<ILink, 'id' | 'description' | 'url'>[];
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
