import { IContact } from '@/modules/contacts/contacts-geral/interfaces/contacts';
import {
  IContactGroup,
  ISendSmsPayload,
  ISenderId,
  ISmsTemplate,
  SmsType,
} from '../../interfaces';

export interface SmsFormProps {
  senderIds: ISenderId[];
  groups: IContactGroup[];
  templates: ISmsTemplate[];
  availableContacts: IContact[];
  loading?: boolean;
  onSubmit: (payload: ISendSmsPayload) => void | Promise<void>;
}

export interface SmsInfo {
  length: number;
  segments: number;
  isGsm: boolean;
}
