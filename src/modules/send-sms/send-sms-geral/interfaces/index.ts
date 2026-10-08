export type SmsType = 'normal' | 'flash';

export interface ISenderId {
  id: string;
  name: string;
}

export interface IContactGroup {
  id: string;
  name: string;
  total: number;
}

export interface ISmsTemplate {
  id: string;
  title: string;
  content: string;
}

export interface ISendSmsPayload {
  type: SmsType;
  senderId: string;
  groupIds: string[];
  contacts: string[];
  message: string;
}
