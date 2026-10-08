export type SendingType = 'normal' | 'flash';

export interface IScheduledSms {
  id: string;
  reference: string;
  content: string;
  sendingType: SendingType;
  recipients: number;
  smsUsed: number;
  sender: string;
  editionDate: string;
  sendingDate: string;
}
